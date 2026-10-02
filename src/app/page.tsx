'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  QrCode,
  Share2,
  Smartphone,
  Sparkles,
  MessageCircle,
  Scissors,
  Camera,
  Wrench,
  Shirt,
  Utensils,
  Check,
  Building2,
  Download,
} from 'lucide-react';
import { LinkoLogo } from '@/components/ui/logo';
import type { Variants } from 'framer-motion';

// Framer Motion Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export default function LinkoLandingPage() {
  const [activeTab, setActiveTab] = useState<'customer' | 'business'>(
    'customer'
  );
  const [demoCartQty, setDemoCartQty] = useState(2);
  const [orderTimeFilter, setOrderTimeFilter] = useState<
    'day' | 'week' | 'month'
  >('day');

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#141211] font-sans text-[#F5EFEA] selection:bg-[#8C5A4C] selection:text-white">
      {/* 1. Header / Navigation (Fixed Top Bar) */}
      <header className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-[#141211]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group">
            <LinkoLogo size="md" />
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-[#A39890] md:flex">
            <a
              href="#how-it-works"
              className="transition-colors hover:text-white"
            >
              How It Works
            </a>
            <a
              href="#customer-experience"
              className="transition-colors hover:text-white"
            >
              Customer View
            </a>
            <a
              href="#business-experience"
              className="transition-colors hover:text-white"
            >
              Business Workspace
            </a>
            <a href="#use-cases" className="transition-colors hover:text-white">
              Use Cases
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/order-now"
              className="hidden px-3 py-2 text-xs text-[#A39890] transition-colors hover:text-white sm:block sm:text-sm"
            >
              Demo Storefront
            </Link>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#get-started"
              className="rounded-xl bg-[#8C5A4C] px-4 py-2.5 text-xs font-medium text-white shadow-md shadow-[#8C5A4C]/20 transition-all hover:bg-[#9E6756] sm:text-sm"
            >
              Get Started
            </motion.a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden border-b border-white/5 pt-28 pb-20 md:pt-36 md:pb-28">
        {/* Glow backdrop animation */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8C5A4C]/20 blur-[140px]"
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="mx-auto max-w-3xl space-y-6 text-center"
          >
            <motion.div variants={fadeInUp} className="inline-block">
              <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-[#8C5A4C]/30 bg-[#8C5A4C]/20 px-4 py-1.5 text-center font-mono text-xs tracking-wider text-[#D98A5B]">
                <Sparkles className="h-3.5 w-3.5" /> Linko — Simple for
                businesses. Easy for customers.
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl leading-[1.1] font-bold tracking-tight text-[#F5EFEA] sm:text-6xl lg:text-7xl"
            >
              Stop answering the{' '}
              <span className="font-normal text-[#D98A5B] italic">same</span>{' '}
              questions.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mx-auto max-w-2xl text-base leading-relaxed text-[#A39890] sm:text-lg md:text-xl"
            >
              Give your customers one simple link to see what you offer, check
              prices and availability, and get in touch — while you manage
              everything from one place.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#get-started"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8C5A4C] px-8 py-3.5 text-base font-medium text-white shadow-xl shadow-[#8C5A4C]/25 transition-all hover:bg-[#9E6756] sm:w-auto"
              >
                Get Started Free <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#how-it-works"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#221E1C] px-8 py-3.5 text-base font-medium text-[#F5EFEA] transition-all hover:bg-[#2A2422] sm:w-auto"
              >
                See How It Works
              </motion.a>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-6 pt-6 text-xs text-[#A39890]"
            >
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#8C5A4C]" /> Zero customer app
                installs
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#8C5A4C]" /> Instant QR & link
                share
              </span>
            </motion.div>
          </motion.div>

          {/* Hero Dual Mockup Visual with Framer Motion Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-14 grid max-w-5xl grid-cols-1 items-center gap-6 md:grid-cols-12"
          >
            {/* Customer Storefront Mockup */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#181514] p-4 shadow-2xl sm:p-5 md:col-span-6"
            >
              <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <span className="rounded-full border border-[#8C5A4C]/30 bg-[#8C5A4C]/20 px-2.5 py-0.5 font-mono text-[11px] text-[#D98A5B]">
                  linko.app/chuks-kitchen
                </span>
              </div>

              {/* Customer View */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#221E1C] p-3.5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8C5A4C] font-serif text-lg font-bold text-white">
                    CK
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#F5EFEA]">
                      Chuks Kitchen
                    </h4>
                    <p className="flex items-center gap-1 text-xs text-[#A39890]">
                      <span>Lekki Phase 1, Lagos</span> ·{' '}
                      <span className="text-[#D98A5B]">Open Now</span>
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2.5">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-[#221E1C] p-3"
                  >
                    <div>
                      <h5 className="text-xs font-medium text-[#F5EFEA]">
                        Jollof Rice & Chicken
                      </h5>
                      <span className="font-mono text-xs font-bold text-[#F5EFEA]">
                        ₦3,000
                      </span>
                    </div>
                    <span className="rounded-md bg-[#8C5A4C]/20 px-2 py-0.5 font-mono text-[10px] text-[#D98A5B]">
                      Available
                    </span>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-[#221E1C] p-3"
                  >
                    <div>
                      <h5 className="text-xs font-medium text-[#F5EFEA]">
                        Chicken & Chips
                      </h5>
                      <span className="font-mono text-xs font-bold text-[#F5EFEA]">
                        ₦3,500
                      </span>
                    </div>
                    <span className="rounded-md bg-[#8C5A4C]/20 px-2 py-0.5 font-mono text-[10px] text-[#D98A5B]">
                      Available
                    </span>
                  </motion.div>

                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#221E1C] p-3 opacity-50">
                    <div>
                      <h5 className="text-xs font-medium text-[#F5EFEA]">
                        Fresh Juice
                      </h5>
                      <span className="font-mono text-xs text-[#A39890] line-through">
                        ₦1,500
                      </span>
                    </div>
                    <span className="rounded-md bg-red-500/20 px-2 py-0.5 font-mono text-[10px] text-red-400">
                      Sold out
                    </span>
                  </div>
                </div>

                {/* Order Summary Bar */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex cursor-pointer items-center justify-between rounded-xl bg-[#8C5A4C] p-3 text-white shadow-lg"
                >
                  <span className="text-xs font-medium">1 item · ₦3,000</span>
                  <span className="flex items-center gap-1 text-xs font-bold">
                    Continue to WhatsApp <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Business Dashboard Preview */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 rounded-[32px] border border-white/10 bg-[#221E1C] p-5 shadow-2xl md:col-span-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#F5EFEA]">
                    Welcome back, Chuks Kitchen 👋
                  </h4>
                  <p className="text-xs text-[#A39890]">Business Workspace</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8C5A4C]/20 text-xs font-bold text-[#D98A5B]">
                  LIVE
                </div>
              </div>

              {/* Metric Cards (Updated Terminology + Time Filters for Orders) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col justify-between rounded-xl border border-white/5 bg-[#1A1716] p-3">
                  <span className="font-mono text-[10.5px] text-[#A39890] uppercase">
                    Total Products
                  </span>
                  <p className="mt-1 font-mono text-xl font-bold text-[#F5EFEA]">
                    24 Items
                  </p>
                </div>

                <div className="space-y-1 rounded-xl border border-white/5 bg-[#1A1716] p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10.5px] text-[#A39890] uppercase">
                      Orders Count
                    </span>
                    <div className="flex items-center gap-1 rounded border border-white/5 bg-[#221E1C] p-0.5 font-mono text-[9px]">
                      <button
                        onClick={() => setOrderTimeFilter('day')}
                        className={`rounded px-1.5 py-0.5 transition-colors ${
                          orderTimeFilter === 'day'
                            ? 'bg-[#8C5A4C] font-bold text-white'
                            : 'text-[#A39890]'
                        }`}
                      >
                        Day
                      </button>
                      <button
                        onClick={() => setOrderTimeFilter('week')}
                        className={`rounded px-1.5 py-0.5 transition-colors ${
                          orderTimeFilter === 'week'
                            ? 'bg-[#8C5A4C] font-bold text-white'
                            : 'text-[#A39890]'
                        }`}
                      >
                        Week
                      </button>
                      <button
                        onClick={() => setOrderTimeFilter('month')}
                        className={`rounded px-1.5 py-0.5 transition-colors ${
                          orderTimeFilter === 'month'
                            ? 'bg-[#8C5A4C] font-bold text-white'
                            : 'text-[#A39890]'
                        }`}
                      >
                        Month
                      </button>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between pt-0.5">
                    <p className="font-mono text-xl font-bold text-[#D98A5B]">
                      {orderTimeFilter === 'day' && '14'}
                      {orderTimeFilter === 'week' && '86'}
                      {orderTimeFilter === 'month' && '340'}
                    </p>
                    <span className="font-mono text-[10.5px] text-[#A39890]">
                      {orderTimeFilter === 'day' && '₦42,000'}
                      {orderTimeFilter === 'week' && '₦258,000'}
                      {orderTimeFilter === 'month' && '₦1,020,000'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 rounded-xl border border-white/5 bg-[#1A1716] p-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A39890]">Your Shareable Link</span>
                  <button className="flex items-center gap-1 text-[11px] text-[#D98A5B] hover:underline">
                    <Share2 className="h-3 w-3" /> Copy
                  </button>
                </div>
                <div className="truncate rounded-lg border border-white/10 bg-[#221E1C] p-2 font-mono text-xs text-[#F5EFEA]">
                  linko.app/chuks-kitchen
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Problem Section */}
      <section className="border-b border-white/5 bg-[#181514] py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="mx-auto mb-12 max-w-2xl space-y-3 text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="font-mono text-xs tracking-wider text-[#D98A5B] uppercase"
            >
              The Pain Point
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl font-bold text-[#F5EFEA] sm:text-4xl"
            >
              The frustrating traditional back-and-forth
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-sm text-[#A39890] sm:text-base"
            >
              Businesses spend hours answering the exact same questions every
              day across chat apps.
            </motion.p>
          </motion.div>

          <div className="grid items-start gap-8 lg:grid-cols-12">
            {/* Left: Traditional Chat Chaos */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 rounded-2xl border border-white/10 bg-[#221E1C] p-6 shadow-xl lg:col-span-5"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="flex items-center gap-1.5 font-serif text-sm font-bold text-red-400">
                  <span>❌ Traditional Messaging Chaos</span>
                </h3>
                <span className="rounded bg-[#1A1716] px-2 py-0.5 font-mono text-[10px] text-[#A39890]">
                  ~15 mins wasted
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="max-w-[85%] rounded-xl bg-[#1A1716] p-3 text-[#F5EFEA]"
                >
                  "Hi, how much is the chicken?"
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="ml-auto max-w-[85%] rounded-xl border border-[#8C5A4C]/40 bg-[#8C5A4C]/30 p-3 text-right text-[#F5EFEA]"
                >
                  "₦3,000."
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="max-w-[85%] rounded-xl bg-[#1A1716] p-3 text-[#F5EFEA]"
                >
                  "Is it available today?"
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="ml-auto max-w-[85%] rounded-xl border border-[#8C5A4C]/40 bg-[#8C5A4C]/30 p-3 text-right text-[#F5EFEA]"
                >
                  "Yes it is."
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="max-w-[85%] rounded-xl bg-[#1A1716] p-3 text-[#F5EFEA]"
                >
                  "Okay how do I place my order?"
                </motion.div>
                <p className="pt-2 text-center text-[11px] text-[#A39890] italic">
                  Repetitive manual questions for every single customer.
                </p>
              </div>
            </motion.div>

            {/* Right: The Linko Solution Flow */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5 rounded-2xl border border-[#8C5A4C]/40 bg-gradient-to-br from-[#8C5A4C]/20 to-[#221E1C] p-6 shadow-2xl lg:col-span-7"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="flex items-center gap-2 font-serif text-base font-bold text-[#F5EFEA]">
                  <CheckCircle2 className="h-5 w-5 text-[#D98A5B]" /> The Linko
                  Solution Flow
                </h3>
                <span className="rounded-full border border-[#8C5A4C]/40 bg-[#8C5A4C]/30 px-2.5 py-0.5 font-mono text-[10px] text-[#D98A5B]">
                  Instant & Frictionless
                </span>
              </div>

              {/* Step-by-Step Flow List */}
              <div className="space-y-3 text-xs">
                {/* Step 1 & 2 Chat preview */}
                <div className="space-y-2 rounded-xl border border-white/10 bg-[#141211]/80 p-3.5">
                  <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-[#D98A5B]">
                    <span>1. Customer Message & Auto-Response</span>
                  </div>
                  <div className="max-w-[80%] rounded-lg bg-[#1A1716] p-2.5 text-[#F5EFEA]">
                    "Hi"
                  </div>
                  <div className="ml-auto max-w-[85%] rounded-lg border border-[#8C5A4C]/50 bg-[#8C5A4C]/40 p-2.5 text-right text-[#F5EFEA]">
                    "Hi! Click this link to check what we have today:{' '}
                    <span className="font-mono text-[#D98A5B] underline">
                      linko.app/chuks-kitchen
                    </span>
                    "
                  </div>
                </div>

                {/* Step 3 & 4 Menu selection */}
                <div className="space-y-2 rounded-xl border border-white/10 bg-[#141211]/80 p-3.5">
                  <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-[#D98A5B]">
                    <span>2. Customer Opens Link & Selects Products</span>
                  </div>
                  <p className="text-[#A39890]">
                    Customer lands on{' '}
                    <span className="font-semibold text-[#F5EFEA]">
                      Chuks Kitchen
                    </span>{' '}
                    storefront, checks live availability, and selects{' '}
                    <span className="font-semibold text-[#F5EFEA]">
                      2 × Jollof Rice & Chicken
                    </span>
                    .
                  </p>
                </div>

                {/* Step 5 & 6 Order preview & WhatsApp button */}
                <div className="space-y-2 rounded-xl border border-white/10 bg-[#141211]/80 p-3.5">
                  <div className="mb-1 flex items-center justify-between font-mono text-[11px] text-[#D98A5B]">
                    <span>3. Pre-formatted Order & WhatsApp CTA</span>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-[#1A1716] p-2.5 font-mono text-[11px] text-[#F5EFEA]">
                    "Hi Chuks Kitchen, I'd like to order: 2 × Jollof Rice &
                    Chicken — ₦6,000. Total: ₦6,000"
                  </div>
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2.5 text-xs font-bold text-black transition-colors hover:bg-[#20bd5a]">
                    Continue on WhatsApp
                  </button>
                </div>

                {/* Step 7 Vendor reply */}
                <div className="flex items-center justify-between rounded-xl border border-[#8C5A4C]/40 bg-[#8C5A4C]/20 p-3">
                  <span className="font-medium text-[#F5EFEA]">
                    4. Vendor replies with Account Details & completes order!
                  </span>
                  <Check className="h-4 w-4 flex-shrink-0 text-[#D98A5B]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (3 Steps) */}
      <section id="how-it-works" className="border-b border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mx-auto mb-16 max-w-2xl space-y-3 text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="font-mono text-xs tracking-wider text-[#D98A5B] uppercase"
            >
              Simple Process
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl font-bold text-[#F5EFEA] sm:text-5xl"
            >
              How Linko Works
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-sm text-[#A39890] sm:text-base"
            >
              Get your business up and running in three frictionless steps.
            </motion.p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="space-y-4 rounded-2xl border border-white/10 bg-[#221E1C] p-6 shadow-xl transition-all hover:border-[#8C5A4C]/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#8C5A4C]/30 bg-[#8C5A4C]/20 font-mono text-xl font-bold text-[#D98A5B]">
                1
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F5EFEA]">
                Create your business page
              </h3>
              <p className="text-sm leading-relaxed text-[#A39890]">
                Add your products & services, prices, descriptions, images, and
                mark items as available or sold out in seconds.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="space-y-4 rounded-2xl border border-white/10 bg-[#221E1C] p-6 shadow-xl transition-all hover:border-[#8C5A4C]/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#8C5A4C]/30 bg-[#8C5A4C]/20 font-mono text-xl font-bold text-[#D98A5B]">
                2
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F5EFEA]">
                Share your link
              </h3>
              <p className="text-sm leading-relaxed text-[#A39890]">
                Get a permanent shareable link (`linko.app/your-name`) and a
                printable QR code for your store.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="space-y-4 rounded-2xl border border-white/10 bg-[#221E1C] p-6 shadow-xl transition-all hover:border-[#8C5A4C]/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#8C5A4C]/30 bg-[#8C5A4C]/20 font-mono text-xl font-bold text-[#D98A5B]">
                3
              </div>
              <h3 className="font-serif text-lg font-bold text-[#F5EFEA]">
                Customers connect
              </h3>
              <p className="text-sm leading-relaxed text-[#A39890]">
                Customers scan or tap, see what is available, select what they
                need, and complete orders directly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Switcher Showcase (Customer View vs Business Workspace) */}
      <section
        id="customer-experience"
        className="border-b border-white/5 bg-[#181514] py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl space-y-4 text-center">
            <span className="font-mono text-xs tracking-wider text-[#D98A5B] uppercase">
              Dual Product Experiences
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#F5EFEA] sm:text-5xl">
              Built for both customers and business owners
            </h2>
            <p className="text-sm text-[#A39890] sm:text-base">
              Switch between the public customer interface and the private
              business workspace.
            </p>

            {/* Framer Motion Interactive Tab Switcher */}
            <div className="relative mt-4 inline-flex gap-2 rounded-2xl border border-white/10 bg-[#221E1C] p-1.5">
              <button
                onClick={() => setActiveTab('customer')}
                className={`relative z-10 rounded-xl px-6 py-2.5 text-xs font-medium transition-colors sm:text-sm ${
                  activeTab === 'customer'
                    ? 'font-bold text-white'
                    : 'text-[#A39890] hover:text-white'
                }`}
              >
                {activeTab === 'customer' && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 z-[-1] rounded-xl bg-[#8C5A4C]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                1. Customer Experience
              </button>

              <button
                onClick={() => setActiveTab('business')}
                className={`relative z-10 rounded-xl px-6 py-2.5 text-xs font-medium transition-colors sm:text-sm ${
                  activeTab === 'business'
                    ? 'font-bold text-white'
                    : 'text-[#A39890] hover:text-white'
                }`}
              >
                {activeTab === 'business' && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 z-[-1] rounded-xl bg-[#8C5A4C]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                2. Business Workspace
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'customer' ? (
              <motion.div
                key="customer-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-12"
              >
                <div className="space-y-6 lg:col-span-5">
                  <h3 className="font-serif text-2xl font-bold text-[#F5EFEA]">
                    Zero app installs. Pure convenience.
                  </h3>
                  <p className="text-sm leading-relaxed text-[#A39890]">
                    Customers scan your QR code or open your link. No
                    registration, no app store download required. They
                    immediately see what is available and select what they need.
                  </p>
                  <ul className="space-y-3 text-sm text-[#F5EFEA]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#8C5A4C]" />{' '}
                      Instant category browsing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#8C5A4C]" />{' '}
                      Real-time pricing & availability indicators
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#8C5A4C]" />{' '}
                      Seamless WhatsApp order handoff
                    </li>
                  </ul>
                </div>

                <div className="space-y-4 rounded-[32px] border border-white/10 bg-[#221E1C] p-6 shadow-2xl lg:col-span-7">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-[#D98A5B]">
                      linko.app/chuks-kitchen
                    </span>
                    <span className="text-xs text-[#A39890]">
                      Customer View
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <button className="rounded-lg bg-[#8C5A4C] px-3 py-1 text-xs font-medium text-white">
                        Meals
                      </button>
                      <button className="rounded-lg bg-[#1A1716] px-3 py-1 text-xs font-medium text-[#A39890]">
                        Drinks
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#1A1716] p-3">
                        <div>
                          <h4 className="text-xs font-medium text-[#F5EFEA]">
                            Chicken & Chips
                          </h4>
                          <span className="font-mono text-xs text-[#D98A5B]">
                            ₦3,500
                          </span>
                        </div>
                        <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#221E1C] p-1">
                          <button
                            onClick={() =>
                              setDemoCartQty((q) => Math.max(0, q - 1))
                            }
                            className="flex h-6 w-6 items-center justify-center rounded bg-white/5 text-xs text-white"
                          >
                            -
                          </button>
                          <span className="w-4 text-center font-mono text-xs font-bold text-white">
                            {demoCartQty}
                          </span>
                          <button
                            onClick={() => setDemoCartQty((q) => q + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded bg-[#8C5A4C] text-xs text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex cursor-pointer items-center justify-between rounded-xl bg-[#8C5A4C] p-3.5 text-white shadow-lg"
                    >
                      <span className="text-xs font-bold">
                        {demoCartQty} item(s) · ₦{demoCartQty * 3500}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold">
                        Continue to WhatsApp <ArrowRight className="h-4 w-4" />
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="business-tab"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-12"
              >
                <div className="space-y-6 lg:col-span-5">
                  <h3 className="font-serif text-2xl font-bold text-[#F5EFEA]">
                    Your brand. Your workspace.
                  </h3>
                  <p className="text-sm leading-relaxed text-[#A39890]">
                    Linko feels like your own business workspace. Update
                    prices, toggle availability when items run out, track order
                    metrics, and copy your link anytime.
                  </p>
                  <ul className="space-y-3 text-sm text-[#F5EFEA]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#8C5A4C]" /> Order
                      count metrics filtered by Day, Week, & Month
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#8C5A4C]" /> 1-tap
                      product availability toggles
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#8C5A4C]" />{' '}
                      Dynamic link and QR code management
                    </li>
                  </ul>
                </div>

                <div className="space-y-4 rounded-[32px] border border-white/10 bg-[#221E1C] p-6 shadow-2xl lg:col-span-7">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h4 className="font-serif text-base font-bold text-[#F5EFEA]">
                        Welcome back, Chuks Kitchen 👋
                      </h4>
                      <p className="text-xs text-[#A39890]">
                        Linko Business Workspace
                      </p>
                    </div>
                    <span className="rounded-full border border-[#8C5A4C]/30 bg-[#8C5A4C]/20 px-3 py-1 font-mono text-xs text-[#D98A5B]">
                      Dashboard PWA
                    </span>
                  </div>

                  {/* Dashboard Metrics with Time Filter */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col justify-between rounded-xl border border-white/5 bg-[#1A1716] p-3">
                      <span className="font-mono text-[10.5px] text-[#A39890] uppercase">
                        Total Products
                      </span>
                      <p className="mt-1 font-mono text-xl font-bold text-[#F5EFEA]">
                        24 Items
                      </p>
                    </div>

                    <div className="space-y-1 rounded-xl border border-white/5 bg-[#1A1716] p-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10.5px] text-[#A39890] uppercase">
                          Orders Count
                        </span>
                        <div className="flex items-center gap-1 rounded border border-white/5 bg-[#221E1C] p-0.5 font-mono text-[9px]">
                          <button
                            onClick={() => setOrderTimeFilter('day')}
                            className={`rounded px-1.5 py-0.5 transition-colors ${
                              orderTimeFilter === 'day'
                                ? 'bg-[#8C5A4C] font-bold text-white'
                                : 'text-[#A39890]'
                            }`}
                          >
                            Day
                          </button>
                          <button
                            onClick={() => setOrderTimeFilter('week')}
                            className={`rounded px-1.5 py-0.5 transition-colors ${
                              orderTimeFilter === 'week'
                                ? 'bg-[#8C5A4C] font-bold text-white'
                                : 'text-[#A39890]'
                            }`}
                          >
                            Week
                          </button>
                          <button
                            onClick={() => setOrderTimeFilter('month')}
                            className={`rounded px-1.5 py-0.5 transition-colors ${
                              orderTimeFilter === 'month'
                                ? 'bg-[#8C5A4C] font-bold text-white'
                                : 'text-[#A39890]'
                            }`}
                          >
                            Month
                          </button>
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between pt-0.5">
                        <p className="font-mono text-xl font-bold text-[#D98A5B]">
                          {orderTimeFilter === 'day' && '14'}
                          {orderTimeFilter === 'week' && '86'}
                          {orderTimeFilter === 'month' && '340'}
                        </p>
                        <span className="font-mono text-[10.5px] text-[#A39890]">
                          {orderTimeFilter === 'day' && '₦42,000'}
                          {orderTimeFilter === 'week' && '₦258,000'}
                          {orderTimeFilter === 'month' && '₦1,020,000'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#1A1716] p-3 text-xs">
                      <span className="font-medium text-[#F5EFEA]">
                        Jollof Rice & Chicken
                      </span>
                      <span className="font-mono text-[#F5EFEA]">₦3,000</span>
                      <span className="rounded bg-green-500/10 px-2 py-0.5 text-xs font-bold text-green-400">
                        Available
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#1A1716] p-3 text-xs">
                      <span className="font-medium text-[#F5EFEA]">
                        Fresh Juice
                      </span>
                      <span className="font-mono text-[#F5EFEA]">₦1,500</span>
                      <span className="rounded bg-red-500/10 px-2 py-0.5 text-xs font-bold text-red-400">
                        Sold out
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 6. Permanent Link & QR Code */}
      <section className="border-b border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <span className="font-mono text-xs tracking-wider text-[#D98A5B] uppercase">
                One Link & QR Code
              </span>
              <h2 className="font-serif text-3xl leading-tight font-bold text-[#F5EFEA] sm:text-4xl">
                One link. Always up to date. Put your business one scan away.
              </h2>
              <p className="text-sm leading-relaxed text-[#A39890]">
                Place your link in your Instagram bio, WhatsApp Business
                profile, flyers, or store counter. Update your prices anytime —
                your link and QR code never change.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-[#F5EFEA]">
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#221E1C] p-3">
                  <CheckCircle2 className="h-4 w-4 text-[#8C5A4C]" /> Instagram
                  Bio
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#221E1C] p-3">
                  <CheckCircle2 className="h-4 w-4 text-[#8C5A4C]" /> WhatsApp
                  Business
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#221E1C] p-3">
                  <CheckCircle2 className="h-4 w-4 text-[#8C5A4C]" /> Store
                  Flyers
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#221E1C] p-3">
                  <CheckCircle2 className="h-4 w-4 text-[#8C5A4C]" /> Table
                  Stickers
                </div>
              </div>
            </div>

            {/* QR Visual Animated */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="space-y-6 rounded-[32px] border border-white/10 bg-[#221E1C] p-8 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-2xl bg-white p-4 shadow-lg">
                <QrCode className="h-full w-full text-black" />
              </div>
              <div>
                <p className="font-mono text-sm font-bold text-[#D98A5B]">
                  linko.app/chuks-kitchen
                </p>
                <p className="mt-1 text-xs text-[#A39890]">
                  Scan with any smartphone camera to open live page
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. WhatsApp Communication Showcase */}
      <section className="border-b border-white/5 bg-[#181514] py-20">
        <div className="mx-auto max-w-4xl space-y-8 px-4 text-center sm:px-6 lg:px-8">
          <div className="space-y-3">
            <span className="font-mono text-xs tracking-wider text-[#D98A5B] uppercase">
              Frictionless Handoff
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#F5EFEA] sm:text-4xl">
              Pre-formatted WhatsApp Messages
            </h2>
            <p className="mx-auto max-w-xl text-sm text-[#A39890]">
              Linko does not replace WhatsApp — it powers it. Customers reach
              out with their exact selection and total already formatted.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-md space-y-4 rounded-2xl border border-white/10 bg-[#221E1C] p-6 text-left shadow-xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 pb-2 font-mono text-xs text-[#D98A5B]">
              <MessageCircle className="h-4 w-4" /> Generated WhatsApp Order
              Message
            </div>
            <div className="rounded-xl border border-white/5 bg-[#1A1716] p-4 font-mono text-xs leading-relaxed text-[#F5EFEA]">
              "Hi Chuks Kitchen, I'd like to order:
              <br />
              2 × Jollof Rice & Chicken — ₦6,000
              <br />
              1 × Fresh Juice — ₦1,500
              <br />
              <br />
              Total: ₦7,500"
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-black shadow-lg transition-colors hover:bg-[#20bd5a]"
            >
              Continue on WhatsApp
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 8. For Every Kind of Business (Multi-Industry Grid) */}
      <section id="use-cases" className="border-b border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mx-auto mb-16 max-w-2xl space-y-3 text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="font-mono text-xs tracking-wider text-[#D98A5B] uppercase"
            >
              Industry Neutral
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-3xl font-bold text-[#F5EFEA] sm:text-5xl"
            >
              Not just menus. Your business, your way.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-sm text-[#A39890] sm:text-base"
            >
              Whether you sell products, offer services, take bookings, or
              receive orders, Linko gives your customers a simple way to find
              what they need.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { title: 'Restaurants & Food', icon: Utensils },
              { title: 'Barbers & Salons', icon: Scissors },
              { title: 'Fashion & Tailors', icon: Shirt },
              { title: 'Electronics & Retail', icon: Smartphone },
              { title: 'Photographers', icon: Camera },
              { title: 'Mechanics & Repairs', icon: Wrench },
              { title: 'Local Services', icon: Building2 },
              { title: 'Bakeries & Pastries', icon: Sparkles },
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -6, borderColor: 'rgba(140, 90, 76, 0.5)' }}
                  className="space-y-3 rounded-2xl border border-white/10 bg-[#221E1C] p-5 text-center shadow-md transition-all"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[#8C5A4C]/20 text-[#D98A5B]">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-[#F5EFEA]">
                    {item.title}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. PWA Section */}
      <section className="border-b border-white/5 bg-[#181514] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 rounded-[32px] border border-white/10 bg-[#221E1C] p-8 shadow-2xl md:grid-cols-12 md:p-12">
            <div className="space-y-4 md:col-span-7">
              <span className="font-mono text-xs tracking-wider text-[#D98A5B] uppercase">
                PWA First
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#F5EFEA]">
                Keep your business one tap away.
              </h2>
              <p className="text-sm leading-relaxed text-[#A39890]">
                Install Linko on your phone for instant 1-tap access to your
                business workspace. Zero installation required for your
                customers.
              </p>
            </div>
            <div className="text-center md:col-span-5">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#8C5A4C] px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#8C5A4C]/30 hover:bg-[#9E6756]"
              >
                <Download className="h-4 w-4" /> Install Dashboard PWA
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section id="get-started" className="relative overflow-hidden py-24">
        <div className="relative z-10 mx-auto max-w-4xl space-y-8 px-4 text-center sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-[#F5EFEA] sm:text-6xl">
              Ready to save yourself some time?
            </h2>
            <p className="mx-auto max-w-xl text-base text-[#A39890] sm:text-lg">
              Create your business page, share one link, and let your customers
              find what they need without the back-and-forth.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/order-now"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#8C5A4C] px-8 py-4 text-base font-medium text-white shadow-xl shadow-[#8C5A4C]/30 transition-all hover:bg-[#9E6756] sm:w-auto"
              >
                Create Your Business <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/order-now"
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-[#221E1C] px-8 py-4 text-base font-medium text-[#F5EFEA] transition-all hover:bg-[#2A2422] sm:w-auto"
              >
                Explore Demo Storefront
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="border-t border-white/10 py-12 text-xs text-[#A39890]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
          <Link href="/" className="group">
            <LinkoLogo size="sm" />
          </Link>

          <p>
            © {new Date().getFullYear()} Linko. Simple for businesses. Easy for
            customers.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#how-it-works"
              className="transition-colors hover:text-white"
            >
              How It Works
            </a>
            <a href="#use-cases" className="transition-colors hover:text-white">
              Use Cases
            </a>
            <Link
              href="/order-now"
              className="transition-colors hover:text-white"
            >
              Demo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
