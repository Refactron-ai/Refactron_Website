import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogPosts, BlogPost } from '../data/posts';

// Minimal line-art SVG icons keyed by industry
function getIcon(industry: string, size = 64) {
  const attr = {
    stroke: 'rgba(0,0,0,0.45)',
    strokeWidth: 1.5,
    fill: 'none' as const,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  const lower = industry.toLowerCase();

  if (lower.includes('product')) {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        {...{ stroke: attr.stroke, fill: attr.fill }}
      >
        <path d="M32 8 L52 16 L52 34 Q52 50 32 56 Q12 50 12 34 L12 16 Z" {...attr} />
        <polyline points="22,32 28,38 42,26" {...attr} />
      </svg>
    );
  }

  if (lower.includes('guide') || lower.includes('tutorial')) {
    // Wrench — practical how-to / developer guide
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        {...{ stroke: attr.stroke, fill: attr.fill }}
      >
        <path d="M40 8 Q50 8 52 18 Q54 26 48 32 L20 56 Q16 60 12 56 Q8 52 12 48 L36 20 Q32 14 34 10 Z" {...attr} />
        <line x1="34" y1="18" x2="44" y2="28" {...attr} />
        <circle cx="15" cy="52" r="2" {...attr} />
      </svg>
    );
  }

  if (lower.includes('engineering') || lower.includes('debt')) {
    // Hourglass — time / cost accumulating
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        {...{ stroke: attr.stroke, fill: attr.fill }}
      >
        <path d="M16 10 L48 10 L48 10 Q48 28 32 32 Q16 36 16 54 L48 54 Q48 36 32 32 Q16 28 16 10 Z" {...attr} />
        <line x1="16" y1="10" x2="48" y2="10" {...attr} />
        <line x1="16" y1="54" x2="48" y2="54" {...attr} />
        <path d="M24 46 Q32 42 40 46" {...attr} />
      </svg>
    );
  }

  if (lower.includes('case study') || lower.includes('case')) {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        {...{ stroke: attr.stroke, fill: attr.fill }}
      >
        <circle cx="26" cy="26" r="14" {...attr} />
        <line x1="36" y1="36" x2="54" y2="54" {...attr} />
        <line x1="19" y1="22" x2="33" y2="22" {...attr} />
        <line x1="19" y1="27" x2="33" y2="27" {...attr} />
        <line x1="19" y1="32" x2="29" y2="32" {...attr} />
      </svg>
    );
  }

  if (lower.includes('analysis') || lower.includes('comparison')) {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        {...{ stroke: attr.stroke, fill: attr.fill }}
      >
        <line x1="32" y1="10" x2="32" y2="54" {...attr} />
        <line x1="16" y1="18" x2="48" y2="18" {...attr} />
        <polyline points="12,18 8,30 16,30 12,18" {...attr} />
        <polyline points="52,18 56,30 48,30 52,18" {...attr} />
        <line x1="8" y1="30" x2="16" y2="30" {...attr} />
        <line x1="48" y1="30" x2="56" y2="30" {...attr} />
        <line x1="24" y1="54" x2="40" y2="54" {...attr} />
      </svg>
    );
  }

  if (
    lower.includes('legacy') ||
    lower.includes('software') ||
    lower.includes('code')
  ) {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        {...{ stroke: attr.stroke, fill: attr.fill }}
      >
        <polyline points="22,16 8,32 22,48" {...attr} />
        <polyline points="42,16 56,32 42,48" {...attr} />
        <line x1="28" y1="44" x2="36" y2="20" {...attr} />
      </svg>
    );
  }

  if (
    lower.includes('financial') ||
    lower.includes('analytics') ||
    lower.includes('data')
  ) {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        {...{ stroke: attr.stroke, fill: attr.fill }}
      >
        <polyline points="8,48 20,36 32,40 44,24 56,16" {...attr} />
        <circle cx="20" cy="36" r="3" {...attr} />
        <circle cx="32" cy="40" r="3" {...attr} />
        <circle cx="44" cy="24" r="3" {...attr} />
        <circle cx="56" cy="16" r="3" {...attr} />
        <line x1="8" y1="48" x2="8" y2="16" {...attr} />
        <line x1="8" y1="48" x2="56" y2="48" {...attr} />
      </svg>
    );
  }

  if (lower.includes('health') || lower.includes('medical')) {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        {...{ stroke: attr.stroke, fill: attr.fill }}
      >
        <path
          d="M32 8 L52 16 L52 34 Q52 50 32 56 Q12 50 12 34 L12 16 Z"
          {...attr}
        />
        <line x1="32" y1="26" x2="32" y2="38" {...attr} />
        <line x1="26" y1="32" x2="38" y2="32" {...attr} />
      </svg>
    );
  }

  if (
    lower.includes('infra') ||
    lower.includes('platform') ||
    lower.includes('enterprise')
  ) {
    return (
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        {...{ stroke: attr.stroke, fill: attr.fill }}
      >
        <rect x="10" y="14" width="44" height="12" rx="2" {...attr} />
        <rect x="10" y="30" width="44" height="12" rx="2" {...attr} />
        <rect x="10" y="46" width="44" height="8" rx="2" {...attr} />
        <circle cx="48" cy="20" r="2" {...attr} />
        <circle cx="48" cy="36" r="2" {...attr} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      {...{ stroke: attr.stroke, fill: attr.fill }}
    >
      <circle cx="32" cy="32" r="6" {...attr} />
      <circle cx="32" cy="32" r="14" {...attr} />
      <circle cx="32" cy="32" r="22" {...attr} />
    </svg>
  );
}

// Bento span: 0=wide, 1=narrow, 2=narrow, 3=wide, repeating
function getBentoSpan(index: number, total: number): boolean {
  if (total === 1) return true;
  return index % 4 === 0 || index % 4 === 3;
}

interface BentoCardProps {
  post: BlogPost;
  index: number;
  wide: boolean;
}

function BentoCard({ post, index, wide }: BentoCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => navigate(`/blog/${post.slug}`)}
      className={`group rounded-2xl overflow-hidden cursor-pointer flex flex-col ${wide ? 'md:col-span-2' : 'md:col-span-1'}`}
    >
      <div
        className={`flex items-center justify-center w-full flex-shrink-0 ${wide ? 'h-52' : 'h-44'}`}
        style={{ backgroundColor: post.accentColor }}
      >
        {getIcon(post.industry)}
      </div>
      <div className="bg-[#111111] px-6 py-3 flex flex-col gap-2 flex-1">
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-space">
          {post.industry}
        </p>
        <h3 className="text-3xl font-bold text-white font-space leading-snug flex-1">
          {post.title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-neutral-500 font-space">
            {post.publishedAt.split(' at')[0]}
          </p>
          <div className="flex items-center gap-1.5 text-sm text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all duration-200">
            <span>Read more</span>
            <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface RegularCardProps {
  post: BlogPost;
  index: number;
}

function RegularCard({ post, index }: RegularCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onClick={() => navigate(`/blog/${post.slug}`)}
      className="group rounded-2xl overflow-hidden cursor-pointer flex flex-col bg-[#111111] hover:bg-[#161616] transition-colors break-inside-avoid mb-4"
    >
      <div
        className="flex items-center justify-center w-full h-44 flex-shrink-0"
        style={{ backgroundColor: post.accentColor }}
      >
        {getIcon(post.industry, 52)}
      </div>
      <div className="px-6 py-4 flex flex-col gap-2">
        <p className="text-xs uppercase tracking-widest text-neutral-500 font-space">
          {post.industry}
        </p>
        <h3 className="text-2xl font-bold text-white font-space leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-neutral-400 font-space leading-relaxed">
          {post.summary}
        </p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-neutral-500 font-space">
            {post.publishedAt.split(' at')[0]}
          </p>
          <div className="flex items-center gap-1.5 text-sm text-neutral-500 opacity-0 group-hover:opacity-100 group-hover:text-white transition-all duration-200">
            <span>Read more</span>
            <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const featured = blogPosts.filter(p => p.featured !== false);
  const rest = blogPosts.filter(p => p.featured === false);
  const isSearching = query.trim().length > 0;

  const matchPost = (p: BlogPost) => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.industry.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  };

  const searchResults = isSearching ? blogPosts.filter(matchPost) : [];

  return (
    <div className="relative min-h-screen bg-black text-neutral-400 font-space">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white font-space leading-[1.05] mb-4">
            Blogs
          </h1>
          <p className="text-base md:text-lg text-neutral-400 font-space leading-loose max-w-xl">
            Common patterns we see in long-lived, production codebases.
          </p>
        </motion.div>
      </div>

      {/* Featured bento grid — hidden while searching */}
      {!isSearching && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((post, i) => (
              <BentoCard
                key={post.slug}
                post={post}
                index={i}
                wide={getBentoSpan(i, featured.length)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search + posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
        {/* Search bar */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search posts…"
            className="w-full bg-transparent border border-white/20 rounded-xl pl-12 pr-5 py-4 text-white placeholder-neutral-500 font-space text-base focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>

        {/* Search results */}
        {isSearching && (
          <>
            {searchResults.length > 0 ? (
              <div className="columns-1 md:columns-3 gap-4">
                {searchResults.map((post, i) => (
                  <RegularCard key={post.slug} post={post} index={i} />
                ))}
              </div>
            ) : (
              <p className="text-neutral-500 text-sm">No posts match your search.</p>
            )}
          </>
        )}

        {/* Regular (non-featured) posts — shown when not searching */}
        {!isSearching && rest.length > 0 && (
          <div className="columns-1 md:columns-3 gap-4">
            {rest.map((post, i) => (
              <RegularCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white font-space mb-6 leading-tight tracking-tight">
            Ready to transform your codebase?
          </h2>
          <p className="text-lg text-neutral-400 mb-8 leading-relaxed font-space">
            Partner with us to create an actionable refactoring playbook
            tailored to your engineering challenges.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://cal.com/omsherikar/queries-refactron"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-neutral-200 transition-all duration-300"
            >
              Book a Session
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:border-white/20 hover:bg-white/5 transition-all duration-300"
            >
              Learn More
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPage;
