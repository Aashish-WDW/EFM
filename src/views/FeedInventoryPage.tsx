'use client';
import { useState, useMemo } from 'react';
import { feedInventory } from '@/data/seed';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import { Package, AlertTriangle, TrendingDown, SlidersHorizontal, Download, Plus, Search, X, Pencil, Trash2 } from 'lucide-react';
import DatePicker from '@/components/shared/DatePicker';

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function AddFeedRecordForm() {
  return (
    <div className="space-y-4 mt-2">
      <div>
        <label className={lbl}>FEED TYPE</label>
        <input type="text" placeholder="e.g. Premium Hay, Oats..." className={inp} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField label="CATEGORY" options={['Hay', 'Grain', 'Supplements', 'Pellets', 'Bran']} defaultValue="Hay" />
        <div>
          <label className={lbl}>SUPPLIER</label>
          <input type="text" placeholder="e.g. Dubai Feed Co." className={inp} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>UNITS LEFT</label>
          <input type="number" placeholder="0" className={inp} />
        </div>
        <SelectField label="UNIT TYPE" options={['kg', 'bales', 'bags', 'liters']} defaultValue="kg" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>REORDER LEVEL</label>
          <input type="number" placeholder="0" className={inp} />
        </div>
        <div>
          <label className={lbl}>COST PER UNIT (₹)</label>
          <input type="number" placeholder="0.00" className={inp} />
        </div>
      </div>
      <DatePicker label="EXPIRY DATE" />
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Add Record</button>
    </div>
  );
}

type FeedItem = typeof feedInventory[0];

function EditFeedRecordForm({ item }: { item: FeedItem }) {
  return (
    <div className="space-y-4 mt-2">
      <div>
        <label className={lbl}>FEED TYPE</label>
        <input type="text" defaultValue={item.feedType} className={inp} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>UNITS LEFT</label>
          <input type="number" defaultValue={item.unitsLeft} className={inp} />
        </div>
        <SelectField label="UNIT TYPE" options={['kg', 'bales', 'bags', 'liters']} defaultValue={item.unit} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>TOTAL AVAILABLE</label>
          <input type="number" defaultValue={item.totalAvailable} className={inp} />
        </div>
        <div>
          <label className={lbl}>REORDER THRESHOLD</label>
          <input type="number" defaultValue={item.threshold} className={inp} />
        </div>
      </div>
      <SelectField label="STATUS" options={['In Stock', 'Low Stock', 'Out of Stock']} defaultValue={item.status} />
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Save Changes</button>
    </div>
  );
}

function FilterPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="border-b border-border bg-surface-container-low px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Filter Options</span>
        <button onClick={onClose} className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5" /></button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SelectField label="STATUS" options={['All', 'In Stock', 'Low Stock', 'Out of Stock']} defaultValue="All" />
        <SelectField label="UNIT TYPE" options={['All', 'kg', 'bales', 'bags', 'liters']} defaultValue="All" />
        <SelectField label="SORT BY" options={['Stock Level', 'Name', 'Used Today']} defaultValue="Stock Level" />
        <div className="flex items-end">
          <button className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-xs font-semibold tracking-wider uppercase">Apply</button>
        </div>
      </div>
    </div>
  );
}

function RowActions({ item }: { item: FeedItem }) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
        <SlidersHorizontal className="w-4 h-4" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-7 z-20 w-36 rounded-lg border border-border bg-surface-container-highest shadow-lg py-1 text-sm">
            <button
              onClick={() => { setOpen(false); setEditOpen(true); }}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted transition-colors text-foreground"
            >
              <Pencil className="w-3.5 h-3.5 text-primary" /> Edit
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-muted transition-colors text-destructive">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </>
      )}
      <FormDialog open={editOpen} onOpenChange={setEditOpen} trigger={<span />} title={`Edit — ${item.feedType}`}>
        <EditFeedRecordForm item={item} />
      </FormDialog>
    </div>
  );
}

export default function FeedInventoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const perPage = 5;

  const filteredItems = useMemo(() =>
    feedInventory.filter(f =>
      f.feedType.toLowerCase().includes(search.toLowerCase()) ||
      f.unit.toLowerCase().includes(search.toLowerCase()) ||
      f.status.toLowerCase().includes(search.toLowerCase())
    ), [search]);

  const totalPages = Math.ceil(filteredItems.length / perPage);
  const paginated = filteredItems.slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalUnits = feedInventory.reduce((s, f) => s + f.unitsLeft, 0);
  const lowStockCount = feedInventory.filter(f => f.status !== 'In Stock').length;
  const outOfStock = feedInventory.filter(f => f.status === 'Out of Stock').length;

  const kpis = [
    { label: 'TOTAL INVENTORY UNITS', value: totalUnits.toLocaleString(), sub: '↗ +12% vs last month', subColor: 'text-success', icon: Package },
    { label: 'LOW STOCK ALERTS', value: String(lowStockCount).padStart(2, '0'), sub: 'Items below threshold', subColor: 'text-warning', icon: AlertTriangle },
    { label: 'OUT OF STOCK', value: String(outOfStock).padStart(2, '0'), sub: 'Require immediate reorder', subColor: 'text-destructive', icon: TrendingDown },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Feed <span className="text-primary">Inventory</span></h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and track feed stock levels across all stable operations.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="h-10 px-4 sm:px-5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-surface-container-high transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" /> Export
          </button>
          <FormDialog trigger={
            <button className="h-10 px-4 sm:px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Record
            </button>
          } title="Add Feed Record">
            <AddFeedRecordForm />
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
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 sm:px-6 py-4 border-b border-border">
          <div className="flex-1 flex items-center gap-2 px-4 h-11 rounded-lg border border-border bg-background">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search by feed type, unit, or status..."
              value={search}
              onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none h-full"
            />
            {search && (
              <button onClick={() => { setSearch(''); setCurrentPage(1); }} className="text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`h-11 px-4 rounded-lg border flex items-center gap-2 text-sm font-medium transition-colors shrink-0 ${showFilters ? 'bg-primary border-primary text-primary-foreground' : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'}`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <span className="text-xs text-muted-foreground mono-data uppercase tracking-wider hidden sm:block shrink-0">{filteredItems.length} of {feedInventory.length} records</span>
        </div>

        {/* Filter Panel */}
        {showFilters && <FilterPanel onClose={() => setShowFilters(false)} />}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="border-b border-border">
                {['FEED TYPE', 'UNIT', 'AVAILABLE', 'USED TODAY', 'REMAINING', 'THRESHOLD', 'STATUS', ''].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(f => (
                <tr key={f.id} className="border-b border-border/50 hover:bg-surface-container-high/50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-sm text-foreground">{f.feedType}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{f.unit}</td>
                  <td className="px-6 py-4 mono-data text-sm">{f.totalAvailable}</td>
                  <td className="px-6 py-4 mono-data text-sm">{f.usedToday}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="mono-data text-sm">{f.unitsLeft}</span>
                      <div className="w-16 h-1.5 rounded-full bg-surface-container overflow-hidden">
                        <div className={`h-full rounded-full ${f.unitsLeft <= f.threshold ? 'bg-destructive' : f.unitsLeft <= f.threshold * 2 ? 'bg-warning' : 'bg-success'}`} style={{ width: `${Math.min((f.unitsLeft / f.totalAvailable) * 100, 100)}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 mono-data text-sm text-muted-foreground">{f.threshold}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase ${f.status === 'In Stock' ? 'text-success' : f.status === 'Low Stock' ? 'text-warning' : 'text-destructive'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${f.status === 'In Stock' ? 'bg-success' : f.status === 'Low Stock' ? 'bg-warning' : 'bg-destructive'}`} />
                      {f.status}
                    </span>
                  </td>
                  <td className="px-6 py-4"><RowActions item={f} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground mono-data hidden sm:block">Showing {paginated.length} of {filteredItems.length} records</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30">Previous</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 rounded text-xs font-medium ${currentPage === i + 1 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{i + 1}</button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
