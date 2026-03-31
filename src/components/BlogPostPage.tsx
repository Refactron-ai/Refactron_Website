import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CalendarDays, Tag, User } from 'lucide-react';
import { getBlogPostBySlug, parseBody, ContentSection } from '../data/posts';

function getIcon(industry: string) {
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
        width="72"
        height="72"
        stroke={attr.stroke}
        fill={attr.fill}
      >
        <path d="M32 8 L52 16 L52 34 Q52 50 32 56 Q12 50 12 34 L12 16 Z" {...attr} />
        <polyline points="22,32 28,38 42,26" {...attr} />
      </svg>
    );
  }

  if (lower.includes('code') || lower.includes('software')) {
    return (
      <svg
        viewBox="0 0 64 64"
        width="72"
        height="72"
        stroke={attr.stroke}
        fill={attr.fill}
      >
        <polyline points="22,16 8,32 22,48" {...attr} />
        <polyline points="42,16 56,32 42,48" {...attr} />
        <line x1="28" y1="44" x2="36" y2="20" {...attr} />
      </svg>
    );
  }
  if (lower.includes('guide') || lower.includes('tutorial')) {
    return (
      <svg
        viewBox="0 0 64 64"
        width="72"
        height="72"
        stroke={attr.stroke}
        fill={attr.fill}
      >
        <path d="M40 8 Q50 8 52 18 Q54 26 48 32 L20 56 Q16 60 12 56 Q8 52 12 48 L36 20 Q32 14 34 10 Z" {...attr} />
        <line x1="34" y1="18" x2="44" y2="28" {...attr} />
        <circle cx="15" cy="52" r="2" {...attr} />
      </svg>
    );
  }

  if (lower.includes('engineering') || lower.includes('debt')) {
    return (
      <svg
        viewBox="0 0 64 64"
        width="72"
        height="72"
        stroke={attr.stroke}
        fill={attr.fill}
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
        width="72"
        height="72"
        stroke={attr.stroke}
        fill={attr.fill}
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
        width="72"
        height="72"
        stroke={attr.stroke}
        fill={attr.fill}
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

  if (lower.includes('financial') || lower.includes('analytics')) {
    return (
      <svg
        viewBox="0 0 64 64"
        width="72"
        height="72"
        stroke={attr.stroke}
        fill={attr.fill}
      >
        <polyline points="8,48 20,36 32,40 44,24 56,16" {...attr} />
        <circle cx="44" cy="24" r="3" {...attr} />
        <circle cx="56" cy="16" r="3" {...attr} />
        <line x1="8" y1="48" x2="8" y2="16" {...attr} />
        <line x1="8" y1="48" x2="56" y2="48" {...attr} />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 64 64"
      width="72"
      height="72"
      stroke={attr.stroke}
      fill={attr.fill}
    >
      <rect x="10" y="14" width="44" height="12" rx="2" {...attr} />
      <rect x="10" y="30" width="44" height="12" rx="2" {...attr} />
      <rect x="10" y="46" width="44" height="8" rx="2" {...attr} />
      <circle cx="48" cy="20" r="2" {...attr} />
      <circle cx="48" cy="36" r="2" {...attr} />
    </svg>
  );
}

function renderSection(section: ContentSection, i: number) {
  switch (section.type) {
    case 'heading':
      return (
        <h2
          key={i}
          className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-16 mb-5"
        >
          {section.text}
        </h2>
      );
    case 'paragraph':
      return (
        <p
          key={i}
          className="text-lg sm:text-xl text-neutral-400 leading-relaxed mb-6"
        >
          {section.text}
        </p>
      );
    case 'code':
      return (
        <pre
          key={i}
          className="bg-[#0D0D0D] border border-white/10 rounded-xl px-6 py-5 my-8 overflow-x-auto text-sm text-neutral-300 font-mono leading-relaxed"
        >
          {section.text}
        </pre>
      );
    case 'list':
      return (
        <ul key={i} className="space-y-3 mb-6 mt-2">
          {section.items.map((item, j) => (
            <li
              key={j}
              className="flex items-start gap-3 text-neutral-400 text-lg leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 mt-3 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-neutral-400 font-space flex flex-col items-center justify-center px-4 text-center">
        <p className="text-sm uppercase tracking-wide text-neutral-500 mb-2">
          Blog
        </p>
        <h1 className="text-3xl font-semibold text-white mb-4 tracking-tight">
          We couldn't find that post
        </h1>
        <p className="text-neutral-400 mb-6 max-w-md">
          The post you're looking for may have moved or does not exist.
        </p>
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full text-sm font-semibold hover:bg-neutral-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          View all posts
        </button>
      </div>
    );
  }

  const sections = parseBody(post.body);

  return (
    <div className="relative min-h-screen bg-black text-neutral-400 font-space">
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-28 pb-8"
        >
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </button>

          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">
            {post.industry}
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-space leading-[1.1] tracking-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-500 mb-8">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              {post.publishedAt}
            </span>
          </div>

          <div className="border-t border-white/10" />
        </motion.div>

        {/* Hero illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl overflow-hidden mb-16"
          style={{ backgroundColor: post.accentColor }}
        >
          <div className="h-80 flex items-center justify-center">
            {getIcon(post.industry)}
          </div>
        </motion.div>

        {/* Body content — parsed from raw text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {sections.map((section, i) => renderSection(section, i))}
        </motion.div>

        {/* Tags + stats */}
        <div className="mt-16 pt-8 border-t border-white/10 pb-24">
          <div className="flex flex-wrap gap-3 mb-6">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 text-sm text-neutral-500 font-space"
              >
                <Tag className="w-3.5 h-3.5" />
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-600 font-space">
            <span>{post.views} views</span>
            <span>{post.clicks} clicks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
