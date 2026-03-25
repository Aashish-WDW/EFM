'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import AppSidebar from './AppSidebar';
import TopHeader from './TopHeader';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import PageSkeleton from '@/components/shared/PageSkeleton';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background lens-flare">
      {/* Desktop Sidebar */}
      <div className="hidden md:block sticky top-0 h-screen z-30">
        <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      </div>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-[260px] bg-surface-container-low border-r border-border">
          <AppSidebar collapsed={false} onToggle={() => {}} onNavClick={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-auto">
          <PageSkeleton key={pathname}>
            {children}
          </PageSkeleton>
        </main>
      </div>
    </div>
  );
}
