'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ExternalLink } from 'lucide-react';

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
  const [expandedRoot, setExpandedRoot] = useState<string | null>(tree[0]?.slug || null);
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
      className="absolute top-full left-0 mt-2 w-72 rounded-xl shadow-xl bg-white border border-gray-100 overflow-hidden"
    >
      <div className="py-2">
        {tree.map((root) => {
          const rootIsOpen = expandedRoot === root.slug;
          const hasChildren = root.children && root.children.length > 0;

          return (
            <div key={root.slug} className="flex flex-col">
              {/* Root Item */}
              <div className="flex items-center justify-between group">
                <button
                  onClick={() => hasChildren && toggleRoot(root.slug)}
                  className={`flex-1 flex items-center gap-1.5 px-4 py-3 text-sm transition-colors text-left ${
                    rootIsOpen ? 'text-primary-600 font-medium' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                  }`}
                >
                  <ChevronRight
                    size={14}
                    className={`flex-shrink-0 transition-transform ${
                      rootIsOpen ? 'rotate-90' : ''
                    } ${!hasChildren ? 'opacity-0' : 'text-gray-400'}`}
                  />
                  <span className="truncate">{root.title}</span>
                </button>
                
                {/* Visit Icon */}
                <Link
                  href={`/programs/${root.slug}`}
                  onClick={onClose}
                  className="pr-4 pl-2 py-3 text-gray-300 hover:text-primary-600 transition-colors"
                  title="Visit page"
                >
                  <ExternalLink size={14} />
                </Link>
              </div>

              {/* Children (Dropdown) */}
              <AnimatePresence>
                {rootIsOpen && hasChildren && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-gray-50/50"
                  >
                    {root.children!.map((child) => {
                      const childIsOpen = expandedChild === child.slug;
                      const hasGrandChildren = child.children && child.children.length > 0;

                      return (
                        <div key={child.slug} className="flex flex-col">
                          <div className="flex items-center justify-between group/child">
                            <button
                              onClick={() => hasGrandChildren && toggleChild(child.slug)}
                              className={`flex-1 flex items-center gap-1.5 pl-9 pr-4 py-2.5 text-sm transition-colors text-left ${
                                childIsOpen ? 'text-primary-600 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-primary-600'
                              }`}
                            >
                              <ChevronRight
                                size={12}
                                className={`flex-shrink-0 transition-transform ${
                                  childIsOpen ? 'rotate-90' : ''
                                } ${!hasGrandChildren ? 'opacity-0' : 'text-gray-400'}`}
                              />
                              <span className="truncate">{child.title}</span>
                            </button>
                            
                            <Link
                              href={`/programs/${child.slug}`}
                              onClick={onClose}
                              className="pr-4 pl-2 py-2.5 text-gray-300 hover:text-primary-600 transition-colors"
                              title="Visit page"
                            >
                              <ExternalLink size={12} />
                            </Link>
                          </div>

                          {/* Grandchildren */}
                          <AnimatePresence>
                            {childIsOpen && hasGrandChildren && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                {child.children!.map((grand) => (
                                  <Link
                                    key={grand.slug}
                                    href={`/programs/${grand.slug}`}
                                    onClick={onClose}
                                    className="block pl-14 pr-4 py-2 text-xs text-gray-500 hover:text-primary-600 hover:bg-gray-100 transition-colors truncate"
                                  >
                                    {grand.title}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {/* View All Link */}
        <div className="mt-2 pt-2 border-t border-gray-100">
          <Link
            href="/programs"
            onClick={onClose}
            className="block px-4 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50 transition-colors"
          >
            View All Programs
          </Link>
        </div>
      </div>
    </motion.div>
  );
}