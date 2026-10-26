"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/lib/format";

type Item = {
  id: string;
  name: string;
  note: string;
  price: number;
  kind: "product" | "service";
};

const ITEMS: Item[] = [
  { id: "flat-white", name: "Flat white", note: "Espresso with steamed milk", price: 2500, kind: "product" },
  { id: "croissant", name: "Almond croissant", note: "Baked fresh this morning", price: 1800, kind: "product" },
  { id: "strategy-call", name: "Brand strategy call", note: "30 minutes, online", price: 15000, kind: "service" },
  { id: "office-cleaning", name: "Office cleaning", note: "Per visit", price: 25000, kind: "service" },
];

const ORDER_REF = "ORD-0427";

const STEPS = ["hi", "greet", "shop", "review", "sending", "order", "payment", "paid", "done"] as const;
type Step = (typeof STEPS)[number];

const STEP_LABELS: Record<Step, string> = {
  hi: 'Customer sends "hi"',
  greet: "Auto-reply with the shop link",
  shop: "Customer browses and picks items",
  review: "Customer reviews the order",
  sending: "Checkout opens WhatsApp",
  order: "Order lands in the vendor's chat",
  payment: "Vendor replies with payment details",
  paid: "Customer sends payment",
  done: "Order completed",
};

// How long each step waits before advancing while autoplay is on.
const AUTO_DELAY: Partial<Record<Step, number>> = {
  hi: 1200,
  greet: 1800,
  shop: 2600,
  review: 1800,
  sending: 1300,
  order: 1200,
  payment: 1800,
  paid: 1400,
};

const STORE_STEPS: Step[] = ["shop", "review", "sending"];

// How long the finished order stays on screen before the demo loops.
const DONE_HOLD_MS = 4000;

const ITEM_TAG_CLASS = "shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white";

const QTY_CLASS = "flex size-5 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700";

const STYLES = `
@keyframes linko-demo-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.linko-demo-msg { animation: linko-demo-in 300ms ease-out both; }
@media (prefers-reduced-motion: reduce) { .linko-demo-msg { animation: none; } }
`;

function Bubble({ from, children }: { from: "customer" | "vendor"; children: ReactNode }) {
  const isCustomer = from === "customer";
  return (
    <div className={`linko-demo-msg flex ${isCustomer ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-line rounded-lg px-2.5 py-1.5 text-[11px] leading-4 shadow-sm ${
          isCustomer ? "rounded-tr-none bg-[#D9FDD3]" : "rounded-tl-none bg-white"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function AuthFlowDemo() {
  const [step, setStep] = useState<Step>("hi");
  const [cart, setCart] = useState<Record<string, number>>({});
  const chatRef = useRef<HTMLDivElement>(null);

  const stepIndex = STEPS.indexOf(step);
  const reached = (s: Step) => stepIndex >= STEPS.indexOf(s);
  const cartLines = ITEMS.flatMap((item) => (cart[item.id] ? [{ item, qty: cart[item.id] }] : []));
  const cartCount = cartLines.reduce((sum, line) => sum + line.qty, 0);
  const total = cartLines.reduce((sum, line) => sum + line.item.price * line.qty, 0);
  const onStore = STORE_STEPS.includes(step);

  const orderText = [
    "Hi Linko Coffee, I'd like to order:",
    ...cartLines.map(({ item, qty }) => `- ${qty} × ${item.name} (${formatPrice(item.price * qty)})`),
    `Total: ${formatPrice(total)}`,
  ].join("\n");
  const paymentText = `Thanks for your order! Please pay ${formatPrice(total)} to:\nBank: Demo Bank\nAccount name: Linko Coffee\nAccount no: 0123456789\nReference: ${ORDER_REF}\nSend your receipt here once paid.`;

  useEffect(() => {
    const timers: number[] = [];
    if (step === "done") {
      timers.push(
        window.setTimeout(() => {
          setCart({});
          setStep("hi");
        }, DONE_HOLD_MS)
      );
      return () => timers.forEach((timer) => window.clearTimeout(timer));
    }
    if (step === "shop") {
      timers.push(
        window.setTimeout(() => setCart((c) => (c["flat-white"] ? c : { ...c, "flat-white": 1 })), 600)
      );
      timers.push(
        window.setTimeout(() => setCart((c) => (c.croissant ? c : { ...c, croissant: 1 })), 1300)
      );
    }
    const index = STEPS.indexOf(step);
    const next = STEPS[index + 1];
    const delay = AUTO_DELAY[step];
    if (delay && next) {
      timers.push(
        window.setTimeout(() => setStep(next), delay)
      );
    }
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [step]);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [step]);

  return (
    <div className="flex flex-col items-center gap-5">
      <style>{STYLES}</style>

      <div className="relative h-[400px] w-[240px] rounded-[2.25rem] border-[6px] border-slate-900 bg-slate-900 shadow-2xl shadow-black/40">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white text-slate-900">
          {onStore ? (
            <>
              <div className="flex items-center justify-between bg-indigo-700 px-3 py-2.5 text-white">
                <span aria-hidden="true" className="px-1 text-sm font-bold">
                  ←
                </span>
                <div className="text-center leading-tight">
                  <p className="text-xs font-semibold">Linko Coffee</p>
                  <p className="text-[10px] text-indigo-200">Shop &amp; book online</p>
                </div>
                <span className="rounded-full bg-white/15 px-2 py-1 text-[10px] font-semibold">Cart · {cartCount}</span>
              </div>

              {step === "shop" ? (
                <>
                  <ul className="flex-1 space-y-2 overflow-y-auto p-3">
                    {ITEMS.map((item) => {
                      const qty = cart[item.id] ?? 0;
                      return (
                        <li
                          key={item.id}
                          className="flex items-start gap-2 rounded-xl border border-slate-200 p-2.5"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold">{item.name}</p>
                            <p className="text-[10px] text-slate-500">{item.note}</p>
                            <p className="mt-1 text-xs font-bold text-indigo-700">{formatPrice(item.price)}</p>
                          </div>
                          <span className={`${ITEM_TAG_CLASS} ${qty > 0 ? "bg-emerald-600" : "bg-indigo-600"}`}>
                            {item.kind === "service"
                              ? qty > 0
                                ? "Booked ✓"
                                : "Book"
                              : qty > 0
                                ? `Added · ${qty}`
                                : "Add"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="border-t border-slate-200 p-3">
                    <div className="w-full rounded-full bg-emerald-600 py-2 text-center text-xs font-semibold text-white">
                      View order · {formatPrice(total)}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-1 space-y-2 overflow-y-auto p-3">
                    <p className="text-xs font-bold">Your order</p>
                    {cartLines.length === 0 ? (
                      <p className="text-[11px] text-slate-500">Your cart is empty. Go back and pick something.</p>
                    ) : (
                      cartLines.map(({ item, qty }) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 p-2.5"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold">{item.name}</p>
                            <p className="text-[10px] text-slate-500">{formatPrice(item.price * qty)}</p>
                          </div>
                          {item.kind === "service" ? (
                            <span className="text-[10px] font-semibold text-rose-600">Remove</span>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <span aria-hidden="true" className={QTY_CLASS}>
                                −
                              </span>
                              <span className="w-4 text-center text-xs font-semibold">{qty}</span>
                              <span aria-hidden="true" className={QTY_CLASS}>
                                +
                              </span>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="space-y-2 border-t border-slate-200 p-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="w-full rounded-full bg-emerald-600 py-2 text-center text-xs font-semibold text-white">
                      Send order on WhatsApp
                    </div>
                  </div>
                </>
              )}

              {step === "sending" && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/85 text-xs font-semibold text-slate-700">
                  <span className="animate-pulse">Opening WhatsApp…</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 bg-[#075E54] px-3 py-2.5 text-white">
                <span className="flex size-7 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-slate-900">
                  LC
                </span>
                <div className="leading-tight">
                  <p className="text-xs font-semibold">Linko Coffee</p>
                  <p className="text-[10px] text-emerald-100">online</p>
                </div>
              </div>
              <div
                ref={chatRef}
                aria-live="polite"
                className="flex flex-1 flex-col gap-2 overflow-y-auto bg-[#ECE5DD] p-3"
              >
                {reached("hi") && <Bubble from="customer">hi</Bubble>}
                {reached("greet") && (
                  <Bubble from="vendor">
                    <p>Hi! 👋 Thanks for messaging Linko Coffee. Browse our menu and book services here:</p>
                    <span
                      className={`mt-1.5 block w-full rounded-md bg-slate-100 px-2 py-1.5 text-left text-[11px] font-semibold text-indigo-700 underline underline-offset-2 ${
                        step === "greet" ? "animate-pulse ring-2 ring-indigo-400" : ""
                      }`}
                    >
                      linko.app/linko-coffee ↗
                    </span>
                  </Bubble>
                )}
                {reached("order") && <Bubble from="customer">{orderText}</Bubble>}
                {reached("payment") && <Bubble from="vendor">{paymentText}</Bubble>}
                {reached("paid") && <Bubble from="customer">Payment sent ✅ Here&apos;s my receipt.</Bubble>}
                {reached("done") && (
                  <Bubble from="vendor">
                    Payment received ✅ Order {ORDER_REF} is completed. Thank you for shopping with us! 🎉
                  </Bubble>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <p aria-live="polite" className="text-sm font-semibold text-white">
          Step {stepIndex + 1} of {STEPS.length}: {STEP_LABELS[step]}
        </p>
        <div aria-hidden="true" className="flex gap-1.5">
          {STEPS.map((s, i) => (
            <span
              key={s}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${i <= stepIndex ? "bg-amber-400" : "bg-white/25"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
