'use client';
import { useState, useMemo } from 'react';
import { medicineInventory } from '@/data/seed';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import { Package, AlertTriangle, TrendingUp, SlidersHorizontal, Search, X, Plus } from 'lucide-react';
import DatePicker from '@/components/shared/DatePicker';
import ExportDialog from '@/components/shared/ExportDialog';

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function AddMedicineRecordForm() {
  return (
    <div className="space-y-4 mt-2">
      <div>
        <label className={lbl}>MEDICINE NAME</label>
        <input type="text" placeholder="e.g. Phenylbutazone" className={inp} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField label="CATEGORY" options={['Anti-inflammatory', 'Antibiotic', 'Supplement', 'Vaccine', 'Topical', 'Other']} defaultValue="Anti-inflammatory" />
        <div>
          <label className={lbl}>SUPPLIER</label>
          <input type="text" placeholder="e.g. VetSupply UAE" className={inp} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>OPENING STOCK</label>
          <input type="number" placeholder="0" className={inp} />
        </div>
        <div>
          <label className={lbl}>UNITS PURCHASED</label>
          <input type="number" placeholder="0" className={inp} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>STOCK THRESHOLD</label>
          <input type="number" placeholder="0" className={inp} />
        </div>
        <SelectField label="UNIT TYPE" options={['Vials', 'Tablets', 'ml', 'kg', 'Tubes']} defaultValue="Vials" />
      </div>
      <DatePicker label="EXPIRY DATE" />
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Add Record</button>
    </div>
  );
}

export default function MedicineInventoryPage() {
  const [activeTab, setActiveTab] = useState<'Inventory' | 'Report'>('Inventory');
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const perPage = 5;

  const filtered = useMemo(() => medicineInventory.filter(m => {
    if (search && !m.medicineType.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStatus === 'Low' && m.stockLevel > m.threshold) return false;
    if (filterStatus === 'OK' && m.stockLevel <= m.threshold) return false;
    return true;
  }), [search, filterStatus]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalStock = medicineInventory.reduce((s, m) => s + m.stockLevel, 0);
  const lowStockCount = medicineInventory.filter(m => m.stockLevel <= m.threshold).length;
  const efficiency = Math.round((totalStock / medicineInventory.reduce((s, m) => s + m.openingStock + m.unitsPurchased, 0)) * 100);

  const kpis = [
    { label: 'TOTAL INVENTORY UNITS', value: Math.round(totalStock).toLocaleString(), sub: `↗ +12% vs last month`, subColor: 'text-success', icon: Package },
    { label: 'CRITICAL STOCK ALERTS', value: String(lowStockCount).padStart(2, '0'), sub: 'Items below threshold', subColor: 'text-destructive', icon: AlertTriangle },
    { label: 'STOCK EFFICIENCY', value: `${efficiency}%`, sub: 'Absorption within target', subColor: 'text-success', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Medicine <span className="text-primary">Inventory</span></h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track medicine stock levels across the facility.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <ExportDialog filename="medicine-inventory" trigger={
            <button className="h-10 px-4 sm:px-5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-surface-container-high transition-colors">Export Report</button>
          } />
          <FormDialog trigger={
            <button className="h-10 px-4 sm:px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Record
            </button>
          } title="Add Medicine Record">
            <AddMedicineRecordForm />
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

      <div className="flex gap-1">
        {(['Inventory', 'Report'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? 'bg-primary-container text-accent-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{tab}</button>
        ))}
      </div>

      {activeTab === 'Inventory' && (
        <div className="bg-surface-container-highest rounded-xl edge-glow overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-border gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                  placeholder="Search medicine..."
                  className="h-8 pl-8 pr-3 w-44 rounded-lg bg-surface-container-high text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
                />
                {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="w-3 h-3" /></button>}
              </div>
            </div>
            <button
              onClick={() => setShowFilters(v => !v)}
              className={`p-2 rounded-lg transition-colors ${showFilters || filterStatus ? 'bg-primary/15 text-primary' : 'bg-surface-container-high text-muted-foreground hover:text-foreground'}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>

          {showFilters && (
            <div className="px-3 sm:px-6 py-4 border-b border-border bg-surface-container-high/50">
              <div className="flex flex-wrap gap-3 items-end">
                <div className="w-36">
                  <SelectField label="STOCK STATUS" options={['All', 'Low', 'OK']} value={filterStatus || 'All'} size="sm" onChange={(v: string) => { setFilterStatus(v === 'All' ? '' : v); setCurrentPage(1); }} />
                </div>
                {filterStatus && (
                  <button onClick={() => setFilterStatus('')} className="h-9 px-3 rounded-lg text-xs text-destructive border border-destructive/30 hover:bg-destructive/10 transition-colors flex items-center gap-1.5">
                    <X className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead>
              <tr className="border-b border-border">
                {['MEDICINE', 'STOCK LEVEL', 'UNIT', 'OPENING', 'PURCHASED', 'THRESHOLD', 'STATUS', 'ACTIONS'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(m => {
                const pct = Math.round((m.stockLevel / (m.openingStock + m.unitsPurchased)) * 100);
                const isLow = m.stockLevel <= m.threshold;
                return (
                  <tr key={m.id} className="border-b border-border/50 hover:bg-surface-container-high/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-sm text-foreground">{m.medicineType}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="mono-data text-sm">{m.stockLevel}</span>
                        <div className="w-16 h-1.5 rounded-full bg-surface-container overflow-hidden">
                          <div className={`h-full rounded-full ${isLow ? 'bg-destructive' : 'bg-success'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground mono-data">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{m.unit}</td>
                    <td className="px-6 py-4 mono-data text-sm">{m.openingStock}</td>
                    <td className="px-6 py-4 mono-data text-sm">{m.unitsPurchased}</td>
                    <td className="px-6 py-4 mono-data text-sm text-muted-foreground">{m.threshold || '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${isLow ? 'text-destructive' : 'text-success'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isLow ? 'bg-destructive' : 'bg-success'}`} />
                        {isLow ? 'LOW' : 'OK'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <button className="px-2 py-1 rounded text-[10px] bg-surface-bright text-foreground font-medium">Edit</button>
                        <button className="px-2 py-1 rounded text-[10px] bg-destructive/15 text-destructive font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {paginated.length === 0 && (
                <tr><td colSpan={8} className="px-6 py-8 text-center text-sm text-muted-foreground">No records match your filters.</td></tr>
              )}
            </tbody>
          </table>
          </div>
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-t border-border">
            <span className="text-xs text-muted-foreground mono-data hidden sm:block">Displaying {paginated.length} of {filtered.length} records</span>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30">Previous</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 rounded text-xs font-medium ${currentPage === i + 1 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{i + 1}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30">Next</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Report' && (
        <div className="bg-surface-container-highest rounded-xl p-8 edge-glow text-center text-muted-foreground">
          <p>Medicine inventory reports will be generated here</p>
        </div>
      )}
    </div>
  );
}
