'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, ExternalLink } from 'lucide-react';

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

export default function ProgramsMegaMenu({ tree, onClose }: Props) {
  const [expandedRoot, setExpandedRoot] = useState<string | null>(
    tree[0]?.slug || null
  );
  const [expandedChild, setExpandedChild] = useState<string | null>(null);

  const toggleRoot = (slug: string) => {
    setExpandedRoot(expandedRoot === slug ? null : slug);
    setExpandedChild(null);
  };

  const toggleChild = (slug: string) => {
    setExpandedChild(expandedChild === slug ? null : slug);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-0 mt-2 rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background:
          'linear-gradient(160deg, #FDFAF3 0%, #F8F5EE 40%, #F0E8D5 100%)',
        boxShadow:
          '0 20px 60px rgba(15, 34, 61, 0.25), 0 4px 16px rgba(201, 162, 39, 0.15)',
        border: '1px solid rgba(201, 162, 39, 0.25)',
        width: '420px',
        maxWidth: 'calc(100vw - 2rem)',
        maxHeight: '80vh',
      }}
    >
      {/* Header */}
      <div className="px-5 py-3 border-b border-[#E5D9B8] flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B6914]">
          Programs
        </p>
        <Link
          href="/programs"
          onClick={onClose}
          className="text-[11px] font-semibold text-[#C9A227] hover:text-[#8B6914] flex items-center gap-1"
        >
          View All
          <ArrowRight size={11} />
        </Link>
      </div>

      {/* Scrollable tree */}
      <div
        className="overflow-y-auto"
        style={{ maxHeight: 'calc(80vh - 60px)' }}
      >
        {tree.map((root) => {
          const rootIsOpen = expandedRoot === root.slug;
          const hasChildren = root.children && root.children.length > 0;

          return (
            <div
              key={root.slug}
              className="border-b border-[#E5D9B8]/50 last:border-0"
            >
              {/* Root row */}
              <div className="flex items-center">
                <button
                  onClick={() => hasChildren && toggleRoot(root.slug)}
                  className="flex-1 flex items-center gap-3 px-5 py-3 hover:bg-white/60 transition text-left"
                >
                  <ChevronRight
                    size={14}
                    className={`flex-shrink-0 text-[#C9A227] transition-transform ${
                      rootIsOpen ? 'rotate-90' : ''
                    } ${!hasChildren ? 'opacity-0' : ''}`}
                  />
                  <span className="w-2 h-2 rounded-full bg-[#0E7A5F] flex-shrink-0" />
                  <span className="text-sm font-semibold text-[#0F223D] truncate flex-1">
                    {root.title}
                  </span>
                  {hasChildren && (
                    <span className="text-[10px] text-gray-400 bg-white/60 rounded-full px-2 py-0.5 flex-shrink-0">
                      {root.children!.length}
                    </span>
                  )}
                </button>
                <Link
                  href={`/programs/${root.slug}`}
                  onClick={onClose}
                  className="p-3 text-[#1E5A8E] hover:text-[#0F223D] hover:bg-white/60 transition flex-shrink-0"
                  title="Visit page"
                >
                  <ExternalLink size={14} />
                </Link>
              </div>

              {/* Children */}
              {rootIsOpen && hasChildren && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden bg-white/40"
                >
                  {root.children!.map((child, childIndex) => {
                    const childIsOpen = expandedChild === child.slug;
                    const hasGrandChildren =
                      child.children && child.children.length > 0;

                    return (
                      <div
                        key={child.slug}
                        className="border-t border-[#E5D9B8]/40"
                      >
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              hasGrandChildren && toggleChild(child.slug)
                            }
                            className="flex-1 flex items-center gap-3 pl-10 pr-5 py-2.5 hover:bg-white/60 transition text-left"
                          >
                            <ChevronRight
                              size={12}
                              className={`flex-shrink-0 text-[#1E5A8E] transition-transform ${
                                childIsOpen ? 'rotate-90' : ''
                              } ${!hasGrandChildren ? 'opacity-0' : ''}`}
                            />
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{
                                background:
                                  childIndex % 2 === 0 ? '#1E5A8E' : '#C9A227',
                              }}
                            />
                            <span className="text-[13px] text-gray-700 truncate flex-1">
                              {child.title}
                            </span>
                            {hasGrandChildren && (
                              <span className="text-[10px] text-gray-400 bg-white/60 rounded-full px-2 py-0.5 flex-shrink-0">
                                {child.children!.length}
                              </span>
                            )}
                          </button>
                          <Link
                            href={`/programs/${child.slug}`}
                            onClick={onClose}
                            className="p-2.5 text-[#1E5A8E] hover:text-[#0F223D] hover:bg-white/60 transition flex-shrink-0"
                            title="Visit page"
                          >
                            <ExternalLink size={12} />
                          </Link>
                        </div>

                        {/* Grandchildren */}
                        {childIsOpen && hasGrandChildren && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            {child.children!.map((grand, grandIndex) => (
                              <Link
                                key={grand.slug}
                                href={`/programs/${grand.slug}`}
                                onClick={onClose}
                                className="flex items-center gap-3 pl-16 pr-5 py-2 hover:bg-white/80 transition group"
                              >
                                <span
                                  className="w-1 h-1 rounded-full flex-shrink-0"
                                  style={{
                                    background: [
                                      '#0E7A5F',
                                      '#7A4A8E',
                                      '#8B6914',
                                    ][grandIndex % 3],
                                  }}
                                />
                                <span className="text-[12px] text-gray-600 group-hover:text-[#0F223D] group-hover:font-medium truncate">
                                  {grand.title}
                                </span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}