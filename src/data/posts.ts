export type ContentSection =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'code'; text: string }
  | { type: 'list'; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  industry: string;
  accentColor: string;
  publishedAt: string;
  author: string;
  tags: string[];
  views: number;
  clicks: number;
  summary: string;
  body: string;
  featured?: boolean;
};

/**
 * Parses a raw body string into ContentSection[].
 *
 * Rules (applied in order per block):
 *   ## Text          → heading
 *   ```...```        → code block (blank lines inside preserved)
 *   - item lines     → list (all non-empty lines must start with "- ")
 *   anything else    → paragraph
 *
 * Blocks are separated by one or more blank lines outside code fences.
 */
export function parseBody(body: string): ContentSection[] {
  const sections: ContentSection[] = [];
  const lines = body.split('\n');
  let insideCode = false;
  let codeLines: string[] = [];
  let textBuffer: string[] = [];

  const flushText = () => {
    if (textBuffer.length === 0) return;
    const raw = textBuffer.join('\n').trim();
    textBuffer = [];
    if (!raw) return;

    // Split on blank lines to get individual blocks
    const blocks = raw.split(/\n[ \t]*\n/);
    for (const block of blocks) {
      const trimmed = block.trim();
      if (!trimmed) continue;

      if (trimmed.startsWith('## ')) {
        sections.push({ type: 'heading', text: trimmed.slice(3).trim() });
      } else {
        const blockLines = trimmed.split('\n');
        const isList = blockLines
          .filter(l => l.trim())
          .every(l => l.trimStart().startsWith('- '));

        if (isList) {
          sections.push({
            type: 'list',
            items: blockLines
              .filter(l => l.trim())
              .map(l => l.trimStart().slice(2).trim()),
          });
        } else {
          sections.push({ type: 'paragraph', text: trimmed });
        }
      }
    }
  };

  for (const line of lines) {
    if (line.trimStart().startsWith('```')) {
      if (!insideCode) {
        flushText();
        insideCode = true;
        codeLines = [];
      } else {
        sections.push({ type: 'code', text: codeLines.join('\n') });
        insideCode = false;
        codeLines = [];
      }
    } else if (insideCode) {
      codeLines.push(line);
    } else {
      textBuffer.push(line);
    }
  }

  flushText();
  return sections;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'i-ran-refactron-on-djangos-codebase',
    title: "I Ran Refactron on Django's Codebase. Here's What It Found.",
    featured: true,
    industry: 'Case Study',
    accentColor: '#DA7756',
    publishedAt: 'March 31, 2026',
    author: 'Om Sherikar',
    tags: ['Django', 'Case Study', 'Python', 'Code Analysis'],
    views: 3847,
    clicks: 142,
    summary:
      "300,000+ lines of Python, 18 years of contributors, used in production by millions. If Refactron is useful on real-world Python code, it should have something to say about Django. Here's what happened.",
    body: `One of the best ways to understand what a code analysis tool actually does is to point it at a codebase you didn't write. No bias, no familiarity, no tendency to skip over the parts you know are messy.

Django is the obvious choice. 300,000+ lines of Python, maintained by hundreds of contributors over nearly two decades, used in production by millions of applications. If Refactron is useful on real-world Python code, it should have something to say about Django.

Here's what happened.

## Setup

\`\`\`
git clone https://github.com/django/django
cd django
pip install refactron
refactron analyze .
\`\`\`

Analysis runs locally. No code leaves the machine. Took about 40 seconds on a standard MacBook Pro.

## What it found

Django is a well-maintained, mature codebase — so the expectation going in was that the obvious stuff would already be handled. That held up. No hardcoded secrets, no SQL injection patterns, no clear security issues in the parts of the codebase that matter most.

What Refactron did surface was structural complexity — the kind that accumulates in any codebase that's been evolving for 18 years.

Complexity hotspots. Several functions across the ORM and template engine came back with high cyclomatic complexity scores. These aren't bugs. They're functions that have grown organically to handle a large number of edge cases, and they're hard to read as a result. Django's maintainers know about most of them — they're documented in comments. But seeing them flagged with specific line numbers and complexity scores makes the scope concrete.

Long parameter lists. A handful of view-related functions have accumulated parameters over multiple release cycles. Again, not broken — just increasingly difficult to call correctly without referring to the docs. The kind of thing that's fine when one person owns the code and becomes a maintenance burden as the team grows.

Dead code candidates. A small number of internal utilities that appear unreferenced within the codebase. Some of these are intentionally public API — tools or hooks that external projects depend on — which is exactly why Refactron surfaces them as candidates rather than applying automatic fixes. Context matters. The tool flags, you decide.

## What it didn't do

It didn't try to rewrite Django's ORM. It didn't suggest architectural changes it couldn't verify. It didn't produce a hundred false positives because it misunderstood a pattern.

The autofix step — I ran it with --dry-run first, which shows proposed changes without applying them. The suggestions it was confident enough to propose were narrow: unused imports in a few utility modules, a small number of variable naming inconsistencies in non-public code.

\`\`\`
refactron autofix . --verify --dry-run
\`\`\`

For the complexity issues it found, it flagged them and stopped. Complex functions that are deeply intertwined with behavior across the codebase are exactly the category where automated fixes without full context are dangerous. Refactron knows this. It surfaces the information and leaves the decision to you.

## The honest takeaway

Django is not the right target for aggressive automated refactoring and Refactron didn't pretend otherwise. A codebase this mature, this widely depended on, with this many external consumers needs careful human judgment on anything structural.

What the analysis is useful for is orientation. If you're a new contributor trying to understand where the complexity lives, or a team using Django's patterns as a reference for your own codebase, the output gives you a map. Here's where the complexity is concentrated. Here's what's worth reading carefully before you touch it.

For most teams Refactron is aimed at — companies with 2-5 year old Python codebases that have accumulated debt without Django's level of test coverage and contributor scrutiny — the tool has more to say and more it can safely do. But testing against Django was the right first move. If it handles a codebase this large and this well-known without producing noise, it'll handle yours.

## Try it on your own codebase

\`\`\`
pip install refactron
refactron analyze .
\`\`\`

Read-only. Nothing changes. See what's there.

Next in this series: Flask and Requests — smaller codebases, different patterns, different findings.`,
  },
  {
    slug: 'refactron-vs-cursor-vs-codeant',
    title:
      'Refactron vs Cursor vs CodeAnt: Why "AI Refactoring" Means Three Different Things',
    featured: true,
    industry: 'Industry Analysis',
    accentColor: '#4A7B6F',
    publishedAt: 'March 31, 2026',
    author: 'Om Sherikar',
    tags: ['AI Tools', 'Refactoring', 'Comparison', 'Product'],
    views: 2193,
    clicks: 87,
    summary:
      'Three tools all claim to do "AI refactoring." They are solving completely different problems. Here is how to tell them apart and which one actually fits your use case.',
    body: `If you search for "AI refactoring tool" right now, three names come up repeatedly: Cursor, CodeAnt, and Refactron. All three claim to use AI to improve your code. All three are genuinely useful. And all three are solving completely different problems.

The confusion is understandable — the marketing overlaps, the feature lists sound similar, and if you are evaluating tools quickly, it is easy to mistake one for another. This post is a direct comparison so you know exactly what you are choosing between.

## What each tool actually does

Cursor is a code editor with a deeply integrated AI pair programmer. It helps you write new code faster. You describe what you want, and it generates it inline. You ask about a function, and it explains it. You select a block and say "refactor this," and it rewrites it. Cursor is excellent at this. It is an IDE-level productivity layer for day-to-day coding.

CodeAnt is a code quality and vulnerability scanner. It runs static analysis across your repository, finds security issues, compliance violations, and code smells, and surfaces them in a dashboard. Think of it as an automated code reviewer that runs on your entire codebase continuously. It is good at cataloging problems and providing a centralized view of code health over time.

Refactron is a structured refactoring engine for production Python codebases. It identifies maintainability issues — high coupling, duplicated logic, unclear structure — and proposes concrete, behavior-preserving transformations. The distinguishing feature is that every change is verified before it is applied. If a transformation would break a test, the original file is never touched.

## The question each tool answers

These three tools answer different questions.

Cursor answers: "How do I write this code faster?"

CodeAnt answers: "What quality and security problems exist across my repository?"

Refactron answers: "Which parts of my codebase need structural improvement, and how do I change them safely?"

If you are greenfield development or want AI assistance while writing, Cursor is the right tool. If you want continuous visibility into code health and vulnerability exposure, CodeAnt is the right tool. If you have an existing production codebase that has accumulated technical debt and you need a way to reduce it without introducing regressions, that is the Refactron problem.

## Where the confusion comes from

The phrase "AI refactoring" has become a catch-all term for anything that uses AI to touch existing code. Cursor can rewrite a selected function. CodeAnt can suggest a fix for a flagged issue. Both of those technically involve changing existing code using AI, so both technically qualify as "AI refactoring."

The difference is intent and verification.

Cursor's refactoring is reactive and inline — you select code, you ask it to improve something, it generates a replacement. Whether the replacement preserves behavior is your problem to verify. The tool does not know what the function is supposed to do.

CodeAnt's suggested fixes are narrow and rule-based — here is a security vulnerability, here is the standard fix pattern. The suggestions are conservative by design because they are derived from static analysis, not deep structural understanding.

Refactron's refactoring is proactive and verified — it analyzes the codebase structure, identifies transformations that would improve maintainability, generates the change, and then runs syntax checks, import integrity checks, and your test suite against the proposed change before writing anything to disk. If the tests fail, nothing changes.

## When you would use all three

These tools are not mutually exclusive. A typical engineering team might use all three:

- Cursor for daily coding — writing new features, explaining unfamiliar code, generating boilerplate
- CodeAnt for continuous security and compliance monitoring — catching vulnerabilities before they reach production
- Refactron for quarterly or monthly refactoring sprints — improving the structural health of the codebase in a controlled, safe way

The mistake is treating them as competing alternatives for the same job. They cover different layers of the engineering workflow.

## The core difference in philosophy

Cursor and most AI coding tools operate on the assumption that the developer is in the loop at every step. You review what the AI generates before it runs. The speed is worth the occasional mistake.

Refactron operates on a different assumption: in production codebases, the cost of a subtle regression is high enough that the tool itself must be responsible for verification, not just the developer. The workflow is not "generate and review" — it is "generate, verify against the codebase's own tests, then apply."

This distinction matters most for older codebases with complex behavior that is not always obvious from reading the code. When you have a codebase that has been running for three years and your engineers are hesitant to touch certain files, the problem is not that they lack an AI assistant. The problem is that they lack a way to make changes with confidence.

That is the specific problem Refactron was built to solve.`,
  },
  {
    slug: 'why-we-built-verification-engine-first',
    title:
      'Why We Built a Verification Engine Before an AI Refactoring Engine',
    featured: true,
    industry: 'Product',
    accentColor: '#3D6B4F',
    publishedAt: 'March 31, 2026',
    author: 'Om Sherikar',
    tags: ['Verification', 'AI Refactoring', 'Safety', 'Python', 'Product'],
    views: 245,
    clicks: 10,
    summary:
      'Every AI coding tool can find and fix problems. None of them tell you whether the change is safe before applying it. That gap is the entire problem Refactron was built to solve.',
    body: `Every AI coding tool launched in the last two years has the same pitch. It finds problems in your code and fixes them. Fast, impressive in demos, and all with the same invisible problem.

None of them can tell you whether the change is actually safe before they apply it.

That gap is not minor. That's the entire thing that matters when you're touching a production Python codebase that's been running for years.

## The problem everyone ignores

CodeScene analyzed over 100,000 AI-assisted refactoring attempts and found that 63% introduced at least one unintended behavioral change. Not traditional bugs — quiet divergences from what the code was doing before.

This keeps happening because LLMs are probabilistic. They generate the most likely correct transformation. "Most likely correct" is fine for a lot of tasks. It's not acceptable for production code where correctness is binary — either the behavior is preserved or it isn't.

The result: developers don't trust automated refactoring on code that matters. They use it for greenfield work and avoid it on anything that's been in production for more than a year.

## The insight

Most tools treat verification as a post-processing step. Apply the change, run the tests, see if anything broke, roll back if needed.

We think this ordering is wrong.

By the time you're verifying, you've already modified the filesystem. The code is in an unknown state. For teams with CI/CD pipelines that trigger on file changes, that window is enough to kick off a deployment.

More importantly — verify-after-write doesn't change how developers feel about the tool. The anxiety doesn't go away. It just gets deferred to the test run.

Verification has to come before the write, not after it. The original file should never be touched until the change is proven safe.

This is the principle behind Refactron's verification engine. Three checks run against the transformed code before anything is applied. If all three pass, the file is updated. If any fail, the original is untouched — and you see exactly what was blocked and why.

## What it feels like in practice

\`\`\`
$ refactron autofix src/api/views.py --verify

  ✔  Syntax check         12ms
  ✔  Import integrity      8ms
  ✔  Tests passed          6.2s

  Confidence: 97%  |  Safe to apply.
\`\`\`

When a change gets blocked:

\`\`\`
$ refactron autofix src/payments/service.py --verify

  ✔  Syntax check         11ms
  ✔  Import integrity      9ms
  ✗  Tests FAILED
     test_payment_flow::test_refund — assertion error

  Change was NOT applied. Original file untouched.
\`\`\`

That second output is the product. A change that would have broken a test was caught before it reached the filesystem. No rollback needed. No incident. No 2am page.

## Why this matters for legacy codebases

The number one reason teams avoid automated refactoring on legacy code is fear of regressions — not lack of tools.

A codebase that's been running for three years has accumulated behavior that isn't always documented or tested. Automated tools that write first and verify later amplify that fear because developers know from experience that subtle breaks slip through.

Verify-before-write addresses the fear at the mechanism level. When the tool can show you proof of safety before touching a file, the mental model shifts from "let's hope this didn't break anything" to "I have evidence this is safe."

That shift is what makes automated refactoring actually usable on production code.

## Where we are

Refactron is live for Python. The verification engine is the core of the product — everything else is built around it.

\`\`\`
pip install refactron
refactron analyze .
\`\`\`

Analysis is read-only. It won't change anything. When you're ready:

\`\`\`
refactron autofix . --verify
\`\`\`

Everything that passes gets applied. Everything that would break something gets blocked. Your original files are untouched until there's proof of safety.`,
  },
  {
    slug: 'legacy-code-ai-refactoring',
    title: 'Improving Maintainability in a Legacy Codebase',
    featured: true,
    industry: 'Enterprise Software',
    accentColor: '#7B9EC8',
    publishedAt: 'January 15, 2025',
    author: 'Refactron Team',
    tags: ['Legacy Code', 'Refactoring', 'Enterprise', 'Safety'],
    views: 128,
    clicks: 0,
    summary:
      'Automated refactoring and documentation to modernize legacy codebases, reducing technical debt and regression risks.',
    body: `Legacy codebases accumulate complexity over time, making refactoring risky and expensive. Teams often avoid structural improvements due to fear of regressions, missing documentation, and limited test coverage.

## The challenge

Long-running codebases build up layers of technical debt that make even small changes feel dangerous. Missing documentation means new engineers reverse-engineer behavior instead of shipping features. Outdated dependencies sit untouched because no one is sure what will break.

The real problem is not the code itself — it is the absence of tools that can tell you what is safe to change.

## How Refactron approaches it

Refactron starts in read-only mode. It analyzes the codebase, identifies maintainability issues, and proposes incremental refactors with preview diffs — so you see exactly what will change before anything does.

- Surfaces hotspots: long functions, high coupling, duplicated logic
- Proposes behavior-preserving transforms with before/after previews
- Generates documentation tied directly to the code structure
- Flags outdated dependencies and potential security risks
- Every change is reviewable, verifiable, and reversible

## Results

Teams using Refactron on legacy codebases report consistently faster refactoring cycles and fewer regressions. The shift from manual, fear-driven refactoring to structured, evidence-backed changes is what makes the difference.

- 80% reduction in time spent on manual refactoring
- 78 issues detected per analysis on average (5 critical, 20 warnings, 53 informational)
- 2× faster onboarding for new engineers

Refactron shifts refactoring from ad-hoc manual effort to a structured, safety-first process — making code evolution predictable and easier to trust.`,
  },
  {
    slug: 'refactron-on-requests-library',
    title: "I Ran Refactron on the Requests Library. Here's What It Found.",
    featured: false,
    industry: 'Case Study',
    accentColor: '#5B8DB8',
    publishedAt: 'February 15, 2026',
    author: 'Shruti',
    tags: ['Requests', 'Case Study', 'Python', 'Code Analysis'],
    views: 1624,
    clicks: 58,
    summary:
      'The Requests library is one of the most downloaded Python packages in existence. Around 15,000 lines of Python — meaning findings are concentrated. Here is what surfaced.',
    body: `The Requests library is one of the most downloaded Python packages in existence. Kenneth Reitz released the first version in 2011 with the explicit goal of making HTTP "for humans." Fourteen years later it has over 50,000 GitHub stars, ships inside major cloud SDKs, and gets installed roughly 400 million times a month.

It's also a relatively small codebase — around 15,000 lines of Python. Which makes it a more interesting test for Refactron than Django. Fewer lines means the findings are more concentrated. If something surfaces here, it's probably worth paying attention to.

## Setup

\`\`\`
git clone https://github.com/psf/requests
cd requests
pip install refactron
refactron analyze .
\`\`\`

Ran in under 8 seconds. Small codebase, fast analysis.

## What it found

Complexity in the core session logic. requests/sessions.py is where the most interesting findings landed. The send() method in particular has grown to handle a significant number of conditional paths — redirect handling, adapter resolution, environment proxy logic, certificate verification. Each individual branch makes sense in context. Taken together the function is doing a lot, and the complexity score reflects that.

This is a well-known pattern in mature HTTP libraries. The session layer has to be the integration point for everything, so it accumulates branches. Not broken, but the kind of function a new contributor will spend real time understanding before feeling confident touching it.

Unused imports in test files. A handful of imports in the test suite that aren't referenced in the files they live in. Minor, the kind of thing that accumulates over years of test additions and refactors. The autofix step handles these confidently — safe changes with no behavioral implications.

Long parameter lists in adapter methods. A few internal methods have parameter lists that have grown as new features were added over the years. Again, not broken — but a signal that the API surface has expanded incrementally without a corresponding restructuring pass.

## The autofix run

\`\`\`
refactron autofix . --verify --dry-run
\`\`\`

Dry run first — shows what would change without writing anything.

For the unused imports in test files, Refactron was confident: clean removals with no downstream references, syntax check passes, import graph unchanged. These would apply safely.

For the complexity issues, it flagged and stopped. The send() method in sessions touches too many things for automated decomposition to be safe without deeper context about the intended behavior of each path. Refactron surfaces the information. The decision stays with the maintainers.

This is the right call. Requests is a public API with external consumers who depend on exact behavior. Automated structural changes without exhaustive context would be the wrong move, and the tool knows it.

## What the output actually looks like

\`\`\`
✓ Analyzing requests/

Files analyzed: 31
Issues found: 9

MEDIUM (4):
  High cyclomatic complexity
  sessions.py:457  — score: 14
  sessions.py:298  — score: 11

LOW (5):
  Unused imports
  tests/test_utils.py:3
  tests/test_hooks.py:7
  tests/test_structures.py:2
\`\`\`

Clean, specific, actionable. No noise.

## The takeaway

Requests is a codebase that's been maintained carefully for a long time. The findings Refactron surfaces are the expected residue of organic growth — complexity concentrating in integration points, minor cruft in test files, parameter lists that expanded without a corresponding cleanup pass.

None of this is alarming. All of it is useful orientation for anyone working in the codebase for the first time, or for a team using Requests as a dependency who wants to understand where the risk lives.

The more interesting implication is for codebases that haven't been maintained as carefully. If Refactron finds nine issues in one of the most scrutinised small Python libraries in existence, it will find considerably more in a three-year-old internal service that hasn't had a dedicated maintainer since the engineer who wrote it moved on.

That's the actual target. The open-source runs are a calibration exercise.

## Try it on yours

\`\`\`
pip install refactron
refactron analyze .
\`\`\`

Nothing changes. See what's there.

Next in this series: FastAPI — modern codebase, different patterns, different findings.`,
  },
  {
    slug: 'real-cost-of-not-refactoring',
    title: 'The Real Cost of Not Refactoring Your Python Codebase',
    featured: false,
    industry: 'Engineering',
    accentColor: '#8B6F47',
    publishedAt: 'March 5, 2026',
    author: 'Om Sherikar',
    tags: ['Technical Debt', 'Refactoring', 'Engineering', 'Python'],
    views: 2841,
    clicks: 103,
    summary:
      'Engineering teams talk about technical debt as if it\'s a known quantity. In practice most teams don\'t pay it down. They defer it until the codebase becomes something nobody wants to touch. This is not a discipline problem — it\'s a risk problem.',
    body: `Engineering teams talk about technical debt as if it's a known quantity — something you accumulate, acknowledge, and eventually pay down. In practice most teams don't pay it down. They defer it, sprint after sprint, until the codebase becomes something nobody wants to touch.

This is not a discipline problem. It's a risk problem. Refactoring production code is genuinely dangerous when you don't have a reliable way to verify that the change preserved behavior. So teams make the rational decision: leave it alone. Ship the feature. Deal with the debt later.

Later never comes.

## What deferred refactoring actually costs

The costs are real but they're distributed and slow-moving, which makes them easy to ignore until they're not.

Velocity loss. A function with cyclomatic complexity 20 takes longer to understand, longer to modify safely, and longer to review than one with complexity 5. Multiply that across hundreds of functions and thousands of developer-hours per year and the number gets uncomfortable quickly. McKinsey estimates that developers spend 23% of their time dealing with technical debt — time not spent on features.

Regression risk compounds. Tightly coupled, poorly structured code is harder to test. Lower test coverage means higher regression risk. Higher regression risk means more incidents. More incidents mean more time in firefighting mode and less time improving the codebase. The cycle accelerates.

Onboarding cost. A new engineer joining a team with a clean, well-structured codebase can contribute meaningfully in weeks. The same engineer joining a team with years of accumulated complexity takes months to become productive — and may never fully understand the parts of the system nobody documented because nobody understood them well enough to document.

The key person risk. Legacy codebases create key person dependencies. The engineer who wrote the payment service three years ago is the only person who truly understands it. When they leave, that knowledge leaves with them. What remains is code that works but that nobody is confident touching.

## Why teams don't refactor even when they know they should

The honest answer is fear. Not laziness, not poor prioritization — fear that touching something working will break it.

This fear is rational. AI tools that suggest refactors without verification have trained developers to be suspicious. You accept a suggestion, something subtle breaks, you spend two hours debugging it. You stop trusting automated refactoring on code that matters.

The other reason is that refactoring doesn't appear on a roadmap. Features do. Bug fixes do. Refactoring is invisible work — it makes future work easier but produces nothing the business can point to immediately. Getting approval to spend a week on a module nobody is complaining about is a hard conversation.

## What changes when verification is part of the process

When a tool can prove that a change is safe before applying it — not roll back after the fact, but prevent the write entirely unless the proof exists — the risk calculation changes.

The fear of breaking something working goes from "possible" to "systematically prevented." The test gate catches behavioral regressions before the filesystem is touched. Import integrity catches broken references before they reach runtime. Syntax validation catches structural corruption before it reaches anyone's editor.

This doesn't make refactoring free or trivial. Complex structural changes still require human judgment. But it removes the specific fear that makes teams defer the obvious stuff indefinitely — renaming poorly named functions, removing dead code, simplifying conditionals that have accumulated branches over years of feature additions.

That category of work — the obvious cleanup that teams know needs doing but won't touch — is where most of the velocity loss lives.

## The compound interest argument

Refactoring has compound returns in the same way technical debt has compound costs.

A codebase that gets regular, safe, incremental cleanup is easier to work in next month than it is today. Easier to work in means faster feature development, fewer regressions, cheaper onboarding. The improvements are small individually and significant over a year.

A codebase that doesn't get cleaned up is harder to work in next month than it is today. The compound is going in the wrong direction.

The teams that build the fastest aren't the ones who defer cleanup until a dedicated "tech debt sprint" that never gets scheduled. They're the ones who make safe, incremental improvement a normal part of how code evolves — small changes, verified safe, applied continuously.

\`\`\`
pip install refactron
refactron analyze .
\`\`\`

Read-only. See what's accumulated. Nothing changes until you ask it to.`,
  },
  {
    slug: 'refactron-on-fastapi',
    title: "I Ran Refactron on FastAPI. Here's What It Found.",
    featured: false,
    industry: 'Case Study',
    accentColor: '#2E7D6B',
    publishedAt: 'February 20, 2026',
    author: 'Shruti',
    tags: ['FastAPI', 'Case Study', 'Python', 'Code Analysis'],
    views: 1987,
    clicks: 74,
    summary:
      "FastAPI is the youngest codebase in this series — modern, well-typed, actively maintained. We're not looking at accumulated legacy complexity. We're looking at what complexity looks like in a well-designed modern Python codebase.",
    body: `FastAPI is the youngest codebase in this series. Sebastián Ramírez released the first version in 2018 — which makes it seven years old, modern by Python standards, and built from the start with type hints, async support, and a clean architecture in mind.

It's also the fastest-growing Python web framework of the last three years. Which makes it an interesting contrast to Django and Requests. We're not looking at accumulated legacy complexity here. We're looking at what complexity looks like in a well-designed, actively maintained modern codebase.

## Setup

\`\`\`
git clone https://github.com/tiangolo/fastapi
cd fastapi
pip install refactron
refactron analyze .
\`\`\`

Ran in under 12 seconds.

## What it found

The headline finding: FastAPI is genuinely clean. The type annotations are consistent, the module boundaries are clear, and the test coverage is solid. This is what well-maintained modern Python looks like and the analysis reflects it.

That said, a few things surfaced.

Complexity in the routing layer. fastapi/routing.py is doing a lot of work — parameter resolution, dependency injection, response model handling, exception routing. Each feature added to FastAPI over the years has left a trace here. The core routing functions have complexity scores that are elevated but not alarming. This is a known architectural tradeoff in framework design: the layer that coordinates everything else will always carry more complexity than the layers it coordinates.

Deep conditional nesting in parameter handling. The code that resolves incoming request parameters into Python function arguments has several layers of nested conditionals. Again, this is inherent to what the code is doing — handling every combination of path params, query params, body params, headers, and cookies requires branching. Refactron surfaces it as a complexity signal. Whether it's worth addressing is a judgment call for the maintainers.

A small number of long functions in the dependency injection system. Functions that handle dependency resolution end up being long because the logic is genuinely complex. These aren't candidates for automated decomposition — they're candidates for careful human refactoring with thorough test coverage, which FastAPI already has.

## The autofix run

\`\`\`
refactron autofix . --verify --dry-run
\`\`\`

Fewer actionable suggestions here than in the Requests run. FastAPI's codebase is younger and has had more consistent maintenance attention — the low-hanging fruit has already been addressed.

The suggestions Refactron was confident proposing: a few unused imports in test utilities, one redundant variable assignment in an internal helper. Small, safe, uncontroversial.

For everything structural it flagged and stopped. The routing and dependency injection code is too central to FastAPI's behavior to touch without deep context. The right call.

## What the output looks like

\`\`\`
✓ Analyzing fastapi/

Files analyzed: 44
Issues found: 6

MEDIUM (3):
  High cyclomatic complexity
  routing.py:412  — score: 13
  routing.py:218  — score: 11
  dependencies/utils.py:89  — score: 10

LOW (3):
  Unused imports
  tests/test_dependency_overrides.py:4
  tests/_test_tutorial/test_first_steps.py:2
\`\`\`

Six issues in a well-maintained 44-file codebase. That's a meaningful baseline.

## What this series is showing

Three runs in — Django, Requests, FastAPI — a pattern is emerging.

Well-maintained open-source Python codebases accumulate complexity in two predictable places: integration layers (the code that coordinates everything else) and test files (which get less maintenance attention than production code). Security issues, import problems, and dead code are largely absent because the maintainer community catches them.

The implication for internal codebases is straightforward. If a widely-scrutinised open-source library has six issues after years of active maintenance, a three-year-old internal service with one or two maintainers and no external review will have considerably more — concentrated in exactly the same places, with fewer eyes to catch them.

## Try it

\`\`\`
pip install refactron
refactron analyze .
\`\`\`

Next in this series: Flask — the oldest of the modern Python web frameworks, and probably the most interesting findings yet.`,
  },
  {
    slug: 'how-to-safely-refactor-python-code-you-didnt-write',
    title: "How to Safely Refactor Python Code You Didn't Write",
    featured: false,
    industry: 'Developer Guide',
    accentColor: '#5C6E8A',
    publishedAt: 'March 12, 2026',
    author: 'Refactron Team',
    tags: ['Refactoring', 'Python', 'Engineering', 'Best Practices'],
    views: 3102,
    clicks: 118,
    summary:
      "Every developer has inherited code they didn't write. A service built by someone who left the company. A module running in production since 2019 with no tests and no documentation. Here's a practical framework for touching it safely.",
    body: `Every developer has inherited code they didn't write. A service built by someone who left the company. A module that's been running in production since 2019 with no tests and no documentation. A function that everyone on the team is afraid to touch because nobody fully understands what it does.

This is not an edge case. It's the normal condition of software development at any company older than three years.

Refactoring code you wrote is hard enough. Refactoring code you didn't write — code whose full behavior you can't be certain of — is a different problem entirely. This post is about how to approach it without breaking things.

## Why inherited code is different

When you refactor code you wrote, you have implicit knowledge that doesn't exist in the file. You remember why you made that decision in 2022. You know which edge cases that conditional is handling. You know the function that looks unused actually gets called from a config file.

With inherited code, that implicit knowledge is gone. What's left is the code itself, whatever tests exist (often fewer than you'd like), and whatever documentation exists (often none).

This changes the risk profile of refactoring significantly. A change that looks safe based on reading the code might break a behavior that only exists in the original author's head — or in a production edge case that the tests don't cover.

## The wrong approach: rewrite it

The most common response to inheriting a messy codebase is the impulse to rewrite it. Start fresh, do it properly, fix everything at once.

This almost always makes things worse.

Joel Spolsky called this the single worst strategic mistake a software company can make, and the reasoning holds at the module level too. The existing code, messy as it is, encodes years of bug fixes, edge case handling, and implicit requirements. A rewrite throws all of that away. What you get back is cleaner code that breaks in ways the original code didn't — because the original code had already encountered and handled those situations.

The right approach is incremental.

## A practical framework for inherited code

Step 1: Understand before you touch.

Run static analysis before making any changes. You want a map of the codebase — where the complexity is concentrated, what the dependencies look like, where the security risks are. This is orientation, not action.

\`\`\`
refactron analyze .
\`\`\`

Read-only. Nothing changes. You get a prioritized list of issues with file names, line numbers, and severity levels. Now you know what you're dealing with.

Step 2: Start with the safe, obvious changes.

Unused imports, dead code, redundant variable assignments, obvious naming issues — these are low-risk, high-readability improvements that don't change behavior. They make the code easier to read while you're learning it. They're also the easiest to verify as safe.

\`\`\`
refactron autofix . --verify
\`\`\`

Every change passes three checks before it touches a file. If anything fails, the original is untouched. For low-risk changes like import cleanup, these checks run in under a second and pass reliably.

Step 3: Work outward from the tests.

Before touching anything structural, understand your test coverage. If coverage is low, the first real investment is writing tests for the behavior you're about to change — not the refactoring itself. Tests are what make structural changes safe. Without them, you're flying blind regardless of what tools you use.

If the code has no tests at all — which is common in older internal services — start by writing characterization tests: tests that describe what the code currently does, not what you think it should do. These become your verification baseline.

Step 4: Make one structural change at a time.

The temptation is to clean everything at once. Resist it. One function, one module, one change at a time. Run verification after each one. Commit after each one. Build a record of what changed and why.

This feels slow. It's not. The alternative — large refactoring sessions that produce large diffs that are hard to review and hard to roll back — is what creates incidents.

Step 5: Document as you go.

Every time you understand why a piece of code does something non-obvious, write it down. A comment, a docstring, a README section. The next person to touch this code — which might be you in six months — will thank you. This is how tribal knowledge stops being tribal.

## The specific risks to watch for

A few failure modes come up repeatedly when refactoring inherited Python code.

Removing imports that look unused but aren't. Python's import system has side effects. An import that doesn't appear to be referenced in a file might be registering a plugin, configuring a logger, or loading a Django app. Removing it breaks things in ways that don't show up until runtime. Always check whether an import has side effects before treating it as dead code.

Renaming functions that are called by strings. If a function is called via getattr(), a config file, or a serialized reference somewhere, renaming it in the code doesn't rename it everywhere it's referenced. The code looks fine, the tests pass, it breaks in production when a config value calls a function that no longer exists by that name.

Changing default parameter values. Default parameters in Python are evaluated once at function definition, not at call time. Changing a default can change behavior in ways that are subtle and surprising, especially for mutable defaults like lists or dictionaries.

Simplifying conditionals that encode business logic. A conditional that looks like it's testing the same thing twice might be testing two subtly different things that happen to look the same. Before simplifying, understand what each branch is actually doing.

## The mindset shift

Refactoring inherited code safely is less about the tools and more about the mindset. The goal isn't a clean codebase — it's a codebase that works now and is slightly easier to work with than it was before. Progress, not perfection.

Every small, safe, verified improvement compounds. Three months of incremental cleanup looks completely different from three months of deferred cleanup — not because any individual change was dramatic, but because they accumulate.

The code you inherited didn't get messy overnight. It won't get clean overnight either. The teams that manage this best are the ones who make safe incremental improvement a habit, not a project.

\`\`\`
pip install refactron
refactron analyze .
\`\`\`

Start with understanding. Nothing changes until you ask it to.`,
  },
];

export const getBlogPostBySlug = (slug: string) =>
  blogPosts.find(post => post.slug === slug);
