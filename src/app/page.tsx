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
  Store,
  MessageCircle,
  Plus,
  Minus,
  ShoppingBag,
  Scissors,
  Camera,
  Wrench,
  Shirt,
  Utensils,
  Check,
  Building2,
  Download,
} from 'lucide-react';
import { BusinessHeader } from '@/components/ui/business-header';
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

export default function SaveUsLandingPage() {
  const [activeTab, setActiveTab] = useState<'customer' | 'business'>('customer');
  const [demoCartQty, setDemoCartQty] = useState(2);
  const [orderTimeFilter, setOrderTimeFilter] = useState<'day' | 'week' | 'month'>('day');

  return (
    <div className="min-h-screen bg-[#141211] text-[#F5EFEA] font-sans selection:bg-[#8C5A4C] selection:text-white overflow-x-hidden">
      {/* 1. Header / Navigation (Fixed Top Bar) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#141211]/90 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="w-8 h-8 rounded-xl bg-[#8C5A4C] flex items-center justify-center font-serif font-bold text-lg text-white shadow-md shadow-[#8C5A4C]/30"
            >
              S
            </motion.div>
            <span className="font-serif font-bold text-xl tracking-tight text-[#F5EFEA]">
              SaveUs<span className="text-[#D98A5B]">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[#A39890]">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#customer-experience" className="hover:text-white transition-colors">
              Customer View
            </a>
            <a href="#business-experience" className="hover:text-white transition-colors">
              Business Workspace
            </a>
            <a href="#use-cases" className="hover:text-white transition-colors">
              Use Cases
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/order-now"
              className="text-xs sm:text-sm text-[#A39890] hover:text-white px-3 py-2 transition-colors hidden sm:block"
            >
              Demo Storefront
            </Link>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#get-started"
              className="bg-[#8C5A4C] hover:bg-[#9E6756] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#8C5A4C]/20"
            >
              Get Started
            </motion.a>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 border-b border-white/5">
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
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8C5A4C]/20 rounded-full blur-[140px] pointer-events-none"
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <motion.div variants={fadeInUp} className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8C5A4C]/20 border border-[#8C5A4C]/30 text-[#D98A5B] text-xs font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> SaveUs — Less asking. More doing.
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F5EFEA] leading-[1.1]"
            >
              Stop answering the <span className="text-[#D98A5B] italic font-normal">same</span> questions.
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-[#A39890] text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Give your customers one simple link to see what you offer, check prices and availability, and get in touch — while you manage everything from one place.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="#get-started"
                className="w-full sm:w-auto bg-[#8C5A4C] hover:bg-[#9E6756] text-white font-medium text-base px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-[#8C5A4C]/25"
              >
                Get Started Free <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#how-it-works"
                className="w-full sm:w-auto bg-[#221E1C] hover:bg-[#2A2422] text-[#F5EFEA] border border-white/10 font-medium text-base px-8 py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all"
              >
                See How It Works
              </motion.a>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div variants={fadeInUp} className="pt-6 flex items-center justify-center gap-6 text-xs text-[#A39890]">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#8C5A4C]" /> Zero customer app installs
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#8C5A4C]" /> Instant QR & link share
              </span>
            </motion.div>
          </motion.div>

          {/* Hero Dual Mockup Visual with Framer Motion Entrance */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
          >
            {/* Customer Storefront Mockup */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-6 bg-[#181514] border border-white/10 rounded-[32px] p-4 sm:p-5 shadow-2xl relative overflow-hidden group"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[11px] font-mono text-[#D98A5B] bg-[#8C5A4C]/20 px-2.5 py-0.5 rounded-full border border-[#8C5A4C]/30">
                  saveus.app/chuks-kitchen
                </span>
              </div>

              {/* Customer View */}
              <div className="space-y-4">
                <div className="bg-[#221E1C] border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#8C5A4C] text-white font-serif font-bold text-lg flex items-center justify-center">
                    CK
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#F5EFEA]">Chuks Kitchen</h4>
                    <p className="text-xs text-[#A39890] flex items-center gap-1">
                      <span>Lekki Phase 1, Lagos</span> · <span className="text-[#D98A5B]">Open Now</span>
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2.5">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-[#221E1C] border border-white/10 p-3 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <h5 className="font-medium text-xs text-[#F5EFEA]">Jollof Rice & Chicken</h5>
                      <span className="font-mono text-xs font-bold text-[#F5EFEA]">₦3,000</span>
                    </div>
                    <span className="text-[10px] bg-[#8C5A4C]/20 text-[#D98A5B] px-2 py-0.5 rounded-md font-mono">
                      Available
                    </span>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="bg-[#221E1C] border border-white/10 p-3 rounded-xl flex items-center justify-between"
                  >
                    <div>
                      <h5 className="font-medium text-xs text-[#F5EFEA]">Chicken & Chips</h5>
                      <span className="font-mono text-xs font-bold text-[#F5EFEA]">₦3,500</span>
                    </div>
                    <span className="text-[10px] bg-[#8C5A4C]/20 text-[#D98A5B] px-2 py-0.5 rounded-md font-mono">
                      Available
                    </span>
                  </motion.div>

                  <div className="bg-[#221E1C] border border-white/10 p-3 rounded-xl flex items-center justify-between opacity-50">
                    <div>
                      <h5 className="font-medium text-xs text-[#F5EFEA]">Fresh Juice</h5>
                      <span className="font-mono text-xs line-through text-[#A39890]">₦1,500</span>
                    </div>
                    <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-md font-mono">
                      Sold out
                    </span>
                  </div>
                </div>

                {/* Order Summary Bar */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#8C5A4C] text-white p-3 rounded-xl flex items-center justify-between shadow-lg cursor-pointer"
                >
                  <span className="text-xs font-medium">1 item · ₦3,000</span>
                  <span className="text-xs font-bold flex items-center gap-1">
                    Continue to WhatsApp <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Business Dashboard Preview */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-6 bg-[#221E1C] border border-white/10 rounded-[32px] p-5 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h4 className="font-serif font-bold text-base text-[#F5EFEA]">
                    Welcome back, Chuks Kitchen 👋
                  </h4>
                  <p className="text-xs text-[#A39890]">Business Workspace</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#8C5A4C]/20 text-[#D98A5B] flex items-center justify-center text-xs font-bold">
                  LIVE
                </div>
              </div>

              {/* Metric Cards (Updated Terminology + Time Filters for Orders) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1A1716] p-3 rounded-xl border border-white/5 flex flex-col justify-between">
                  <span className="text-[10.5px] text-[#A39890] uppercase font-mono">Total Products</span>
                  <p className="text-xl font-bold font-mono text-[#F5EFEA] mt-1">24 Items</p>
                </div>

                <div className="bg-[#1A1716] p-3 rounded-xl border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10.5px] text-[#A39890] uppercase font-mono">Orders Count</span>
                    <div className="flex items-center gap-1 bg-[#221E1C] p-0.5 rounded border border-white/5 text-[9px] font-mono">
                      <button
                        onClick={() => setOrderTimeFilter('day')}
                        className={`px-1.5 py-0.5 rounded transition-colors ${
                          orderTimeFilter === 'day' ? 'bg-[#8C5A4C] text-white font-bold' : 'text-[#A39890]'
                        }`}
                      >
                        Day
                      </button>
                      <button
                        onClick={() => setOrderTimeFilter('week')}
                        className={`px-1.5 py-0.5 rounded transition-colors ${
                          orderTimeFilter === 'week' ? 'bg-[#8C5A4C] text-white font-bold' : 'text-[#A39890]'
                        }`}
                      >
                        Week
                      </button>
                      <button
                        onClick={() => setOrderTimeFilter('month')}
                        className={`px-1.5 py-0.5 rounded transition-colors ${
                          orderTimeFilter === 'month' ? 'bg-[#8C5A4C] text-white font-bold' : 'text-[#A39890]'
                        }`}
                      >
                        Month
                      </button>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between pt-0.5">
                    <p className="text-xl font-bold font-mono text-[#D98A5B]">
                      {orderTimeFilter === 'day' && '14'}
                      {orderTimeFilter === 'week' && '86'}
                      {orderTimeFilter === 'month' && '340'}
                    </p>
                    <span className="text-[10.5px] font-mono text-[#A39890]">
                      {orderTimeFilter === 'day' && '₦42,000'}
                      {orderTimeFilter === 'week' && '₦258,000'}
                      {orderTimeFilter === 'month' && '₦1,020,000'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1A1716] p-3.5 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#A39890]">Your Shareable Link</span>
                  <button className="text-[#D98A5B] hover:underline flex items-center gap-1 text-[11px]">
                    <Share2 className="w-3 h-3" /> Copy
                  </button>
                </div>
                <div className="font-mono text-xs text-[#F5EFEA] bg-[#221E1C] p-2 rounded-lg border border-white/10 truncate">
                  saveus.app/chuks-kitchen
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Problem Section */}
      <section className="py-20 border-b border-white/5 bg-[#181514]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto space-y-3 mb-12"
          >
            <motion.span variants={fadeInUp} className="text-xs font-mono uppercase tracking-wider text-[#D98A5B]">
              The Pain Point
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-4xl font-bold text-[#F5EFEA]">
              The frustrating traditional back-and-forth
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-sm sm:text-base text-[#A39890]">
              Businesses spend hours answering the exact same questions every day across chat apps.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: Traditional Chat Chaos */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 bg-[#221E1C] border border-white/10 rounded-2xl p-6 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif font-bold text-sm text-red-400 flex items-center gap-1.5">
                  <span>❌ Traditional Messaging Chaos</span>
                </h3>
                <span className="text-[10px] font-mono text-[#A39890] bg-[#1A1716] px-2 py-0.5 rounded">
                  ~15 mins wasted
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-[#1A1716] p-3 rounded-xl text-[#F5EFEA] max-w-[85%]"
                >
                  "Hi, how much is the chicken?"
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#8C5A4C]/30 p-3 rounded-xl text-[#F5EFEA] max-w-[85%] ml-auto text-right border border-[#8C5A4C]/40"
                >
                  "₦3,000."
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#1A1716] p-3 rounded-xl text-[#F5EFEA] max-w-[85%]"
                >
                  "Is it available today?"
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-[#8C5A4C]/30 p-3 rounded-xl text-[#F5EFEA] max-w-[85%] ml-auto text-right border border-[#8C5A4C]/40"
                >
                  "Yes it is."
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-[#1A1716] p-3 rounded-xl text-[#F5EFEA] max-w-[85%]"
                >
                  "Okay how do I place my order?"
                </motion.div>
                <p className="text-[11px] text-[#A39890] italic text-center pt-2">
                  Repetitive manual questions for every single customer.
                </p>
              </div>
            </motion.div>

            {/* Right: The SaveUs Solution Flow */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-gradient-to-br from-[#8C5A4C]/20 to-[#221E1C] border border-[#8C5A4C]/40 rounded-2xl p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif font-bold text-base text-[#F5EFEA] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#D98A5B]" /> The SaveUs Solution Flow
                </h3>
                <span className="text-[10px] font-mono text-[#D98A5B] bg-[#8C5A4C]/30 px-2.5 py-0.5 rounded-full border border-[#8C5A4C]/40">
                  Instant & Frictionless
                </span>
              </div>

              {/* Step-by-Step Flow List */}
              <div className="space-y-3 text-xs">
                {/* Step 1 & 2 Chat preview */}
                <div className="space-y-2 bg-[#141211]/80 p-3.5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-[11px] text-[#D98A5B] font-mono mb-1">
                    <span>1. Customer Message & Auto-Response</span>
                  </div>
                  <div className="bg-[#1A1716] p-2.5 rounded-lg text-[#F5EFEA] max-w-[80%]">
                    "Hi"
                  </div>
                  <div className="bg-[#8C5A4C]/40 p-2.5 rounded-lg text-[#F5EFEA] max-w-[85%] ml-auto text-right border border-[#8C5A4C]/50">
                    "Hi! Click this link to check what we have today: <span className="underline text-[#D98A5B] font-mono">saveus.app/chuks-kitchen</span>"
                  </div>
                </div>

                {/* Step 3 & 4 Menu selection */}
                <div className="space-y-2 bg-[#141211]/80 p-3.5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-[11px] text-[#D98A5B] font-mono mb-1">
                    <span>2. Customer Opens Link & Selects Products</span>
                  </div>
                  <p className="text-[#A39890]">
                    Customer lands on <span className="text-[#F5EFEA] font-semibold">Chuks Kitchen</span> storefront, checks live availability, and selects <span className="text-[#F5EFEA] font-semibold">2 × Jollof Rice & Chicken</span>.
                  </p>
                </div>

                {/* Step 5 & 6 Order preview & WhatsApp button */}
                <div className="space-y-2 bg-[#141211]/80 p-3.5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-between text-[11px] text-[#D98A5B] font-mono mb-1">
                    <span>3. Pre-formatted Order & WhatsApp CTA</span>
                  </div>
                  <div className="bg-[#1A1716] p-2.5 rounded-lg font-mono text-[11px] text-[#F5EFEA] border border-white/5">
                    "Hi Chuks Kitchen, I'd like to order: 2 × Jollof Rice & Chicken — ₦6,000. Total: ₦6,000"
                  </div>
                  <button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    Continue on WhatsApp
                  </button>
                </div>

                {/* Step 7 Vendor reply */}
                <div className="bg-[#8C5A4C]/20 border border-[#8C5A4C]/40 p-3 rounded-xl flex items-center justify-between">
                  <span className="text-[#F5EFEA] font-medium">4. Vendor replies with Account Details & completes order!</span>
                  <Check className="w-4 h-4 text-[#D98A5B] flex-shrink-0" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (3 Steps) */}
      <section id="how-it-works" className="py-20 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto space-y-3 mb-16"
          >
            <motion.span variants={fadeInUp} className="text-xs font-mono uppercase tracking-wider text-[#D98A5B]">
              Simple Process
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EFEA]">
              How SaveUs Works
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-sm sm:text-base text-[#A39890]">
              Get your business up and running in three frictionless steps.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-[#221E1C] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-[#8C5A4C]/50 transition-all shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#8C5A4C]/20 text-[#D98A5B] font-mono font-bold text-xl flex items-center justify-center border border-[#8C5A4C]/30">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-[#F5EFEA]">Create your business page</h3>
              <p className="text-sm text-[#A39890] leading-relaxed">
                Add your products & services, prices, descriptions, images, and mark items as available or sold out in seconds.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-[#221E1C] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-[#8C5A4C]/50 transition-all shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#8C5A4C]/20 text-[#D98A5B] font-mono font-bold text-xl flex items-center justify-center border border-[#8C5A4C]/30">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-[#F5EFEA]">Share your link</h3>
              <p className="text-sm text-[#A39890] leading-relaxed">
                Get a permanent shareable link (`saveus.app/your-name`) and a printable QR code for your store.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="bg-[#221E1C] border border-white/10 rounded-2xl p-6 space-y-4 hover:border-[#8C5A4C]/50 transition-all shadow-xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#8C5A4C]/20 text-[#D98A5B] font-mono font-bold text-xl flex items-center justify-center border border-[#8C5A4C]/30">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-[#F5EFEA]">Customers connect</h3>
              <p className="text-sm text-[#A39890] leading-relaxed">
                Customers scan or tap, see what is available, select what they need, and complete orders directly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Switcher Showcase (Customer View vs Business Workspace) */}
      <section id="customer-experience" className="py-20 border-b border-white/5 bg-[#181514]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D98A5B]">
              Dual Product Experiences
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EFEA]">
              Built for both customers and business owners
            </h2>
            <p className="text-sm sm:text-base text-[#A39890]">
              Switch between the public customer interface and the private business workspace.
            </p>

            {/* Framer Motion Interactive Tab Switcher */}
            <div className="inline-flex p-1.5 bg-[#221E1C] border border-white/10 rounded-2xl gap-2 mt-4 relative">
              <button
                onClick={() => setActiveTab('customer')}
                className={`relative px-6 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors z-10 ${
                  activeTab === 'customer' ? 'text-white font-bold' : 'text-[#A39890] hover:text-white'
                }`}
              >
                {activeTab === 'customer' && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-[#8C5A4C] rounded-xl z-[-1]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                1. Customer Experience
              </button>

              <button
                onClick={() => setActiveTab('business')}
                className={`relative px-6 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors z-10 ${
                  activeTab === 'business' ? 'text-white font-bold' : 'text-[#A39890] hover:text-white'
                }`}
              >
                {activeTab === 'business' && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-[#8C5A4C] rounded-xl z-[-1]"
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
                className="grid lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto"
              >
                <div className="lg:col-span-5 space-y-6">
                  <h3 className="font-serif text-2xl font-bold text-[#F5EFEA]">
                    Zero app installs. Pure convenience.
                  </h3>
                  <p className="text-sm text-[#A39890] leading-relaxed">
                    Customers scan your QR code or open your link. No registration, no app store download required. They immediately see what is available and select what they need.
                  </p>
                  <ul className="space-y-3 text-sm text-[#F5EFEA]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8C5A4C]" /> Instant category browsing
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8C5A4C]" /> Real-time pricing & availability indicators
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8C5A4C]" /> Seamless WhatsApp order handoff
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-7 bg-[#221E1C] border border-white/10 rounded-[32px] p-6 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-mono text-xs text-[#D98A5B]">saveus.app/chuks-kitchen</span>
                    <span className="text-xs text-[#A39890]">Customer View</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-[#8C5A4C] text-white rounded-lg text-xs font-medium">
                        Meals
                      </button>
                      <button className="px-3 py-1 bg-[#1A1716] text-[#A39890] rounded-lg text-xs font-medium">
                        Drinks
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="bg-[#1A1716] p-3 rounded-xl flex items-center justify-between border border-white/5">
                        <div>
                          <h4 className="font-medium text-xs text-[#F5EFEA]">Chicken & Chips</h4>
                          <span className="font-mono text-xs text-[#D98A5B]">₦3,500</span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#221E1C] p-1 rounded-lg border border-white/10">
                          <button
                            onClick={() => setDemoCartQty((q) => Math.max(0, q - 1))}
                            className="w-6 h-6 rounded bg-white/5 text-white flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs font-bold text-white w-4 text-center">{demoCartQty}</span>
                          <button
                            onClick={() => setDemoCartQty((q) => q + 1)}
                            className="w-6 h-6 rounded bg-[#8C5A4C] text-white flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-[#8C5A4C] text-white p-3.5 rounded-xl flex items-center justify-between shadow-lg cursor-pointer"
                    >
                      <span className="text-xs font-bold">{demoCartQty} item(s) · ₦{demoCartQty * 3500}</span>
                      <span className="text-xs font-bold flex items-center gap-1">
                        Continue to WhatsApp <ArrowRight className="w-4 h-4" />
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
                className="grid lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto"
              >
                <div className="lg:col-span-5 space-y-6">
                  <h3 className="font-serif text-2xl font-bold text-[#F5EFEA]">
                    Your brand. Your workspace.
                  </h3>
                  <p className="text-sm text-[#A39890] leading-relaxed">
                    SaveUs feels like your own business workspace. Update prices, toggle availability when items run out, track order metrics, and copy your link anytime.
                  </p>
                  <ul className="space-y-3 text-sm text-[#F5EFEA]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8C5A4C]" /> Order count metrics filtered by Day, Week, & Month
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8C5A4C]" /> 1-tap product availability toggles
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#8C5A4C]" /> Dynamic link and QR code management
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-7 bg-[#221E1C] border border-white/10 rounded-[32px] p-6 shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#F5EFEA]">
                        Welcome back, Chuks Kitchen 👋
                      </h4>
                      <p className="text-xs text-[#A39890]">SaveUs Business Workspace</p>
                    </div>
                    <span className="text-xs font-mono bg-[#8C5A4C]/20 text-[#D98A5B] px-3 py-1 rounded-full border border-[#8C5A4C]/30">
                      Dashboard PWA
                    </span>
                  </div>

                  {/* Dashboard Metrics with Time Filter */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#1A1716] p-3 rounded-xl border border-white/5 flex flex-col justify-between">
                      <span className="text-[10.5px] text-[#A39890] uppercase font-mono">Total Products</span>
                      <p className="text-xl font-bold font-mono text-[#F5EFEA] mt-1">24 Items</p>
                    </div>

                    <div className="bg-[#1A1716] p-3 rounded-xl border border-white/5 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10.5px] text-[#A39890] uppercase font-mono">Orders Count</span>
                        <div className="flex items-center gap-1 bg-[#221E1C] p-0.5 rounded border border-white/5 text-[9px] font-mono">
                          <button
                            onClick={() => setOrderTimeFilter('day')}
                            className={`px-1.5 py-0.5 rounded transition-colors ${
                              orderTimeFilter === 'day' ? 'bg-[#8C5A4C] text-white font-bold' : 'text-[#A39890]'
                            }`}
                          >
                            Day
                          </button>
                          <button
                            onClick={() => setOrderTimeFilter('week')}
                            className={`px-1.5 py-0.5 rounded transition-colors ${
                              orderTimeFilter === 'week' ? 'bg-[#8C5A4C] text-white font-bold' : 'text-[#A39890]'
                            }`}
                          >
                            Week
                          </button>
                          <button
                            onClick={() => setOrderTimeFilter('month')}
                            className={`px-1.5 py-0.5 rounded transition-colors ${
                              orderTimeFilter === 'month' ? 'bg-[#8C5A4C] text-white font-bold' : 'text-[#A39890]'
                            }`}
                          >
                            Month
                          </button>
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between pt-0.5">
                        <p className="text-xl font-bold font-mono text-[#D98A5B]">
                          {orderTimeFilter === 'day' && '14'}
                          {orderTimeFilter === 'week' && '86'}
                          {orderTimeFilter === 'month' && '340'}
                        </p>
                        <span className="text-[10.5px] font-mono text-[#A39890]">
                          {orderTimeFilter === 'day' && '₦42,000'}
                          {orderTimeFilter === 'week' && '₦258,000'}
                          {orderTimeFilter === 'month' && '₦1,020,000'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="bg-[#1A1716] p-3 rounded-xl flex items-center justify-between border border-white/5 text-xs">
                      <span className="font-medium text-[#F5EFEA]">Jollof Rice & Chicken</span>
                      <span className="font-mono text-[#F5EFEA]">₦3,000</span>
                      <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                        Available
                      </span>
                    </div>

                    <div className="bg-[#1A1716] p-3 rounded-xl flex items-center justify-between border border-white/5 text-xs">
                      <span className="font-medium text-[#F5EFEA]">Fresh Juice</span>
                      <span className="font-mono text-[#F5EFEA]">₦1,500</span>
                      <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded">
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
      <section className="py-20 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D98A5B]">
                One Link & QR Code
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5EFEA] leading-tight">
                One link. Always up to date. Put your business one scan away.
              </h2>
              <p className="text-sm text-[#A39890] leading-relaxed">
                Place your link in your Instagram bio, WhatsApp Business profile, flyers, or store counter. Update your prices anytime — your link and QR code never change.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs text-[#F5EFEA]">
                <div className="bg-[#221E1C] p-3 rounded-xl border border-white/10 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5A4C]" /> Instagram Bio
                </div>
                <div className="bg-[#221E1C] p-3 rounded-xl border border-white/10 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5A4C]" /> WhatsApp Business
                </div>
                <div className="bg-[#221E1C] p-3 rounded-xl border border-white/10 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5A4C]" /> Store Flyers
                </div>
                <div className="bg-[#221E1C] p-3 rounded-xl border border-white/10 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8C5A4C]" /> Table Stickers
                </div>
              </div>
            </div>

            {/* QR Visual Animated */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#221E1C] border border-white/10 rounded-[32px] p-8 text-center space-y-6 shadow-2xl"
            >
              <div className="w-44 h-44 bg-white p-4 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                <QrCode className="w-full h-full text-black" />
              </div>
              <div>
                <p className="font-mono text-sm text-[#D98A5B] font-bold">saveus.app/chuks-kitchen</p>
                <p className="text-xs text-[#A39890] mt-1">Scan with any smartphone camera to open live page</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. WhatsApp Communication Showcase */}
      <section className="py-20 border-b border-white/5 bg-[#181514]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D98A5B]">
              Frictionless Handoff
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5EFEA]">
              Pre-formatted WhatsApp Messages
            </h2>
            <p className="text-sm text-[#A39890] max-w-xl mx-auto">
              SaveUs does not replace WhatsApp — it powers it. Customers reach out with their exact selection and total already formatted.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#221E1C] border border-white/10 rounded-2xl p-6 max-w-md mx-auto text-left space-y-4 shadow-xl"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#D98A5B] border-b border-white/10 pb-2">
              <MessageCircle className="w-4 h-4" /> Generated WhatsApp Order Message
            </div>
            <div className="bg-[#1A1716] p-4 rounded-xl font-mono text-xs text-[#F5EFEA] leading-relaxed border border-white/5">
              "Hi Chuks Kitchen, I'd like to order:<br />
              2 × Jollof Rice & Chicken — ₦6,000<br />
              1 × Fresh Juice — ₦1,500<br />
              <br />
              Total: ₦7,500"
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg"
            >
              Continue on WhatsApp
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 8. For Every Kind of Business (Multi-Industry Grid) */}
      <section id="use-cases" className="py-20 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-2xl mx-auto space-y-3 mb-16"
          >
            <motion.span variants={fadeInUp} className="text-xs font-mono uppercase tracking-wider text-[#D98A5B]">
              Industry Neutral
            </motion.span>
            <motion.h2 variants={fadeInUp} className="font-serif text-3xl sm:text-5xl font-bold text-[#F5EFEA]">
              Not just menus. Your business, your way.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-sm sm:text-base text-[#A39890]">
              Whether you sell products, offer services, take bookings, or receive orders, SaveUs gives your customers a simple way to find what they need.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                  className="bg-[#221E1C] border border-white/10 p-5 rounded-2xl space-y-3 text-center transition-all shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#8C5A4C]/20 text-[#D98A5B] flex items-center justify-center mx-auto">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-[#F5EFEA]">{item.title}</h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. PWA Section */}
      <section className="py-20 border-b border-white/5 bg-[#181514]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#221E1C] border border-white/10 rounded-[32px] p-8 md:p-12 grid md:grid-cols-12 gap-8 items-center shadow-2xl">
            <div className="md:col-span-7 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D98A5B]">PWA First</span>
              <h2 className="font-serif text-3xl font-bold text-[#F5EFEA]">
                Keep your business one tap away.
              </h2>
              <p className="text-sm text-[#A39890] leading-relaxed">
                Install SaveUs on your phone for instant 1-tap access to your business workspace. Zero installation required for your customers.
              </p>
            </div>
            <div className="md:col-span-5 text-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#8C5A4C] hover:bg-[#9E6756] text-white font-medium text-sm px-6 py-3.5 rounded-xl inline-flex items-center gap-2 shadow-lg shadow-[#8C5A4C]/30"
              >
                <Download className="w-4 h-4" /> Install Dashboard PWA
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Final CTA */}
      <section id="get-started" className="py-24 relative overflow-hidden">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-[#F5EFEA] tracking-tight">
              Ready to save yourself some time?
            </h2>
            <p className="text-base sm:text-lg text-[#A39890] max-w-xl mx-auto">
              Create your business page, share one link, and let your customers find what they need without the back-and-forth.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/order-now"
                className="w-full sm:w-auto bg-[#8C5A4C] hover:bg-[#9E6756] text-white font-medium text-base px-8 py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-[#8C5A4C]/30 transition-all"
              >
                Create Your Business <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/order-now"
                className="w-full sm:w-auto bg-[#221E1C] hover:bg-[#2A2422] text-[#F5EFEA] border border-white/10 font-medium text-base px-8 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
              >
                Explore Demo Storefront
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="border-t border-white/10 py-12 text-xs text-[#A39890]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#8C5A4C] text-white font-serif font-bold text-xs flex items-center justify-center">
              S
            </div>
            <span className="font-serif font-bold text-base text-[#F5EFEA]">SaveUs</span>
          </div>

          <p>© {new Date().getFullYear()} SaveUs. Less asking. More doing.</p>

          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="hover:text-white transition-colors">
              How It Works
            </a>
            <a href="#use-cases" className="hover:text-white transition-colors">
              Use Cases
            </a>
            <Link href="/order-now" className="hover:text-white transition-colors">
              Demo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
