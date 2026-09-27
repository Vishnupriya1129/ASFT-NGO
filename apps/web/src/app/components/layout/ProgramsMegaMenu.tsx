'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Compass } from 'lucide-react';

export interface ProgramNode {
  slug: string;
  title: string;
  description: string;
  parent_slug: string | null;
  children?: ProgramNode[];
}

interface Props {
  tree: ProgramNode[];
  onClose: () => void;
}

// ✅ Brand colours — match the website
const ACCENTS = [
  { from: '#0E7A5F', to: '#34A853', dot: '#0E7A5F' }, // emerald (Odyssey)
  { from: '#1E5A8E', to: '#4A90D9', dot: '#1E5A8E' }, // blue (THOOYAM)
  { from: '#8B6914', to: '#C9A227', dot: '#C9A227' }, // gold (Awareness)
  { from: '#7A4A8E', to: '#A678C9', dot: '#7A4A8E' }, // purple (fallback)
];

export default function ProgramsMegaMenu({ tree, onClose }: Props) {
  // Breadcrumb path for sliding levels
  const [path, setPath] = useState<ProgramNode[]>([]);

  // Current level's items
  const currentParent = path[path.length - 1];
  const currentItems = currentParent ? (currentParent.children || []) : tree;
  const currentAccent = ACCENTS[path.length % ACCENTS.length];

  const goDeeper = (node: ProgramNode) => {
    if (node.children && node.children.length > 0) {
      setPath([...path, node]);
    }
  };

  const goBack = () => {
    setPath(path.slice(0, -1));
  };

  const goHome = () => setPath([]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[min(680px,calc(100vw-2rem))] rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background: 'linear-gradient(160deg, #FDFAF3 0%, #F8F5EE 40%, #F0E8D5 100%)',
        boxShadow: '0 20px 60px rgba(15, 34, 61, 0.25), 0 4px 16px rgba(201, 162, 39, 0.15)',
        border: '1px solid rgba(201, 162, 39, 0.25)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5D9B8]">
        <div className="flex items-center gap-3">
          {path.length > 0 ? (
            <button
              onClick={goBack}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#0F223D] hover:text-[#C9A227] transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              Back
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-[#C9A227]" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0F223D]">
                Programs
              </span>
            </div>
          )}
        </div>

        <Link
          href="/programs"
          onClick={onClose}
          className="text-xs font-semibold text-[#C9A227] hover:text-[#8B6914] transition-colors flex items-center gap-1"
        >
          View All Programs
          <ArrowRight size={12} />
        </Link>
      </div>

      {/* Breadcrumb (when deep) */}
      {path.length > 0 && (
        <div className="px-6 pt-3 pb-1 flex items-center gap-2 text-xs text-gray-500">
          <button onClick={goHome} className="hover:text-[#C9A227] transition-colors">
            Programs
          </button>
          {path.map((p, i) => (
            <span key={p.slug} className="flex items-center gap-2">
              <span className="text-gray-300">/</span>
              <span className={i === path.length - 1 ? 'text-[#0F223D] font-semibold' : ''}>
                {p.title}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Items with sliding panels */}
      <div className="relative h-[340px] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={path.length}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0 px-6 py-3 overflow-y-auto"
          >
            {currentItems.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm text-gray-400">
                No items here yet.
              </div>
            ) : (
              <ul className="space-y-1">
                {currentItems.map((item, index) => {
                  const accent = ACCENTS[(path.length + index) % ACCENTS.length];
                  const hasChildren = item.children && item.children.length > 0;
                  const isDirectLink = !hasChildren;

                  return (
                    <li key={item.slug}>
                      <div
                        className="group flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/70 transition-all duration-200 cursor-pointer"
                        onClick={() => hasChildren && goDeeper(item)}
                      >
                        {/* Timeline dot */}
                        <div className="relative flex-shrink-0">
                          <span
                            className="block w-3 h-3 rounded-full relative z-10"
                            style={{
                              background: `linear-gradient(135deg, ${accent.from}, ${accent.to})`,
                              boxShadow: `0 0 0 4px ${accent.dot}20`,
                            }}
                          />
                          <span
                            className="absolute inset-0 rounded-full animate-ping opacity-40"
                            style={{ background: accent.dot, animationDuration: '2.5s' }}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-[#0F223D] group-hover:text-[#8B6914] transition-colors truncate">
                              {item.title}
                            </p>
                            {hasChildren && (
                              <span className="text-[10px] font-semibold text-[#C9A227] bg-[#C9A227]/10 px-2 py-0.5 rounded-full">
                                {item.children!.length}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Action */}
                        {hasChildren ? (
                          <ArrowRight
                            size={16}
                            className="flex-shrink-0 text-gray-300 group-hover:text-[#C9A227] group-hover:translate-x-1 transition-all"
                          />
                        ) : (
                          <Link
                            href={`/programs/${item.slug}`}
                            onClick={onClose}
                            className="flex-shrink-0 text-xs font-semibold text-[#1E5A8E] hover:text-[#0F223D] transition-colors px-3 py-1 rounded-full hover:bg-[#1E5A8E]/10"
                          >
                            Open Page →
                          </Link>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer shimmer accent */}
      <div
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${currentAccent.from}, ${currentAccent.to}, ${currentAccent.from})`,
        }}
      />
    </motion.div>
  );
}