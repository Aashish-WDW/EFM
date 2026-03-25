'use client';
import { useState } from 'react';
import { horseFeedLogs, horses } from '@/data/seed';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import { Wheat, Crown, Package, Zap, SlidersHorizontal, Download, Plus } from 'lucide-react';
import DatePicker from '@/components/shared/DatePicker';

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function UpdateFeedsForm() {
  return (
    <div className="space-y-4 mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField label="HORSE" options={['Thunder', 'Storm', 'Blaze', 'Midnight', 'Shadow', 'Spirit']} placeholder="Select Horse..." />
        <DatePicker label="DATE" defaultValue={new Date().toISOString().split('T')[0]} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>HAY (kg)</label>
          <input type="number" placeholder="0.0" className={inp} />
        </div>
        <div>
          <label className={lbl}>OATS (kg)</label>
          <input type="number" placeholder="0.0" className={inp} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={lbl}>BRAN (kg)</label>
          <input type="number" placeholder="0.0" className={inp} />
        </div>
        <div>
          <label className={lbl}>SUPPLEMENTS (kg)</label>
          <input type="number" placeholder="0.0" className={inp} />
        </div>
      </div>
      <div>
        <label className={lbl}>NOTES</label>
        <input type="text" placeholder="Optional notes..." className={inp} />
      </div>
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Update Feeds</button>
    </div>
  );
}

export default function HorseFeedsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(horseFeedLogs.length / perPage);
  const paginated = horseFeedLogs.slice((currentPage - 1) * perPage, currentPage * perPage);

  const totalIntake = horseFeedLogs.reduce((s, f) => s + f.total, 0);
  const highestConsumer = horseFeedLogs.reduce((max, f) => f.total > max.total ? f : max, horseFeedLogs[0]);
  const totalOats = horseFeedLogs.reduce((s, f) => s + f.oats, 0);

  const kpis = [
    { label: 'TOTAL DAILY INTAKE', value: totalIntake.toLocaleString(), unit: 'kg', sub: '↗ 4.2% from yesterday', subColor: 'text-success', icon: Wheat },
    { label: 'HIGHEST CONSUMER', value: highestConsumer?.horseName || '—', unit: `${highestConsumer?.total || 0} kg/day`, sub: 'Current: Training Phase 3', subColor: 'text-muted-foreground', icon: Crown },
    { label: 'OATS INVENTORY', value: String(totalOats), unit: 'kg', sub: '⚠ Critical: 3 days remaining', subColor: 'text-destructive', icon: Package },
    { label: 'SUPP. EFFICIENCY', value: '92.4', unit: '%', sub: '✓ Absorption within target range', subColor: 'text-success', icon: Zap },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Feed Consumption <span className="text-primary">Matrix</span></h1>
          <p className="text-sm text-muted-foreground mt-1">Dynamic resource allocation and metabolic tracking for Stallion Wing A.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="h-10 px-4 sm:px-5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-surface-container-high transition-colors">Export Report</button>
          <FormDialog trigger={
            <button className="h-10 px-4 sm:px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" /> Update Feeds
            </button>
          } title="Update Feed Consumption">
            <UpdateFeedsForm />
          </FormDialog>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        {kpis.map(k => (
          <div key={k.label} className="bg-surface-container-highest rounded-xl p-5 edge-glow relative overflow-hidden">
            <p className="text-[10px] font-semibold tracking-[0.15em] text-muted-foreground uppercase flex items-center gap-2">
              <k.icon className="w-3.5 h-3.5 text-primary" /> {k.label}
            </p>
            <p className="text-3xl font-bold text-foreground mt-2 mono-data">{k.value} <span className="text-base font-normal text-muted-foreground">{k.unit}</span></p>
            <p className={`text-xs mt-1 ${k.subColor}`}>{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Daily Consumption Matrix */}
      <div className="bg-surface-container-highest rounded-xl edge-glow overflow-hidden">
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b border-border gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-foreground truncate">Daily Consumption Matrix</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/20 text-primary uppercase tracking-wider shrink-0 hidden sm:inline">LiveSync</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="p-2 rounded-lg bg-surface-container-high text-muted-foreground hover:text-foreground"><SlidersHorizontal className="w-4 h-4" /></button>
            <button className="p-2 rounded-lg bg-surface-container-high text-muted-foreground hover:text-foreground"><Download className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="overflow-x-auto">
        <table className="w-full min-w-[750px]">
          <thead>
            <tr className="border-b border-border">
              {['HORSE ASSET', 'HIMALAYAN BALANCE', 'BARLEY', 'OATS', 'SOYA', 'LUCERNE', 'SUPPLEMENTS', 'TOTAL KG'].map(h => (
                <th key={h} className="px-6 py-3 text-left text-[10px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map(f => (
              <tr key={f.id} className="border-b border-border/50 hover:bg-surface-container-high/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-xs font-bold text-primary">{f.horseName.charAt(0)}</div>
                    <div>
                      <span className="font-semibold text-sm text-foreground">{f.horseName}</span>
                      <span className="block text-[10px] text-muted-foreground mono-data">ID: #{f.stableNumber}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 mono-data text-sm">{f.himalayanBalance.toFixed(1)} kg</td>
                <td className="px-6 py-4 mono-data text-sm">{f.barley.toFixed(1)} kg</td>
                <td className="px-6 py-4 mono-data text-sm">{f.oats.toFixed(1)} kg</td>
                <td className="px-6 py-4 mono-data text-sm">{f.soya > 8 ? <span className="text-primary">{f.soya.toFixed(1)} kg</span> : `${f.soya.toFixed(1)} kg`}</td>
                <td className="px-6 py-4 mono-data text-sm">{f.lucerne.toFixed(1)} kg</td>
                <td className="px-6 py-4 mono-data text-sm">{(f.biotin + f.joint + f.epsom).toFixed(0)}g</td>
                <td className="px-6 py-4 mono-data text-sm font-bold text-primary">{f.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground mono-data hidden sm:block">Displaying {paginated.length} of {horses.length} horses</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30">Previous</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-7 h-7 rounded text-xs font-medium ${currentPage === i + 1 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{i + 1}</button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="text-xs text-muted-foreground hover:text-foreground disabled:opacity-30">Next</button>
          </div>
        </div>
      </div>

      {/* Bottom Section: Trends + Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 bg-surface-container-highest rounded-xl p-5 sm:p-6 edge-glow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-foreground">Consumption Trends</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" /> ACTUAL</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-muted-foreground" /> FORECAST</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Real-time aggregate feed usage vs. projected stock depletion.</p>
          <div className="flex items-end gap-3 h-32">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, i) => {
              const heights = [35, 50, 45, 60, 85, 40, 30];
              const isCurrent = day === 'FRI';
              return (
                <div key={day} className="flex-1 flex flex-col items-center gap-1">
                  {isCurrent && <span className="text-[9px] bg-surface-container-high px-1.5 py-0.5 rounded font-medium text-foreground mb-1">Current Peak</span>}
                  <div className="w-full flex gap-0.5">
                    <div className={`flex-1 rounded-t ${isCurrent ? 'bg-primary' : 'bg-surface-container-high'}`} style={{ height: `${heights[i]}%` }} />
                    <div className="flex-1 rounded-t bg-surface-container" style={{ height: `${heights[i] * 0.7}%` }} />
                  </div>
                  <span className={`text-[10px] ${isCurrent ? 'text-primary font-bold' : 'text-muted-foreground'}`}>{day}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-2 bg-surface-container-highest rounded-xl p-5 sm:p-6 edge-glow">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mb-3">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">Feed Optimization Insight</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Based on metabolic data from <strong className="text-foreground">Shadowfax</strong>, we recommend reducing <strong className="text-primary">Whole Oats</strong> by 15% and substituting with <strong className="text-primary">Himalayan Balance</strong> to optimize energy release during the upcoming show jumping session.
          </p>
          <button className="mt-4 w-full h-10 rounded-lg border border-primary text-primary text-sm font-medium uppercase tracking-wider hover:bg-primary/10 transition-colors">Apply AI Adjustment</button>
        </div>
      </div>
    </div>
  );
}
