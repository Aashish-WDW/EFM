'use client';
import { useState, useMemo } from 'react';
import { Package, DollarSign, AlertTriangle, Clock, SlidersHorizontal, Search, X, Plus, Upload, Thermometer, Droplets, RefreshCw, TrendingUp } from 'lucide-react';
import { groceryItems } from '@/data/seed';
import SelectField from '@/components/shared/SelectField';
import DatePicker from '@/components/shared/DatePicker';
import ExportDialog from '@/components/shared/ExportDialog';

const getStatus = (expiry: string) => {
  const now = new Date();
  const exp = new Date(expiry);
  const diffDays = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return { label: 'EXPIRED', cls: 'bg-destructive/20 text-destructive', key: 'EXPIRED' };
  if (diffDays <= 7) return { label: 'NEAR EXPIRY', cls: 'bg-warning/20 text-warning', key: 'NEAR EXPIRY' };
  if (diffDays <= 30) return { label: 'STOCKED', cls: 'bg-primary/20 text-primary', key: 'STOCKED' };
  return { label: 'OPTIMAL', cls: 'bg-success/20 text-success', key: 'OPTIMAL' };
};

const categories: Record<string, string> = {
  'Rice': 'PANTRY / GRAINS',
  'Chicken Breast': 'PROTEIN / FRESH',
  'Cooking Oil': 'PANTRY / OILS',
  'Onions': 'PRODUCE / VEGETABLES',
  'Tomatoes': 'PRODUCE / VEGETABLES',
  'Bread': 'BAKERY / DAILY',
};

export default function GroceriesInventoryPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const perPage = 5;

  const totalValue = groceryItems.reduce((s, g) => s + g.quantity * g.pricePerUnit, 0);
  const nearExpiry = groceryItems.filter(g => {
    const diff = Math.ceil((new Date(g.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return diff <= 7 && diff >= 0;
  }).length;
  const lowStock = groceryItems.filter(g => g.quantity < 15).length;

  const filtered = useMemo(() => groceryItems.filter(g => {
    if (search && !g.itemName.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus && getStatus(g.expiryDate).key !== filterStatus) return false;
    return true;
  }), [search, filterStatus]);

  const paged = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <div>
          <p className="label-sm text-primary tracking-widest">SUPPLY CHAIN INTELLIGENCE</p>
          <h1 className="display-sm text-foreground mt-1">Groceries Inventory</h1>
        </div>
        <div className="flex gap-3 shrink-0">
          <ExportDialog filename="groceries-inventory" trigger={
            <button className="h-9 px-4 rounded-lg border border-border text-foreground text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors">
              <Upload className="w-4 h-4" /> <span className="hidden sm:inline">Export Report</span><span className="sm:hidden">Export</span>
            </button>
          } />
          <button className="h-9 px-4 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-medium flex items-center gap-2">
            <Plus className="w-4 h-4" /> New Purchase
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="label-sm text-muted-foreground">TOTAL SKU ITEMS</span>
            <Package className="w-5 h-5 text-muted-foreground/50" />
          </div>
          <p className="display-sm text-foreground mono-data">{groceryItems.length.toLocaleString()}</p>
          <p className="text-xs text-success mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +12% from last month</p>
        </div>
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="label-sm text-muted-foreground">INVENTORY VALUE</span>
            <DollarSign className="w-5 h-5 text-muted-foreground/50" />
          </div>
          <p className="display-sm text-foreground mono-data">₹{totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-primary mt-2 flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Real-time valuation</p>
        </div>
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="label-sm text-muted-foreground">LOW STOCK ALERTS</span>
            <AlertTriangle className="w-5 h-5 text-warning/50" />
          </div>
          <p className="display-sm text-warning mono-data">{lowStock}</p>
          <p className="text-xs text-destructive mt-2 flex items-center gap-1">⚠ Immediate action required</p>
        </div>
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="label-sm text-muted-foreground">NEAR EXPIRY (7D)</span>
            <Clock className="w-5 h-5 text-muted-foreground/50" />
          </div>
          <p className="display-sm text-foreground mono-data">{nearExpiry}</p>
          <p className="text-xs text-destructive mt-2 flex items-center gap-1">🔴 Audit recommended</p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stock Registration Form */}
        <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
            <div className="flex items-center gap-2 mb-5">
              <Package className="w-5 h-5 text-primary" />
              <h2 className="heading-md text-foreground">STOCK REGISTRATION</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="label-sm text-muted-foreground block mb-1.5">ITEM DESIGNATION</label>
                <input type="text" placeholder="e.g. Wagyu Beef Ribeye" className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-sm text-muted-foreground block mb-1.5">QUANTITY</label>
                  <input type="number" placeholder="0.00" className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm mono-data placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none" />
                </div>
                <div>
                  <SelectField label="UNIT" options={['Kilograms (kg)', 'Liters', 'Cans', 'Pieces']} defaultValue="Kilograms (kg)" />
                </div>
              </div>
              <div>
                <label className="label-sm text-muted-foreground block mb-1.5">UNIT PRICE (₹)</label>
                <input type="number" placeholder="0.00" className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm mono-data placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <DatePicker label="PURCHASE DATE" />
                <DatePicker label="EXPIRY DATE" />
              </div>
              <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase mt-2">
                COMMIT TO INVENTORY
              </button>
            </div>
          </div>

          {/* Facility Status */}
          <div className="bg-surface-container-highest rounded-lg overflow-hidden edge-glow">
            <div className="h-32 bg-gradient-to-br from-primary/20 to-primary-container relative">
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest/90 to-transparent" />
              <div className="absolute bottom-3 left-4">
                <p className="label-sm text-primary">FACILITY STATUS</p>
                <h3 className="heading-md text-foreground">Main Cold Storage A</h3>
                <div className="flex gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-success/20 text-success text-[10px] font-medium flex items-center gap-1"><Thermometer className="w-3 h-3" /> -18.2°C</span>
                  <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-medium flex items-center gap-1"><Droplets className="w-3 h-3" /> HUMID: 42%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="lg:col-span-8 order-1 lg:order-2">
          <div className="bg-surface-container-highest rounded-lg edge-glow overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <h2 className="heading-md text-foreground uppercase tracking-wider truncate">Current Inventory Clusters</h2>
                <span className="text-xs text-muted-foreground mono-data shrink-0">v4.0.2</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                    placeholder="Search items..."
                    className="h-8 pl-8 pr-3 w-40 rounded-lg bg-surface-container-high text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                  />
                  {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="w-3 h-3" /></button>}
                </div>
                <button
                  onClick={() => setShowFilters(v => !v)}
                  className={`p-2 rounded-lg transition-colors ${showFilters || filterStatus ? 'bg-primary/15 text-primary' : 'hover:bg-surface-container-high text-muted-foreground'}`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {showFilters && (
              <div className="px-5 py-3 border-b border-border bg-surface-container-high/50">
                <div className="flex flex-wrap gap-3 items-end">
                  <div className="w-44">
                    <SelectField label="STATUS" options={['All', 'OPTIMAL', 'STOCKED', 'NEAR EXPIRY', 'EXPIRED']} value={filterStatus || 'All'} size="sm" onChange={(v: string) => { setFilterStatus(v === 'All' ? '' : v); setPage(1); }} />
                  </div>
                  {filterStatus && (
                    <button onClick={() => setFilterStatus('')} className="h-9 px-3 rounded-lg text-xs text-destructive border border-destructive/30 hover:bg-destructive/10 transition-colors flex items-center gap-1.5">
                      <X className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="overflow-x-auto"><table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left label-sm text-muted-foreground">ITEM NAME</th>
                  <th className="px-3 py-3 text-center label-sm text-muted-foreground">QTY</th>
                  <th className="px-3 py-3 text-left label-sm text-muted-foreground">UNIT</th>
                  <th className="px-3 py-3 text-left label-sm text-muted-foreground">PRICE</th>
                  <th className="px-3 py-3 text-left label-sm text-muted-foreground">PURCHASE</th>
                  <th className="px-3 py-3 text-left label-sm text-muted-foreground">EXPIRY</th>
                  <th className="px-3 py-3 text-right label-sm text-muted-foreground">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {paged.map(g => {
                  const st = getStatus(g.expiryDate);
                  return (
                    <tr key={g.id} className="border-b border-border/50 hover:bg-surface-container-high/50 transition-colors">
                      <td className="px-5 py-4">
                        <span className="font-semibold text-foreground block">{g.itemName}</span>
                        <span className="text-[10px] text-muted-foreground tracking-wider">{categories[g.itemName] || 'GENERAL'}</span>
                      </td>
                      <td className="px-3 py-4 text-center mono-data text-foreground">{g.quantity.toFixed(1)}</td>
                      <td className="px-3 py-4 text-muted-foreground">{g.unit}</td>
                      <td className="px-3 py-4 mono-data font-semibold text-foreground">₹{g.pricePerUnit.toFixed(2)}</td>
                      <td className="px-3 py-4 mono-data text-xs text-muted-foreground">{g.purchaseDate}</td>
                      <td className="px-3 py-4 mono-data text-xs text-muted-foreground">{g.expiryDate}</td>
                      <td className="px-3 py-4 text-right">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${st.cls}`}>{st.label}</span>
                      </td>
                    </tr>
                  );
                })}
                {paged.length === 0 && (
                  <tr><td colSpan={7} className="px-5 py-8 text-center text-sm text-muted-foreground">No items match your filters.</td></tr>
                )}
              </tbody>
            </table></div>
            <div className="flex items-center justify-between px-5 py-3 border-t border-border">
              <span className="text-xs text-muted-foreground">Showing {filtered.length === 0 ? 0 : (page - 1) * perPage + 1}-{Math.min(page * perPage, filtered.length)} of {filtered.length} items</span>
              <div className="flex gap-1">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-surface-container-high">&lt;</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => setPage(i + 1)} className={`px-3 py-1.5 rounded text-xs font-medium ${page === i + 1 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-surface-container-high'}`}>{i + 1}</button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-surface-container-high">&gt;</button>
              </div>
            </div>
          </div>

          {/* Bottom Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="w-4 h-4 text-primary" />
                <h3 className="heading-md text-foreground uppercase tracking-wider text-sm">Log Stream</h3>
              </div>
              <div className="space-y-3">
                {[
                  { dot: 'bg-primary', text: 'Inventory Audit: Dry Goods', time: 'Today, 08:42 AM • Admin' },
                  { dot: 'bg-primary', text: 'Order Dispatched: Premium Beef', time: 'Today, 06:15 AM • Supplier' },
                  { dot: 'bg-destructive', text: 'Waste Recorded: 2kg Produce', time: 'Yesterday, 11:30 PM • Kitchen Staff' },
                ].map((log, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${log.dot}`} />
                    <div>
                      <p className="text-sm text-foreground font-medium">{log.text}</p>
                      <p className="text-[10px] text-muted-foreground">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-container-highest rounded-lg p-5 edge-glow flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-3">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="heading-md text-foreground">Smart Forecasting</h3>
              <p className="text-xs text-muted-foreground mt-2 max-w-[240px]">AI models predict 15% surge in dairy demand for upcoming premium weekend events.</p>
              <button className="label-sm text-primary mt-4 hover:underline">VIEW FORECAST DETAILS</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
