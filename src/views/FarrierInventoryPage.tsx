'use client';
import { useState } from 'react';
import { farrierInventoryItems } from '@/data/seed';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import { Package, AlertTriangle, Wrench, SlidersHorizontal, Plus } from 'lucide-react';
import DatePicker from '@/components/shared/DatePicker';

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function AddFarrierItemForm() {
  return (
    <div className="space-y-4 mt-2">
      <div>
        <label className={lbl}>ITEM NAME</label>
        <input type="text" placeholder="e.g. Steel Horseshoe Size 4" className={inp} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField label="CATEGORY" options={['Shoes', 'Nails', 'Tools', 'Pads']} defaultValue="Shoes" />
        <div>
          <label className={lbl}>SUPPLIER</label>
          <input type="text" placeholder="e.g. ProHoof Supplies" className={inp} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>QUANTITY</label>
          <input type="number" placeholder="0" className={inp} />
        </div>
        <SelectField label="CONDITION" options={['Good', 'Fair', 'Poor']} defaultValue="Good" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={lbl}>COST PER UNIT (AED)</label>
          <input type="number" placeholder="0.00" className={inp} />
        </div>
        <DatePicker label="NEXT SERVICE DUE" />
      </div>
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Add Farrier Item</button>
    </div>
  );
}

export default function FarrierInventoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(farrierInventoryItems.length / perPage);
  const paginated = farrierInventoryItems.slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalItems = farrierInventoryItems.reduce((s, f) => s + f.quantity, 0);
  const overdueService = farrierInventoryItems.filter(f => f.nextServiceDue !== '-' && new Date(f.nextServiceDue) < new Date()).length;
  const damagedItems = farrierInventoryItems.filter(f => f.condition === 'Poor').length;

  const conditionStyle: Record<string, { color: string; dot: string }> = {
    Good: { color: 'text-success', dot: 'bg-success' },
    Fair: { color: 'text-warning', dot: 'bg-warning' },
    Poor: { color: 'text-destructive', dot: 'bg-destructive' },
  };

  const categoryStyle: Record<string, string> = {
    Shoes: 'bg-primary/20 text-primary',
    Nails: 'bg-muted text-muted-foreground',
    Tools: 'bg-warning/20 text-warning',
    Pads: 'bg-success/20 text-success',
  };

  const kpis = [
    { label: 'TOTAL INVENTORY UNITS', value: totalItems.toLocaleString(), sub: '↗ +12% vs last month', subColor: 'text-success', icon: Package },
    { label: 'CRITICAL SERVICE ALERTS', value: String(overdueService || 9).padStart(2, '0'), sub: 'Horses requiring urgent reset', subColor: 'text-destructive', icon: AlertTriangle },
    { label: 'EQUIPMENT MAINTENANCE', value: String(damagedItems || 3).padStart(2, '0'), sub: 'Specialized items flagged for repair', subColor: 'text-muted-foreground', icon: Wrench },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Farrier <span className="text-primary">Inventory</span></h1>
          <p className="text-sm text-muted-foreground mt-1">Precision tracking for elite farriery equipment and service logs.</p>
        </div>
        <FormDialog trigger={
          <button className="h-10 px-4 sm:px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all self-start shrink-0 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Farrier Item
          </button>
        } title="Add Farrier Item">
          <AddFarrierItemForm />
        </FormDialog>
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
              <SlidersHorizontal className="w-3.5 h-3.5" /> All Categories <span className="text-muted-foreground">▾</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high text-sm text-foreground">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Sort by: Date Added <span className="text-muted-foreground">▾</span>
            </div>
          </div>
          <span className="text-xs text-muted-foreground mono-data uppercase tracking-wider hidden sm:block">Displaying {farrierInventoryItems.length} records</span>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-border">
              {['ITEM NAME', 'CATEGORY', 'HORSE / SCOPE', 'QTY', 'CONDITION', 'PRIMARY FARRIER', 'SERVICE SCHEDULE', 'COST (AED)'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map(f => {
              const cs = conditionStyle[f.condition] || conditionStyle.Good;
              const isDueSoon = f.nextServiceDue !== '-' && new Date(f.nextServiceDue) <= new Date('2026-05-01');
              return (
                <tr key={f.id} className="border-b border-border/50 hover:bg-surface-container-high/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-xs font-bold text-primary">{f.itemName.charAt(0)}</div>
                      <span className="font-semibold text-sm text-foreground">{f.itemName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${categoryStyle[f.category] || 'bg-muted text-muted-foreground'}`}>{f.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{f.sizeType}</td>
                  <td className="px-6 py-4 mono-data text-sm font-semibold text-center">{String(f.quantity).padStart(2, '0')}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase ${cs.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cs.dot}`} />
                      {f.condition}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{f.supplier}</td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="mono-data text-xs text-foreground block">Last: {f.nextServiceDue !== '-' ? f.nextServiceDue : '—'}</span>
                      {isDueSoon && <span className="text-[10px] text-primary font-bold uppercase mono-data">DUE SOON</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 mono-data text-sm font-semibold text-foreground">AED {f.cost.toLocaleString()}.00</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-t border-border">
          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1.5 rounded-lg border border-border text-xs text-foreground font-medium disabled:opacity-30">Previous</button>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1.5 rounded-lg border border-border text-xs text-foreground font-medium disabled:opacity-30">Next</button>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.max(totalPages, 3) }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 rounded text-xs font-medium ${currentPage === i + 1 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{i + 1}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
