import React, { useEffect, useRef } from 'react';

type NumericAsciiBackdropProps = {
  /** Extra classes on the positioning wrapper */
  className?: string;
};

/**
 * Numeric “ASCII” field: digits get brighter along two simple reaching shapes
 * (hands toward center), like an approachable start — Refactron snowflake in the gap.
 */
const NumericAsciiBackdrop: React.FC<NumericAsciiBackdropProps> = ({
  className = '',
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let ro: ResizeObserver | null = null;

    const paint = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 1 || h < 1) return;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const step = w < 480 ? 9 : 11;
      const fontSize = w < 480 ? 8 : 10;
      ctx.textBaseline = 'top';
      ctx.textAlign = 'left';
      ctx.font = `${fontSize}px ui-monospace, "JetBrains Mono", monospace`;

      const gauss2 = (
        x: number,
        y: number,
        cx: number,
        cy: number,
        sx: number,
        sy: number
      ) => {
        const nx = (x - cx) / sx;
        const ny = (y - cy) / sy;
        return Math.exp(-(nx * nx + ny * ny));
      };

      /** Soft stroke from wrist (x0,y0) toward fingertips (x1,y1); peaks near tips. */
      const reachingArm = (
        x: number,
        y: number,
        x0: number,
        y0: number,
        x1: number,
        y1: number,
        halfWidth: number
      ) => {
        const vx = x1 - x0;
        const vy = y1 - y0;
        const len = Math.hypot(vx, vy) || 1;
        const ux = vx / len;
        const uy = vy / len;
        const px = x - x0;
        const py = y - y0;
        const along = px * ux + py * uy;
        const clamped = Math.max(0, Math.min(len, along));
        const perp = Math.abs(px * -uy + py * ux);
        const radial = Math.exp(-Math.pow(perp / halfWidth, 2));
        const t = clamped / len;
        const body = 0.22 + 0.78 * Math.pow(Math.min(1, t / 0.98), 0.42);
        const fingertip = Math.exp(-Math.pow((t - 0.9) / 0.17, 2));
        const palm = Math.exp(-Math.pow((t - 0.52) / 0.3, 2));
        return radial * body * (0.52 + palm * 0.95 + fingertip * 1.35);
      };

      /** Three tiny bumps at the pad — reads as simplified fingers. */
      const fingerPads = (
        x: number,
        y: number,
        x0: number,
        y0: number,
        x1: number,
        y1: number,
        outwardSign: number
      ) => {
        const vx = x1 - x0;
        const vy = y1 - y0;
        const len = Math.hypot(vx, vy) || 1;
        const ux = vx / len;
        const uy = vy / len;
        const tipX = x0 + ux * len * 0.9;
        const tipY = y0 + uy * len * 0.9;
        const ox = -uy * outwardSign;
        const oy = ux * outwardSign;
        const spread = w * 0.019;
        let s = 0;
        for (let i = -1; i <= 1; i++) {
          s += gauss2(
            x,
            y,
            tipX + ox * i * spread,
            tipY + oy * i * spread,
            w * 0.028,
            h * 0.032
          );
        }
        return Math.min(1, s * 1.15);
      };

      const cx = w * 0.5;
      const cy = h * 0.42;
      const hw = w * (w < 480 ? 0.048 : 0.055);

      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const leftArmCell = reachingArm(
            x,
            y,
            w * 0.03,
            h * 0.74,
            cx - w * 0.09,
            cy + h * 0.05,
            hw
          );
          const leftPadsCell = fingerPads(
            x,
            y,
            w * 0.03,
            h * 0.74,
            cx - w * 0.09,
            cy + h * 0.05,
            1
          );
          const rightArmCell = reachingArm(
            x,
            y,
            w * 0.97,
            h * 0.74,
            cx + w * 0.09,
            cy + h * 0.05,
            hw
          );
          const rightPadsCell = fingerPads(
            x,
            y,
            w * 0.97,
            h * 0.74,
            cx + w * 0.09,
            cy + h * 0.05,
            -1
          );

          const lm = Math.min(1, leftArmCell + leftPadsCell * 0.95);
          const rm = Math.min(1, rightArmCell + rightPadsCell * 0.95);
          const clear = gauss2(x, y, cx, cy, w * 0.13, h * 0.15);

          let mask = Math.max(lm, rm) * (1 - clear * 0.88) + 0.045;

          const n =
            (Math.floor(x * 0.11 + y * 0.13 + Math.sin(x * 0.02) * 3) % 10) +
            10;
          const digit = String(n % 10);
          const dVal = parseInt(digit, 10);
          const alpha = Math.min(
            0.48,
            mask * 0.32 +
              (dVal / 9) * 0.1 +
              (lm + rm) * 0.06 * (1 - clear * 0.75)
          );

          ctx.fillStyle = `rgba(163, 172, 185, ${alpha})`;
          ctx.fillText(digit, x, y);
        }
      }

      const r = Math.min(w, h) * (w < 480 ? 0.038 : 0.045);

      ctx.strokeStyle = 'rgba(228, 231, 235, 0.88)';
      ctx.lineWidth = Math.max(1.25, fontSize * 0.14);
      ctx.lineCap = 'round';
      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI) / 3 - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + r * Math.cos(ang), cy + r * Math.sin(ang));
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(228, 231, 235, 0.35)';
      ctx.beginPath();
      ctx.arc(cx, cy, r * 0.14, 0, Math.PI * 2);
      ctx.fill();
    };

    paint();
    ro = new ResizeObserver(() => paint());
    ro.observe(wrap);

    return () => {
      ro?.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`absolute inset-0 z-[1] pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
};

export default NumericAsciiBackdrop;
