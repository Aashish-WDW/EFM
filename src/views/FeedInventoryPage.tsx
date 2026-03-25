'use client';
import { useState } from 'react';
import { feedInventory } from '@/data/seed';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import { Package, AlertTriangle, TrendingDown, SlidersHorizontal, Download, Plus } from 'lucide-react';
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
          <label className={lbl}>COST PER UNIT (AED)</label>
          <input type="number" placeholder="0.00" className={inp} />
        </div>
      </div>
      <DatePicker label="EXPIRY DATE" />
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Add Record</button>
    </div>
  );
}

export default function FeedInventoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(feedInventory.length / perPage);
  const paginated = feedInventory.slice((currentPage - 1) * perPage, currentPage * perPage);

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
          <button className="h-10 px-4 sm:px-5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-surface-container-high transition-colors">Export Report</button>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-border gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high text-sm text-foreground">
              <SlidersHorizontal className="w-3.5 h-3.5" /> All Types <span className="text-muted-foreground">▾</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high text-sm text-foreground">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Sort by: Stock Level <span className="text-muted-foreground">▾</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground mono-data uppercase tracking-wider hidden sm:block">Displaying {feedInventory.length} of {feedInventory.length} records</span>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full min-w-[650px]">
          <thead>
            <tr className="border-b border-border">
              {['FEED TYPE', 'UNIT', 'AVAILABLE', 'USED TODAY', 'REMAINING', 'THRESHOLD', 'STATUS'].map(h => (
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
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground mono-data hidden sm:block">Displaying {paginated.length} of {feedInventory.length} records</span>
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
