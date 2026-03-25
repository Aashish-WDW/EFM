'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, Languages, Moon, Sun, User, Menu, Quote } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const horseQuotes = [
  "A horse is poetry in motion.",
  "No hour is wasted spent in the saddle.",
  "Horses lend us the wings we lack.",
  "The horse knows. He knows to the penny how much he's worth.",
  "In riding a horse, we borrow freedom.",
  "There is no secret so close as between a rider and his horse.",
  "One can get in a horse a power that no other animal can give.",
  "Four legs move the body. The heart moves the soul.",
  "Courage is being scared to death but saddling up anyway.",
  "A pony is a childhood dream, a horse is an adulthood treasure.",
];

export default function TopHeader({ onMenuClick }: { onMenuClick?: () => void }) {
  const { theme, setTheme } = useTheme();
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setQuoteIdx(i => (i + 1) % horseQuotes.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
    <header className="h-14 flex items-center justify-between px-3 sm:px-6 bg-surface-container-low/80 backdrop-blur-md shrink-0 sticky top-0 z-20 border-b border-surface-container-high">
      {/* Left */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        {/* Mobile hamburger */}
        <button onClick={onMenuClick} className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-container-high transition-colors shrink-0">
          <Menu className="w-5 h-5" />
        </button>

        <span className="md:hidden font-display font-bold italic text-primary text-xl tracking-tight text-glow animate-pulse px-2 shrink-0">EFM</span>

        {/* Mobile search toggle */}
        <button onClick={() => setMobileSearchOpen(o => !o)} className="sm:hidden w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-container-high transition-colors shrink-0">
          <Search className="w-4 h-4" />
        </button>

        {/* Desktop search */}
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Command + K to search..."
            className="w-48 lg:w-64 h-9 pl-9 pr-3 text-xs bg-surface-container-high rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
          />
        </div>

        {/* Horse Quote Marquee — Desktop only */}
        <div className="hidden md:flex items-center gap-2 flex-1 min-w-0 px-3 overflow-hidden">
          <Quote className="w-3.5 h-3.5 text-primary/50 shrink-0 rotate-180" />
          <div className="flex-1 min-w-0 overflow-hidden relative h-5">
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="text-[11px] italic text-muted-foreground truncate absolute inset-0 leading-5"
              >
                {horseQuotes[quoteIdx]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        <Link href="/notifications" className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-container-high transition-colors relative" title="Notifications">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full animate-pulse" />
        </Link>

        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hidden sm:flex w-9 h-9 rounded-lg items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-container-high transition-colors" title="Select Language">
              <Languages className="w-4 h-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>🇺🇸 English</DropdownMenuItem>
            <DropdownMenuItem>🇮🇳 Telugu</DropdownMenuItem>
            <DropdownMenuItem>🇮🇳 Hindi</DropdownMenuItem>
            <DropdownMenuItem>🇮🇳 Kannada</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hidden sm:flex w-9 h-9 rounded-lg items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-container-high transition-colors" title="Toggle Theme">
              {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>☀️ Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>🌙 Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>💻 System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="w-px h-6 bg-surface-container-high mx-1 hidden sm:block" />

        <div className="flex items-center gap-2.5">
          <Link href="/profile" className="flex items-center gap-2.5 rounded-lg hover:bg-surface-container-high transition-colors p-1 pr-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground leading-tight">Admin User</p>
              <p className="text-[10px] text-muted-foreground">Super Admin</p>
            </div>
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/30 ring-offset-1 ring-offset-background">
              <User className="w-4 h-4 text-primary" />
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile search bar - expandable */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-14 left-0 right-0 px-3 py-2 bg-surface-container-low border-b border-border sm:hidden z-30"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                type="text"
                autoFocus
                placeholder="Search..."
                className="w-full h-10 pl-9 pr-3 text-sm bg-surface-container-high rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

    {/* Mobile Quote Bar — visible below navbar on mobile only */}
    <div className="md:hidden flex items-center gap-2 px-4 py-1.5 bg-surface-container-low/80 border-b border-surface-container-high overflow-hidden sticky top-14 z-10 backdrop-blur-md">
      <Quote className="w-3 h-3 text-primary/50 shrink-0 rotate-180" />
      <div className="flex-1 min-w-0 overflow-hidden relative h-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={quoteIdx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] italic text-muted-foreground truncate absolute inset-0 leading-4"
          >
            {horseQuotes[quoteIdx]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}
