'use client';
import { useState } from 'react';
import { housekeepingItems } from '@/data/seed';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import { Search, Download, Plus, AlertTriangle, MapPin, DollarSign } from 'lucide-react';

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function AddHousekeepingItemForm() {
  return (
    <div className="space-y-4 mt-2">
      <div>
        <label className={lbl}>ITEM NAME</label>
        <input type="text" placeholder="e.g. Floor Cleaner" className={inp} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField label="CATEGORY" options={['Cleaning Supplies', 'Equipment', 'Bedding', 'Chemicals', 'PPE']} defaultValue="Cleaning Supplies" />
        <div>
          <label className={lbl}>LOCATION</label>
          <input type="text" placeholder="e.g. Storage Room A" className={inp} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>QUANTITY</label>
          <input type="number" placeholder="0" className={inp} />
        </div>
        <SelectField label="UNIT" options={['Liters', 'Kg', 'Pieces', 'Rolls', 'Boxes']} defaultValue="Liters" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>MIN STOCK LEVEL</label>
          <input type="number" placeholder="0" className={inp} />
        </div>
        <div>
          <label className={lbl}>COST PER UNIT (₹)</label>
          <input type="number" placeholder="0.00" className={inp} />
        </div>
      </div>
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Add Item</button>
    </div>
  );
}

export default function HousekeepingInventoryPage() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');

  const categories = ['All', ...new Set(housekeepingItems.map(h => h.category))];
  const filtered = housekeepingItems.filter(h => {
    if (catFilter !== 'All' && h.category !== catFilter) return false;
    if (search && !h.itemName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const lowStock = housekeepingItems.filter(h => h.quantity <= h.minStockLevel).length;
  const totalValue = housekeepingItems.reduce((s, h) => s + h.quantity * h.costPerUnit, 0);
  const alertsOn = housekeepingItems.filter(h => h.reorderAlertEnabled).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Housekeeping Inventory</h1>
          <p className="text-sm text-muted-foreground mt-1">Track housekeeping supplies and equipment</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="h-9 px-3 sm:px-4 rounded-lg border border-border text-foreground text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors">
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export CSV</span>
          </button>
          <FormDialog 
            title="Add Housekeeping Item"
            trigger={
              <button className="h-9 px-4 sm:px-5 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-medium flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            }
          >
            <AddHousekeepingItemForm />
          </FormDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Low Stock</span>
            <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center"><AlertTriangle className="w-4 h-4 text-warning" /></div>
          </div>
          <p className="text-3xl font-bold text-warning">{String(lowStock).padStart(2, '0')}</p>
          {lowStock > 0 && <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-warning mt-1">⚠ Reorder Required</p>}
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Inventory Value</span>
            <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center"><DollarSign className="w-4 h-4 text-success" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground"><span className="text-lg text-muted-foreground">₹</span>{totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">Reorder Alerts</span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center"><MapPin className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-3xl font-bold text-foreground">{String(alertsOn).padStart(2, '0')}</p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-success mt-1">Active Alerts</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-wrap">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            value={search} 
            onChange={e => setSearch(e.target.value)} 
            placeholder="Search item..." 
            className="w-full h-9 pl-10 pr-4 rounded-lg bg-surface-container-high border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" 
          />
        </div>
        <div className="flex flex-wrap gap-1 bg-surface-container-high rounded-lg p-1 w-fit">
          {categories.map(c => (
            <button key={c} onClick={() => setCatFilter(c)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${catFilter === c ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="bg-surface-container-highest rounded-xl edge-glow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[750px]">
            <thead>
              <tr className="bg-surface-container-high">
                {['Item', 'Category', 'Qty', 'Unit', 'Min Stock', 'Stock Level', 'Area', 'Location', 'Cost/Unit', 'Alert'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(h => {
                const isLow = h.quantity <= h.minStockLevel;
                const pct = Math.min(100, Math.round((h.quantity / (h.minStockLevel * 3)) * 100));
                return (
                  <tr key={h.id} className="border-t border-border/50 hover:bg-surface-container-high/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{h.itemName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{h.category}</td>
                    <td className="px-4 py-3 font-mono text-xs">{h.quantity}</td>
                    <td className="px-4 py-3 text-muted-foreground">{h.unitType}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{h.minStockLevel}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-surface-container-high overflow-hidden max-w-[60px]">
                          <div className={`h-full rounded-full ${isLow ? 'bg-destructive' : 'bg-success'}`} style={{ width: `${pct}%` }} />
                        </div>
                        {isLow && <span className="text-[10px] text-destructive font-semibold">LOW</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{h.usageArea}</td>
                    <td className="px-4 py-3 text-muted-foreground">{h.storageLocation}</td>
                    <td className="px-4 py-3 font-mono text-xs">₹{h.costPerUnit}</td>
                    <td className="px-4 py-3">
                      {h.reorderAlertEnabled
                        ? <span className="text-success text-xs font-medium">✓ On</span>
                        : <span className="text-muted-foreground text-xs">Off</span>
                      }
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
