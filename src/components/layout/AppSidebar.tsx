'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard, Settings2, CheckSquare, Stethoscope, Cog,
  UtensilsCrossed, DollarSign, Shield, ChevronDown,
  PanelLeftClose, PanelLeft, ExternalLink, LogOut, BarChart3
} from 'lucide-react';
import { createContext, useContext } from 'react';

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

  const toggleGroup = (label: string) => setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));
  const isDashboardActive = pathname === '/dashboard' || pathname === '/';
  const isAnalysisActive = pathname === '/analysis';

  return (
    <aside className={`h-screen flex flex-col bg-surface-container-low horse-pattern shrink-0 transition-[width] duration-300 ease-in-out ${collapsed ? 'w-[68px]' : 'w-[260px]'}`}>
      {/* Logo */}
      <div className="px-5 pt-5 pb-4 overflow-hidden">
        {!collapsed && (
          <div>
            <span className="font-display font-bold italic text-primary text-2xl tracking-wide block">EFM</span>
            <span className="text-[10px] tracking-[0.1em] text-muted-foreground uppercase leading-snug">Equine Facility Management</span>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <div className={`px-3 mb-1 ${collapsed ? 'flex justify-center' : ''}`}>
        <button onClick={onToggle} className="flex items-center justify-center w-full h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-container-high transition-colors" title={collapsed ? 'Expand' : 'Collapse'}>
          {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
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
          {!collapsed && <span>Dashboard</span>}
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
          {!collapsed && <span>Analysis</span>}
        </Link>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-1 space-y-0.5 scrollbar-none">
        {navGroups.map(group => {
          const isGroupActive = group.items.some(i => i.to === pathname);
          const isOpen = openGroups[group.label] && !collapsed;

          return (
            <div key={group.label}>
              <button
                onClick={() => collapsed ? undefined : toggleGroup(group.label)}
                title={collapsed ? group.label : undefined}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition-colors ${collapsed ? 'justify-center' : ''} ${isGroupActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <group.icon className="w-4 h-4 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left font-medium">{group.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'}`} />
                  </>
                )}
              </button>

              <AnimatePresence initial={false}>
                {isOpen && !collapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
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

      {/* Logout Button */}
      <div className="px-3 mb-2">
        <button
          onClick={() => { window.location.href = '/login'; }}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-destructive hover:bg-destructive/10 ${collapsed ? 'justify-center' : ''}`}
          title="Logout"
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-3">
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
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
          <div className="flex items-center gap-2 px-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <ExternalLink className="w-3 h-3 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground leading-tight">Powered by</p>
              <p className="text-xs font-semibold text-primary leading-tight">LookAround</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
