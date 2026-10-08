import React from 'react';
import { Newspaper, Landmark, User, LucideIcon } from 'lucide-react';
import { TabType } from '../../types';

interface GlassBottomBarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  unreadNotifications?: boolean;
  labels?: {
    feed: string;
    moschee: string;
    profil: string;
  };
}

export const GlassBottomBar: React.FC<GlassBottomBarProps> = ({
  activeTab,
  onTabChange,
  unreadNotifications = false,
  labels,
}) => {
  const navItems = [
    { id: 'feed' as TabType, label: labels?.feed || 'Feed', icon: Newspaper },
    { id: 'moschee' as TabType, label: labels?.moschee || 'Moschee', icon: Landmark },
    { id: 'profil' as TabType, label: labels?.profil || 'Profil', icon: User },
  ];
  return (
    <div className="fixed bottom-4 inset-x-0 mx-auto w-[92%] max-w-md z-40">
      <div className="relative rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.6)] p-2">
        <nav className="grid grid-cols-3 items-center relative">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`group relative flex flex-col items-center justify-center py-2 px-3 rounded-2xl min-h-[48px] transition-all duration-200 select-none ${
                  isActive
                    ? 'text-[#A58C6F]'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
                aria-label={item.label}
              >
                {/* Active pill background aura */}
                {isActive && (
                  <span className="absolute inset-0 bg-[#A58C6F]/10 dark:bg-[#A58C6F]/20 rounded-2xl -z-10 animate-in fade-in zoom-in-95 duration-200" />
                )}

                <div className="relative">
                  <Icon
                    className={`w-6 h-6 transition-transform duration-200 ${
                      isActive
                        ? 'stroke-[2.5] scale-110 drop-shadow-[0_2px_8px_rgba(165,140,111,0.5)]'
                        : 'stroke-[1.75] group-hover:scale-105'
                    }`}
                  />
                  {item.id === 'profil' && unreadNotifications && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
                  )}
                </div>

                <span
                  className={`text-[11px] font-semibold mt-1 tracking-tight transition-all duration-200 ${
                    isActive
                      ? 'text-[#A58C6F]'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {item.label}
                </span>

                {/* Micro accent indicator dot */}
                {isActive && (
                  <span className="w-1.5 h-1.5 bg-[#A58C6F] rounded-full mt-0.5 shadow-[0_0_6px_#A58C6F]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
