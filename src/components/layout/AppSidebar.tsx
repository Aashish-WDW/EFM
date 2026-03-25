'use client';

import React, { useState, useRef, useCallback, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard, Settings2, CheckSquare, Stethoscope, Cog,
  UtensilsCrossed, DollarSign, Shield, ChevronDown,
  PanelLeftClose, PanelLeft, ExternalLink, LogOut, BarChart3, LifeBuoy
} from 'lucide-react';

export const SidebarContext = createContext<{ collapsed: boolean; setCollapsed: (v: boolean) => void }>({ collapsed: false, setCollapsed: () => { } });
export const useSidebarState = () => useContext(SidebarContext);

interface NavItem { to: string; label: string; }
interface NavGroup { label: string; icon: React.ElementType; items: NavItem[]; }

const navGroups: NavGroup[] = [
  { label: 'Organisation', icon: Settings2, items: [{ to: '/horses', label: 'Horses' }, { to: '/team', label: 'Team' }] },
  { label: 'Tasks & Approvals', icon: CheckSquare, items: [{ to: '/tasks', label: 'Tasks' }, { to: '/my-tasks', label: 'My Assigned Tasks' }, { to: '/approvals', label: 'Approvals' }, { to: '/meetings', label: 'Meetings' }] },
  { label: 'Stable Operations', icon: Stethoscope, items: [{ to: '/medicine-logs', label: 'Medicine Logs' }, { to: '/medicine-inventory', label: 'Medicine Inventory' }, { to: '/horse-feeds', label: 'Horse Feeds' }, { to: '/feed-inventory', label: 'Feed Inventory' }, { to: '/farrier-shoeing', label: 'Farrier Shoeing' }, { to: '/tack-inventory', label: 'Tack Inventory' }, { to: '/farrier-inventory', label: 'Farrier Inventory' }] },
  { label: 'Ground Operations', icon: Cog, items: [{ to: '/gate-register', label: 'Gate Register' }, { to: '/daily-register', label: 'Daily Register' }, { to: '/attendance', label: 'Mark Attendance' }, { to: '/groom-worksheet', label: 'Groom Worksheet' }, { to: '/work-record', label: 'Work Record' }, { to: '/daily-work-records', label: 'Daily Work Records' }, { to: '/inspection-rounds', label: 'Inspection Rounds' }, { to: '/housekeeping-inventory', label: 'Housekeeping Inventory' }] },
  { label: 'Restaurant', icon: UtensilsCrossed, items: [{ to: '/groceries-inventory', label: 'Groceries Inventory' }] },
  { label: 'Accounts & Finance', icon: DollarSign, items: [{ to: '/invoices', label: 'Invoice Generation' }, { to: '/expenses', label: 'Expense Tracking' }, { to: '/fines', label: 'Fine System' }] },
  { label: 'System', icon: Shield, items: [{ to: '/reports', label: 'Reports' }, { to: '/permissions', label: 'Permissions' }, { to: '/entity-map', label: 'Entity Map' }, { to: '/profile', label: 'Profile' }] },
];

export default function AppSidebar({ collapsed, onToggle, onNavClick }: { collapsed: boolean; onToggle: () => void; onNavClick?: () => void }) {
  const pathname = usePathname();
  const activeGroupLabel = navGroups.find(g => g.items.some(i => i.to === pathname))?.label;

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(navGroups.map(g => [g.label, g.label === activeGroupLabel || g.label === 'Organisation']))
  );

  // Flyout state for collapsed mode
  const [flyout, setFlyout] = useState<{ label: string; top: number } | null>(null);
  const flyoutTimer = useRef<ReturnType<typeof setTimeout>>();
  const groupBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const openFlyout = useCallback((label: string) => {
    clearTimeout(flyoutTimer.current);
    const btn = groupBtnRefs.current[label];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setFlyout({ label, top: rect.top });
    }
  }, []);

  const scheduleFlyoutClose = useCallback(() => {
    flyoutTimer.current = setTimeout(() => setFlyout(null), 120);
  }, []);

  const cancelFlyoutClose = useCallback(() => {
    clearTimeout(flyoutTimer.current);
  }, []);

  const toggleGroup = (label: string) => setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));
  const isDashboardActive = pathname === '/dashboard' || pathname === '/';
  const isAnalysisActive = pathname === '/analysis';

  return (
    <>
      <aside
        className={`h-screen flex flex-col bg-surface-container-low horse-pattern shrink-0 ${collapsed ? 'w-[68px]' : 'w-[260px]'}`}
        style={{ transition: 'width 280ms cubic-bezier(0.4, 0, 0.2, 1)', willChange: 'width' }}
      >
        {/* Logo */}
        <div className={`pt-5 pb-4 overflow-hidden ${collapsed ? 'flex justify-center px-3' : 'px-5'}`}>
          <motion.div
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {collapsed ? (
              <span className="font-display font-bold italic text-primary text-xl tracking-wide">EFM</span>
            ) : (
              <div>
                <span className="font-display font-bold italic text-primary text-2xl tracking-wide block">EFM</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.2 }}
                  className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase leading-snug"
                >
                  Equine Facility Management
                </motion.span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Collapse Toggle */}
        <div className={`hidden md:flex px-3 mb-1 ${collapsed ? 'justify-center' : ''}`}>
          <button
            onClick={onToggle}
            className="flex items-center justify-center w-full h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-container-high transition-colors group"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <motion.div
              animate={{ rotate: collapsed ? 0 : 180 }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
              {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </motion.div>
          </button>
        </div>

        {/* Dashboard */}
        <div className="px-3 mb-1">
          <Link
            href="/dashboard"
            onClick={onNavClick}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative ${collapsed ? 'justify-center' : ''} ${isDashboardActive ? 'bg-surface-container-highest text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-surface-container-high'}`}
          >
            {isDashboardActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full" />}
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  Dashboard
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Analysis */}
        <div className="px-3 mb-1">
          <Link
            href="/analysis"
            onClick={onNavClick}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative ${collapsed ? 'justify-center' : ''} ${isAnalysisActive ? 'bg-surface-container-highest text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-surface-container-high'}`}
          >
            {isAnalysisActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full" />}
            <BarChart3 className="w-4 h-4 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  Analysis
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Nav Groups */}
        <nav className="flex-1 overflow-y-auto px-3 py-1 space-y-0.5 scrollbar-none">
          {navGroups.map(group => {
            const isGroupActive = group.items.some(i => i.to === pathname);
            const isOpen = openGroups[group.label] && !collapsed;

            return (
              <div key={group.label}>
                <button
                  ref={el => { groupBtnRefs.current[group.label] = el; }}
                  onClick={() => { if (!collapsed) toggleGroup(group.label); }}
                  onMouseEnter={() => { if (collapsed) openFlyout(group.label); }}
                  onMouseLeave={() => { if (collapsed) scheduleFlyoutClose(); }}
                  title={collapsed ? group.label : undefined}
                  className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-colors ${collapsed ? 'justify-center' : ''} ${isGroupActive ? 'text-foreground bg-surface-container-high/50' : 'text-muted-foreground hover:text-foreground hover:bg-surface-container-high'}`}
                >
                  <group.icon className="w-4 h-4 shrink-0" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 text-left font-medium overflow-hidden whitespace-nowrap flex items-center"
                      >
                        {group.label}
                        <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && !collapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-10 pr-2 space-y-0.5 pb-1">
                        {group.items.map(item => {
                          const isActive = pathname === item.to;
                          return (
                            <Link
                              key={item.to}
                              href={item.to}
                              onClick={onNavClick}
                              className={`block px-3 py-1.5 rounded-md text-[13px] transition-colors ${isActive ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Support Link */}
        <div className="px-3 mb-1">
          <Link
            href="/support"
            onClick={onNavClick}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative ${collapsed ? 'justify-center' : ''} ${pathname === '/support' ? 'bg-surface-container-highest text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-surface-container-high'}`}
          >
            {pathname === '/support' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-primary rounded-r-full" />}
            <LifeBuoy className="w-4 h-4 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap"
                >
                  Support
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Logout Button */}
        <div className="px-3 mb-2">
          <button
            onClick={() => { window.location.href = '/login'; }}
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-destructive hover:bg-destructive/10 ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? 'Logout' : undefined}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-3">
              <LogOut className="w-4 h-4 shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    Logout
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </button>
        </div>

        {/* Powered by LookAround */}
        <div className={`border-t border-border px-3 py-3 shrink-0 ${collapsed ? 'flex justify-center' : ''}`}>
          {collapsed ? (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center" title="Powered by LookAround">
              <ExternalLink className="w-3.5 h-3.5 text-primary" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="flex items-center gap-2 px-2"
            >
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <ExternalLink className="w-3 h-3 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] text-muted-foreground leading-tight">Powered by</p>
                <p className="text-xs font-semibold text-primary leading-tight">LookAround</p>
              </div>
            </motion.div>
          )}
        </div>
      </aside>

      {/* Collapsed nav flyout — rendered outside aside to escape overflow */}
      {collapsed && flyout && (() => {
        const group = navGroups.find(g => g.label === flyout.label);
        if (!group) return null;
        const GroupIcon = group.icon;
        return (
          <div
            style={{ position: 'fixed', top: flyout.top, left: 76, zIndex: 9999 }}
            onMouseEnter={cancelFlyoutClose}
            onMouseLeave={scheduleFlyoutClose}
            className="min-w-[200px] rounded-xl bg-surface-container-highest border border-border shadow-2xl py-2 animate-in fade-in-0 zoom-in-95 duration-100"
          >
            <div className="px-3 pb-2 mb-1 border-b border-border flex items-center gap-2">
              <GroupIcon className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{group.label}</span>
            </div>
            {group.items.map(item => {
              const isActive = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  href={item.to}
                  onClick={() => { setFlyout(null); onNavClick?.(); }}
                  className={`block px-3 py-2 text-sm transition-colors rounded-md mx-1 ${isActive ? 'text-primary font-medium bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-surface-container-high'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        );
      })()}
    </>
  );
}
