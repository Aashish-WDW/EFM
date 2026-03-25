'use client';
import { useState, useMemo, useRef } from 'react';
import { Search, Plus, SlidersHorizontal, ChevronLeft, ChevronRight, MoreVertical, Upload, X, Pencil, Trash2, ChevronDown } from 'lucide-react';
import { teamMembers } from '@/data/seed';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import HorseIcon from '@/components/shared/HorseIcon';

const roleColorHex: Record<string, string> = {
  'Guard': '#8b5cf6', 'Groom': '#22c55e', 'Gardener': '#84cc16', 'Housekeeping': '#a855f7',
  'Electrician': '#f59e0b', 'Ground Supervisor': '#14b8a6', 'Riding Boy': '#f97316',
  'Rider': '#3b82f6', 'Instructor': '#ec4899', 'Farrier': '#f97316', 'Jamedar': '#ef4444',
  'Stable Manager': '#c084fc', 'Executive Accounts': '#60a5fa', 'Executive Admin': '#fbbf24',
  'Restaurant Manager': '#fb923c', 'Kitchen Helper': '#a3e635', 'Waiter': '#38bdf8',
  'Director': '#3b82f6', 'Super Admin': '#fbbf24', 'Veterinarian': '#22c55e', 'Chef': '#fb923c',
  'Accountant': '#60a5fa', 'Maintenance': '#f59e0b', 'Kitchen Staff': '#a3e635', 'Driver': '#8b5cf6',
  'Senior Executive Admin': '#fbbf24',
};
const statusDot: Record<string, string> = { Approved: 'bg-success', Pending: 'bg-warning', Inactive: 'bg-muted-foreground' };
const statusText: Record<string, string> = { Approved: 'text-success', Pending: 'text-warning', Inactive: 'text-muted-foreground' };

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function PhotoUpload({ label }: { label: string }) {
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <label className={lbl}>{label}</label>
      <div className="flex items-center gap-4">
        <div
          onClick={() => fileRef.current?.click()}
          className="w-16 h-16 rounded-full border-2 border-dashed border-border bg-surface-container-high flex items-center justify-center cursor-pointer hover:border-primary transition-colors shrink-0 overflow-hidden"
        >
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <Upload className="w-5 h-5 text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="text-sm text-foreground font-medium">Profile Photo</p>
          <p className="text-xs text-muted-foreground">JPG, PNG or GIF · max 5 MB</p>
          <button type="button" onClick={() => fileRef.current?.click()} className="mt-1 text-xs text-primary font-medium hover:underline">
            {preview ? 'Change photo' : 'Upload photo'}
          </button>
          {preview && (
            <button type="button" onClick={() => setPreview(null)} className="ml-2 text-xs text-destructive hover:underline">Remove</button>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
}

function AddEmployeeForm() {
  return (
    <div className="space-y-4 mt-2">
      <PhotoUpload label="PROFILE PHOTO" />
      <div className="grid grid-cols-2 gap-3">
        <div><label className={lbl}>FULL NAME</label><input type="text" placeholder="e.g. John Smith" className={inp} /></div>
        <div><label className={lbl}>EMAIL</label><input type="email" placeholder="email@stable.com" className={inp} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={lbl}>PHONE</label><input type="tel" placeholder="555-XXXX" className={`${inp} mono-data`} /></div>
        <SelectField label="ROLE" options={['Groom','Instructor','Guard','Farrier','Stable Manager','Veterinarian','Chef','Driver','Maintenance']} placeholder="Select role..." />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SelectField label="DEPARTMENT" options={['Stable Ops', 'Ground Ops', 'Admin', 'Accounts', 'Restaurant', 'Leadership']} defaultValue="Stable Ops" />
        <SelectField label="SUPERVISOR" options={['Emma Manager', 'Dr. Director', 'Mike Supervisor', 'Carlos Chef']} defaultValue="Emma Manager" />
      </div>
      <SelectField label="STATUS" options={['Approved', 'Pending', 'Inactive']} defaultValue="Approved" />
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">ADD EMPLOYEE</button>
    </div>
  );
}

function EditEmployeeForm({ member }: { member: typeof teamMembers[0] }) {
  return (
    <div className="space-y-4 mt-2">
      <PhotoUpload label="PROFILE PHOTO" />
      <div className="grid grid-cols-2 gap-3">
        <div><label className={lbl}>FULL NAME</label><input type="text" defaultValue={member.fullName} className={inp} /></div>
        <div><label className={lbl}>EMAIL</label><input type="email" defaultValue={member.email} className={inp} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className={lbl}>PHONE</label><input type="tel" defaultValue={member.phone} className={`${inp} mono-data`} /></div>
        <SelectField label="ROLE" options={['Groom','Instructor','Guard','Farrier','Stable Manager','Veterinarian','Chef','Driver','Maintenance']} defaultValue={member.role} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SelectField label="DEPARTMENT" options={['Stable Ops', 'Ground Ops', 'Admin', 'Accounts', 'Restaurant', 'Leadership']} defaultValue="Stable Ops" />
        <SelectField label="SUPERVISOR" options={['Emma Manager', 'Dr. Director', 'Mike Supervisor', 'Carlos Chef']} defaultValue={member.supervisor === '-' ? 'Emma Manager' : member.supervisor} />
      </div>
      <SelectField label="STATUS" options={['Approved', 'Pending', 'Inactive']} defaultValue={member.status} />
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">SAVE CHANGES</button>
    </div>
  );
}

function FilterPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="border-t border-border bg-surface-container-low px-4 sm:px-5 py-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Filter Options</span>
        <button onClick={onClose} className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5" /></button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <SelectField label="STATUS" options={['All', 'Approved', 'Pending', 'Inactive']} defaultValue="All" />
        <SelectField label="DEPARTMENT" options={['All', 'Stable Ops', 'Ground Ops', 'Admin', 'Accounts', 'Restaurant', 'Leadership']} defaultValue="All" />
        <SelectField label="SUPERVISOR" options={['All', 'Emma Manager', 'Dr. Director', 'Mike Supervisor', 'Carlos Chef']} defaultValue="All" />
        <div className="flex items-end">
          <button className="w-full h-10 rounded-lg bg-primary text-primary-foreground text-xs font-semibold tracking-wider uppercase">Apply</button>
        </div>
      </div>
    </div>
  );
}

function RowActions({ member }: { member: typeof teamMembers[0] }) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} className="p-1 rounded hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
        <MoreVertical className="w-4 h-4" />
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
      <FormDialog open={editOpen} onOpenChange={setEditOpen} trigger={<span />} title={`Edit — ${member.fullName}`}>
        <EditEmployeeForm member={member} />
      </FormDialog>
    </div>
  );
}

export default function TeamPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [showFilters, setShowFilters] = useState(false);
  const pageSize = 10;

  const roles = useMemo(() => ['All Roles', ...Array.from(new Set(teamMembers.map(t => t.role)))], []);
  const filtered = useMemo(() => teamMembers.filter(t => {
    const matchSearch = t.fullName.toLowerCase().includes(search.toLowerCase()) || t.email.toLowerCase().includes(search.toLowerCase()) || t.role.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'All Roles' || t.role === roleFilter;
    return matchSearch && matchRole;
  }), [search, roleFilter]);
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">Team Directory</h1>
          <p className="text-muted-foreground mt-2 text-sm">Manage staff roles, supervisors, and contact details.</p>
        </div>
        <FormDialog trigger={
          <button className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 transition-all">
            <Plus className="w-4 h-4" /> Add New Employee
          </button>
        } title="Add New Employee">
          <AddEmployeeForm />
        </FormDialog>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 sm:p-5">
          <div className="flex-1 flex items-center gap-2 px-4 h-12 rounded-lg border border-border bg-background">
            <Search className="w-4 h-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(0); }}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none h-full"
            />
            {search && (
              <button onClick={() => { setSearch(''); setPage(0); }} className="text-muted-foreground hover:text-foreground">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <SelectField
            options={roles}
            value={roleFilter}
            onChange={(v) => { setRoleFilter(v); setPage(0); }}
            className="w-full sm:w-48"
          />
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`h-12 w-12 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${showFilters ? 'bg-primary border-primary text-primary-foreground' : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && <FilterPanel onClose={() => setShowFilters(false)} />}

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-t border-border">
                <th className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Name</th>
                <th className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Role</th>
                <th className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden lg:table-cell">Supervisor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground hidden lg:table-cell">Contact</th>
                <th className="px-4 sm:px-6 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {paged.map(member => {
                const initials = member.fullName.split(' ').map(n => n[0]).join('').slice(0, 2);
                const rColor = roleColorHex[member.role] || '#8b5cf6';
                const dot = statusDot[member.status] || 'bg-muted-foreground';
                const stText = statusText[member.status] || 'text-muted-foreground';
                return (
                  <tr key={member.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0"><span className="text-xs font-bold text-primary">{initials}</span></div>
                        <div><p className="font-semibold text-foreground">{member.fullName}</p><p className="text-xs text-muted-foreground">{member.email}</p></div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: rColor + '20', color: rColor }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: rColor }} />
                        {member.role}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-foreground hidden lg:table-cell">{member.supervisor === '-' ? 'Self' : member.supervisor}</td>
                    <td className="px-4 sm:px-6 py-4"><span className={`inline-flex items-center gap-1.5 text-xs font-medium ${stText}`}><span className={`w-2 h-2 rounded-full ${dot}`} />{member.status.toUpperCase()}</span></td>
                    <td className="px-4 sm:px-6 py-4 font-mono text-foreground hidden lg:table-cell">{member.phone}</td>
                    <td className="px-4 sm:px-6 py-4"><RowActions member={member} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-border">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <span className="text-primary">{page * pageSize + 1}-{Math.min((page + 1) * pageSize, filtered.length)}</span> of {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="w-8 h-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground disabled:opacity-30"><ChevronLeft className="w-4 h-4" /></button>
            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => (
              <button key={i} onClick={() => setPage(i)} className={`w-8 h-8 rounded-lg text-xs font-medium ${i === page ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground'}`}>{i + 1}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1} className="w-8 h-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground disabled:opacity-30"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
        {[
          { label: 'TOTAL STAFF', value: teamMembers.length, color: 'text-primary' },
          { label: 'ACTIVE SHIFTS', value: 12, color: 'text-primary' },
          { label: 'ON MEDICAL LEAVE', value: '03', color: 'text-warning' },
          { label: 'PENDING CLEARANCES', value: '05', color: 'text-warning' },
        ].map(card => (
          <div key={card.label} className="rounded-xl border border-border bg-card p-4 sm:p-5 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <HorseIcon className="w-24 h-24" />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1 relative z-10">{card.label}</p>
            <p className={`text-2xl sm:text-3xl font-bold relative z-10 ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
