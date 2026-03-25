'use client';
import { useState, useMemo } from 'react';
import { tackItems } from '@/data/seed';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import { Package, AlertTriangle, Wrench, SlidersHorizontal, Search, X, Plus } from 'lucide-react';
import DatePicker from '@/components/shared/DatePicker';
import ExportDialog from '@/components/shared/ExportDialog';

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function AddTackItemForm() {
  return (
    <div className="space-y-4 mt-2">
      <div>
        <label className={lbl}>ITEM NAME</label>
        <input type="text" placeholder="e.g. English Saddle" className={inp} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField label="CATEGORY" options={['Saddle', 'Bridle', 'Pad', 'Halter', 'Rope', 'Other']} defaultValue="Saddle" />
        <div>
          <label className={lbl}>BRAND</label>
          <input type="text" placeholder="e.g. Stubben" className={inp} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>QUANTITY</label>
          <input type="number" placeholder="1" className={inp} />
        </div>
        <SelectField label="CONDITION" options={['Good', 'Fair', 'Poor', 'Replace']} defaultValue="Good" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField label="ASSIGNED HORSE" options={['Unassigned', 'Thunder', 'Storm', 'Blaze', 'Midnight', 'Shadow', 'Spirit']} defaultValue="Unassigned" />
        <DatePicker label="PURCHASE DATE" />
      </div>
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Add Item</button>
    </div>
  );
}

const uniqueCategories = [...new Set(tackItems.map(t => t.category))];

export default function TackInventoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [filterCondition, setFilterCondition] = useState('');
  const perPage = 5;

  const filtered = useMemo(() => tackItems.filter(t => {
    if (search && !t.itemName.toLowerCase().includes(search.toLowerCase()) && !t.horseName.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory && t.category !== filterCategory) return false;
    if (filterCondition && t.condition !== filterCondition) return false;
    return true;
  }), [search, filterCategory, filterCondition]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalQty = tackItems.reduce((s, t) => s + t.quantity, 0);
  const needsRepair = tackItems.filter(t => t.condition === 'Poor' || t.condition === 'Replace').length;

  const hasActiveFilters = filterCategory || filterCondition;
  const clearFilters = () => { setFilterCategory(''); setFilterCondition(''); };

  const conditionStyle: Record<string, { color: string; dot: string }> = {
    Good: { color: 'text-success', dot: 'bg-success' },
    Fair: { color: 'text-warning', dot: 'bg-warning' },
    Poor: { color: 'text-destructive', dot: 'bg-destructive' },
    Replace: { color: 'text-destructive', dot: 'bg-destructive' },
  };

  const categoryStyle: Record<string, string> = {
    Saddle: 'bg-primary/20 text-primary',
    Bridle: 'bg-success/20 text-success',
    Pad: 'bg-warning/20 text-warning',
    Halter: 'bg-accent/20 text-accent-foreground',
    Rope: 'bg-muted text-muted-foreground',
  };

  const kpis = [
    { label: 'TOTAL ITEMS', value: totalQty.toLocaleString(), sub: '↗ +8% vs last month', subColor: 'text-success', icon: Package },
    { label: 'CATEGORIES', value: String(new Set(tackItems.map(t => t.category)).size).padStart(2, '0'), sub: 'Unique equipment types', subColor: 'text-muted-foreground', icon: Package },
    { label: 'NEEDS ATTENTION', value: String(needsRepair).padStart(2, '0'), sub: 'Items flagged for repair', subColor: 'text-destructive', icon: Wrench },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Tack <span className="text-primary">Inventory</span></h1>
          <p className="text-sm text-muted-foreground mt-1">Manage tack and equipment across all stable operations.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <ExportDialog filename="tack-inventory" trigger={
            <button className="h-10 px-4 sm:px-5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-surface-container-high transition-colors">Export</button>
          } />
          <FormDialog trigger={
            <button className="h-10 px-4 sm:px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Item
            </button>
          } title="Add Tack Item">
            <AddTackItemForm />
          </FormDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-surface-container-highest rounded-xl p-5 edge-glow relative overflow-hidden">
            <p className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase flex items-center gap-2">
              <k.icon className="w-3.5 h-3.5 text-primary" /> {k.label}
            </p>
            <p className="text-4xl font-bold text-foreground mt-2 mono-data">{k.value}</p>
            <p className={`text-xs mt-1 ${k.subColor}`}>{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface-container-highest rounded-xl edge-glow overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-border gap-3">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <input
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search items or horse..."
              className="h-9 pl-8 pr-3 w-full rounded-lg bg-surface-container-high text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
            {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5" /></button>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowFilters(v => !v)}
              className={`flex items-center gap-2 h-9 px-3 rounded-lg text-sm font-medium transition-colors ${showFilters || hasActiveFilters ? 'bg-primary/15 text-primary border border-primary/30' : 'bg-surface-container-high text-muted-foreground hover:text-foreground'}`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
              {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
            </button>
            <span className="text-xs text-muted-foreground mono-data hidden sm:block">{filtered.length} of {tackItems.length} items</span>
          </div>
        </div>

        {showFilters && (
          <div className="px-3 sm:px-6 py-4 border-b border-border bg-surface-container-high/50">
            <div className="flex flex-wrap gap-3 items-end">
              <div className="w-44">
                <SelectField label="CATEGORY" options={['All', ...uniqueCategories]} value={filterCategory || 'All'} size="sm" onChange={(v: string) => { setFilterCategory(v === 'All' ? '' : v); setCurrentPage(1); }} />
              </div>
              <div className="w-40">
                <SelectField label="CONDITION" options={['All', 'Good', 'Fair', 'Poor', 'Replace']} value={filterCondition || 'All'} size="sm" onChange={(v: string) => { setFilterCondition(v === 'All' ? '' : v); setCurrentPage(1); }} />
              </div>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="h-9 px-3 rounded-lg text-xs text-destructive border border-destructive/30 hover:bg-destructive/10 transition-colors flex items-center gap-1.5">
                  <X className="w-3 h-3" /> Clear Filters
                </button>
              )}
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-border">
              {['ITEM NAME', 'CATEGORY', 'HORSE / SCOPE', 'QTY', 'CONDITION', 'BRAND', 'LOCATION', 'LAST USED'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map(t => {
              const cs = conditionStyle[t.condition] || conditionStyle.Good;
              return (
                <tr key={t.id} className="border-b border-border/50 hover:bg-surface-container-high/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-xs font-bold text-primary">{t.itemName.charAt(0)}</div>
                      <span className="font-semibold text-sm text-foreground">{t.itemName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${categoryStyle[t.category] || 'bg-muted text-muted-foreground'}`}>{t.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{t.horseName}</td>
                  <td className="px-6 py-4 mono-data text-sm font-semibold text-center">{String(t.quantity).padStart(2, '0')}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase ${cs.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cs.dot}`} />
                      {t.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{t.brand}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{t.storageLocation}</td>
                  <td className="px-6 py-4 mono-data text-xs text-foreground">{t.lastUsedDate}</td>
                </tr>
              );
            })}
            {paginated.length === 0 && (
              <tr><td colSpan={8} className="px-6 py-8 text-center text-sm text-muted-foreground">No items match your filters.</td></tr>
            )}
          </tbody>
        </table>
        </div>
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-t border-border">
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1.5 rounded-lg border border-border text-xs text-foreground font-medium disabled:opacity-30">Previous</button>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1.5 rounded-lg border border-border text-xs text-foreground font-medium disabled:opacity-30">Next</button>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 rounded text-xs font-medium ${currentPage === i + 1 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{i + 1}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
