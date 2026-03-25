'use client';
import { useState } from 'react';
import { FileText, Printer, Download, Zap, SlidersHorizontal, TrendingUp } from 'lucide-react';
import { invoices } from '@/data/seed';
import SelectField from '@/components/shared/SelectField';
import DatePicker from '@/components/shared/DatePicker';

const sessions = [
  { desc: 'Advanced Show Jumping (Group)', detail: 'March 04, 08, 12, 15, 22', qty: 12.5, rate: 120, amount: 1500 },
  { desc: 'Private Elite Coaching', detail: 'March 10, 17, 24 (Theodore II & Valena)', qty: 6.0, rate: 350, amount: 2100 },
  { desc: 'Veterinary Liaison Hours', detail: 'Coordination for Spring Vaccinations', qty: 4.0, rate: 75, amount: 300 },
  { desc: 'Facility Operations Share', detail: 'Standard Arena 1-3 Maintenance Premium', qty: 1.0, rate: 950, amount: 950 },
];

export default function InvoicesPage() {
  const [entityType, setEntityType] = useState<'Instructor' | 'Facility'>('Instructor');
  const selected = invoices[0];
  const subtotal = sessions.reduce((s, x) => s + x.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="label-sm text-primary tracking-widest">FINANCIAL CONTROL CENTER</p>
          <h1 className="display-sm text-foreground mt-1">Invoice Generation</h1>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="h-9 px-4 rounded-lg border border-border text-foreground text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors">
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button className="h-9 px-4 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-medium flex items-center gap-2">
            <Zap className="w-4 h-4" /> Generate Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Parameters Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
            <div className="flex items-center gap-2 mb-5">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <h2 className="heading-md text-foreground">Parameters</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="label-sm text-muted-foreground block mb-2">ENTITY TYPE</label>
                <div className="flex rounded-lg overflow-hidden border border-border">
                  {(['Instructor', 'Facility'] as const).map(t => (
                    <button key={t} onClick={() => setEntityType(t)} className={`flex-1 h-9 text-sm font-medium transition-colors ${entityType === t ? 'bg-primary text-primary-foreground' : 'bg-surface-container-high text-muted-foreground hover:text-foreground'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <SelectField label="SELECT INSTRUCTOR" options={['Alexander Vance (Senior Jumper)', 'James Instructor', 'Alex Rider']} defaultValue="Alexander Vance (Senior Jumper)" />
              </div>

              <div>
                <label className="label-sm text-muted-foreground block mb-2">DATE RANGE</label>
                <div className="grid grid-cols-2 gap-3">
                  <DatePicker defaultValue="2026-03-01" placeholder="From" />
                  <DatePicker defaultValue="2026-03-31" placeholder="To" />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-foreground">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-primary" />
                Include arena maintenance fees
              </label>
            </div>
          </div>

          {/* Estimated Total */}
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow border-l-2 border-primary">
            <p className="label-sm text-primary mb-1">ESTIMATED TOTAL</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-foreground mono-data">AED {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              <TrendingUp className="w-8 h-8 text-primary/30" />
            </div>
            <p className="text-xs text-success mt-2">+12% vs last period</p>
          </div>
        </div>

        {/* Invoice Preview */}
        <div className="lg:col-span-8">
          <div className="bg-surface-container-highest rounded-lg edge-glow overflow-hidden">
            {/* Preview Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-surface-container-high border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="label-sm text-muted-foreground">PREVIEW: INV-2026-0842</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 rounded hover:bg-surface-container-highest text-muted-foreground"><FileText className="w-4 h-4" /></button>
                <button className="p-2 rounded hover:bg-surface-container-highest text-muted-foreground"><Printer className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Invoice Document */}
            <div className="p-4 sm:p-8 space-y-6">
              {/* Company Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground tracking-wider">THE NEON STABLE</h2>
                  <p className="text-xs text-muted-foreground mt-1">1200 Velocity Way<br />Equine District, Sector 7<br />Austin, TX 78701</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-surface-container-high/50 tracking-widest">INVOICE</p>
                  <div className="text-xs text-muted-foreground mt-2 space-y-0.5 mono-data">
                    <p>NO: <span className="text-foreground font-medium">INV-2026-0842</span></p>
                    <p>DATE: <span className="text-foreground font-medium">MAR 28, 2026</span></p>
                    <p>DUE: <span className="text-foreground font-medium">APR 12, 2026</span></p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border" />

              {/* Instructor & Payment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <p className="label-sm text-primary mb-1">INSTRUCTOR ENTITY</p>
                  <p className="font-semibold text-foreground">Alexander Vance</p>
                  <p className="text-xs text-muted-foreground mono-data mt-1">ID: INST-VNC-901<br />vance.performance@stable.com</p>
                </div>
                <div>
                  <p className="label-sm text-primary mb-1">PAYMENT CHANNEL</p>
                  <p className="font-semibold text-foreground">Stable Ops Wallet</p>
                  <p className="text-xs text-muted-foreground mono-data mt-1">Ref: 009-223-991<br />Auto-Debit Enabled</p>
                </div>
              </div>

              {/* Sessions Table */}
              <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[420px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 text-left label-sm text-muted-foreground">SESSION DESCRIPTION</th>
                    <th className="py-2 text-right label-sm text-muted-foreground">QTY / HRS</th>
                    <th className="py-2 text-right label-sm text-muted-foreground">RATE</th>
                    <th className="py-2 text-right label-sm text-muted-foreground">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s, i) => (
                    <tr key={i} className="border-b border-border/30">
                      <td className="py-3">
                        <span className="font-semibold text-foreground block">{s.desc}</span>
                        <span className="text-xs text-muted-foreground">{s.detail}</span>
                      </td>
                      <td className="py-3 text-right mono-data text-foreground">{s.qty.toFixed(1)}</td>
                      <td className="py-3 text-right mono-data text-foreground">AED {s.rate.toFixed(2)}</td>
                      <td className="py-3 text-right mono-data font-semibold text-foreground">AED {s.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>

              {/* Totals */}
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="mono-data">AED {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Tax (0%)</span>
                  <span className="mono-data">AED 0.00</span>
                </div>
                <div className="border-t border-border pt-2 flex justify-between">
                  <span className="text-primary font-bold">TOTAL</span>
                  <span className="text-xl mono-data font-bold text-foreground">AED {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                <p className="text-[10px] text-muted-foreground max-w-[300px]">All payments are processed through The Neon Stable secure ledger. Invoices are generated based on verified sensor-tracked arena logs.</p>
                <p className="label-sm text-muted-foreground">AUTHORIZED DIGITALLY</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
