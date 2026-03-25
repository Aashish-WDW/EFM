'use client';
import { useState } from 'react';
import { SlidersHorizontal, CheckCircle2, XCircle, Clock, BarChart3, Shield } from 'lucide-react';
import { approvals } from '@/data/seed';

const filters = ['All', 'Pending', 'Approved', 'Rejected'] as const;

const statusStyles: Record<string, string> = {
  Pending: 'bg-warning/10 text-warning border-warning/30',
  Approved: 'bg-success/10 text-success border-success/30',
  Rejected: 'bg-destructive/10 text-destructive border-destructive/30',
};

export default function ApprovalsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filtered = approvals.filter(a => {
    if (activeFilter !== 'All' && a.status !== activeFilter) return false;
    if (search && !a.description.toLowerCase().includes(search.toLowerCase()) && !a.requestedBy.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const pendingCount = approvals.filter(a => a.status === 'Pending').length;
  const approvedCount = approvals.filter(a => a.status === 'Approved').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Approvals</h1>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
            Review and manage pending approvals &nbsp;·&nbsp; Shift: Morning Alpha
          </p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-4 edge-glow flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border-2 border-warning flex items-center justify-center">
            <span className="text-lg font-bold text-warning">{pendingCount}</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Awaiting Review</p>
            <p className="text-lg font-bold text-foreground">Pending Queue</p>
          </div>
        </div>
      </div>

      {/* Filters + Search Row */}
      <div className="flex items-center justify-between gap-6">
        <div className="flex gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === f
                  ? 'bg-primary/15 text-primary border border-primary/30'
                  : 'bg-surface-container-high text-muted-foreground hover:text-foreground border border-transparent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Filter by name or description..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-10 w-72 px-4 pr-10 rounded-lg bg-surface-container-high text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
          <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Approval Cards */}
        <div className="space-y-4">
          {filtered.length === 0 && <div className="text-center py-12 text-muted-foreground">No approvals found</div>}
          {filtered.map(a => (
            <div key={a.id} className="bg-surface-container-high rounded-xl p-5 edge-glow border border-primary/10 hover:border-primary/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${statusStyles[a.status]}`}>
                  {a.status}
                </span>
                <span className="text-xs text-muted-foreground italic">ID: {a.id.toUpperCase()}</span>
              </div>
              <h3 className="text-lg font-bold text-foreground">{a.type}</h3>
              <p className="text-sm text-primary mt-0.5">{a.requestedBy}</p>
              <p className="text-sm text-muted-foreground mt-2">{a.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" /> {a.date}
                </span>
                {a.status === 'Pending' && (
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-success/15 text-success text-sm font-medium hover:bg-success/25 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-destructive/15 text-destructive text-sm font-medium hover:bg-destructive/25 transition-colors">
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">Approval Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Approved Rate</span>
                <span className="text-sm font-bold text-success">{Math.round((approvedCount / approvals.length) * 100)}%</span>
              </div>
              <div className="w-full h-1 rounded-full bg-surface-container-high">
                <div className="h-1 rounded-full bg-success" style={{ width: `${(approvedCount / approvals.length) * 100}%` }} />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Pending</span>
                <span className="text-sm font-bold text-warning">{pendingCount}</span>
              </div>
              <div className="w-full h-1 rounded-full bg-surface-container-high">
                <div className="h-1 rounded-full bg-warning" style={{ width: `${(pendingCount / approvals.length) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">Compliance</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              All approvals are logged and tracked for audit compliance. Pending items require action within 48 hours.
            </p>
            <p className="mt-3 text-xs text-primary font-semibold">SLA: 24h response target</p>
          </div>
        </div>
      </div>
    </div>
  );
}
