import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import XIcon from '../icons/XIcon';

type Testimonial = {
  name: string;
  handle: string;
  date: string;
  body: React.ReactNode;
  footer?: string;
  avatar: string;
  avatarBg: string;
  mockMedia?: 'chart' | 'diff';
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Sarah Chen',
    handle: '@sarahbuilds',
    date: 'Jan 12, 2026',
    avatar: 'SC',
    avatarBg: 'bg-teal-600',
    body: (
      <>
        Finally ran{' '}
        <span className="font-medium text-blue-600">refactron analyze</span> on
        our 4yr-old monolith. The legacy hotspots it surfaced matched what
        we&apos;d been scared to touch. Local-only was non-negotiable for us.
      </>
    ),
  },
  {
    name: 'Marcus Johnson',
    handle: '@mj_codes',
    date: 'Feb 3, 2026',
    avatar: 'MJ',
    avatarBg: 'bg-violet-600',
    body: (
      <>
        The thing that sold me wasn&apos;t the diff. It was{' '}
        <span className="font-medium text-blue-600">verify before write</span>.
        Tests failed once on a proposed extract; disk never changed. That&apos;s
        the bar for production Python.
      </>
    ),
    footer: '^ Principal backend engineer (yes, I read the full trace)',
    mockMedia: 'diff',
  },
  {
    name: 'Elena Ruiz',
    handle: '@elenadev',
    date: 'Jan 28, 2026',
    avatar: 'ER',
    avatarBg: 'bg-rose-500',
    body: (
      <>
        We compared notes with another team using chat-only refactors. Different
        problem. Refactron is boring in the good way: same command, same shape,
        reviewable PRs.{' '}
        <span className="font-medium text-blue-600">@refactron</span>
      </>
    ),
  },
  {
    name: 'Dev Akira',
    handle: '@akira_ts',
    date: 'Feb 18, 2026',
    avatar: 'DA',
    avatarBg: 'bg-amber-600',
    body: (
      <>
        npm i -g refactron → analyze → preview refactor. My tech lead actually
        smiled at standup. Unrelated but still counts.
      </>
    ),
  },
  {
    name: 'Priya N.',
    handle: '@priyainfra',
    date: 'Feb 8, 2026',
    avatar: 'PN',
    avatarBg: 'bg-sky-600',
    body: (
      <>
        Security asked &quot;where does code go?&quot; Answer: nowhere. CLI on
        CI runners with read-only first. Docs after refactor were a nice touch
        for onboarding.
      </>
    ),
    mockMedia: 'chart',
  },
  {
    name: 'Jordan Lee',
    handle: '@jordanl_js',
    date: 'Jan 22, 2026',
    avatar: 'JL',
    avatarBg: 'bg-emerald-600',
    body: (
      <>
        TS + Python repo. Still early but the structural suggestions
        weren&apos;t vibes; they were scoped files with a verification story.
        More of this please.
      </>
    ),
  },
];

const MARQUEE_ANIMATIONS = [
  'animate-testimonial-marquee-slow',
  'animate-testimonial-marquee-mid',
  'animate-testimonial-marquee-fast',
] as const;

function MockMedia({ kind }: { kind: 'chart' | 'diff' }) {
  if (kind === 'diff') {
    return (
      <div
        className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-3 font-mono text-[11px] leading-relaxed text-neutral-700"
        aria-hidden
      >
        <div className="text-emerald-700">+ def extract_payment_id(order):</div>
        <div className="text-neutral-400">
          - payment = order.get(&quot;pay&quot;)
        </div>
        <div className="text-neutral-500 mt-2">… preview · 3 files</div>
      </div>
    );
  }
  return (
    <div
      className="mt-4 rounded-xl border border-neutral-200 bg-white p-4"
      aria-hidden
    >
      <p className="text-[10px] font-medium uppercase tracking-wide text-neutral-500 mb-3">
        Checks passing
      </p>
      <div className="flex h-16 items-end gap-2">
        {[26, 46, 35, 56, 40].map((px, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-neutral-300/50 to-neutral-700/80"
            style={{ height: `${px}px` }}
          />
        ))}
      </div>
    </div>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="mb-6 shrink-0 overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] lg:mb-8">
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 flex-1 gap-3">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${t.avatarBg}`}
              aria-hidden
            >
              {t.avatar}
            </div>
            <div className="min-w-0 pt-0.5">
              <p className="truncate font-semibold text-neutral-900">
                {t.name}
              </p>
              <p className="truncate text-sm text-neutral-500">{t.handle}</p>
            </div>
          </div>
          <XIcon className="h-4 w-4 shrink-0 text-neutral-900" />
        </div>
        <div className="mt-4 text-[15px] leading-relaxed text-neutral-800">
          {t.body}
        </div>
        {t.mockMedia ? <MockMedia kind={t.mockMedia} /> : null}
        <p className="mt-4 text-xs text-neutral-400">{t.date}</p>
      </div>
      {t.footer ? (
        <div className="border-t border-sky-100 bg-sky-50/90 px-5 py-3.5 sm:px-6">
          <p className="text-sm italic leading-snug text-blue-700">
            {t.footer}
          </p>
        </div>
      ) : null}
    </article>
  );
}

function TestimonialMarqueeColumn({
  items,
  animationClass,
  paused,
}: {
  items: Testimonial[];
  animationClass: string;
  paused: boolean;
}) {
  const heightClass =
    'relative h-[min(32rem,70vh)] md:h-[min(36rem,72vh)] lg:h-[min(40rem,75vh)]';

  if (paused) {
    return (
      <div
        className={`${heightClass} overflow-y-auto overscroll-y-contain [scrollbar-width:thin]`}
      >
        <div className="flex flex-col gap-0 pb-2">
          {items.map(t => (
            <TestimonialCard key={t.handle} t={t} />
          ))}
        </div>
      </div>
    );
  }

  const loop = [...items, ...items];

  return (
    <div className={`${heightClass} overflow-hidden`}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-14 bg-gradient-to-b from-[#f3f3f2] via-[#f3f3f2]/90 to-transparent sm:h-16"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-14 bg-gradient-to-t from-[#f3f3f2] via-[#f3f3f2]/90 to-transparent sm:h-16"
        aria-hidden
      />

      <div
        className={`flex flex-col gap-0 motion-reduce:animate-none ${animationClass} hover:[animation-play-state:paused]`}
      >
        {loop.map((t, i) => (
          <TestimonialCard key={`${t.handle}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

const TestimonialsSection: React.FC = () => {
  const reduce = useReducedMotion() ?? false;

  const columns = useMemo(() => {
    const c: [Testimonial[], Testimonial[], Testimonial[]] = [[], [], []];
    TESTIMONIALS.forEach((t, i) => {
      c[i % 3].push(t);
    });
    return c;
  }, []);

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-[#f3f3f2] py-24 lg:py-28 text-neutral-900 antialiased font-space"
      aria-labelledby="testimonials-heading"
    >
      {/* Minimal editorial backdrop — fine grid + a soft neutral vignette */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(24,24,27,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(24,24,27,0.028)_1px,transparent_1px)] bg-[length:44px_44px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_52%_at_50%_-18%,rgba(24,24,27,0.04),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_108%,rgba(24,24,27,0.035),transparent_52%)]" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-black to-transparent sm:h-36 lg:h-44"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-36 bg-gradient-to-t from-black to-transparent sm:h-40 lg:h-48"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-14 bg-gradient-to-r from-black to-transparent sm:w-20 lg:w-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-14 bg-gradient-to-l from-black to-transparent sm:w-20 lg:w-32"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.header
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-2xl text-center lg:mb-16"
        >
          <h2
            id="testimonials-heading"
            className="text-4xl font-semibold tracking-tight text-neutral-950 sm:text-5xl lg:text-[3.25rem] leading-[1.12]"
          >
            Builders love Refactron.
          </h2>
          <p className="mt-4 text-base text-neutral-600 sm:text-lg leading-relaxed">
            And they can&apos;t stop talking about safer refactors and boring,
            reviewable diffs.
          </p>
        </motion.header>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6 lg:gap-8"
        >
          {columns.map((items, colIdx) => (
            <div key={colIdx} className="min-h-0">
              <TestimonialMarqueeColumn
                items={items}
                animationClass={MARQUEE_ANIMATIONS[colIdx]}
                paused={reduce}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
