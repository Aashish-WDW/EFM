'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Calendar, Users, Clock, MapPin, Plus } from 'lucide-react';
import { meetings } from '@/data/seed';
import FormDialog from '@/components/shared/FormDialog';
import SelectField from '@/components/shared/SelectField';
import DatePicker from '@/components/shared/DatePicker';
import TimePicker from '@/components/shared/TimePicker';

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

function StartMeetingForm() {
  return (
    <div className="space-y-4 mt-2">
      <div>
        <label className={lbl}>MEETING TITLE</label>
        <input type="text" placeholder="e.g. Weekly Stable Operations Review" className={inp} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <DatePicker label="DATE" defaultValue={new Date().toISOString().split('T')[0]} />
        <TimePicker label="TIME" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={lbl}>DURATION (MINUTES)</label>
          <input type="number" placeholder="60" className={inp} />
        </div>
        <div>
          <label className={lbl}>LOCATION</label>
          <input type="text" placeholder="e.g. Conference Room A" className={inp} />
        </div>
      </div>
      <SelectField label="TYPE" options={['Team Briefing', 'Management Review', 'Emergency', 'Training', 'One-on-One']} defaultValue="Team Briefing" />
      <div>
        <label className={lbl}>ATTENDEES</label>
        <input type="text" placeholder="e.g. Michael Groom, Sam Vet..." className={inp} />
      </div>
      <div>
        <label className={lbl}>AGENDA / NOTES</label>
        <textarea placeholder="Brief agenda or notes..." rows={3} className="w-full px-3 py-2 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none resize-none" />
      </div>
      <button className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">Schedule Meeting</button>
    </div>
  );
}

const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const filters = ['All', 'Scheduled', 'Completed', 'Cancelled'] as const;

export default function MeetingsPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2));
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [search, setSearch] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const meetingDates = meetings.map(m => new Date(m.date).getDate());
  const meetingStatusMap: Record<number, string> = {};
  meetings.forEach(m => { meetingStatusMap[new Date(m.date).getDate()] = m.status; });

  const today = 24;

  const filtered = meetings.filter(m => {
    if (activeFilter !== 'All' && m.status !== activeFilter) return false;
    if (search && !m.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const scheduledCount = meetings.filter(m => m.status === 'Scheduled').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Meetings</h1>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
            Schedule and track team meetings &nbsp;·&nbsp; Shift: Morning Alpha
          </p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-4 edge-glow flex items-center gap-4 shrink-0">
          <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center">
            <span className="text-lg font-bold text-primary">{scheduledCount}</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Upcoming</p>
            <p className="text-lg font-bold text-foreground">Meeting Queue</p>
          </div>
        </div>
      </div>

      {/* Filters + Search Row */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <div className="flex gap-2 flex-wrap">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === f
                  ? 'bg-primary/15 text-primary border border-primary/30'
                  : 'bg-surface-container-high text-muted-foreground hover:text-foreground border border-transparent'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 sm:ml-auto">
          <FormDialog trigger={
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shrink-0">
              <Plus className="w-4 h-4" />
              Start Meeting
            </button>
          } title="Schedule Meeting">
            <StartMeetingForm />
          </FormDialog>
          <div className="relative flex-1 sm:flex-none">
            <input
              type="text"
              placeholder="Filter meetings..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="h-10 w-full sm:w-64 px-4 pr-10 rounded-lg bg-surface-container-high text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40"
            />
            <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Calendar + Meeting List */}
        <div className="space-y-4">
          {/* Calendar */}
          <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => setCurrentDate(new Date(year, month - 1))} className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-muted-foreground hover:text-foreground">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <h2 className="text-lg font-bold text-foreground">{monthName}</h2>
              <button onClick={() => setCurrentDate(new Date(year, month + 1))} className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-muted-foreground hover:text-foreground">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-px">
              {DAYS.map(d => (
                <div key={d} className="text-center text-[10px] uppercase tracking-widest text-muted-foreground font-semibold py-2">{d}</div>
              ))}
              {Array.from({ length: firstDay }, (_, i) => <div key={`e-${i}`} className="aspect-square" />)}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const hasMeeting = meetingDates.includes(day);
                const isToday = day === today;
                const meetingStatus = meetingStatusMap[day];
                return (
                  <div
                    key={day}
                    className={`aspect-square flex items-center justify-center relative rounded-lg text-sm transition-colors cursor-pointer ${
                      isToday ? 'bg-primary text-primary-foreground font-bold' :
                      hasMeeting ? 'bg-primary/10 text-primary' :
                      'text-muted-foreground hover:bg-surface-container-high'
                    }`}
                  >
                    {day}
                    {hasMeeting && !isToday && (
                      <span className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                        meetingStatus === 'Scheduled' ? 'bg-primary' : meetingStatus === 'Completed' ? 'bg-success' : 'bg-destructive'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 mt-4">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-2.5 h-2.5 rounded-full bg-primary" /> Scheduled</span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-2.5 h-2.5 rounded-full bg-success" /> Completed</span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-2.5 h-2.5 rounded-full bg-destructive" /> Cancelled</span>
            </div>
          </div>

          {/* Meeting Cards */}
          {filtered.map(m => {
            const statusColor = m.status === 'Scheduled' ? 'border-primary/30 text-primary bg-primary/10' :
              m.status === 'Completed' ? 'border-success/30 text-success bg-success/10' : 'border-destructive/30 text-destructive bg-destructive/10';
            return (
              <div key={m.id} className="bg-surface-container-high rounded-xl p-5 edge-glow border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${statusColor}`}>
                    {m.status}
                  </span>
                  <span className="text-xs text-muted-foreground italic">ID: {m.id.toUpperCase()}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground">{m.title}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {m.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {m.time}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {m.attendees.length} attendees</span>
                </div>
                {m.notes && <p className="text-sm text-muted-foreground mt-3">{m.notes}</p>}
              </div>
            );
          })}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">Quick Stats</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Scheduled</span>
                <span className="text-sm font-bold text-primary">{scheduledCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Completed</span>
                <span className="text-sm font-bold text-success">{meetings.filter(m => m.status === 'Completed').length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Cancelled</span>
                <span className="text-sm font-bold text-destructive">{meetings.filter(m => m.status === 'Cancelled').length}</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-foreground">Common Venues</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Main Office</span><span className="text-foreground font-medium">4</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Arena Conference</span><span className="text-foreground font-medium">2</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Stable Block A</span><span className="text-foreground font-medium">1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
