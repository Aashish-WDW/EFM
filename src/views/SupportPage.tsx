'use client';
import { useState } from 'react';
import { LifeBuoy, MessageSquare, BookOpen, ChevronDown, ChevronRight, Send, Phone, Mail, Clock } from 'lucide-react';
import SelectField from '@/components/shared/SelectField';

const inp = 'w-full h-10 px-3 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none';
const lbl = 'label-sm text-muted-foreground block mb-1.5';

const faqs = [
  { q: 'How do I reset my account password?', a: 'Go to your Profile page and click "Change Password". Enter your current password followed by a new password. If you\'ve forgotten your password, contact an admin.' },
  { q: 'How do I add a new horse to the system?', a: 'Navigate to Horses from the sidebar, then click "Add Horse" in the top right. Fill in all required fields including passport number, breed, and assigned manager.' },
  { q: 'How do I mark attendance for my shift?', a: 'Go to Ground Operations → Mark Attendance. Select your name, the shift type, and provide check-in time. The system auto-records the date.' },
  { q: 'Can I export reports to PDF or Excel?', a: 'Yes. Most pages have an "Export" button in the top right corner. Supported formats include CSV and PDF depending on the module.' },
  { q: 'How do I raise an invoice for an instructor?', a: 'Navigate to Accounts & Finance → Invoice Generation. Select the instructor, set the date range, and click "Generate Invoice" to preview and download.' },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Support Center</h1>
          <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
            Get help · Report issues · Contact the team
          </p>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-4 edge-glow flex items-center gap-4 shrink-0">
          <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center">
            <LifeBuoy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Response Time</p>
            <p className="text-lg font-bold text-foreground">Under 24 hrs</p>
          </div>
        </div>
      </div>

      {/* Quick Contact Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
            <Phone className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Phone Support</p>
            <p className="text-sm font-bold text-foreground mt-1">+91 98765 43210</p>
            <p className="text-xs text-muted-foreground mt-0.5">Mon – Sat, 9am – 6pm IST</p>
          </div>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Email Support</p>
            <p className="text-sm font-bold text-foreground mt-1">support@efm.in</p>
            <p className="text-xs text-muted-foreground mt-0.5">Replies within 24 hours</p>
          </div>
        </div>
        <div className="bg-surface-container-highest rounded-xl p-5 edge-glow flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">Live Chat</p>
            <p className="text-sm font-bold text-foreground mt-1">Available Now</p>
            <p className="text-xs text-success mt-0.5 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success" /> Online</p>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">
        {/* Left: Ticket Form + FAQ */}
        <div className="space-y-6">
          {/* Submit Ticket */}
          <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-foreground">Submit a Support Ticket</h2>
            </div>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-3">
                  <Send className="w-6 h-6 text-success" />
                </div>
                <p className="text-lg font-bold text-foreground">Ticket Submitted!</p>
                <p className="text-sm text-muted-foreground mt-1">Our team will get back to you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="mt-4 text-xs text-primary hover:underline">Submit another ticket</button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={lbl}>YOUR NAME</label>
                    <input type="text" placeholder="e.g. Admin User" className={inp} />
                  </div>
                  <div>
                    <label className={lbl}>EMAIL ADDRESS</label>
                    <input type="email" placeholder="you@example.com" className={inp} />
                  </div>
                </div>
                <SelectField
                  label="ISSUE CATEGORY"
                  options={['Bug / Error', 'Feature Request', 'Account Access', 'Data Issue', 'Performance Problem', 'Other']}
                  defaultValue="Bug / Error"
                />
                <SelectField
                  label="PRIORITY"
                  options={['Low', 'Medium', 'High', 'Critical']}
                  defaultValue="Medium"
                />
                <div>
                  <label className={lbl}>SUBJECT</label>
                  <input type="text" placeholder="Brief description of the issue..." className={inp} />
                </div>
                <div>
                  <label className={lbl}>DESCRIBE YOUR ISSUE</label>
                  <textarea
                    rows={4}
                    placeholder="Please include steps to reproduce, expected behaviour, and any screenshots if applicable..."
                    className="w-full px-3 py-2 rounded-lg bg-surface-container-high border border-border text-foreground text-sm placeholder:text-muted-foreground/50 focus:ring-1 focus:ring-primary outline-none resize-none"
                  />
                </div>
                <div>
                  <label className={lbl}>ATTACH SCREENSHOT (OPTIONAL)</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-5 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <p className="text-sm text-muted-foreground">Drop file here or <span className="text-primary font-medium">browse</span></p>
                    <p className="text-[10px] text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>
                <button
                  onClick={() => setSubmitted(true)}
                  className="w-full h-10 rounded-lg bg-gradient-to-r from-primary to-primary-dim text-primary-foreground text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Submit Ticket
                </button>
              </div>
            )}
          </div>

          {/* FAQ */}
          <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-foreground">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-border/50 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-surface-container-high transition-colors"
                  >
                    <span>{faq.q}</span>
                    {openFaq === i
                      ? <ChevronDown className="w-4 h-4 text-primary shrink-0 ml-2" />
                      : <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
                    }
                  </button>
                  {openFaq === i && (
                    <div className="px-4 py-3 border-t border-border/50 bg-surface-container-high/30">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-4">
          {/* Ticket Status */}
          <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
            <h3 className="font-bold text-foreground mb-4">Recent Tickets</h3>
            <div className="space-y-3">
              {[
                { id: 'TKT-0041', subject: 'Invoice export not working', status: 'Open', color: 'bg-warning/20 text-warning' },
                { id: 'TKT-0039', subject: 'Gate register date picker bug', status: 'In Review', color: 'bg-primary/20 text-primary' },
                { id: 'TKT-0035', subject: 'Add bulk horse import feature', status: 'Resolved', color: 'bg-success/20 text-success' },
              ].map(t => (
                <div key={t.id} className="flex items-center justify-between gap-3 py-2 border-b border-border/40 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.subject}</p>
                    <p className="text-[10px] text-muted-foreground mono-data mt-0.5">{t.id}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded shrink-0 ${t.color}`}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
            <h3 className="font-bold text-foreground mb-4">System Status</h3>
            <div className="space-y-3">
              {[
                { name: 'API Services', ok: true },
                { name: 'Database', ok: true },
                { name: 'File Storage', ok: true },
                { name: 'Email Notifications', ok: false },
              ].map(s => (
                <div key={s.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{s.name}</span>
                  <span className={`flex items-center gap-1.5 text-xs font-medium ${s.ok ? 'text-success' : 'text-warning'}`}>
                    <span className={`w-2 h-2 rounded-full ${s.ok ? 'bg-success' : 'bg-warning animate-pulse'}`} />
                    {s.ok ? 'Operational' : 'Degraded'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="bg-surface-container-highest rounded-xl p-5 edge-glow">
            <h3 className="font-bold text-foreground mb-3">Quick Tips</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span>Use the sidebar search to quickly navigate pages.</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span>All date fields support keyboard entry in DD/MM/YYYY format.</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span>Export buttons are available on most list and table pages.</li>
              <li className="flex items-start gap-2"><span className="text-primary mt-0.5">•</span>Permissions can be managed under System → Permissions.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
