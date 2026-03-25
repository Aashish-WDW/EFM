'use client';
import { Bell, CheckSquare, Settings2, Stethoscope, MessageSquare } from 'lucide-react';
import RandomLetterReveal from '@/components/shared/RandomLetterReveal';

export default function NotificationsPage() {
  const notifications = [
    { id: 1, title: 'New task assigned', message: 'You have been assigned to the grooming schedule for Apollo.', time: '10 mins ago', icon: CheckSquare, color: 'text-primary' },
    { id: 2, title: 'Health Update: Eclipse', message: 'Dr. Smith updated Eclipse\'s medical log.', time: '1 hour ago', icon: Stethoscope, color: 'text-success' },
    { id: 3, title: 'System Maintenance', message: 'Scheduled maintenance this Saturday at 2 AM.', time: '5 hours ago', icon: Settings2, color: 'text-warning' },
    { id: 4, title: 'Message from Manager', message: 'Please review the new feed inventory.', time: '1 day ago', icon: MessageSquare, color: 'text-foreground' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <div>
        <h1 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">
          <RandomLetterReveal text="Notifications" />
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">Stay updated with your latest alerts and activities.</p>
      </div>

      <div className="bg-surface-container-highest rounded-xl border border-border p-4 sm:p-6 space-y-4">
        {notifications.map((notif) => (
          <div key={notif.id} className="flex gap-4 p-4 rounded-lg bg-surface-container-low border border-border/50 hover:bg-surface-container-high transition-colors">
            <div className={`mt-1 bg-surface-container-highest border border-border p-2 rounded-full h-fit shrink-0 ${notif.color}`}>
              <notif.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-foreground">{notif.title}</h3>
                <span className="text-xs font-mono text-muted-foreground">{notif.time}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
