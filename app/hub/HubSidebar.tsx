// @ts-nocheck
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Rocket,
  Activity,
  Brain,
  LayoutDashboard,
  Target,
  Zap,
  GitBranch,
  BarChart3,
  Search,
  Mail,
  Globe,
  Newspaper,
  Users,
  Settings,
  CreditCard,
  ShieldCheck,
  FileText,
  ChevronDown,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/beui/utils";

const NAV_GROUPS = [
  {
    group: "Command",
    items: [
      { href: "/hub", label: "Dashboard", icon: LayoutDashboard },
      { href: "/hub/cockpit", label: "Cockpit", icon: Rocket },
      { href: "/hub/triangle", label: "Triangle Loop", icon: Activity },
      { href: "/hub/nova", label: "Nova AI", icon: Brain },
    ],
  },
  {
    group: "Grow",
    items: [
      { href: "/hub/sequences", label: "Sequences", icon: Zap },
      { href: "/hub/attribution", label: "Attribution", icon: GitBranch },
      { href: "/hub/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/hub/seo", label: "SEO Toolkit", icon: Search },
    ],
  },
  {
    group: "Create",
    items: [
      { href: "/hub/emails", label: "Email Builder", icon: Mail },
      { href: "/hub/landing-pages", label: "Landing Pages", icon: Globe },
    ],
  },
  {
    group: "Intel",
    items: [
      { href: "/hub/wire", label: "The Wire", icon: Newspaper },
      { href: "/hub/dive", label: "Marketing Dive", icon: Globe },
      { href: "/hub/trends", label: "Trends", icon: BarChart3 },
    ],
  },
  {
    group: "Operate",
    items: [
      { href: "/hub/crm", label: "CRM & Deals", icon: Users },
      { href: "/hub/audit", label: "Audit", icon: ShieldCheck },
      { href: "/hub/billing", label: "Billing", icon: CreditCard },
      { href: "/hub/reports", label: "Reports", icon: FileText },
      { href: "/hub/settings", label: "Settings", icon: Settings },
    ],
  },
];

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || "http://localhost:3001";

export function HubSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-primary text-foreground"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed top-16 bottom-0 left-0 bg-primary text-foreground border-r border-ink-800 overflow-y-auto">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/60"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="lg:hidden fixed top-0 bottom-0 left-0 z-50 w-72 bg-primary text-foreground overflow-y-auto"
            >
              <div className="flex items-center justify-between p-4 border-b border-ink-800">
                <span className="font-display font-bold text-lg">Hub Navigation</span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-primary/90"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SidebarContent pathname={pathname} onNavigate={() => setOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Back to site */}
      <div className="p-4 border-b border-ink-800">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={onNavigate}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to BAZ
        </Link>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.group} className="mb-4">
            <p className="px-4 mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
              {group.group}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 text-sm rounded-r-lg transition-colors",
                        active
                          ? "bg-accent text-white font-medium"
                          : "text-muted-foreground hover:bg-primary/90 hover:text-foreground",
                      )}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Hub status */}
      <div className="p-4 border-t border-ink-800">
        <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono uppercase tracking-wider">Hub · 60s loop</span>
        </div>
        <a
          href={HUB_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-2 block text-xs text-foreground hover:text-foreground"
        >
          Open full Hub →
        </a>
      </div>
    </div>
  );
}
