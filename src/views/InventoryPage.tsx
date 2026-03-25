'use client';
import { useState } from 'react';
import DataTable from '@/components/shared/DataTable';
import StatusBadge from '@/components/shared/StatusBadge';
import { feedInventory, medicineInventory } from '@/data/seed';

const tabs = ['Feed', 'Medicine'] as const;

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState<string>('Feed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="display-sm text-foreground">Inventory</h1>
          <p className="text-sm text-muted-foreground mt-1">Stock levels & management</p>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-primary-container text-accent-foreground'
                : 'bg-surface-bright text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Feed' ? (
        <DataTable
          data={feedInventory}
          columns={[
            { key: 'feedType', label: 'Feed Type', render: f => <span className="font-medium">{f.feedType}</span> },
            { key: 'unit', label: 'Unit' },
            { key: 'totalAvailable', label: 'Available', render: f => <span className="mono-data">{f.totalAvailable}</span> },
            { key: 'usedToday', label: 'Used Today', render: f => <span className="mono-data">{f.usedToday}</span> },
            { key: 'unitsLeft', label: 'Remaining', render: f => (
              <div className="flex items-center gap-2">
                <span className="mono-data">{f.unitsLeft}</span>
                <div className="w-16 h-1.5 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      f.unitsLeft <= f.threshold ? 'bg-destructive' : f.unitsLeft <= f.threshold * 2 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${Math.min((f.unitsLeft / f.totalAvailable) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )},
            { key: 'threshold', label: 'Threshold', render: f => <span className="mono-data text-muted-foreground">{f.threshold}</span> },
            { key: 'status', label: 'Status', render: f => <StatusBadge status={f.status} /> },
          ]}
        />
      ) : (
        <DataTable
          data={medicineInventory}
          columns={[
            { key: 'medicineType', label: 'Medicine', render: m => <span className="font-medium">{m.medicineType}</span> },
            { key: 'unit', label: 'Unit' },
            { key: 'openingStock', label: 'Opening', render: m => <span className="mono-data">{m.openingStock}</span> },
            { key: 'unitsPurchased', label: 'Purchased', render: m => <span className="mono-data">{m.unitsPurchased}</span> },
            { key: 'stockLevel', label: 'Current', render: m => (
              <div className="flex items-center gap-2">
                <span className="mono-data">{m.stockLevel}</span>
                <div className="w-16 h-1.5 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className={`h-full rounded-full ${m.stockLevel <= m.threshold ? 'bg-destructive' : 'bg-success'}`}
                    style={{ width: `${Math.min((m.stockLevel / (m.openingStock + m.unitsPurchased)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )},
            { key: 'threshold', label: 'Min Level', render: m => <span className="mono-data text-muted-foreground">{m.threshold}</span> },
          ]}
        />
      )}
    </div>
  );
}
