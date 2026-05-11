import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FlickeringGrid } from './ui/flickering-grid';

// ─── Types ───────────────────────────────────────────────────────────────────

interface SimNode {
  id: number;
  label: string;
  hub: boolean;
  legacy: boolean;
  pattern: string;
  fixed: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface IsoLayer {
  id: 'analyze' | 'refactor' | 'verify' | 'document';
  label: string;
  step: string;
  desc: string;
  summaryLabel: string;
  summaryDesc: string;
}

// ─── Graph data ───────────────────────────────────────────────────────────────
// Edges are import relationships: [importer, importee]

const NODE_DEFS: Omit<SimNode, 'x' | 'y' | 'vx' | 'vy' | 'fixed'>[] = [
  { id: 0, label: 'index.js', hub: true, legacy: false, pattern: '' },
  {
    id: 1,
    label: 'auth.js',
    hub: false,
    legacy: true,
    pattern: 'callback-based async',
  },
  {
    id: 2,
    label: 'utils.js',
    hub: false,
    legacy: true,
    pattern: 'var declarations',
  },
  {
    id: 3,
    label: 'db/config.js',
    hub: false,
    legacy: true,
    pattern: 'deprecated API',
  },
  { id: 4, label: 'user.js', hub: false, legacy: false, pattern: '' },
  {
    id: 5,
    label: 'payment.js',
    hub: false,
    legacy: true,
    pattern: 'missing type hints',
  },
  { id: 6, label: 'routes.js', hub: false, legacy: false, pattern: '' },
  { id: 7, label: 'middleware.js', hub: false, legacy: false, pattern: '' },
  { id: 8, label: 'email.js', hub: false, legacy: false, pattern: '' },
  { id: 9, label: 'helpers.js', hub: false, legacy: false, pattern: '' },
  { id: 10, label: 'config.js', hub: false, legacy: false, pattern: '' },
  { id: 11, label: 'orders.js', hub: false, legacy: false, pattern: '' },
  { id: 12, label: 'notify.js', hub: false, legacy: false, pattern: '' },
  {
    id: 13,
    label: 'cache.js',
    hub: false,
    legacy: true,
    pattern: 'sync I/O pattern',
  },
  { id: 14, label: 'logger.js', hub: false, legacy: false, pattern: '' },
  { id: 15, label: 'events.js', hub: false, legacy: false, pattern: '' },
];

const EDGE_PAIRS: [number, number][] = [
  [0, 1],
  [0, 6],
  [0, 10],
  [1, 4],
  [1, 7],
  [6, 4],
  [6, 11],
  [6, 7],
  [4, 8],
  [4, 9],
  [7, 2],
  [7, 14],
  [10, 3],
  [10, 13],
  [11, 12],
  [11, 5],
  [3, 13],
  [5, 4],
  [8, 9],
  [12, 15],
  [15, 9],
  [2, 10],
];

// ─── Force-directed canvas graph ──────────────────────────────────────────────
//
// Repulsion + edge springs + centre gravity. A scan cursor visits every node
// in sequence; the overlay narrates what the engine is "seeing". Visual layer
// is monochrome with one accent (subtle teal) reserved for the active scan
// only — everything else stays in greyscale to keep the panel quiet.

// Single accent — pure white, distinguished from chrome by higher alpha + glow.
const accent = (a: number) => `rgba(255, 255, 255, ${a})`;

// Reticle corner directions — hoisted to avoid per-frame allocation.
const RETICLE_CORNERS: ReadonlyArray<readonly [number, number]> = [
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
];

interface ForceGraphProps {
  stage: number;
}

const ForceGraph: React.FC<ForceGraphProps> = ({ stage }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageRef = useRef(stage);
  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dpr = window.devicePixelRatio || 1;
    let raf = 0;
    const size = { w: 0, h: 0 };
    let nodes: SimNode[] = [];

    // Sequential scan state — advances every DWELL_MS
    const scan = {
      idx: 0,
      lastMs: 0,
      scanned: new Set<number>(),
      // Smoothly interpolated cursor — eases toward the current target node
      cx: 0,
      cy: 0,
    };
    const DWELL_MS = 620;

    // Trail of recently scanned nodes (oldest first, newest last)
    const trail: number[] = [];
    const TRAIL_MAX = 5;

    // Animated edge probes — spawn when the scan enters a node
    const probes: { from: number; to: number; bornMs: number }[] = [];
    const PROBE_DUR = 480;

    // Running log of legacy detections (max 4 visible, fades on entry)
    const detections: { id: number; bornMs: number }[] = [];
    const DETECT_MAX = 4;

    // Time the current scan node was entered (drives the sonar sweep ring)
    let lastEnterMs = 0;

    // Stage = 0 ANALYZE, 1 REFACTOR, 2 VERIFY, 3 DOCUMENT
    let stageNow = -1; // forces onStageEnter on first tick

    // Incremental counter — # of legacy nodes among scan.scanned, kept in sync.
    let scannedLegacyCount = 0;

    // REFACTOR — step through legacy nodes one at a time
    const REFACTOR_STEP_MS = 980;
    const REFACTOR_BUFFER_MS = 220; // wait before kicking off the first node
    const legacyIds = NODE_DEFS.filter(n => n.legacy).map(n => n.id);
    const transforms: { id: number; bornMs: number }[] = [];
    let refactorIdx = 0;
    let refactorLastMs = 0;
    const DIFF_TEXT: Record<string, string> = {
      'callback-based async': 'cb → async',
      'var declarations': 'var → const',
      'deprecated API': '.exec → .query',
      'missing type hints': '+ type hints',
      'sync I/O pattern': 'read → readAsync',
    };

    // VERIFY — left-to-right wave sweep + checkmark per node
    const VERIFY_WAVE_DUR = 2800;
    let verifyStart = -1;
    const verifyChecks: { id: number; bornMs: number }[] = [];
    const verifyCheckSet = new Set<number>(); // O(1) membership for hot loop

    // DOCUMENT — drifting doc glyphs above every legacy node
    const DOC_GLYPH_DUR = 1800;
    const docGlyphs: { id: number; bornMs: number }[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      size.w = rect.width;
      size.h = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    nodes = NODE_DEFS.map(n => ({
      ...n,
      fixed: false,
      x: size.w / 2 + (Math.random() - 0.5) * size.w * 0.5,
      y: size.h / 2 + (Math.random() - 0.5) * size.h * 0.5,
      vx: 0,
      vy: 0,
    }));

    // Settle layout once so the first frame doesn't show a tangled blob
    const settle = (steps: number) => {
      const { w, h } = size;
      const cx = w / 2;
      const cy = h / 2;
      for (let s = 0; s < steps; s++) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
            const f = Math.min(2800 / (d * d), 8);
            const fx = (dx / d) * f;
            const fy = (dy / d) * f;
            nodes[i].vx -= fx;
            nodes[i].vy -= fy;
            nodes[j].vx += fx;
            nodes[j].vy += fy;
          }
        }
        for (const [si, ti] of EDGE_PAIRS) {
          const a = nodes[si];
          const b = nodes[ti];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
          const f = 0.018 * (d - 85);
          const fx = (dx / d) * f;
          const fy = (dy / d) * f;
          a.vx += fx;
          a.vy += fy;
          b.vx -= fx;
          b.vy -= fy;
        }
        for (const n of nodes) {
          n.vx += (cx - n.x) * 0.002;
          n.vy += (cy - n.y) * 0.002;
          n.vx *= 0.88;
          n.vy *= 0.88;
          n.x = Math.max(28, Math.min(w - 28, n.x + n.vx));
          n.y = Math.max(28, Math.min(h - 28, n.y + n.vy));
        }
      }
    };

    if (reduceMotion) settle(400);
    scan.cx = nodes[0].x;
    scan.cy = nodes[0].y;

    const STAGE_TITLE = [
      'ANALYZING',
      'REFACTORING',
      'VERIFYING',
      'DOCUMENTING',
    ];

    const drawHud = (
      w: number,
      activeNode: SimNode,
      legacyCount: number,
      cleanCount: number,
      total: number,
      stageNum: number,
      ms: number,
      generatedDocs: number
    ) => {
      const px = w - 20;
      const titleY = 24;
      ctx.textBaseline = 'alphabetic';

      // Stage title
      ctx.font = '7px "JetBrains Mono", monospace';
      const title = STAGE_TITLE[stageNum] ?? 'ANALYZING';
      ctx.fillStyle = 'rgba(255,255,255,0.32)';
      ctx.fillText(title, px - ctx.measureText(title).width, titleY);

      // Subject line — file name or summary depending on stage
      let subject = activeNode.label;
      let status = '';
      if (stageNum === 0) {
        status = activeNode.legacy
          ? `LEGACY  ·  ${activeNode.pattern.toUpperCase()}`
          : activeNode.hub
            ? 'ENTRY POINT'
            : 'CLEAN';
      } else if (stageNum === 1) {
        const cur = legacyIds[refactorIdx];
        const node = nodes[cur] ?? activeNode;
        subject = node.label;
        const diff = DIFF_TEXT[node.pattern] ?? '+ refactored';
        status = `APPLY  ·  ${diff}`;
      } else if (stageNum === 2) {
        subject = `${verifyChecks.length} / ${nodes.length} verified`;
        const wt = verifyStart > 0 ? (ms - verifyStart) / VERIFY_WAVE_DUR : 0;
        status = wt >= 1 ? 'ALL CHECKS PASSED' : 'CHECKS IN PROGRESS';
      } else if (stageNum === 3) {
        subject = `${generatedDocs} / ${legacyIds.length} files documented`;
        status = 'INLINE DOCS  ·  CHANGELOGS';
      }

      ctx.font = '600 10px "JetBrains Mono", monospace';
      const subjectW = ctx.measureText(subject).width;
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillText(subject, px - subjectW, titleY + 16);

      ctx.font = '7.5px "JetBrains Mono", monospace';
      const statusW = ctx.measureText(status).width;
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText(status, px - statusW, titleY + 32);

      // Progress bar — meaning shifts per stage
      const BAR_W = 148;
      const barX = px - BAR_W;
      const barY = titleY + 46;
      ctx.fillStyle = 'rgba(255,255,255,0.045)';
      ctx.fillRect(barX, barY, BAR_W, 3);

      let primary = 0;
      let secondary = 0;
      let counts = '';
      if (stageNum === 0) {
        primary = (cleanCount / total) * BAR_W;
        secondary = (legacyCount / total) * BAR_W;
        counts = `${legacyCount + cleanCount}/${total}  ·  ${legacyCount} LEGACY  ·  ${cleanCount} CLEAN`;
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillRect(barX, barY, primary, 3);
        ctx.fillStyle = 'rgba(255,255,255,0.2)';
        ctx.fillRect(barX + primary, barY, secondary, 3);
      } else if (stageNum === 1) {
        const p = legacyIds.length
          ? Math.min(1, refactorIdx / legacyIds.length)
          : 0;
        ctx.fillStyle = accent(0.6);
        ctx.fillRect(barX, barY, p * BAR_W, 3);
        counts = `${refactorIdx}/${legacyIds.length} TRANSFORMS APPLIED`;
      } else if (stageNum === 2) {
        const p =
          verifyStart > 0
            ? Math.min(1, (ms - verifyStart) / VERIFY_WAVE_DUR)
            : 0;
        ctx.fillStyle = accent(0.65);
        ctx.fillRect(barX, barY, p * BAR_W, 3);
        counts = `${verifyChecks.length}/${nodes.length} FILES VERIFIED`;
      } else if (stageNum === 3) {
        const p = legacyIds.length ? generatedDocs / legacyIds.length : 0;
        ctx.fillStyle = accent(0.65);
        ctx.fillRect(barX, barY, p * BAR_W, 3);
        counts = `${generatedDocs}/${legacyIds.length} DOCS GENERATED`;
      }

      ctx.font = '7px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.32)';
      const cw = ctx.measureText(counts).width;
      ctx.fillText(counts, px - cw, barY + 14);
    };

    const renderFrame = (ms: number) => {
      const { w, h } = size;

      ctx.clearRect(0, 0, w, h);

      const activeNode = nodes[scan.idx];

      // Per-frame derived counter (used by both stage-log and HUD).
      // Cumulative: once a glyph has been "born" the doc is generated and
      // stays generated for the rest of the stage. The drift animation only
      // controls visual presence, not the count.
      let generatedDocs = 0;
      if (stageNow === 3) {
        for (let i = 0; i < docGlyphs.length; i++) {
          if (ms >= docGlyphs[i].bornMs) generatedDocs++;
        }
      }

      // ── Scan trail polyline (under everything) ────────────────────────────
      if (trail.length > 0) {
        for (let i = 0; i < trail.length - 1; i++) {
          const a = nodes[trail[i]];
          const b = nodes[trail[i + 1]];
          const t = (i + 1) / trail.length;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(255,255,255,${0.04 + t * 0.08})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        // Bridge the most recent trail node to the active scan cursor
        const last = nodes[trail[trail.length - 1]];
        ctx.beginPath();
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(scan.cx, scan.cy);
        ctx.strokeStyle = 'rgba(255,255,255,0.15)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // ── Sonar sweep ring around the active node (ANALYZE & REFACTOR) ──────
      if (stageNow === 0 || stageNow === 1) {
        const sweepT = (ms - lastEnterMs) / 700;
        if (sweepT > 0 && sweepT < 1) {
          const radius = 6 + sweepT * 40;
          const alpha = (1 - sweepT) * 0.45;
          ctx.beginPath();
          ctx.arc(scan.cx, scan.cy, radius, 0, Math.PI * 2);
          ctx.strokeStyle = accent(alpha);
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // ── VERIFY: L→R wave front (drawn under everything) ───────────────────
      if (stageNow === 2 && verifyStart > 0) {
        const t = (ms - verifyStart) / VERIFY_WAVE_DUR;
        if (t < 1.05) {
          const waveX = w * Math.min(1, t);
          // soft trailing glow band
          const grad = ctx.createLinearGradient(waveX - 80, 0, waveX, 0);
          grad.addColorStop(0, 'rgba(120,220,215,0)');
          grad.addColorStop(1, 'rgba(120,220,215,0.07)');
          ctx.fillStyle = grad;
          ctx.fillRect(waveX - 80, 0, 80, h);
          // wave front line
          if (t < 1) {
            ctx.beginPath();
            ctx.moveTo(waveX, 18);
            ctx.lineTo(waveX, h - 18);
            ctx.strokeStyle = accent(0.6);
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // ── Edges + arrowheads ────────────────────────────────────────────────
      for (const [si, ti] of EDGE_PAIRS) {
        const a = nodes[si];
        const b = nodes[ti];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.01;
        const isAdjActive = scan.idx === si || scan.idx === ti;
        const bothScanned = scan.scanned.has(si) && scan.scanned.has(ti);
        const edgeAlpha = isAdjActive ? 0.16 : bothScanned ? 0.07 : 0.04;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(255,255,255,${edgeAlpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        const tr = nodes[ti].hub ? 5 : nodes[ti].legacy ? 3.4 : 2;
        const ex = b.x - (tr + 3) * (dx / dist);
        const ey = b.y - (tr + 3) * (dy / dist);
        const angle = Math.atan2(dy, dx);
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(
          ex - 5 * Math.cos(angle - 0.45),
          ey - 5 * Math.sin(angle - 0.45)
        );
        ctx.lineTo(
          ex - 5 * Math.cos(angle + 0.45),
          ey - 5 * Math.sin(angle + 0.45)
        );
        ctx.closePath();
        ctx.fillStyle = `rgba(255,255,255,${isAdjActive ? 0.12 : bothScanned ? 0.06 : 0.04})`;
        ctx.fill();
      }

      // ── Edge-probe particles (above edges, under nodes) ───────────────────
      for (const probe of probes) {
        const a = nodes[probe.from];
        const b = nodes[probe.to];
        const t = Math.min(1, (ms - probe.bornMs) / PROBE_DUR);
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t;
        const alpha = Math.sin(Math.PI * t);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = accent(alpha * 0.22);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = accent(alpha * 0.9);
        ctx.fill();
      }

      // ── Nodes + labels ────────────────────────────────────────────────────
      for (const n of nodes) {
        const isActive = scan.idx === n.id;
        const isScanned = scan.scanned.has(n.id);
        const r = n.hub ? 5 : n.legacy ? 3.4 : 2;

        // Legacy dashed ring — drops once the node has been refactored
        if (n.legacy && !n.fixed && !isActive) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${isScanned ? 0.22 : 0.09})`;
          ctx.lineWidth = 0.5;
          ctx.setLineDash([2, 2]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Fixed-node halo — once refactored, a faint teal ring stays
        if (n.legacy && n.fixed && !isActive) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r + 4, 0, Math.PI * 2);
          ctx.strokeStyle = accent(0.32);
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }

        // Node fill — hubs as diamonds, others as circles
        const alpha = isActive
          ? 1
          : isScanned
            ? n.hub
              ? 0.95
              : n.legacy
                ? 0.72
                : 0.34
            : n.hub
              ? 0.6
              : n.legacy
                ? 0.42
                : 0.18;
        ctx.fillStyle = isActive ? accent(1) : `rgba(255,255,255,${alpha})`;
        if (isActive) {
          ctx.shadowColor = 'rgba(255,255,255,0.85)';
          ctx.shadowBlur = 10;
        }
        if (n.hub) {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y - r);
          ctx.lineTo(n.x + r, n.y);
          ctx.lineTo(n.x, n.y + r);
          ctx.lineTo(n.x - r, n.y);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        if (isActive) ctx.shadowBlur = 0;

        // Label
        const labelAlpha = isActive
          ? 0.95
          : isScanned
            ? n.hub
              ? 0.65
              : n.legacy
                ? 0.5
                : 0.27
            : n.hub
              ? 0.4
              : n.legacy
                ? 0.24
                : 0.14;
        ctx.font = `${isActive ? '600 ' : ''}8.5px "JetBrains Mono", monospace`;
        ctx.textBaseline = 'middle';
        ctx.fillStyle = isActive
          ? accent(0.95)
          : `rgba(255,255,255,${labelAlpha})`;
        ctx.fillText(n.label, n.x + r + 5, n.y);
      }

      // ── Targeting reticle (ANALYZE & REFACTOR) ────────────────────────────
      if (stageNow === 0 || stageNow === 1) {
        const phase = ms / 1400;
        const breath = 14 + Math.sin(phase) * 1.4;
        const armLen = 4.8;
        ctx.strokeStyle = accent(0.6);
        ctx.lineWidth = 1;
        for (const [sx, sy] of RETICLE_CORNERS) {
          const cx = scan.cx + sx * breath;
          const cy = scan.cy + sy * breath;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx - sx * armLen, cy);
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx, cy - sy * armLen);
          ctx.stroke();
        }
      }

      // ── REFACTOR: floating diff text above each node being transformed ────
      if (stageNow === 1) {
        ctx.textBaseline = 'middle';
        for (const tf of transforms) {
          const age = ms - tf.bornMs;
          if (age < 0 || age > REFACTOR_STEP_MS + 240) continue;
          const t = Math.min(1, age / (REFACTOR_STEP_MS + 240));
          const node = nodes[tf.id];
          const yOff = -14 - t * 16;
          const alpha = Math.sin(Math.PI * t);
          const text = DIFF_TEXT[node.pattern] ?? '+ refactored';
          ctx.font = '600 9px "JetBrains Mono", monospace';
          const tw = ctx.measureText(text).width;
          // background plate
          ctx.fillStyle = `rgba(0,0,0,${alpha * 0.55})`;
          ctx.fillRect(node.x + 8 - 3, node.y + yOff - 6, tw + 6, 12);
          ctx.fillStyle = accent(alpha * 0.95);
          ctx.fillText(text, node.x + 8, node.y + yOff);
        }
      }

      // ── VERIFY: checkmark glyph above each node the wave has passed ───────
      if (stageNow === 2) {
        ctx.textBaseline = 'middle';
        ctx.font = '600 10px "JetBrains Mono", monospace';
        for (const ck of verifyChecks) {
          const age = ms - ck.bornMs;
          const alpha =
            age < 380 ? age / 380 : Math.max(0, 1 - (age - 380) / 600);
          if (alpha <= 0) continue;
          const node = nodes[ck.id];
          ctx.fillStyle = accent(alpha * 0.95);
          ctx.fillText('✓', node.x - 9, node.y - 10);
        }
      }

      // ── DOCUMENT: doc glyphs drifting upward from each fixed node ─────────
      if (stageNow === 3) {
        ctx.textBaseline = 'middle';
        ctx.font = '13px "JetBrains Mono", monospace';
        for (const dg of docGlyphs) {
          const age = ms - dg.bornMs;
          if (age < 0 || age > DOC_GLYPH_DUR) continue;
          const t = age / DOC_GLYPH_DUR;
          const node = nodes[dg.id];
          const yOff = -10 - t * 36;
          const alpha = Math.sin(Math.PI * t);
          ctx.fillStyle = accent(alpha * 0.92);
          ctx.fillText('✦', node.x - 4, node.y + yOff);
        }
      }

      // ── Stage-specific top-left log ───────────────────────────────────────
      ctx.textBaseline = 'alphabetic';
      ctx.font = '7px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.32)';

      if (stageNow === 0) {
        ctx.fillText('DETECTIONS', 22, 52);
        ctx.font = '8px "JetBrains Mono", monospace';
        for (let i = 0; i < detections.length; i++) {
          const d = detections[i];
          const node = nodes[d.id];
          const age = ms - d.bornMs;
          const fade = Math.min(1, age / 240);
          const y = 68 + i * 13;
          ctx.fillStyle = `rgba(255,255,255,${0.55 * fade})`;
          ctx.fillText(`❯ ${node.label}`, 22, y);
          ctx.fillStyle = `rgba(255,255,255,${0.28 * fade})`;
          ctx.fillText(node.pattern, 130, y);
        }
      } else if (stageNow === 1) {
        ctx.fillText('TRANSFORMS', 22, 52);
        ctx.font = '8px "JetBrains Mono", monospace';
        for (let i = 0; i < legacyIds.length; i++) {
          const id = legacyIds[i];
          const node = nodes[id];
          const done = i < refactorIdx;
          const cur = i === refactorIdx;
          const fade = done ? 0.55 : cur ? 0.9 : 0.18;
          const y = 68 + i * 13;
          ctx.fillStyle = done
            ? accent(0.7)
            : cur
              ? accent(0.95)
              : 'rgba(255,255,255,0.22)';
          ctx.fillText(done ? '✓' : cur ? '◆' : '·', 22, y);
          ctx.fillStyle = `rgba(255,255,255,${fade})`;
          ctx.fillText(node.label, 34, y);
          ctx.fillStyle = `rgba(255,255,255,${fade * 0.55})`;
          const diff = DIFF_TEXT[node.pattern] ?? '';
          ctx.fillText(diff, 130, y);
        }
      } else if (stageNow === 2) {
        ctx.fillText('VERIFY', 22, 52);
        ctx.font = '8px "JetBrains Mono", monospace';
        const checks = [
          { label: 'syntax', dur: 0.25 },
          { label: 'imports', dur: 0.45 },
          { label: 'types', dur: 0.65 },
          { label: 'tests', dur: 0.85 },
          { label: 'lint', dur: 1.0 },
        ];
        const wt = verifyStart > 0 ? (ms - verifyStart) / VERIFY_WAVE_DUR : 0;
        checks.forEach((c, i) => {
          const passed = wt > c.dur;
          const y = 68 + i * 13;
          ctx.fillStyle = passed ? accent(0.85) : 'rgba(255,255,255,0.22)';
          ctx.fillText(passed ? '✓' : '·', 22, y);
          ctx.fillStyle = passed
            ? 'rgba(255,255,255,0.65)'
            : 'rgba(255,255,255,0.3)';
          ctx.fillText(c.label, 34, y);
        });
      } else if (stageNow === 3) {
        ctx.fillText('DOCUMENTING', 22, 52);
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.fillText(`${generatedDocs}/${legacyIds.length} files`, 22, 68);
        ctx.fillStyle = 'rgba(255,255,255,0.28)';
        ctx.fillText('inline docs · changelogs · summaries', 22, 81);
      }

      // ── HUD overlay (top-right) ───────────────────────────────────────────
      const legacyCount = scannedLegacyCount + (activeNode.legacy ? 1 : 0);
      const cleanCount = scan.scanned.size + 1 - legacyCount;
      drawHud(
        w,
        activeNode,
        legacyCount,
        cleanCount,
        nodes.length,
        stageNow,
        ms,
        generatedDocs
      );
    };

    const tick = (ms: number) => {
      const { w, h } = size;
      const ccx = w / 2;
      const ccy = h / 2;

      const spawnProbesFor = (idx: number) => {
        for (const [si, ti] of EDGE_PAIRS) {
          if (si === idx) probes.push({ from: si, to: ti, bornMs: ms });
          else if (ti === idx) probes.push({ from: ti, to: si, bornMs: ms });
        }
      };

      // ── Stage entry — initialize per-stage state on transition ────────────
      const stageReq = stageRef.current;
      if (stageReq !== stageNow) {
        stageNow = stageReq;
        // Clear transient overlays so a new stage starts cleanly
        probes.length = 0;
        if (stageReq === 0) {
          // ANALYZE — full reset
          scan.idx = 0;
          scan.lastMs = ms - DWELL_MS; // fire first advance immediately
          scan.scanned.clear();
          scannedLegacyCount = 0;
          trail.length = 0;
          detections.length = 0;
          transforms.length = 0;
          verifyChecks.length = 0;
          verifyCheckSet.clear();
          docGlyphs.length = 0;
          verifyStart = -1;
          for (const n of nodes) n.fixed = false;
          lastEnterMs = ms;
        } else if (stageReq === 1) {
          // REFACTOR — cursor jumps to first legacy node, transform begins
          transforms.length = 0;
          refactorIdx = 0;
          refactorLastMs = ms - REFACTOR_STEP_MS + REFACTOR_BUFFER_MS;
          if (legacyIds.length > 0) {
            scan.idx = legacyIds[0];
            transforms.push({ id: legacyIds[0], bornMs: ms });
            spawnProbesFor(scan.idx);
          }
          lastEnterMs = ms;
        } else if (stageReq === 2) {
          // VERIFY — wave kicks off, mark every legacy node as fixed
          verifyStart = ms;
          verifyChecks.length = 0;
          verifyCheckSet.clear();
          for (const id of legacyIds) nodes[id].fixed = true;
        } else if (stageReq === 3) {
          // DOCUMENT — stagger doc glyphs above every (now-fixed) legacy node
          docGlyphs.length = 0;
          legacyIds.forEach((id, i) => {
            docGlyphs.push({ id, bornMs: ms + i * 320 });
          });
        }
      }

      // ── ANALYZE: scan walks every node, logs legacy detections ────────────
      if (stageNow === 0 && ms - scan.lastMs > DWELL_MS) {
        scan.lastMs = ms;
        if (!scan.scanned.has(scan.idx)) {
          scan.scanned.add(scan.idx);
          if (nodes[scan.idx].legacy) scannedLegacyCount++;
        }

        trail.push(scan.idx);
        if (trail.length > TRAIL_MAX) trail.shift();

        scan.idx = (scan.idx + 1) % nodes.length;
        if (scan.idx === 0) {
          scan.scanned.clear();
          scannedLegacyCount = 0;
          trail.length = 0;
          detections.length = 0;
        }

        spawnProbesFor(scan.idx);

        const newActive = nodes[scan.idx];
        if (newActive.legacy && !detections.some(d => d.id === scan.idx)) {
          detections.push({ id: scan.idx, bornMs: ms });
          if (detections.length > DETECT_MAX) detections.shift();
        }
        lastEnterMs = ms;
      }

      // ── REFACTOR: step through legacy nodes, mark each fixed ─────────────
      if (
        stageNow === 1 &&
        ms - refactorLastMs > REFACTOR_STEP_MS &&
        refactorIdx < legacyIds.length
      ) {
        // Finalize the node we were transforming
        nodes[legacyIds[refactorIdx]].fixed = true;
        refactorIdx++;
        refactorLastMs = ms;
        if (refactorIdx < legacyIds.length) {
          scan.idx = legacyIds[refactorIdx];
          transforms.push({ id: legacyIds[refactorIdx], bornMs: ms });
          spawnProbesFor(scan.idx);
          lastEnterMs = ms;
        }
      }

      // ── VERIFY: wave sweeps L→R; nodes get checkmarks as it passes ───────
      if (stageNow === 2 && verifyStart > 0) {
        const t = (ms - verifyStart) / VERIFY_WAVE_DUR;
        const waveX = size.w * Math.min(1, t);
        for (const n of nodes) {
          if (n.x < waveX && !verifyCheckSet.has(n.id)) {
            verifyChecks.push({ id: n.id, bornMs: ms });
            verifyCheckSet.add(n.id);
          }
        }
      }

      // Age out expired probes
      for (let i = probes.length - 1; i >= 0; i--) {
        if (ms - probes[i].bornMs > PROBE_DUR) probes.splice(i, 1);
      }

      // Physics
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
          const f = Math.min(2800 / (d * d), 8);
          const fx = (dx / d) * f;
          const fy = (dy / d) * f;
          nodes[i].vx -= fx;
          nodes[i].vy -= fy;
          nodes[j].vx += fx;
          nodes[j].vy += fy;
        }
      }
      for (const [si, ti] of EDGE_PAIRS) {
        const a = nodes[si];
        const b = nodes[ti];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 0.01;
        const f = 0.018 * (d - 85);
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }
      for (const n of nodes) {
        n.vx += (ccx - n.x) * 0.002;
        n.vy += (ccy - n.y) * 0.002;
        n.vx *= 0.88;
        n.vy *= 0.88;
        n.x = Math.max(28, Math.min(w - 28, n.x + n.vx));
        n.y = Math.max(28, Math.min(h - 28, n.y + n.vy));
      }

      // Smooth cursor toward active node position
      const target = nodes[scan.idx];
      scan.cx += (target.x - scan.cx) * 0.18;
      scan.cy += (target.y - scan.cy) * 0.18;

      renderFrame(ms);
      raf = requestAnimationFrame(tick);
    };

    let running = false;
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    };

    if (reduceMotion) {
      // Static frame, no animation loop
      scan.cx = nodes[scan.idx].x;
      scan.cy = nodes[scan.idx].y;
      renderFrame(performance.now());
    } else {
      start();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let io: IntersectionObserver | null = null;
    if (!reduceMotion && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) start();
          else stop();
        },
        { threshold: 0.05 }
      );
      io.observe(canvas);
    }

    return () => {
      stop();
      ro.disconnect();
      io?.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="block w-full h-full" />;
};

// ─── Isometric pipeline diagram ───────────────────────────────────────────────
//
// Exploded vertical stack. Each layer has its OWN visual treatment so the eye
// reads them as distinct stages rather than nested plates:
//   01 ANALYZE   — foundation plate, rim notches + crosshair grid (the codebase)
//   02 REFACTOR  — medium plate w/ centered "transform chip" + registration lines
//   03 VERIFY    — NO plate; a hovering cluster of mini cubes (each = one check)
//   04 DOCUMENT  — small bright plate w/ a sparkle glyph (auto-generated output)
//
// Active layer cycles every CYCLE_MS; the active layer brightens & lifts.

const ISO_LAYERS: IsoLayer[] = [
  {
    id: 'analyze',
    step: '01',
    label: 'ANALYZE',
    desc: 'Map every import edge. Surface legacy patterns across the full dependency tree.',
    summaryLabel: 'Deep Analysis',
    summaryDesc: 'Legacy pattern detection across the full dependency graph',
  },
  {
    id: 'refactor',
    step: '02',
    label: 'REFACTOR',
    desc: 'Apply deterministic transforms. Behavior is mathematically preserved.',
    summaryLabel: 'Refactoring Engine',
    summaryDesc: 'Deterministic, behavior-preserving code transforms',
  },
  {
    id: 'verify',
    step: '03',
    label: 'VERIFY',
    desc: 'Run syntax checks, import validation, and your full test suite.',
    summaryLabel: 'Provable Verification',
    summaryDesc: 'Syntax, imports, and test suite: all must pass',
  },
  {
    id: 'document',
    step: '04',
    label: 'DOCUMENT',
    desc: 'Auto-generate inline docs, changelogs, and function-level summaries.',
    summaryLabel: 'Documentation Engine',
    summaryDesc: 'Auto-generated inline docs and changelogs',
  },
];

// ── Stage geometry ───────────────────────────────────────────────────────────

const ISO_ROT = 55;
const ISO_SIN = Math.sin((ISO_ROT * Math.PI) / 180); // ≈ 0.819
const ISO_TRANSFORM = `rotateX(${ISO_ROT}deg) rotateZ(-45deg)`;
const STAGE_W = 480;
const STAGE_H = 420;
const ISO_PARENT_SIZE = 240;
const ISO_PARENT_LEFT = 70;
const ISO_PARENT_TOP = 140;
const Z_GAP = 80;

const LAYER_Z = [0, Z_GAP, Z_GAP * 2, Z_GAP * 3];
const PLATE_T = [28, 24, 0, 22]; // verify has no plate
const LABEL_LEFT = ISO_PARENT_LEFT + ISO_PARENT_SIZE + 36;

// ── Slab primitive (5-face isometric plate) ──────────────────────────────────

interface SlabProps {
  size: number;
  thickness: number;
  topFill: number;
  sideFill: number;
  borderA: number;
  rimA: number;
  glow: number;
  children?: React.ReactNode;
}

const Slab: React.FC<SlabProps> = ({
  size,
  thickness: T,
  topFill,
  sideFill,
  borderA,
  rimA,
  glow,
  children,
}) => {
  const offset = (ISO_PARENT_SIZE - size) / 2;
  const wall: React.CSSProperties = {
    position: 'absolute',
    background: `rgba(255,255,255,${sideFill})`,
    transition: 'background 0.6s ease',
    backfaceVisibility: 'hidden',
  };
  return (
    <div
      style={{
        position: 'absolute',
        left: offset,
        top: offset,
        width: size,
        height: size,
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `rgba(255,255,255,${topFill})`,
          border: `1px solid rgba(255,255,255,${borderA})`,
          boxShadow: `0 18px 40px -12px rgba(255,255,255,${glow}), 0 0 60px -10px rgba(255,255,255,${glow * 0.5})`,
          transform: `translateZ(${T}px)`,
          transformStyle: 'preserve-3d',
          transition:
            'background 0.6s ease, border-color 0.6s ease, box-shadow 0.6s ease',
        }}
      >
        {children}
      </div>
      <div
        style={{
          ...wall,
          top: 0,
          left: 0,
          width: size,
          height: T,
          borderLeft: `1px solid rgba(255,255,255,${rimA})`,
          borderRight: `1px solid rgba(255,255,255,${rimA})`,
          transformOrigin: '0 0',
          transform: 'rotateX(90deg)',
        }}
      />
      <div
        style={{
          ...wall,
          top: size - T,
          left: 0,
          width: size,
          height: T,
          borderLeft: `1px solid rgba(255,255,255,${rimA})`,
          borderRight: `1px solid rgba(255,255,255,${rimA})`,
          transformOrigin: '0 100%',
          transform: 'rotateX(-90deg)',
        }}
      />
      <div
        style={{
          ...wall,
          top: 0,
          left: 0,
          width: T,
          height: size,
          borderTop: `1px solid rgba(255,255,255,${rimA})`,
          borderBottom: `1px solid rgba(255,255,255,${rimA})`,
          transformOrigin: '0 0',
          transform: 'rotateY(-90deg)',
        }}
      />
      <div
        style={{
          ...wall,
          top: 0,
          left: size - T,
          width: T,
          height: size,
          borderTop: `1px solid rgba(255,255,255,${rimA})`,
          borderBottom: `1px solid rgba(255,255,255,${rimA})`,
          transformOrigin: '100% 0',
          transform: 'rotateY(90deg)',
        }}
      />
    </div>
  );
};

// ── Per-layer visuals ────────────────────────────────────────────────────────

// 01 ANALYZE — foundation plate, rim notches + crosshair grid
const AnalyzePlate: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const NOTCHES = 10;
  const ticks = Array.from({ length: NOTCHES }, (_, i) => (i + 0.5) / NOTCHES);
  const tickBg = `rgba(255,255,255,${isActive ? 0.35 : 0.22})`;
  return (
    <Slab
      size={240}
      thickness={PLATE_T[0]}
      topFill={isActive ? 0.09 : 0.05}
      sideFill={isActive ? 0.18 : 0.11}
      borderA={isActive ? 0.32 : 0.18}
      rimA={isActive ? 0.22 : 0.14}
      glow={isActive ? 0.1 : 0.03}
    >
      {/* Centered crosshair lines */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 12,
          right: 12,
          height: 1,
          background: `rgba(255,255,255,${isActive ? 0.14 : 0.07})`,
          transition: 'background 0.6s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 12,
          bottom: 12,
          width: 1,
          background: `rgba(255,255,255,${isActive ? 0.14 : 0.07})`,
          transition: 'background 0.6s ease',
        }}
      />
      {/* Rim notches on top face — like CONNECTORS port teeth */}
      {ticks.map((t, i) => (
        <React.Fragment key={i}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: `${t * 100}%`,
              width: 1,
              height: 6,
              background: tickBg,
              transition: 'background 0.6s ease',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: `${t * 100}%`,
              width: 1,
              height: 6,
              background: tickBg,
              transition: 'background 0.6s ease',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: `${t * 100}%`,
              width: 6,
              height: 1,
              background: tickBg,
              transition: 'background 0.6s ease',
            }}
          />
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: `${t * 100}%`,
              width: 6,
              height: 1,
              background: tickBg,
              transition: 'background 0.6s ease',
            }}
          />
        </React.Fragment>
      ))}
    </Slab>
  );
};

// 02 REFACTOR — medium plate w/ centered "transform chip" + crosshairs
const RefactorPlate: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const size = 174;
  const T = PLATE_T[1];
  const CHIP = 42;
  const CHIP_T = 14;
  return (
    <Slab
      size={size}
      thickness={T}
      topFill={isActive ? 0.1 : 0.055}
      sideFill={isActive ? 0.2 : 0.12}
      borderA={isActive ? 0.34 : 0.2}
      rimA={isActive ? 0.22 : 0.15}
      glow={isActive ? 0.12 : 0.04}
    >
      {/* Registration crosshairs */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 8,
          right: 8,
          height: 1,
          background: `rgba(255,255,255,${isActive ? 0.18 : 0.09})`,
          transition: 'background 0.6s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 8,
          bottom: 8,
          width: 1,
          background: `rgba(255,255,255,${isActive ? 0.18 : 0.09})`,
          transition: 'background 0.6s ease',
        }}
      />
      {/* Transform chip — small isometric cube sitting on the plate */}
      <div
        style={{
          position: 'absolute',
          left: (size - CHIP) / 2,
          top: (size - CHIP) / 2,
          width: CHIP,
          height: CHIP,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `rgba(255,255,255,${isActive ? 0.88 : 0.55})`,
            border: `1px solid rgba(255,255,255,${isActive ? 0.7 : 0.45})`,
            boxShadow: `0 0 16px rgba(255,255,255,${isActive ? 0.24 : 0.06})`,
            transform: `translateZ(${CHIP_T}px)`,
            transition:
              'background 0.6s ease, border-color 0.6s ease, box-shadow 0.6s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: CHIP,
            height: CHIP_T,
            background: `rgba(255,255,255,${isActive ? 0.5 : 0.32})`,
            transformOrigin: '0 0',
            transform: 'rotateX(90deg)',
            transition: 'background 0.6s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: CHIP_T,
            height: CHIP,
            background: `rgba(255,255,255,${isActive ? 0.42 : 0.27})`,
            transformOrigin: '0 0',
            transform: 'rotateY(-90deg)',
            transition: 'background 0.6s ease',
          }}
        />
      </div>
    </Slab>
  );
};

// 03 VERIFY — no plate; hovering cluster of mini cubes (one per check)
const VerifyCluster: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const c = ISO_PARENT_SIZE / 2;
  const cubes = [
    { x: -32, y: -16, lift: 10, s: 18 },
    { x: -14, y: -22, lift: 20, s: 16 },
    { x: -22, y: 4, lift: 4, s: 18 },
    { x: 20, y: -18, lift: 14, s: 18 },
    { x: 38, y: 2, lift: 6, s: 16 },
    { x: 18, y: 12, lift: 18, s: 18 },
  ];
  return (
    <>
      {cubes.map((cube, i) => {
        const top = `rgba(255,255,255,${isActive ? 0.88 : 0.55})`;
        const wN = `rgba(255,255,255,${isActive ? 0.5 : 0.32})`;
        const wW = `rgba(255,255,255,${isActive ? 0.42 : 0.26})`;
        const ch = cube.s * 0.6;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: c + cube.x - cube.s / 2,
              top: c + cube.y - cube.s / 2,
              width: cube.s,
              height: cube.s,
              transformStyle: 'preserve-3d',
              transform: `translateZ(${cube.lift}px)`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: top,
                border: `1px solid rgba(255,255,255,${isActive ? 0.65 : 0.4})`,
                transform: `translateZ(${ch}px)`,
                transition: 'background 0.6s ease, border-color 0.6s ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: cube.s,
                height: ch,
                background: wN,
                transformOrigin: '0 0',
                transform: 'rotateX(90deg)',
                transition: 'background 0.6s ease',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: ch,
                height: cube.s,
                background: wW,
                transformOrigin: '0 0',
                transform: 'rotateY(-90deg)',
                transition: 'background 0.6s ease',
              }}
            />
          </div>
        );
      })}
    </>
  );
};

// 04 DOCUMENT — small bright plate with sparkle glyph
const DocumentPlate: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <Slab
    size={102}
    thickness={PLATE_T[3]}
    topFill={isActive ? 0.24 : 0.15}
    sideFill={isActive ? 0.34 : 0.22}
    borderA={isActive ? 0.6 : 0.4}
    rimA={isActive ? 0.42 : 0.28}
    glow={isActive ? 0.2 : 0.08}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          transform: 'rotateZ(45deg) rotateX(-55deg)',
          color: `rgba(255,255,255,${isActive ? 0.95 : 0.6})`,
          transition: 'color 0.6s ease',
        }}
      >
        <Sparkles size={22} strokeWidth={1.4} />
      </div>
    </div>
  </Slab>
);

// ── Pipeline component ───────────────────────────────────────────────────────

interface IsoPipelineProps {
  stage: number;
  onStageChange?: (next: number) => void;
}

const IsoPipeline: React.FC<IsoPipelineProps> = ({ stage, onStageChange }) => {
  const activeIdx = stage;
  const activeLayer = ISO_LAYERS[activeIdx];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center select-none gap-4 pt-12 pb-12">
      <div className="relative" style={{ width: STAGE_W, height: STAGE_H }}>
        <div
          style={{
            position: 'absolute',
            left: ISO_PARENT_LEFT,
            top: ISO_PARENT_TOP,
            width: ISO_PARENT_SIZE,
            height: ISO_PARENT_SIZE,
            transformStyle: 'preserve-3d',
            transform: ISO_TRANSFORM,
          }}
        >
          {ISO_LAYERS.map((layer, i) => {
            const isActive = i === activeIdx;
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{
                  delay: i * 0.18,
                  duration: 0.75,
                  ease: 'easeOut',
                }}
                viewport={{ once: true }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transformStyle: 'preserve-3d',
                  transform: `translateZ(${LAYER_Z[i]}px)`,
                }}
              >
                {layer.id === 'analyze' && <AnalyzePlate isActive={isActive} />}
                {layer.id === 'refactor' && (
                  <RefactorPlate isActive={isActive} />
                )}
                {layer.id === 'verify' && <VerifyCluster isActive={isActive} />}
                {layer.id === 'document' && (
                  <DocumentPlate isActive={isActive} />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Side labels — anchored to each layer's projected screen-y */}
        <div className="absolute inset-0">
          {ISO_LAYERS.map((layer, i) => {
            const cy =
              ISO_PARENT_TOP + ISO_PARENT_SIZE / 2 - LAYER_Z[i] * ISO_SIN;
            const isActive = i === activeIdx;
            return (
              <button
                type="button"
                key={layer.label}
                onClick={() => onStageChange?.(i)}
                style={{
                  position: 'absolute',
                  left: LABEL_LEFT,
                  top: cy,
                  transform: 'translateY(-50%)',
                  opacity: isActive ? 1 : 0.55,
                  transition: 'opacity 0.6s ease, color 0.6s ease',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    fontSize: '9px',
                    fontFamily: '"JetBrains Mono", monospace',
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: '0.24em',
                    marginBottom: '4px',
                  }}
                >
                  {layer.step}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    fontFamily: '"JetBrains Mono", monospace',
                    fontWeight: isActive ? 600 : 500,
                    color: `rgba(255,255,255,${isActive ? 1 : 0.7})`,
                    letterSpacing: '0.2em',
                    transition: 'color 0.6s ease',
                  }}
                >
                  {layer.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active step description — fades in/out with each transition */}
      <div className="h-9 flex items-center justify-center px-6">
        <motion.p
          key={activeIdx}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.38 }}
          className="text-[11px] text-neutral-500 font-space text-center leading-relaxed max-w-[260px]"
        >
          {activeLayer.desc}
        </motion.p>
      </div>

      {/* Step progress dots */}
      <div className="flex gap-2 absolute bottom-6">
        {ISO_LAYERS.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === activeIdx ? 18 : 4,
              height: 2,
              background: `rgba(255,255,255,${i === activeIdx ? 0.5 : 0.1})`,
              borderRadius: 1,
              transition: 'width 0.35s ease, background 0.35s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────

const STAGE_DURATION_MS = 5200;

const RefactoringWorkflowSection: React.FC = () => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStage(s => (s + 1) % ISO_LAYERS.length);
    }, STAGE_DURATION_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="dark">
      <section
        id="workflows"
        className="w-full scroll-mt-24 py-24 relative overflow-hidden min-h-screen bg-black antialiased sm:scroll-mt-28"
      >
        <FlickeringGrid
          className="absolute inset-0 z-0 w-full h-full"
          squareSize={3}
          gridGap={8}
          flickerChance={0.07}
          color="rgb(255, 255, 255)"
          maxOpacity={0.02}
        />

        <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-4 max-w-7xl">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-14"
          >
            <div className="lg:col-span-7">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white font-space leading-[1.1]">
                Everything you need to refactor production code safely.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pl-10 flex flex-col gap-5">
              <p className="text-base md:text-lg text-neutral-500 font-space leading-loose tracking-wide">
                Deterministic, behavior-preserving refactoring with
                verification, rollback, and documentation built in.
              </p>
              <a
                href="#demo"
                className="inline-flex items-center gap-2 text-neutral-300 hover:text-white transition-colors font-space text-sm tracking-wide"
              >
                Explore the platform <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* Unified workflow card — pipeline rail + dependency graph */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.012] overflow-hidden relative mb-14"
          >
            <span className="absolute top-6 left-6 z-20 text-[10px] font-mono text-neutral-700 tracking-[0.2em]">
              WORKFLOW
            </span>

            <div className="flex flex-col lg:flex-row lg:h-[520px]">
              <div className="relative h-[440px] lg:h-full lg:w-[460px] lg:flex-shrink-0 border-b lg:border-b-0 lg:border-r border-white/[0.05]">
                <IsoPipeline stage={stage} onStageChange={setStage} />
              </div>
              <div className="relative flex-1 h-[520px] lg:h-full min-w-0">
                <ForceGraph stage={stage} />
              </div>
            </div>
          </motion.div>

          {/* Step summary bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="border-t border-white/[0.05] pt-8 grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {ISO_LAYERS.map((item, i) => {
              const isActive = i === stage;
              return (
                <button
                  type="button"
                  key={item.step}
                  onClick={() => setStage(i)}
                  className="flex flex-col gap-1.5 text-left transition-opacity"
                  style={{ opacity: isActive ? 1 : 0.55 }}
                >
                  <span
                    className="text-[9px] font-mono tracking-widest transition-colors"
                    style={{
                      color: isActive
                        ? 'rgba(255,255,255,0.8)'
                        : 'rgba(115,115,115,1)',
                    }}
                  >
                    {item.step}
                  </span>
                  <span
                    className="text-sm font-medium font-space transition-colors"
                    style={{
                      color: isActive
                        ? 'rgba(255,255,255,1)'
                        : 'rgba(212,212,212,1)',
                    }}
                  >
                    {item.summaryLabel}
                  </span>
                  <span className="text-xs text-neutral-600 font-space leading-relaxed">
                    {item.summaryDesc}
                  </span>
                  <span
                    className="mt-1 h-px transition-all"
                    style={{
                      width: isActive ? '36px' : '12px',
                      background: isActive
                        ? 'rgba(255,255,255,0.55)'
                        : 'rgba(255,255,255,0.12)',
                    }}
                  />
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RefactoringWorkflowSection;
