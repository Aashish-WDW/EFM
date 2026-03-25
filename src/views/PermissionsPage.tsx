'use client';
import { useState } from 'react';
import { Shield, Search, Filter, SlidersHorizontal, Save, Download, Settings2, AlertTriangle, Lock, CheckCircle, Plus } from 'lucide-react';

const personnel = [
  { name: 'Elena Vance', role: 'SYSTEM ADMIN', active: true, color: 'border-primary' },
  { name: 'Marcus Thorne', role: 'GROUND OPERATIONS', active: false, color: 'border-transparent' },
  { name: 'Sarah Chen', role: 'LEAD VETERINARY', active: false, color: 'border-transparent' },
  { name: 'David Kross', role: 'FINANCE DIRECTOR', active: false, color: 'border-transparent' },
];

const globalPerms = [
  { label: 'MANAGE EMPLOYEES', node: 'system.personnel.write', enabled: true, highlight: false },
  { label: 'FINANCIAL AUDIT', node: 'accounts.audit.view', enabled: false, highlight: false },
  { label: 'ACCESS MASTER LOGS', node: 'system.logs.read', enabled: true, highlight: true },
];

const reportingPerms = [
  { label: 'PERFORMANCE METRICS', node: 'analytics.stats.read', enabled: true },
  { label: 'HEALTH REPORTS', node: 'veterinary.reports.view', enabled: true },
  { label: 'INVENTORY OVERSIGHT', node: 'logistics.stock.read', enabled: true },
];

const taskOverrides = [
  { icon: Shield, label: 'LOG ATTENDANCE', desc: 'Authority to modify biometric timestamp data for subordinate staff.', badge: 'MANUAL OVERRIDE', badgeColor: 'bg-primary/20 text-primary', status: 'ACTIVE STATUS', enabled: true },
  { icon: AlertTriangle, label: 'MARK ISSUE STATUS', desc: 'Resolve hardware alarms and critical environmental sensor alerts.', badge: 'INHERITED', badgeColor: 'bg-success/20 text-success', status: 'ACTIVE STATUS', enabled: true },
  { icon: Lock, label: 'CALIBRATE SENSORS', desc: 'System-wide tuning of atmospheric and equine health sensor arrays.', badge: 'RESTRICTED', badgeColor: 'bg-muted text-muted-foreground', status: 'DISABLED', enabled: false },
  { icon: Plus, label: 'PRESCRIBE RATIONS', desc: 'Modify nutritional mandates and high-performance supplement flows.', badge: 'INHERITED', badgeColor: 'bg-success/20 text-success', status: 'ACTIVE STATUS', enabled: true },
  { icon: Settings2, label: 'OVERRIDE AIRLOCK', desc: 'Temporary override of secure stable zone containment protocols.', badge: 'MANUAL OVERRIDE', badgeColor: 'bg-primary/20 text-primary', status: 'ACTIVE STATUS', enabled: true },
];

export default function PermissionsPage() {
  const [selectedPerson, setSelectedPerson] = useState(0);
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <p className="label-sm text-muted-foreground text-[10px] truncate">ORGANIZATION &gt; SYSTEM SETTINGS &gt; <span className="text-primary">PERMISSIONS MATRIX</span></p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">System <span className="text-primary">Permissions</span></h1>
          <p className="text-sm text-muted-foreground mt-1 max-w-lg">Configure global access matrices and individual task overrides. Changes are logged in real-time.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="h-9 px-3 sm:px-4 rounded-lg border border-border text-foreground text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high">
            <Download className="w-4 h-4" /> <span className="hidden sm:inline">EXPORT LOG</span>
          </button>
          <button className="h-9 px-3 sm:px-4 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-medium flex items-center gap-2">
            <Save className="w-4 h-4" /> SAVE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Personnel Directory */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-surface-container-highest rounded-lg p-4 edge-glow">
            <div className="flex items-center justify-between mb-3">
              <p className="label-sm text-primary tracking-widest">PERSONNEL DIRECTORY</p>
              <div className="flex gap-1">
                <button className="p-1 text-muted-foreground hover:text-foreground"><SlidersHorizontal className="w-3.5 h-3.5" /></button>
                <button className="p-1 text-muted-foreground hover:text-foreground"><Filter className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search staff..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
            <div className="space-y-1">
              {personnel.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedPerson(i)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors border-l-2 ${i === selectedPerson ? 'bg-surface-container-high border-primary' : 'border-transparent hover:bg-surface-container-high/50'}`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                    {p.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${i === selectedPerson ? 'text-foreground' : 'text-muted-foreground'}`}>{p.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{p.role}</p>
                  </div>
                  {p.active && <div className="w-2 h-2 rounded-full bg-success ml-auto shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Status Legend */}
          <div className="bg-surface-container-highest rounded-lg p-4 edge-glow">
            <p className="label-sm text-muted-foreground mb-3">STATUS LEGEND</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs"><span className="w-2 h-2 rounded-full bg-primary" /> <span className="text-foreground">ROLE DEFAULT (INHERITED)</span></div>
              <div className="flex items-center gap-2 text-xs"><span className="w-2 h-2 rounded-full bg-destructive" /> <span className="text-foreground">MANUAL OVERRIDE</span></div>
              <div className="flex items-center gap-2 text-xs"><span className="w-2 h-2 rounded-full bg-muted-foreground" /> <span className="text-foreground">RESTRICTED ACCESS</span></div>
            </div>
          </div>
        </div>

        {/* Permission Panels */}
        <div className="lg:col-span-9 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Global Management */}
            <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center"><Shield className="w-4 h-4 text-primary" /></div>
                <h3 className="heading-md text-foreground uppercase tracking-wider text-sm">Global Management</h3>
              </div>
              <div className="space-y-4">
                {globalPerms.map(p => (
                  <div key={p.label} className={`flex items-center justify-between ${p.highlight ? 'border-l-2 border-destructive pl-3 -ml-3' : ''}`}>
                    <div>
                      <p className={`text-sm font-semibold ${p.highlight ? 'text-destructive' : 'text-foreground'}`}>{p.label}</p>
                      <p className="text-[10px] text-muted-foreground mono-data">Permission node: {p.node}</p>
                    </div>
                    <div className={`w-11 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${p.enabled ? 'bg-primary' : 'bg-surface-container-high border border-border'}`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${p.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reporting & Analytics */}
            <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center"><Settings2 className="w-4 h-4 text-primary" /></div>
                <h3 className="heading-md text-foreground uppercase tracking-wider text-sm">Reporting & Analytics</h3>
              </div>
              <div className="space-y-4">
                {reportingPerms.map(p => (
                  <div key={p.label} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{p.label}</p>
                      <p className="text-[10px] text-muted-foreground mono-data">Permission node: {p.node}</p>
                    </div>
                    <div className={`w-11 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${p.enabled ? 'bg-primary' : 'bg-surface-container-high border border-border'}`}>
                      <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${p.enabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Operational Task Overrides */}
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0"><Settings2 className="w-4 h-4 text-primary" /></div>
                <h3 className="heading-md text-foreground uppercase tracking-wider text-sm">Operational Task Overrides</h3>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-muted-foreground bg-surface-container-high px-3 py-1.5 rounded tracking-wider">TARGET: {personnel[selectedPerson].name.toUpperCase()}</span>
                <span className="px-2 py-1 rounded bg-primary/20 text-primary text-[10px] font-bold flex items-center gap-1">ADMIN <CheckCircle className="w-3 h-3" /></span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {taskOverrides.map((t, i) => (
                <div key={t.label} className={`rounded-lg p-4 border ${t.enabled ? 'border-border bg-surface-container-high/50' : 'border-border/50 bg-surface-container/50 opacity-60'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-8 h-8 rounded-lg ${t.enabled ? 'bg-primary/15' : 'bg-muted'} flex items-center justify-center`}>
                      <t.icon className={`w-4 h-4 ${t.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider ${t.badgeColor}`}>{t.badge}</span>
                  </div>
                  <h4 className="font-bold text-foreground text-sm mb-1">{t.label}</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">{t.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className={`label-sm ${t.enabled ? 'text-success' : 'text-muted-foreground'}`}>{t.status}</span>
                    {t.enabled ? <CheckCircle className="w-4 h-4 text-success" /> : <Lock className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </div>
              ))}
              {/* Add New */}
              <div className="rounded-lg p-4 border border-dashed border-border flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 transition-colors min-h-[160px]">
                <Plus className="w-6 h-6 text-muted-foreground mb-2" />
                <p className="label-sm text-muted-foreground">APPEND TASK NODE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
