'use client';
import { useState } from 'react';
import {
  LayoutDashboard, Settings2, CheckSquare, Stethoscope, Cog, UtensilsCrossed, DollarSign, Shield,
  ChevronDown, PanelLeftClose, PanelLeft, ExternalLink, LogOut, BarChart3, LifeBuoy,
  Search, Bell, Languages, Moon, Sun, User, Menu, Quote,
  Package, Users, ClipboardList, ShieldAlert,
  Plus, SlidersHorizontal, ChevronLeft, ChevronRight, MoreVertical, Upload, X, Pencil, Trash2,
  Download, TrendingUp, TrendingDown, Clock, ArrowDown, Filter, CheckCircle, FileText,
  AlertTriangle, Activity, Pill, Hammer, Calendar, Wheat, Crown, Zap, Heart, ArrowUpRight,
  MoreHorizontal, Play, Thermometer, MapPin, Save, Edit, Lock, Globe, Type,
  DoorOpen, DoorClosed, Car, UserCheck, UserX, ClipboardCheck,
  Wrench, ListChecks, Eye, CheckCircle2, XCircle, Undo2,
  MessageSquare, BookOpen, Send, Phone, Mail, Info, Maximize, Minimize, RotateCcw,
  FileSpreadsheet, Check, CalendarIcon, RefreshCw, Droplets,
  Printer, ChevronUp, ShieldCheck, FileWarning, Receipt, History, Database
} from 'lucide-react';
import SelectField from '@/components/shared/SelectField';
import DatePicker from '@/components/shared/DatePicker';
import StatusBadge from '@/components/shared/StatusBadge';
import HorseIcon from '@/components/shared/HorseIcon';
import RandomLetterReveal from '@/components/shared/RandomLetterReveal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

/* =============== ICON REGISTRY =============== */
const allIcons = [
  // Layout & Navigation
  { name: 'LayoutDashboard', icon: LayoutDashboard, category: 'Navigation' },
  { name: 'Settings2', icon: Settings2, category: 'Navigation' },
  { name: 'CheckSquare', icon: CheckSquare, category: 'Navigation' },
  { name: 'Stethoscope', icon: Stethoscope, category: 'Navigation' },
  { name: 'Cog', icon: Cog, category: 'Navigation' },
  { name: 'UtensilsCrossed', icon: UtensilsCrossed, category: 'Navigation' },
  { name: 'DollarSign', icon: DollarSign, category: 'Navigation' },
  { name: 'Shield', icon: Shield, category: 'Navigation' },
  { name: 'ChevronDown', icon: ChevronDown, category: 'Navigation' },
  { name: 'ChevronUp', icon: ChevronUp, category: 'Navigation' },
  { name: 'ChevronLeft', icon: ChevronLeft, category: 'Navigation' },
  { name: 'ChevronRight', icon: ChevronRight, category: 'Navigation' },
  { name: 'PanelLeftClose', icon: PanelLeftClose, category: 'Navigation' },
  { name: 'PanelLeft', icon: PanelLeft, category: 'Navigation' },
  { name: 'Menu', icon: Menu, category: 'Navigation' },
  { name: 'ExternalLink', icon: ExternalLink, category: 'Navigation' },
  { name: 'Database', icon: Database, category: 'Navigation' },
  { name: 'BarChart3', icon: BarChart3, category: 'Analytics' },
  { name: 'TrendingUp', icon: TrendingUp, category: 'Analytics' },
  { name: 'TrendingDown', icon: TrendingDown, category: 'Analytics' },
  { name: 'ArrowUpRight', icon: ArrowUpRight, category: 'Analytics' },
  { name: 'ArrowDown', icon: ArrowDown, category: 'Analytics' },
  { name: 'Activity', icon: Activity, category: 'Analytics' },
  // Actions
  { name: 'Search', icon: Search, category: 'Actions' },
  { name: 'Plus', icon: Plus, category: 'Actions' },
  { name: 'X', icon: X, category: 'Actions' },
  { name: 'Pencil', icon: Pencil, category: 'Actions' },
  { name: 'Edit', icon: Edit, category: 'Actions' },
  { name: 'Trash2', icon: Trash2, category: 'Actions' },
  { name: 'Save', icon: Save, category: 'Actions' },
  { name: 'Download', icon: Download, category: 'Actions' },
  { name: 'Upload', icon: Upload, category: 'Actions' },
  { name: 'Printer', icon: Printer, category: 'Actions' },
  { name: 'Filter', icon: Filter, category: 'Actions' },
  { name: 'SlidersHorizontal', icon: SlidersHorizontal, category: 'Actions' },
  { name: 'MoreVertical', icon: MoreVertical, category: 'Actions' },
  { name: 'MoreHorizontal', icon: MoreHorizontal, category: 'Actions' },
  { name: 'Maximize', icon: Maximize, category: 'Actions' },
  { name: 'Minimize', icon: Minimize, category: 'Actions' },
  { name: 'RotateCcw', icon: RotateCcw, category: 'Actions' },
  { name: 'RefreshCw', icon: RefreshCw, category: 'Actions' },
  { name: 'Undo2', icon: Undo2, category: 'Actions' },
  { name: 'Send', icon: Send, category: 'Actions' },
  { name: 'Play', icon: Play, category: 'Actions' },
  { name: 'Zap', icon: Zap, category: 'Actions' },
  // Status
  { name: 'CheckCircle', icon: CheckCircle, category: 'Status' },
  { name: 'CheckCircle2', icon: CheckCircle2, category: 'Status' },
  { name: 'XCircle', icon: XCircle, category: 'Status' },
  { name: 'AlertTriangle', icon: AlertTriangle, category: 'Status' },
  { name: 'ShieldAlert', icon: ShieldAlert, category: 'Status' },
  { name: 'ShieldCheck', icon: ShieldCheck, category: 'Status' },
  { name: 'FileWarning', icon: FileWarning, category: 'Status' },
  { name: 'Info', icon: Info, category: 'Status' },
  { name: 'Clock', icon: Clock, category: 'Status' },
  { name: 'History', icon: History, category: 'Status' },
  { name: 'Bell', icon: Bell, category: 'Status' },
  { name: 'Eye', icon: Eye, category: 'Status' },
  { name: 'Lock', icon: Lock, category: 'Status' },
  { name: 'Check', icon: Check, category: 'Status' },
  // Domain / Entity
  { name: 'Package', icon: Package, category: 'Domain' },
  { name: 'Users', icon: Users, category: 'Domain' },
  { name: 'User', icon: User, category: 'Domain' },
  { name: 'UserCheck', icon: UserCheck, category: 'Domain' },
  { name: 'UserX', icon: UserX, category: 'Domain' },
  { name: 'Heart', icon: Heart, category: 'Domain' },
  { name: 'Crown', icon: Crown, category: 'Domain' },
  { name: 'Pill', icon: Pill, category: 'Domain' },
  { name: 'Hammer', icon: Hammer, category: 'Domain' },
  { name: 'Wheat', icon: Wheat, category: 'Domain' },
  { name: 'Wrench', icon: Wrench, category: 'Domain' },
  { name: 'Thermometer', icon: Thermometer, category: 'Domain' },
  { name: 'Droplets', icon: Droplets, category: 'Domain' },
  { name: 'Car', icon: Car, category: 'Domain' },
  { name: 'DoorOpen', icon: DoorOpen, category: 'Domain' },
  { name: 'DoorClosed', icon: DoorClosed, category: 'Domain' },
  { name: 'Calendar', icon: Calendar, category: 'Domain' },
  { name: 'CalendarIcon', icon: CalendarIcon, category: 'Domain' },
  { name: 'MapPin', icon: MapPin, category: 'Domain' },
  { name: 'ClipboardList', icon: ClipboardList, category: 'Domain' },
  { name: 'ClipboardCheck', icon: ClipboardCheck, category: 'Domain' },
  { name: 'ListChecks', icon: ListChecks, category: 'Domain' },
  { name: 'FileText', icon: FileText, category: 'Domain' },
  { name: 'FileSpreadsheet', icon: FileSpreadsheet, category: 'Domain' },
  { name: 'Receipt', icon: Receipt, category: 'Domain' },
  // Communication
  { name: 'MessageSquare', icon: MessageSquare, category: 'Communication' },
  { name: 'BookOpen', icon: BookOpen, category: 'Communication' },
  { name: 'Phone', icon: Phone, category: 'Communication' },
  { name: 'Mail', icon: Mail, category: 'Communication' },
  { name: 'Globe', icon: Globe, category: 'Communication' },
  { name: 'Languages', icon: Languages, category: 'Communication' },
  { name: 'Quote', icon: Quote, category: 'Communication' },
  { name: 'LifeBuoy', icon: LifeBuoy, category: 'Communication' },
  // Theme
  { name: 'Sun', icon: Sun, category: 'Theme' },
  { name: 'Moon', icon: Moon, category: 'Theme' },
  { name: 'Type', icon: Type, category: 'Theme' },
  { name: 'LogOut', icon: LogOut, category: 'Theme' },
];

const iconCategories = [...new Set(allIcons.map(i => i.category))];

/* =============== COLOR PALETTE =============== */
const colorTokens = [
  { name: 'background', var: '--background', label: 'Page Background' },
  { name: 'foreground', var: '--foreground', label: 'Primary Text' },
  { name: 'primary', var: '--primary', label: 'Brand Primary' },
  { name: 'primary-dim', var: '--primary-dim', label: 'Primary Dimmed' },
  { name: 'primary-container', var: '--primary-container', label: 'Primary Container' },
  { name: 'secondary', var: '--secondary', label: 'Secondary Accent' },
  { name: 'muted', var: '--muted', label: 'Muted BG' },
  { name: 'muted-foreground', var: '--muted-foreground', label: 'Muted Text' },
  { name: 'destructive', var: '--destructive', label: 'Error / Danger' },
  { name: 'success', var: '--success', label: 'Success / Positive' },
  { name: 'warning', var: '--warning', label: 'Warning / Caution' },
  { name: 'accent', var: '--accent', label: 'Accent BG' },
  { name: 'border', var: '--border', label: 'Borders' },
  { name: 'ring', var: '--ring', label: 'Focus Ring' },
  { name: 'card', var: '--card', label: 'Card Background' },
  { name: 'popover', var: '--popover', label: 'Popover BG' },
];

const surfaceTokens = [
  { name: 'surface', var: '--surface', label: 'Base Surface' },
  { name: 'surface-container-low', var: '--surface-container-low', label: 'Sidebar / Low' },
  { name: 'surface-container', var: '--surface-container', label: 'Container' },
  { name: 'surface-container-high', var: '--surface-container-high', label: 'Input BG / High' },
  { name: 'surface-container-highest', var: '--surface-container-highest', label: 'Card / Highest' },
  { name: 'surface-bright', var: '--surface-bright', label: 'Bright Surface' },
  { name: 'surface-variant', var: '--surface-variant', label: 'Variant Surface' },
];

/* =============== STATUS BADGES =============== */
const allStatuses = [
  'Active', 'Inactive', 'On Leave', 'Resting', 'Medical', 'Retired',
  'Completed', 'In Progress', 'Pending', 'Overdue',
  'In Stock', 'Low Stock', 'Out of Stock',
  'Critical', 'High', 'Medium', 'Low',
  'Entry', 'Exit', 'Staff', 'Visitor',
  'Approved', 'Rejected', 'Stallion', 'Mare',
  'Checked In', 'Checked Out', 'Absent', 'Present', 'Late', 'Half Day',
  'Scheduled', 'Cancelled', 'Good', 'Fair', 'Poor', 'Replace',
  'Passed', 'Issues Found', 'Draft', 'Sent', 'Paid', 'Issued', 'Appealed', 'Waived'
];

/* =============== SHADCN COMPONENTS LIST =============== */
const shadcnComponents = [
  'Accordion', 'AlertDialog', 'Alert', 'AspectRatio', 'Avatar', 'Badge', 'Breadcrumb', 'Button',
  'Calendar', 'Card', 'Carousel', 'Chart', 'Checkbox', 'Collapsible', 'Command', 'ContextMenu',
  'Dialog', 'Drawer', 'DropdownMenu', 'Form', 'HoverCard', 'InputOTP', 'Input', 'Label',
  'Menubar', 'NavigationMenu', 'Pagination', 'Popover', 'Progress', 'RadioGroup', 'Resizable',
  'ScrollArea', 'Select', 'Separator', 'Sheet', 'Sidebar', 'Skeleton', 'Slider', 'Sonner',
  'Switch', 'Table', 'Tabs', 'Textarea', 'Toast', 'Toaster', 'ToggleGroup', 'Toggle', 'Tooltip'
];

const sharedComponents = [
  { name: 'DataTable', desc: 'Sortable data table with headers, rows, and pagination' },
  { name: 'DatePicker', desc: 'Calendar-based date picker with label and input' },
  { name: 'DateTimePicker', desc: 'Combined date + time picker' },
  { name: 'ExportDialog', desc: 'Dialog for exporting data as CSV/Excel/PDF' },
  { name: 'FormDialog', desc: 'Reusable form-in-dialog pattern' },
  { name: 'HorseIcon', desc: 'SVG horse silhouette avatar icon' },
  { name: 'MetricCard', desc: 'KPI card with icon, value, label, and trend' },
  { name: 'PageSkeleton', desc: 'Shimmer skeleton loader for page transitions' },
  { name: 'RandomLetterReveal', desc: 'Animated text reveal on mount' },
  { name: 'SelectField', desc: 'Custom searchable dropdown with label' },
  { name: 'StatusBadge', desc: 'Colored badge mapped to 40+ status values' },
  { name: 'TimePicker', desc: 'Time picker with clock icon' },
];

/* =============== SECTION NAV =============== */
const sections = [
  { id: 'colors', label: 'Color Palette' },
  { id: 'surfaces', label: 'Surface Tokens' },
  { id: 'typography', label: 'Typography' },
  { id: 'icons', label: 'Icon Library' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'forms', label: 'Form Elements' },
  { id: 'filters', label: 'Filters & Selects' },
  { id: 'badges', label: 'Status Badges' },
  { id: 'effects', label: 'CSS Effects' },
  { id: 'kpi-patterns', label: 'KPI Patterns' },
  { id: 'ui-helpers', label: 'UI Helpers' },
  { id: 'table-pattern', label: 'Table Pattern' },
  { id: 'shadcn', label: 'shadcn/ui' },
  { id: 'shared', label: 'Shared components' },
];

export default function MarketPage() {
  const [activeSection, setActiveSection] = useState('colors');
  const [iconFilter, setIconFilter] = useState('All');

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredIcons = iconFilter === 'All' ? allIcons : allIcons.filter(i => i.category === iconFilter);

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div>
        <p className="label-sm text-primary tracking-widest">DEVELOPER REFERENCE</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight mt-1">Component Market</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          Complete catalog of every icon, component, color token, typography class, form element, button variant, filter, and status badge used in EFM. 
          For backend integration reference.
        </p>
      </div>

      {/* Section Nav */}
      <div className="flex flex-wrap gap-1.5 sticky top-[56px] z-10 bg-background/90 backdrop-blur-md py-3 -mx-3 px-3 sm:-mx-4 sm:px-4 md:-mx-6 md:px-6 border-b border-border">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeSection === s.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-surface-container-high'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ═══════════ 1. COLOR PALETTE ═══════════ */}
      <section id="colors">
        <h2 className="heading-lg text-foreground mb-1">Color Palette</h2>
        <p className="text-xs text-muted-foreground mb-4">Design tokens defined in <code className="text-primary">globals.css</code>. All colors use HSL via CSS variables.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {colorTokens.map(c => (
            <div key={c.name} className="bg-surface-container-highest rounded-lg p-3 edge-glow">
              <div className="w-full h-12 rounded-md mb-2" style={{ background: `hsl(var(${c.var}))` }} />
              <p className="text-xs font-semibold text-foreground">{c.label}</p>
              <p className="text-[10px] text-muted-foreground font-mono">{c.name}</p>
              <p className="text-[10px] text-primary font-mono">var({c.var})</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ 2. SURFACE TOKENS ═══════════ */}
      <section id="surfaces">
        <h2 className="heading-lg text-foreground mb-1">Surface Tokens</h2>
        <p className="text-xs text-muted-foreground mb-4">Layered surface system for cards, containers, and depth.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {surfaceTokens.map(c => (
            <div key={c.name} className="rounded-lg p-3 border border-border">
              <div className="w-full h-12 rounded-md mb-2 border border-border/50" style={{ background: `hsl(var(${c.var}))` }} />
              <p className="text-xs font-semibold text-foreground">{c.label}</p>
              <p className="text-[10px] text-muted-foreground font-mono">{c.name}</p>
              <p className="text-[10px] text-primary font-mono">var({c.var})</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ 3. TYPOGRAPHY ═══════════ */}
      <section id="typography">
        <h2 className="heading-lg text-foreground mb-1">Typography Scale</h2>
        <p className="text-xs text-muted-foreground mb-4">Fonts: <code className="text-primary">Space Grotesk</code> (display), <code className="text-primary">Inter</code> (body), <code className="text-primary">Inter Tight</code> (mono-data).</p>
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow space-y-4">
          {[
            { cls: 'display-lg', label: '.display-lg', desc: 'text-5xl font-bold tracking-tight' },
            { cls: 'display-md', label: '.display-md', desc: 'text-3xl font-bold tracking-tight mono' },
            { cls: 'display-sm', label: '.display-sm', desc: 'text-2xl font-semibold tracking-tight' },
            { cls: 'heading-lg', label: '.heading-lg', desc: 'text-xl font-semibold' },
            { cls: 'heading-md', label: '.heading-md', desc: 'text-lg font-semibold' },
            { cls: 'label-lg', label: '.label-lg', desc: 'text-sm font-semibold uppercase tracking-widest' },
            { cls: 'label-md', label: '.label-md', desc: 'text-xs font-semibold uppercase tracking-wider' },
            { cls: 'label-sm', label: '.label-sm', desc: 'text-[10px] font-medium uppercase tracking-wider' },
            { cls: 'body-sm', label: '.body-sm', desc: 'text-sm leading-relaxed' },
            { cls: 'mono-data', label: '.mono-data', desc: 'font-mono tabular-nums (for numbers)' },
          ].map(t => (
            <div key={t.cls} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 border-b border-border/30 pb-3">
              <div className="shrink-0 w-40">
                <code className="text-[10px] text-primary font-mono">{t.label}</code>
                <p className="text-[10px] text-muted-foreground">{t.desc}</p>
              </div>
              <span className={`${t.cls} text-foreground`}>The quick brown fox</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ 4. ICON LIBRARY ═══════════ */}
      <section id="icons">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="heading-lg text-foreground mb-1">Icon Library</h2>
            <p className="text-xs text-muted-foreground">{allIcons.length} icons from <code className="text-primary">lucide-react</code>. Hover to see name.</p>
          </div>
          <div className="flex rounded-lg overflow-hidden border border-border shrink-0">
            {['All', ...iconCategories].map(cat => (
              <button key={cat} onClick={() => setIconFilter(cat)} className={`px-3 h-8 text-[10px] font-medium transition-colors ${iconFilter === cat ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
          {filteredIcons.map(({ name, icon: Icon, category }) => (
            <div
              key={name}
              title={`${name} (${category})`}
              className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg bg-surface-container-highest edge-glow hover:bg-surface-container-high transition-colors cursor-default group"
            >
              <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-[8px] text-muted-foreground group-hover:text-foreground text-center leading-tight truncate w-full">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════ 5. BUTTONS ═══════════ */}
      <section id="buttons">
        <h2 className="heading-lg text-foreground mb-1">Buttons</h2>
        <p className="text-xs text-muted-foreground mb-4">Every button variant used across the application.</p>
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow space-y-6">
          {/* Primary Variants */}
          <div>
            <p className="label-sm text-muted-foreground mb-3">PRIMARY ACTIONS</p>
            <div className="flex flex-wrap gap-3">
              <button className="h-9 px-4 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-medium flex items-center gap-2">
                <Plus className="w-4 h-4" /> New Item
              </button>
              <button className="h-10 px-4 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase flex items-center gap-2">
                VALIDATE & LOG <Zap className="w-4 h-4" />
              </button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
              <button className="h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider px-6 flex items-center gap-2">
                Execute Fine Action <Zap className="w-4 h-4" />
              </button>
            </div>
          </div>
          {/* Secondary / Outline */}
          <div>
            <p className="label-sm text-muted-foreground mb-3">SECONDARY / OUTLINE</p>
            <div className="flex flex-wrap gap-3">
              <button className="h-8 px-3 rounded-lg border border-border text-muted-foreground text-xs flex items-center gap-1.5 hover:bg-surface-container-high transition-colors">
                <Upload className="w-3 h-3" /> EXPORT
              </button>
              <button className="h-8 px-3 rounded-lg border border-border text-muted-foreground text-xs flex items-center gap-1.5 hover:bg-surface-container-high transition-colors">
                <Download className="w-3 h-3" /> Download
              </button>
              <button className="h-8 px-3 rounded-lg border border-border text-muted-foreground text-xs flex items-center gap-1.5 hover:bg-surface-container-high transition-colors">
                <SlidersHorizontal className="w-3 h-3" /> Filters
              </button>
              <button className="h-8 px-3 rounded-lg border border-border text-muted-foreground text-xs flex items-center gap-1.5 hover:bg-surface-container-high transition-colors">
                <Printer className="w-3 h-3" /> Print
              </button>
            </div>
          </div>
          {/* Icon-only */}
          <div>
            <p className="label-sm text-muted-foreground mb-3">ICON-ONLY BUTTONS</p>
            <div className="flex flex-wrap gap-2">
              {[Search, Bell, Languages, Moon, Sun, MoreVertical, Plus, X, Pencil, Trash2, Eye, Edit, Download].map((Icon, i) => (
                <button key={i} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-surface-container-high transition-colors">
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
          {/* Toggle Groups */}
          <div>
            <p className="label-sm text-muted-foreground mb-3">TOGGLE / TAB GROUPS</p>
            <div className="flex flex-wrap gap-4">
              <div className="flex rounded-lg overflow-hidden border border-border">
                <button className="px-4 h-9 text-sm font-medium bg-primary text-primary-foreground">FACILITY</button>
                <button className="px-4 h-9 text-sm font-medium text-muted-foreground hover:text-foreground">ASSET</button>
              </div>
              <div className="flex rounded-lg overflow-hidden border border-border">
                <button className="px-4 h-9 text-sm font-medium bg-primary text-primary-foreground">OPERATIONAL</button>
                <button className="px-4 h-9 text-sm font-medium text-muted-foreground hover:text-foreground bg-surface-container-high">INTERNAL</button>
              </div>
              <div className="flex rounded-lg overflow-hidden border border-border">
                {['All', 'Pending', 'Resolved'].map((t, i) => (
                  <button key={t} className={`px-4 h-8 text-xs font-medium transition-colors ${i === 0 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{t}</button>
                ))}
              </div>
            </div>
          </div>
          {/* Destructive */}
          <div>
            <p className="label-sm text-muted-foreground mb-3">DESTRUCTIVE / SPECIAL</p>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
                <LogOut className="w-4 h-4" /> Logout
              </button>
              <button className="text-xs text-primary hover:underline">Forgot Password?</button>
              <button className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-surface-container-high">PREVIOUS</button>
              <button className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-surface-container-high">NEXT</button>
            </div>
          </div>
          {/* Pagination */}
          <div>
            <p className="label-sm text-muted-foreground mb-3">PAGINATION</p>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-surface-container-high"><ChevronLeft className="w-3 h-3" /></button>
              <button className="px-3 py-1.5 rounded text-xs font-medium bg-primary text-primary-foreground">1</button>
              <button className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-surface-container-high">2</button>
              <button className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-surface-container-high">3</button>
              <button className="px-3 py-1.5 rounded text-xs text-muted-foreground hover:bg-surface-container-high"><ChevronRight className="w-3 h-3" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 6. FORM ELEMENTS ═══════════ */}
      <section id="forms">
        <h2 className="heading-lg text-foreground mb-1">Form Elements</h2>
        <p className="text-xs text-muted-foreground mb-4">Inputs, textareas, selects, checkboxes, switches, and file upload zones.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow space-y-4">
            <p className="label-sm text-primary">TEXT INPUTS</p>
            <div>
              <label className="label-sm text-muted-foreground block mb-1.5">STANDARD TEXT INPUT</label>
              <input type="text" placeholder="e.g. Enter text here..." className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="label-sm text-muted-foreground block mb-1.5">NUMBER INPUT (MONO)</label>
              <input type="number" placeholder="₹0.00" className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm mono-data placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none" />
            </div>
            <div>
              <Label className="label-sm text-muted-foreground block mb-1.5">SHADCN INPUT COMPONENT</Label>
              <Input placeholder="Using shadcn Input..." />
            </div>
            <div>
              <label className="label-sm text-muted-foreground block mb-1.5">SEARCH INPUT WITH ICON</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input type="text" placeholder="Search..." className="w-full h-9 pl-9 pr-3 text-xs bg-surface-container-high rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/40" />
              </div>
            </div>
            <div>
              <label className="label-sm text-muted-foreground block mb-1.5">TEXTAREA</label>
              <Textarea placeholder="Enter detailed notes..." className="min-h-[80px]" />
            </div>
          </div>

          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow space-y-4">
            <p className="label-sm text-primary">SELECTS & PICKERS</p>
            <SelectField label="SELECT (SEARCHABLE)" options={['Option A', 'Option B', 'Option C', 'Option D', 'Option E', 'Option F']} placeholder="Choose..." />
            <SelectField label="SELECT (SMALL / FILTER)" options={['All Categories', 'Feed', 'Medical', 'Equipment']} defaultValue="All Categories" size="sm" />
            <DatePicker label="DATE PICKER" />

            <p className="label-sm text-primary mt-6">TOGGLES & CHECKS</p>
            <div className="flex items-center gap-3">
              <Switch id="switch-demo" />
              <Label htmlFor="switch-demo" className="text-sm text-foreground">Switch Toggle</Label>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="check-demo" />
              <Label htmlFor="check-demo" className="text-sm text-foreground">Checkbox</Label>
            </div>

            <p className="label-sm text-primary mt-6">FILE UPLOAD ZONE</p>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer" onClick={() => toast.info('File browser opened')}>
              <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Drop files or <span className="text-primary font-medium">browse</span></p>
              <p className="text-[10px] text-muted-foreground mt-1">PDF, PNG, JPG (MAX 10MB)</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-surface-container-highest rounded-lg p-5 edge-glow">
          <p className="label-sm text-primary mb-4">COMPLEX FORM PATTERN (REGISTER HORSE)</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <label className="label-sm text-muted-foreground block mb-3">HORSE PHOTO</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg border-2 border-dashed border-border bg-surface-container-high flex items-center justify-center cursor-pointer hover:border-primary transition-colors shrink-0">
                    <Upload className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground italic uppercase">Upload Photo</p>
                    <p className="text-[10px] text-muted-foreground">JPG, PNG · max 5 MB</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="label-sm text-muted-foreground block mb-1.5">HORSE NAME</label>
                <input type="text" placeholder="e.g. Thunderbolt" className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm focus:ring-1 focus:ring-primary outline-none" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="label-sm text-muted-foreground block mb-1.5">PASSPORT NO</label>
                <input type="text" placeholder="EQ-XXXX-XXXX" className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm mono-data focus:ring-1 focus:ring-primary outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <SelectField label="GENDER" options={['Stallion', 'Mare']} defaultValue="Stallion" />
                <div>
                  <label className="label-sm text-muted-foreground block mb-1.5">STABLE #</label>
                  <input type="text" placeholder="ST-XX" className="w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm mono-data focus:ring-1 focus:ring-primary outline-none" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <DatePicker label="DATE OF BIRTH" />
              <button className="w-full h-10 mt-auto rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase">
                REGISTER HORSE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 7. FILTERS & SELECTS ═══════════ */}
      <section id="filters">
        <h2 className="heading-lg text-foreground mb-1">Filters & Selects</h2>
        <p className="text-xs text-muted-foreground mb-4">Inline filter bar pattern used on listings pages.</p>
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
              <Filter className="w-3.5 h-3.5" /> <span>ACTIVE FILTERS:</span>
            </div>
            <SelectField options={['All Categories', 'Feed Purchase', 'Veterinary', 'Farrier', 'Equipment']} defaultValue="All Categories" size="sm" className="w-48" />
            <SelectField options={['All Assets', 'Horse A', 'Horse B', 'Facility Wide']} defaultValue="All Assets" size="sm" className="w-44" />
            <SelectField options={['All Handlers', 'Handler A', 'Handler B']} defaultValue="All Handlers" size="sm" className="w-40" />
            <button className="h-8 px-3 rounded-lg border border-border text-muted-foreground text-xs flex items-center gap-1.5 hover:bg-surface-container-high">
              <Upload className="w-3 h-3" /> EXPORT
            </button>
            <button className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center transition-colors shrink-0">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>
          <hr className="border-border my-4" />
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <p className="label-sm text-muted-foreground mb-3">FILTER CHIP PATTERN</p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  Status: Active <X className="w-3 h-3 cursor-pointer" />
                </span>
                <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  Category: Feed <X className="w-3 h-3 cursor-pointer" />
                </span>
                <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full border border-border text-muted-foreground text-xs font-medium cursor-pointer hover:text-foreground">
                  + Add Filter
                </span>
              </div>
            </div>
            <div className="w-full sm:w-64 border-l border-border/30 pl-0 sm:pl-6 bg-surface-container-high/30 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Slide-out Filters</span>
                <X className="w-3 h-3 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                <SelectField label="STATUS" options={['All', 'Active', 'Resting', 'Medical']} defaultValue="All" size="sm" />
                <SelectField label="MANAGER" options={['All', 'Emma M.', 'Dr. Director']} defaultValue="All" size="sm" />
                <button className="w-full h-8 rounded-lg bg-primary text-primary-foreground text-xs font-semibold tracking-wider uppercase">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 8. STATUS BADGES ═══════════ */}
      <section id="badges">
        <h2 className="heading-lg text-foreground mb-1">Status Badges</h2>
        <p className="text-xs text-muted-foreground mb-4">{allStatuses.length} status values mapped to colors via <code className="text-primary">StatusBadge</code> component.</p>
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
          <div className="flex flex-wrap gap-2">
            {allStatuses.map(s => (
              <StatusBadge key={s} status={s} />
            ))}
          </div>
        </div>
        <div className="mt-4 bg-surface-container-highest rounded-lg p-5 edge-glow">
          <p className="label-sm text-muted-foreground mb-3">SHADCN BADGE VARIANTS</p>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>
      </section>

      {/* ═══════════ 9. CSS EFFECTS ═══════════ */}
      <section id="effects">
        <h2 className="heading-lg text-foreground mb-1">CSS Effects</h2>
        <p className="text-xs text-muted-foreground mb-4">Custom utility classes defined in <code className="text-primary">globals.css</code>.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
            <p className="label-sm text-primary mb-2">.edge-glow</p>
            <p className="text-xs text-muted-foreground">Subtle inset primary border</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 glow-primary">
            <p className="label-sm text-primary mb-2">.glow-primary</p>
            <p className="text-xs text-muted-foreground">Ambient primary box-shadow</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 ghost-border">
            <p className="label-sm text-primary mb-2">.ghost-border</p>
            <p className="text-xs text-muted-foreground">Faint inset outline</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 card-hover cursor-pointer">
            <p className="label-sm text-primary mb-2">.card-hover</p>
            <p className="text-xs text-muted-foreground">Hover to see lift effect</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 shimmer-border">
            <p className="label-sm text-primary mb-2">.shimmer-border</p>
            <p className="text-xs text-muted-foreground">Animated shimmer border</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 particle-field">
            <p className="label-sm text-primary mb-2">.particle-field</p>
            <p className="text-xs text-muted-foreground">Floating dot particles</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5">
            <p className="label-sm text-primary mb-2 text-glow">.text-glow</p>
            <p className="text-xs text-muted-foreground">Neon text shadow</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 glass border border-border">
            <p className="label-sm text-primary mb-2">.glass</p>
            <p className="text-xs text-muted-foreground">Glassmorphism blur</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 mane-wave">
            <p className="label-sm text-primary mb-2">.mane-wave</p>
            <p className="text-xs text-muted-foreground">Gradient wave divider</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5">
            <p className="label-sm text-primary mb-2 hover-glow-text cursor-pointer">.hover-glow-text ✨</p>
            <p className="text-xs text-muted-foreground">Hover to see glow</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 horse-pattern">
            <p className="label-sm text-primary mb-2">.horse-pattern</p>
            <p className="text-xs text-muted-foreground">Horseshoe BG pattern</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 leather-grain">
            <p className="label-sm text-primary mb-2">.leather-grain</p>
            <p className="text-xs text-muted-foreground">Leather grain texture</p>
          </div>
        </div>
        <div className="mt-4 bg-surface-container-highest rounded-lg p-5 edge-glow">
          <p className="label-sm text-primary mb-3">ANIMATIONS</p>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary animate-gallop" /><span className="text-xs text-muted-foreground">.animate-gallop</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-success animate-pulse" /><span className="text-xs text-muted-foreground">.animate-pulse</span></div>
            <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-primary pulse-ring" /><span className="text-xs text-muted-foreground">.pulse-ring</span></div>
            <div className="flex items-center gap-2"><span className="text-sm text-foreground animate-count">123</span><span className="text-xs text-muted-foreground">.animate-count</span></div>
            <div className="flex items-center gap-2"><span className="text-sm text-foreground animate-slide-in">Slide In</span><span className="text-xs text-muted-foreground">.animate-slide-in</span></div>
          </div>
        </div>
      </section>



      {/* ═══════════ KPI CARD PATTERN ═══════════ */}
      <section id="kpi-patterns">
        <h2 className="heading-lg text-foreground mb-1">KPI Card Pattern</h2>
        <p className="text-xs text-muted-foreground mb-4">Standard metric cards used on dashboard and listing pages.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
            <span className="label-sm text-muted-foreground uppercase">TOTAL ITEMS</span>
            <div className="flex items-end gap-2 mt-2">
              <p className="text-2xl font-bold text-foreground mono-data">1,248</p>
              <span className="text-xs text-success font-medium mb-1">+12.4%</span>
            </div>
            <div className="w-full h-1 bg-primary/20 rounded-full mt-3"><div className="h-full w-3/4 bg-primary rounded-full" /></div>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
              <HorseIcon className="w-24 h-24" />
            </div>
            <span className="label-sm text-muted-foreground uppercase">ACTIVE FLEET</span>
            <p className="text-2xl font-bold text-foreground mt-2 mono-data">76</p>
            <p className="text-[10px] font-medium uppercase tracking-wider mt-1 text-primary">↗ +4 this month</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
            <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                <span className="label-sm text-muted-foreground uppercase">PENDING</span>
            </div>
            <p className="text-2xl font-bold text-warning mono-data">08</p>
            <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">Requires attention</p>
          </div>
          <div className="bg-gradient-to-br from-primary/90 to-primary-dim rounded-lg p-5 text-primary-foreground relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3"><Zap className="w-4 h-4" /><span className="text-[10px] font-bold uppercase tracking-widest opacity-80">PROJECTIONS</span></div>
            <p className="text-xl font-bold">12 New Stalls</p>
            <p className="text-xs opacity-80 mt-1 italic">Required by Q2</p>
          </div>
        </div>
      </section>

      {/* ═══════════ UNIQUE UI HELPERS ═══════════ */}
      <section id="ui-helpers">
        <h2 className="heading-lg text-foreground mb-1">Unique UI Helpers</h2>
        <p className="text-xs text-muted-foreground mb-4">Small components for specific data visualizations.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow flex flex-col justify-between">
            <div>
              <p className="label-sm text-muted-foreground mb-2">PERFORMANCE BAR</p>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-foreground">84%</span>
                <div className="flex gap-0.5">
                  {[1, 1, 1, 1, 0].map((v, i) => (
                    <div key={i} className={`w-4 h-1.5 rounded-sm ${v ? 'bg-primary' : 'bg-muted'}`} />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 font-mono">/horses - PerformanceBar</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow flex flex-col justify-between">
            <div>
              <p className="label-sm text-muted-foreground mb-2">HORSE ICON (SVG)</p>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <HorseIcon className="w-6 h-6 text-primary" />
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 font-mono">@/components/shared/HorseIcon</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow flex flex-col justify-between">
            <div>
              <p className="label-sm text-muted-foreground mb-2">ANIMATED REVEAL</p>
              <div className="text-xl font-bold text-foreground">
                <RandomLetterReveal text="Component Title" />
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 font-mono">@/components/shared/RandomLetterReveal</p>
          </div>
          <div className="bg-surface-container-highest rounded-lg p-5 edge-glow flex flex-col justify-between">
            <div>
              <p className="label-sm text-muted-foreground mb-2">AVATAR INITIALS</p>
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center">AD</span>
                <span className="text-xs font-semibold text-foreground">Admin User</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-4 font-mono">Table Pattern Utility</p>
          </div>
        </div>
      </section>

      {/* ═══════════ TABLE PATTERN ═══════════ */}
      <section id="table-pattern">
        <h2 className="heading-lg text-foreground mb-1">Table Pattern</h2>
        <p className="text-xs text-muted-foreground mb-4">Standard data table styling with header, rows, hover, and avatar initials.</p>
        <div className="bg-surface-container-highest rounded-lg edge-glow overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-left label-sm text-muted-foreground">DATE</th>
                <th className="px-3 py-3 text-left label-sm text-muted-foreground">NAME</th>
                <th className="px-3 py-3 text-left label-sm text-muted-foreground">CATEGORY</th>
                <th className="px-3 py-3 text-right label-sm text-muted-foreground">AMOUNT</th>
                <th className="px-3 py-3 text-center label-sm text-muted-foreground">STATUS</th>
                <th className="px-3 py-3 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: '2026-03-24', name: 'John Doe', cat: 'NUTRITION', catColor: 'bg-success/20 text-success', amt: 4200, status: 'Approved' },
                { date: '2026-03-22', name: 'Jane Smith', cat: 'VET CARE', catColor: 'bg-destructive/20 text-destructive', amt: 1800, status: 'Pending' },
                { date: '2026-03-18', name: 'Mike F.', cat: 'EQUIPMENT', catColor: 'bg-primary/20 text-primary', amt: 950, status: 'Completed' },
              ].map((r, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-surface-container-high/50 transition-colors">
                  <td className="px-5 py-4 mono-data text-xs text-muted-foreground">{r.date}</td>
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-primary/20 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                        {r.name.split(' ').map(n => n[0]).join('')}
                      </span>
                      <span className="font-semibold text-foreground">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${r.catColor}`}>{r.cat}</span>
                  </td>
                  <td className="px-3 py-4 text-right mono-data font-bold text-foreground">₹{r.amt.toLocaleString()}</td>
                  <td className="px-3 py-4 text-center"><StatusBadge status={r.status} /></td>
                  <td className="px-3 py-4">
                    <button className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-surface-container-high transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════ LISTING COMPONENTS REFERENCE ═══════════ */}
      <section id="shadcn">
        <h2 className="heading-lg text-foreground mb-1">shadcn/ui Components</h2>
        <p className="text-xs text-muted-foreground mb-4">{shadcnComponents.length} components installed from <code className="text-primary">@/components/ui/</code>.</p>
        <div className="bg-surface-container-highest rounded-lg p-5 edge-glow">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {shadcnComponents.map(c => (
              <div key={c} className="px-3 py-2 rounded-lg bg-surface-container-high text-xs text-foreground font-medium text-center hover:bg-primary/10 hover:text-primary transition-colors cursor-default">
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="shared">
        <h2 className="heading-lg text-foreground mb-1">Shared Components</h2>
        <p className="text-xs text-muted-foreground mb-4">{sharedComponents.length} reusable components from <code className="text-primary">@/components/shared/</code>.</p>
        <div className="bg-surface-container-highest rounded-lg edge-glow overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-5 py-3 text-left label-sm text-muted-foreground">COMPONENT</th>
                <th className="px-3 py-3 text-left label-sm text-muted-foreground">DESCRIPTION</th>
                <th className="px-3 py-3 text-left label-sm text-muted-foreground">IMPORT PATH</th>
              </tr>
            </thead>
            <tbody>
              {sharedComponents.map(c => (
                <tr key={c.name} className="border-b border-border/30 hover:bg-surface-container-high/50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-foreground">{c.name}</td>
                  <td className="px-3 py-3 text-muted-foreground">{c.desc}</td>
                  <td className="px-3 py-3"><code className="text-[10px] text-primary font-mono">@/components/shared/{c.name}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
