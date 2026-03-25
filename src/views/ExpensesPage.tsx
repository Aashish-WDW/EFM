'use client';
import { useState } from 'react';
import { DollarSign, TrendingUp, Clock, ArrowDown, Filter, Upload, Plus, CheckCircle, FileText } from 'lucide-react';
import { expenses } from '@/data/seed';
import SelectField from '@/components/shared/SelectField';

const categoryColors: Record<string, string> = {
  'Feed Purchase': 'bg-success/20 text-success',
  'Veterinary': 'bg-destructive/20 text-destructive',
  'Farrier': 'bg-warning/20 text-warning',
  'Equipment': 'bg-primary/20 text-primary',
  'Maintenance': 'bg-secondary/20 text-secondary',
};

const categoryLabels: Record<string, string> = {
  'Feed Purchase': 'NUTRITION',
  'Veterinary': 'VET CARE',
  'Farrier': 'FARRIER',
  'Equipment': 'EQUIPMENT',
  'Maintenance': 'MAINTENANCE',
};

export default function ExpensesPage() {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<'Facility' | 'Asset'>('Facility');
  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const topCategory = 'EQUINE NUTRITION';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="label-sm text-primary tracking-widest">FINANCIAL INTELLIGENCE DASHBOARD</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mt-1">EXPENSE TRACKING</h1>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <div className="flex rounded-lg overflow-hidden border border-border">
            {(['Facility', 'Asset'] as const).map(t => (
              <button key={t} onClick={() => setViewMode(t)} className={`px-3 sm:px-4 h-9 text-xs sm:text-sm font-medium transition-colors ${viewMode === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {t === 'Facility' ? 'FACILITY' : 'ASSET'}
              </button>
            ))}
          </div>
          <button className="h-9 px-4 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Expense
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
          <span className="label-sm text-muted-foreground">MONTHLY TOTAL SPEND</span>
          <div className="flex items-end gap-2 mt-2">
            <p className="text-2xl font-bold text-foreground mono-data">₹{total.toLocaleString()}</p>
            <span className="text-xs text-success font-medium mb-1">+12.4%</span>
          </div>
          <div className="w-full h-1 bg-primary/20 rounded-full mt-3"><div className="h-full w-3/4 bg-primary rounded-full" /></div>
        </div>
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
          <span className="label-sm text-muted-foreground">PRIMARY COST CENTER</span>
          <p className="text-lg font-bold text-foreground mt-2">{topCategory}</p>
          <p className="text-xs text-primary mt-1">34% of total volume</p>
        </div>
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
          <span className="label-sm text-muted-foreground">PENDING APPROVALS</span>
          <p className="text-2xl font-bold text-warning mono-data mt-2">08</p>
          <p className="text-xs text-muted-foreground mt-1">Action required by EOD</p>
        </div>
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
          <span className="label-sm text-muted-foreground">FORECAST VARIANCE</span>
          <p className="text-2xl font-bold text-success mono-data mt-2">-₹1,204</p>
          <p className="text-xs text-muted-foreground mt-1">Under budget for Q3</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
          <Filter className="w-3.5 h-3.5" /> <span className="hidden sm:inline">ACTIVE FILTERS:</span>
        </div>
        <SelectField options={['All Expense Categories', 'Feed Purchase', 'Veterinary', 'Farrier', 'Equipment', 'Maintenance']} defaultValue="All Expense Categories" size="sm" className="w-48" />
        <SelectField options={['All Equine Assets', 'Shadowfax', 'Midnight Star', 'Thunder Bay', 'Facility Wide']} defaultValue="All Equine Assets" size="sm" className="w-44" />
        <SelectField options={['All Handlers', 'Michael Groom', 'Sam Vet', 'Mike Farrier', 'Daniel Maintenance']} defaultValue="All Handlers" size="sm" className="w-40" />
        <button className="h-8 px-3 rounded-lg border border-border text-muted-foreground text-xs flex items-center gap-1.5 hover:bg-surface-container-high">
          <Upload className="w-3 h-3" /> EXPORT
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Expense Table */}
        <div className="lg:col-span-7">
          <div className="bg-surface-container-highest rounded-lg edge-glow overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[580px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left label-sm text-muted-foreground">DATE</th>
                  <th className="px-3 py-3 text-left label-sm text-muted-foreground">CATEGORY</th>
                  <th className="px-3 py-3 text-left label-sm text-muted-foreground">DESCRIPTION</th>
                  <th className="px-3 py-3 text-right label-sm text-muted-foreground">AMOUNT</th>
                  <th className="px-3 py-3 text-left label-sm text-muted-foreground">ASSET</th>
                  <th className="px-3 py-3 text-left label-sm text-muted-foreground">HANDLER</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map(e => (
                  <tr key={e.id} className="border-b border-border/30 hover:bg-surface-container-high/50 transition-colors">
                    <td className="px-5 py-4 mono-data text-xs text-muted-foreground">{e.date}</td>
                    <td className="px-3 py-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${categoryColors[e.expenseType] || 'bg-primary/20 text-primary'}`}>
                        {categoryLabels[e.expenseType] || e.expenseType.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-4 font-medium text-foreground">{e.description}</td>
                    <td className="px-3 py-4 text-right mono-data font-bold text-foreground">₹{e.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        {e.horseName !== 'N/A' && e.horseName !== 'General' && e.horseName !== 'Multiple' && (
                          <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">
                            {e.horseName.charAt(0)}{e.horseName.charAt(1)}
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground">{e.horseName}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-muted-foreground">{e.employeeName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="flex items-center justify-between px-3 sm:px-5 py-3 border-t border-border">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider hidden sm:block">Displaying {expenses.length} of 128 entries</span>
              <div className="flex gap-1">
                <button className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-surface-container-high">&lt;</button>
                <button className="px-3 py-1.5 rounded text-xs font-medium bg-primary text-primary-foreground">1</button>
                <button className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-surface-container-high">2</button>
                <button className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-surface-container-high">3</button>
                <button className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-surface-container-high">&gt;</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-5 space-y-4">
          {/* Post New Entry Form */}
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
            <div className="flex items-center gap-2 mb-5">
              <Plus className="w-5 h-5 text-primary" />
              <h2 className="heading-md text-foreground uppercase tracking-wider">Post New Entry</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="label-sm text-muted-foreground block mb-2">CLASSIFICATION</label>
                <div className="flex rounded-lg overflow-hidden border border-border">
                  <button className="flex-1 h-9 text-sm font-medium bg-primary text-primary-foreground">OPERATIONAL</button>
                  <button className="flex-1 h-9 text-sm font-medium text-muted-foreground hover:text-foreground bg-surface-container-high">INTERNAL</button>
                </div>
              </div>
              <div>
                <label className="label-sm text-primary block mb-1.5">ENTRY DESCRIPTION</label>
                <input type="text" placeholder="e.g. Quarter 4 Stable Ventilation..." className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-sm text-primary block mb-1.5">AMOUNT (₹)</label>
                  <input type="number" placeholder="0.00" className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm mono-data focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="label-sm text-primary block mb-1.5">ASSET ATTRIBUTION</label>
                  <SelectField options={['Shadowfax', 'Midnight Star', 'Thunder Bay', 'Facility Wide']} defaultValue="Facility Wide" />
                </div>
              </div>
              <div>
                <label className="label-sm text-muted-foreground block mb-1.5">PROOF OF PURCHASE (OCR ENABLED)</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Drop invoice or <span className="text-primary font-medium">browse files</span></p>
                  <p className="text-[10px] text-muted-foreground mt-1">SECURE PDF, PNG OR JPG (MAX 10MB)</p>
                </div>
              </div>
              <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">
                VALIDATE & LOG EXPENSE
              </button>
            </div>
          </div>

          {/* Live Transaction Stream */}
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <h3 className="label-sm text-muted-foreground tracking-widest">LIVE TRANSACTION STREAM</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0"><FileText className="w-4 h-4 text-primary" /></div>
                <div>
                  <p className="text-sm text-foreground">Digital invoice uploaded by <span className="font-bold">Julian V.</span></p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">2 MINUTES AGO • ID: 4892</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-success/15 flex items-center justify-center shrink-0"><CheckCircle className="w-4 h-4 text-success" /></div>
                <div>
                  <p className="text-sm text-foreground">Vendor payment confirmed: <span className="font-bold">Farrier SV</span></p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">1 HOUR AGO • AUTO-APPROVED</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
