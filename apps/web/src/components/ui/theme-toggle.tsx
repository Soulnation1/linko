'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useTheme, type Theme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'button' | 'segmented' | 'floating';
}

export function ThemeToggle({ className, variant = 'button' }: ThemeToggleProps) {
  const { theme, resolvedTheme, hydrated, setTheme, toggleTheme } = useTheme();

  if (!hydrated) {
    return (
      <div
        className={cn(
          'size-9 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-2 opacity-50',
          className
        )}
      />
    );
  }

  if (variant === 'segmented') {
    const options: { value: Theme; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
      { value: 'light', label: 'Light', icon: Sun },
      { value: 'dark', label: 'Dark', icon: Moon },
      { value: 'system', label: 'System', icon: Laptop },
    ];

    return (
      <div
        className={cn(
          'inline-flex items-center gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1 shadow-inner',
          className
        )}
      >
        {options.map(({ value, label, icon: Icon }) => {
          const isActive = theme === value;
          return (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                'relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all',
                isActive
                  ? 'bg-[#4F46E5] text-white shadow-sm'
                  : 'text-theme-secondary hover:text-theme-primary'
              )}
              aria-label={`Set ${label} theme`}
            >
              <Icon className="size-3.5" />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'floating') {
    return (
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggleTheme}
        className={cn(
          'fixed bottom-6 left-6 z-50 flex size-12 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-theme-primary shadow-2xl backdrop-blur-md transition-colors hover:border-[var(--accent-indigo)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)]',
          className
        )}
        aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Current: ${resolvedTheme} mode. Click to switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode.`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={resolvedTheme}
            initial={{ y: -12, opacity: 0, rotate: -45, scale: 0.7 }}
            animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
            exit={{ y: 12, opacity: 0, rotate: 45, scale: 0.7 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="size-5 text-theme-accent" />
            ) : (
              <Moon className="size-5 text-theme-accent" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className={cn(
        'relative flex size-9 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-theme-primary shadow-sm transition-colors hover:border-[var(--accent-indigo)] hover:bg-[var(--bg-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-indigo)]',
        className
      )}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ y: -10, opacity: 0, rotate: -30 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 10, opacity: 0, rotate: 30 }}
          transition={{ duration: 0.2 }}
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="size-4.5 text-theme-accent" />
          ) : (
            <Moon className="size-4.5 text-theme-accent" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

export default ThemeToggle;
