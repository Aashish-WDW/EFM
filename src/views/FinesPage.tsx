'use client';
import { useState } from 'react';
import { DollarSign, AlertTriangle, Plus, Upload, MoreVertical, Zap, CheckCircle2, XCircle, Undo2, Trash2 } from 'lucide-react';
import { fines as initialFines, Fine } from '@/data/seed';
import SelectField from '@/components/shared/SelectField';
import DatePicker from '@/components/shared/DatePicker';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusStyles: Record<string, string> = {
  Issued: 'bg-warning/20 text-warning border border-warning/30',
  Paid: 'bg-success/20 text-success border border-success/30',
  Appealed: 'bg-destructive/20 text-destructive border border-destructive/30',
  Waived: 'bg-muted text-muted-foreground border border-border',
};

const statusLabels: Record<string, string> = {
  Issued: 'PENDING',
  Paid: 'APPROVED',
  Appealed: 'DISPUTED',
  Waived: 'WAIVED',
};

const deptMap: Record<string, string> = {
  'Mike Farrier': 'STABLE OPS',
  'Fahad Groom': 'GROUNDS',
  'Daniel Maintenance': 'MAINTENANCE',
};

export default function FinesPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [fines, setFines] = useState(initialFines);
  const [formData, setFormData] = useState({
    employee: '',
    reason: '',
    amount: ''
  });

  const totalVolume = fines.reduce((s, f) => s + f.amount, 0);
  const pendingCount = fines.filter(f => f.status === 'Issued').length;
  
  const filtered = activeTab === 'All' ? fines : fines.filter(f => {
    if (activeTab === 'Pending') return f.status === 'Issued';
    if (activeTab === 'Resolved') return f.status === 'Paid' || f.status === 'Waived';
    return true;
  });

  const handleExecuteAction = () => {
    if (!formData.employee || !formData.reason || !formData.amount) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newFine = {
      id: `fine-${Date.now()}`,
      issuedAt: new Date().toISOString().split('T')[0],
      employeeName: formData.employee,
      reason: formData.reason,
      amount: parseFloat(formData.amount),
      status: 'Issued'
    } as any;

    setFines(prev => [newFine, ...prev]);
    setFormData({ employee: '', reason: '', amount: '' });
    toast.success('Fine enforcement action executed successfully');
  };

  const handleUpdateStatus = (id: string, newStatus: Fine['status']) => {
    setFines(prev => prev.map(f => f.id === id ? { ...f, status: newStatus } : f));
    toast.success(`Fine status updated to ${newStatus}`);
  };

  const handleDeleteFine = (id: string) => {
    setFines(prev => prev.filter(f => f.id !== id));
    toast.success("Fine record deleted successfully");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mt-1 shrink-0">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="label-sm text-muted-foreground">FINANCE / <span className="text-primary">FINE SYSTEM</span></p>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-1">Internal Compliance <span className="text-primary">&</span> Fines</h1>
            <p className="text-sm text-muted-foreground mt-1 max-w-lg">Manage facility-wide disciplinary actions and financial deductions.</p>
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <div className="bg-surface-container-highest rounded-lg p-4 edge-glow text-center min-w-[120px]">
            <p className="label-sm text-muted-foreground">MONTHLY VOLUME</p>
            <p className="text-xl sm:text-2xl font-bold text-foreground mono-data mt-1">₹{totalVolume.toLocaleString()}</p>
            <span className="text-xs text-success">+12%</span>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-4 edge-glow text-center min-w-[100px]">
            <p className="label-sm text-muted-foreground">PENDING</p>
            <p className="text-xl sm:text-2xl font-bold text-foreground mono-data mt-1">{pendingCount}</p>
            <span className="text-xs text-primary">ACTIONS</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Issue Enforcement Form */}
        <div className="lg:col-span-4 order-2 lg:order-1">
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
            <div className="flex items-center gap-2 mb-5">
              <Plus className="w-5 h-5 text-success" />
              <h2 className="heading-md text-foreground">Issue Enforcement</h2>
            </div>
            <div className="space-y-4">
              <SelectField 
                label="EMPLOYEE IDENTIFICATION" 
                options={['Mike Farrier', 'Fahad Groom', 'Daniel Maintenance']} 
                placeholder="Select Personnel..." 
                value={formData.employee}
                onChange={(val) => setFormData(prev => ({ ...prev, employee: val }))}
              />
              <SelectField 
                label="INFRACTION CATEGORY" 
                options={['Late Arrival', 'Negligence', 'Unauthorized Use', 'Safety Violation']} 
                placeholder="Select Reason..." 
                value={formData.reason}
                onChange={(val) => setFormData(prev => ({ ...prev, reason: val }))}
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-sm text-muted-foreground block mb-1.5">FINE AMOUNT</label>
                  <input 
                    type="number" 
                    value={formData.amount}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="₹0.00" 
                    className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm mono-data placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none" 
                  />
                </div>
                <DatePicker label="INCIDENT DATE" />
              </div>
              <div>
                <label className="label-sm text-muted-foreground block mb-1.5">EVIDENCE DOCUMENTATION</label>
                <div 
                  onClick={() => toast.info("Attaching evidence documents...")}
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Drop PDF or Images here to attach</p>
                </div>
              </div>
              <button 
                onClick={handleExecuteAction}
                className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider flex items-center justify-center gap-2 transition-opacity active:opacity-80 hover:opacity-90"
              >
                Execute Fine Action <Zap className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Audit History Table */}
        <div className="lg:col-span-8 order-1 lg:order-2">
          <div className="bg-surface-container-highest rounded-lg edge-glow overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-5 py-3 sm:py-4 border-b border-border gap-3">
              <h2 className="heading-md text-foreground">Audit History</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex rounded-lg overflow-hidden border border-border">
                  {['All', 'Pending', 'Resolved'].map(t => (
                    <button key={t} onClick={() => setActiveTab(t)} className={`px-3 sm:px-4 h-8 text-xs font-medium transition-colors ${activeTab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                      {t}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => toast.info('Exporting audit history...')}
                  className="h-8 px-3 rounded-lg border border-border text-xs text-muted-foreground flex items-center gap-1.5 hover:bg-surface-container-high transition-colors"
                >
                  <Upload className="w-3 h-3" /> Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-5 py-3 text-left label-sm text-muted-foreground">DATE</th>
                  <th className="px-3 py-3 text-left label-sm text-muted-foreground">ISSUED TO</th>
                  <th className="px-3 py-3 text-left label-sm text-muted-foreground">REASON</th>
                  <th className="px-3 py-3 text-right label-sm text-muted-foreground">AMOUNT</th>
                  <th className="px-3 py-3 text-center label-sm text-muted-foreground">STATUS</th>
                  <th className="px-3 py-3 w-8"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(f => (
                  <tr key={f.id} className="border-b border-border/30 hover:bg-surface-container-high/50 transition-colors">
                    <td className="px-5 py-4 mono-data text-xs text-muted-foreground whitespace-nowrap">{f.issuedAt}</td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                          {f.employeeName.split(' ').map(n => n[0]).join('')}
                        </span>
                        <div>
                          <span className="font-semibold text-foreground block text-sm">{f.employeeName}</span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{deptMap[f.employeeName] || 'STAFF'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-foreground max-w-[180px] truncate">{f.reason}</td>
                    <td className="px-3 py-4 text-right mono-data font-bold text-foreground">₹{f.amount.toFixed(2)}</td>
                    <td className="px-3 py-4 text-center">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider ${statusStyles[f.status]}`}>
                        {statusLabels[f.status] || f.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button 
                            className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-surface-container-high transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-surface-container-highest border-border">
                          <DropdownMenuLabel className="text-muted-foreground">Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-border" />
                          <DropdownMenuItem onClick={() => handleUpdateStatus(f.id, 'Paid')} className="text-foreground hover:bg-surface-container-high cursor-pointer gap-2">
                            <CheckCircle2 className="w-4 h-4 text-success" /> Mark as Paid
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(f.id, 'Waived')} className="text-foreground hover:bg-surface-container-high cursor-pointer gap-2">
                            <Undo2 className="w-4 h-4 text-primary" /> Waive Fine
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(f.id, 'Appealed')} className="text-foreground hover:bg-surface-container-high cursor-pointer gap-2">
                            <AlertTriangle className="w-4 h-4 text-warning" /> Mark as Appealed
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-border" />
                          <DropdownMenuItem onClick={() => handleDeleteFine(f.id)} className="text-destructive hover:bg-destructive/10 cursor-pointer gap-2">
                            <Trash2 className="w-4 h-4" /> Delete Record
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-t border-border">
              <span className="text-xs text-muted-foreground hidden sm:block">Showing {filtered.length} of {fines.length + 10} enforcement actions</span>
              <div className="flex gap-4">
                <button className="text-xs text-muted-foreground hover:text-foreground font-medium tracking-wider">PREVIOUS</button>
                <button className="text-xs text-muted-foreground hover:text-foreground font-medium tracking-wider">NEXT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
