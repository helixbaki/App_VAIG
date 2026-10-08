import React from 'react';
import { CreditCard, Bell, Settings, LogOut, CheckCircle2, Shield, Calendar, QrCode as QrIcon, Camera, MapPin } from 'lucide-react';
import { UserProfile, PaymentRecord } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { SectionHeader } from '../common/SectionHeader';
import { Avatar } from '../common/Avatar';
import { ActionRow } from '../common/ActionRow';
import { MOSQUE_INFO } from '../../data/mockData';
import { Language, TRANSLATIONS } from '../../utils/translations';

interface ProfilTabProps {
  user: UserProfile;
  payments: PaymentRecord[];
  unreadNotificationsCount: number;
  language: Language;
  onOpenMemberCard: () => void;
  onOpenNotifications: () => void;
  onOpenSettings: () => void;
  onOpenChangeAvatar: () => void;
  onLogout: () => void;
}

export const ProfilTab: React.FC<ProfilTabProps> = ({
  user,
  payments,
  unreadNotificationsCount,
  language,
  onOpenMemberCard,
  onOpenNotifications,
  onOpenSettings,
  onOpenChangeAvatar,
  onLogout,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="space-y-6 pb-28">
      {/* User Header Profile with Photo Setting Button */}
      <GlassCard className="p-5 overflow-hidden border border-[#A58C6F]/30 shadow-lg">
        <div className="flex items-center gap-4">
          {/* Avatar with Camera Action Trigger */}
          <div className="relative group cursor-pointer shrink-0" onClick={onOpenChangeAvatar}>
            <Avatar
              initials={user.initials}
              name={user.name}
              imageUrl={user.avatarUrl}
              size="xl"
              showOnlineBadge={user.isOnline}
            />
            {/* Camera Overlay Badge Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenChangeAvatar();
              }}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#A58C6F] text-white flex items-center justify-center shadow-md ring-2 ring-white dark:ring-slate-900 hover:scale-110 active:scale-95 transition-all"
              title={t.setPhoto}
              aria-label={t.setPhoto}
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
                {user.name}
              </h1>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {t.activeMember}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                {user.memberId}
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
              {user.email}
            </p>

            {/* Quick button to adjust profile photo */}
            <div className="mt-2.5">
              <button
                type="button"
                onClick={onOpenChangeAvatar}
                className="py-1 px-2.5 rounded-xl bg-[#A58C6F]/15 hover:bg-[#A58C6F]/25 text-[#8C7355] dark:text-[#C5B095] border border-[#A58C6F]/30 text-[11px] font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Camera className="w-3 h-3 text-[#A58C6F]" />
                <span>{t.setPhoto}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Member Badge Preview Button */}
        <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <Shield className="w-3.5 h-3.5 text-[#A58C6F]" />
            <span>{t.memberSince} {user.memberSince}</span>
          </div>

          <button
            onClick={onOpenMemberCard}
            className="font-semibold text-[#A58C6F] hover:text-[#8C7355] dark:hover:text-[#C5B095] inline-flex items-center gap-1"
          >
            <QrIcon className="w-3.5 h-3.5" />
            <span>{t.memberCard}</span>
          </button>
        </div>
      </GlassCard>

      {/* Sektion A: Finanzen / Mitgliedsbeiträge (CHF 240.00 / Jahr) */}
      <section>
        <SectionHeader
          title={t.financesTitle}
          subtitle={t.financesSub}
        />

        <div className="space-y-2.5">
          {payments.map((payment) => (
            <GlassCard key={payment.id} className="p-3.5 border border-white/60 dark:border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {payment.period}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>{t.receivedOn} {payment.date}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                    {payment.currency} {payment.amount.toFixed(2)}
                  </div>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                    {t.paid}
                  </span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Sektion B: Menü-Liste (Action Rows) */}
      <section>
        <SectionHeader
          title={t.settings}
          subtitle={t.settingsSub}
        />

        <GlassCard className="p-2 divide-y divide-black/5 dark:divide-white/5 overflow-hidden">
          {/* 1. Meine Mitgliedskarte */}
          <ActionRow
            icon={<CreditCard className="w-5 h-5" />}
            title={t.memberCard}
            subtitle={t.memberCardSub}
            onClick={onOpenMemberCard}
          />

          {/* 2. Benachrichtigungen */}
          <ActionRow
            icon={<Bell className="w-5 h-5" />}
            title={t.notifications}
            subtitle={t.notificationsSub}
            showBadgeDot={unreadNotificationsCount > 0}
            badge={
              unreadNotificationsCount > 0 ? (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-600 dark:text-rose-400">
                  {unreadNotificationsCount} neu
                </span>
              ) : null
            }
            onClick={onOpenNotifications}
          />

          {/* 3. Einstellungen */}
          <ActionRow
            icon={<Settings className="w-5 h-5" />}
            title={t.settings}
            subtitle={t.settingsSub}
            onClick={onOpenSettings}
          />
        </GlassCard>
      </section>

      {/* Mosque Address Info Footer */}
      <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 text-center space-y-1">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
          {MOSQUE_INFO.fullName}
        </span>
        <div className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
          <MapPin className="w-3 h-3 text-[#A58C6F]" />
          <span>{MOSQUE_INFO.fullAddress}</span>
        </div>
      </div>

      {/* Footer: Roter Abmelden-Button */}
      <footer className="pt-1">
        <button
          onClick={onLogout}
          className="w-full py-3.5 px-4 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-semibold text-sm flex items-center justify-center gap-2 border border-rose-500/20 active:scale-[0.99] transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>{t.logout}</span>
        </button>
        <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-3">
          {t.versionNotice}
        </p>
      </footer>
    </div>
  );
};
