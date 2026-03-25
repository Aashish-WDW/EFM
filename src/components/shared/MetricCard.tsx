'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import HorseIcon from '@/components/shared/HorseIcon';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  subtitleColor?: 'primary' | 'success' | 'destructive' | 'warning';
  icon: LucideIcon;
  trend?: { value: number; label: string };
  variant?: 'default' | 'alert' | 'success';
}

export default function MetricCard({ title, value, subtitle, subtitleColor = 'primary', icon: Icon, trend, variant = 'default' }: MetricCardProps) {
  const accentClass = variant === 'alert'
    ? 'text-destructive'
    : variant === 'success'
    ? 'text-success'
    : 'text-foreground';

  const subtitleColorClass = {
    primary: 'text-primary',
    success: 'text-success',
    destructive: 'text-destructive',
    warning: 'text-warning',
  }[subtitleColor];

  const iconBgClass = variant === 'alert'
    ? 'bg-destructive/10 text-destructive'
    : variant === 'success'
    ? 'bg-success/10 text-success'
    : 'bg-primary/10 text-primary';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-container-highest rounded-xl p-5 edge-glow card-hover leather-grain relative overflow-hidden group"
    >
      {/* Horse watermark */}
      <div className="absolute -right-2 -bottom-2 opacity-[0.025] group-hover:opacity-[0.05] transition-opacity">
        <HorseIcon className="w-20 h-20" />
      </div>
      <div className="flex items-start justify-between mb-4 relative z-10">
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{title}</span>
        <div className={`w-10 h-10 rounded-xl ${iconBgClass} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className={`text-4xl font-bold ${accentClass} tracking-tight animate-count relative z-10`}>{value}</div>
      {subtitle && (
        <div className="flex items-center gap-1.5 mt-2 relative z-10">
          <span className={`w-1.5 h-1.5 rounded-full ${subtitleColor === 'destructive' ? 'bg-destructive' : subtitleColor === 'success' ? 'bg-success' : 'bg-primary'}`} />
          <p className={`text-[10px] font-semibold uppercase tracking-[0.1em] ${subtitleColorClass}`}>{subtitle}</p>
        </div>
      )}
      {trend && (
        <p className={`text-xs mt-2 mono-data relative z-10 ${trend.value >= 0 ? 'text-success' : 'text-destructive'}`}>
          {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
        </p>
      )}
    </motion.div>
  );
}

