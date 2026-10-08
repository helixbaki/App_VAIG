import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ActionRowProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  showBadgeDot?: boolean;
  onClick: () => void;
  className?: string;
}

export const ActionRow: React.FC<ActionRowProps> = ({
  icon,
  title,
  subtitle,
  badge,
  showBadgeDot = false,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5 active:scale-[0.99] text-left group ${className}`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <div className="relative w-10 h-10 rounded-xl bg-[#A58C6F]/10 dark:bg-[#A58C6F]/15 text-[#A58C6F] flex items-center justify-center shrink-0 border border-[#A58C6F]/20 group-hover:border-[#A58C6F]/40 transition-colors">
          {icon}
          {showBadgeDot && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          )}
        </div>

        <div className="min-w-0 truncate">
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
            {title}
          </div>
          {subtitle && (
            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-2">
        {badge}
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 group-hover:translate-x-0.5 transition-all" />
      </div>
    </button>
  );
};
