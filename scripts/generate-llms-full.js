/*
 * Generates public/llms-full.txt — a single Markdown document
 * that concatenates the highest-signal site content for LLM
 * ingestion. Runs at prebuild, mirrors generate-sitemap.js.
 *
 * Source pages (parsed via regex — no ts-node):
 *   - src/data/posts.ts            → every blog post (title, summary, body)
 *   - src/components/FAQSection.tsx → FAQ Q/A pairs
 *
 * Static content (product overview, safety constraints) is baked
 * into this script so the LLM doc stays curated rather than scraped.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

/* ─── Static, hand-curated copy ───────────────────────────────── */

const OVERVIEW = `# Refactron

> Deterministic, behavior-preserving refactoring engine for legacy code. No LLM in the loop. Every change is verified before it touches disk. Runs entirely locally.

Refactron is a refactoring tool for production codebases. It analyzes architectural debt (circular imports, duplicated code, deprecated APIs, missing type hints, callback-based async), applies deterministic rule-based transforms, and runs verification gates (syntax / imports / tests / invariants) before any file is rewritten. Rollback is a single command. Same input, same output — that's the moat.

It is **not** an LLM-based code generator. The engine is rule-based. Refactron does not send code to any external service by default.

- Languages: Python, TypeScript, JavaScript (today); Go, Rust, Java on the roadmap.
- Install: \`pip install refactron\` (Python) or \`npm install -g refactron\` (Node).
- Locality: runs on your machine; telemetry disabled by default.
- Founder: Om Sherikar (Bengaluru, India). Built solo.
- Distribution: 3,500+ PyPI downloads with no paid marketing.
- Recognition: India Ascends — Lightspeed; F6S founder grant.

## How Refactron works (pipeline)

1. **Analyze.** Map every import edge. Surface legacy patterns across the full dependency tree without modifying any files.
2. **Refactor.** Apply deterministic transforms. Behavior is mathematically preserved across each transform.
3. **Verify.** Run syntax checks, import validation, and the existing test suite. If any gate fails, the original file is untouched.
4. **Document.** Auto-generate inline docs, changelogs, and function-level summaries after every verified refactor.

## Safety constraints (the five guarantees)

1. **Read-only analysis by default.** Refactron scans and reports first. Nothing is written until you explicitly approve a change.
2. **Human-in-the-loop refactoring.** Every change requires explicit developer approval — like a PR review.
3. **Verification to preserve behavior.** Automated checks confirm functional equivalence: syntax, imports, tests, invariants.
4. **Small, incremental changes.** Refactor in scoped, reviewable steps. Never a one-shot rewrite.
5. **Rollback support.** Undo any changeset with a single command. No git required.

## How Refactron compares

| Capability                       | Refactron | Cursor | SonarQube | CodeAnt |
| -------------------------------- | --------- | ------ | --------- | ------- |
| Finds legacy code                | yes       | no     | no        | no      |
| Refactors it structurally        | yes       | no     | no        | no      |
| No LLM in the engine             | yes       | no     | yes       | no      |
| Verifies safety before write     | yes       | no     | no        | no      |
| Generates docs after refactor    | yes       | no     | no        | no      |
| Runs fully local                 | yes       | no     | no        | no      |

Cursor and CodeAnt lean on LLMs (non-deterministic). SonarQube analyzes but does not refactor. Refactron analyzes, refactors deterministically, and verifies before write.
`;

const ORIGIN_STORY = `## Origin

At a hackathon, Om Sherikar watched a team avoid an entire part of their codebase. Nobody wanted to risk breaking it. He couldn't find a tool that would actually go in, fix the legacy code, and prove nothing broke. So he built one.

That's the gap Refactron exists to close. The tools that existed could *find* legacy code or *generate* new code. None of them could actually *refactor* the old code and *prove* it was safe.
`;

/* ─── Parsers ─────────────────────────────────────────────────── */

function parseBlogPosts() {
  const file = fs.readFileSync(
    path.join(ROOT, 'src/data/posts.ts'),
    'utf-8'
  );

  // Slice from `blogPosts: BlogPost[] = [` to the closing `];`
  const startIdx = file.indexOf('export const blogPosts');
  const end = file.length;
  const region = file.slice(startIdx, end);

  // Match each post object using a coarse but reliable split:
  // each post starts with `{` after a comma or `[`, has slug/title/summary/body,
  // ends before the next post's leading `,\n  {`.
  // We use the proven approach: pull each field individually with regex.

  const slugRx = /slug:\s*['"]([^'"]+)['"]/g;
  const titleRx = /title:\s*["'](.+?)["'],/g;
  const summaryRx = /summary:\s*\n?\s*['"]([\s\S]*?)['"],\n/g;
  const bodyRx = /body:\s*`([\s\S]*?)`,?\n\s*(?:featured|}|\])/g;
  const publishedRx = /publishedAt:\s*['"]([^'"]+)['"]/g;

  const slugs = [...region.matchAll(slugRx)].map(m => m[1]);
  const titles = [...region.matchAll(titleRx)].map(m => m[1]);
  const summaries = [...region.matchAll(summaryRx)].map(m => m[1]);
  const bodies = [...region.matchAll(bodyRx)].map(m => m[1]);
  const dates = [...region.matchAll(publishedRx)].map(m => m[1]);

  const n = Math.min(
    slugs.length,
    titles.length,
    summaries.length,
    bodies.length,
    dates.length
  );

  const posts = [];
  for (let i = 0; i < n; i++) {
    posts.push({
      slug: slugs[i],
      title: titles[i].replace(/\\(.)/g, '$1'),
      summary: summaries[i].replace(/\\(.)/g, '$1').trim(),
      body: bodies[i].trim(),
      publishedAt: dates[i],
    });
  }
  return posts;
}

function parseFaqs() {
  const file = fs.readFileSync(
    path.join(ROOT, 'src/components/FAQSection.tsx'),
    'utf-8'
  );
  const region = file.slice(file.indexOf('const faqs'));
  const qRx = /question:\s*['"](.+?)['"],/g;
  const aRx = /answer:\s*\n?\s*['"]([\s\S]*?)['"],\n/g;
  const questions = [...region.matchAll(qRx)].map(m => m[1]);
  const answers = [...region.matchAll(aRx)].map(m => m[1]);
  const n = Math.min(questions.length, answers.length);
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push({
      question: questions[i].replace(/\\(.)/g, '$1'),
      answer: answers[i].replace(/\\(.)/g, '$1').trim(),
    });
  }
  return out;
}

/* ─── Assemble ────────────────────────────────────────────────── */

function generate() {
  const posts = parseBlogPosts();
  const faqs = parseFaqs();

  const sections = [];
  sections.push(OVERVIEW.trim());
  sections.push(ORIGIN_STORY.trim());

  // FAQ
  if (faqs.length) {
    const faqMd = ['## Frequently asked questions', ''];
    for (const f of faqs) {
      faqMd.push(`### ${f.question}`);
      faqMd.push('');
      faqMd.push(f.answer);
      faqMd.push('');
    }
    sections.push(faqMd.join('\n').trim());
  }

  // Blog posts
  if (posts.length) {
    const blogMd = ['## Blog — case studies and deep-dives', ''];
    for (const p of posts) {
      blogMd.push(`### ${p.title}`);
      blogMd.push('');
      blogMd.push(`*Published ${p.publishedAt} — https://refactron.dev/blog/${p.slug}*`);
      blogMd.push('');
      blogMd.push(`> ${p.summary}`);
      blogMd.push('');
      blogMd.push(p.body);
      blogMd.push('');
      blogMd.push('---');
      blogMd.push('');
    }
    sections.push(blogMd.join('\n').trim());
  }

  const out = sections.join('\n\n\n') + '\n';
  const outPath = path.join(ROOT, 'public/llms-full.txt');
  fs.writeFileSync(outPath, out);

  console.log(
    `✓ llms-full.txt — ${posts.length} blog posts + ${faqs.length} FAQs → public/llms-full.txt (${out.length.toLocaleString()} bytes)`
  );
}

generate();
