import React from 'react';
import { Megaphone, CheckCircle2, Clock, CheckCheck, Trash2 } from 'lucide-react';
import { NotificationItem } from '../../types';
import { BottomSheetContainer } from './BottomSheetContainer';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
  onNotificationClick: (id: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearNotifications,
  onNotificationClick,
}) => {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <BottomSheetContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Benachrichtigungen"
      subtitle={unreadCount > 0 ? `${unreadCount} ungelesene Mitteilungen` : 'Alle Mitteilungen gelesen'}
    >
      <div className="space-y-4">
        {/* Actions bar */}
        {notifications.length > 0 && (
          <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/5">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs font-semibold text-[#A58C6F] hover:underline flex items-center gap-1.5"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Alle als gelesen markieren</span>
            </button>

            <button
              onClick={onClearNotifications}
              className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Leeren</span>
            </button>
          </div>
        )}

        {/* List */}
        <div className="space-y-2.5">
          {notifications.length > 0 ? (
            notifications.map((item) => {
              let icon = <Clock className="w-5 h-5 text-slate-500" />;
              let iconBg = 'bg-slate-500/10';

              if (item.type === 'announcement') {
                icon = <Megaphone className="w-5 h-5 text-[#A58C6F]" />;
                iconBg = 'bg-[#A58C6F]/15';
              } else if (item.type === 'payment') {
                icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
                iconBg = 'bg-emerald-500/15';
              } else if (item.type === 'prayer') {
                icon = <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
                iconBg = 'bg-amber-500/15';
              }

              return (
                <div
                  key={item.id}
                  onClick={() => onNotificationClick(item.id)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all border ${
                    item.isRead
                      ? 'bg-black/[0.02] dark:bg-white/[0.02] border-transparent opacity-75'
                      : 'bg-white/80 dark:bg-slate-800/80 border-[#A58C6F]/30 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center shrink-0 mt-0.5`}
                    >
                      {icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={`text-sm tracking-tight truncate ${
                            item.isRead
                              ? 'font-medium text-slate-700 dark:text-slate-300'
                              : 'font-bold text-slate-900 dark:text-white'
                          }`}
                        >
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {item.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#A58C6F] shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs">
              Keine aktuellen Benachrichtigungen vorhanden.
            </div>
          )}
        </div>
      </div>
    </BottomSheetContainer>
  );
};
