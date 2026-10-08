import React, { useEffect, useState } from 'react';
import { Phone, Clock, QrCode as QrIcon, ArrowUpRight, ShieldCheck, MapPin, ExternalLink, Camera } from 'lucide-react';
import { BoardMember } from '../../types';
import { GlassCard } from '../common/GlassCard';
import { SectionHeader } from '../common/SectionHeader';
import { MosqueLogo } from '../common/MosqueLogo';
import { RoleBadge } from '../common/RoleBadge';
import { Avatar } from '../common/Avatar';
import { QrCode } from '../common/QrCode';
import { getPrayerSchedule, PrayerScheduleResult } from '../../utils/prayerCalculator';
import { TWINT_DETAILS, MOSQUE_INFO } from '../../data/mockData';
import { Language, TRANSLATIONS } from '../../utils/translations';

interface MoscheeTabProps {
  boardMembers: BoardMember[];
  language?: Language;
  onOpenTwintModal: () => void;
  onInitiateCall: (member: BoardMember) => void;
  onEditMemberPhoto?: (member: BoardMember) => void;
}

export const MoscheeTab: React.FC<MoscheeTabProps> = ({
  boardMembers,
  language = 'de',
  onOpenTwintModal,
  onInitiateCall,
  onEditMemberPhoto,
}) => {
  const [schedule, setSchedule] = useState<PrayerScheduleResult>(() => getPrayerSchedule(new Date(), language));
  const t = TRANSLATIONS[language];

  // Real-time prayer countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setSchedule(getPrayerSchedule(new Date(), language));
    }, 1000);
    return () => clearInterval(timer);
  }, [language]);

  return (
    <div className="space-y-6 pb-28">
      {/* Header with large VAIG_V2 Logo and Official Identity */}
      <header className="flex flex-col items-center text-center pt-2 pb-2">
        <MosqueLogo size={82} className="mb-3" />
        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white px-2">
          {MOSQUE_INFO.fullName}
        </h1>
        <p className="text-sm font-semibold text-[#A58C6F] mt-0.5 tracking-wide">
          {t.mosqueSub}
        </p>

        {/* Location address chip */}
        <div className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-slate-700 dark:text-slate-300 shadow-xs">
          <MapPin className="w-3.5 h-3.5 text-[#A58C6F] shrink-0" />
          <span>{MOSQUE_INFO.fullAddress}</span>
        </div>
      </header>

      {/* Sektion A: Gebetszeiten (Widget - SwissMosque Live Sync) */}
      <section>
        <div className="flex items-center justify-between mb-2 px-1">
          <div>
            <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
              {t.prayerTimesTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {schedule.todayDateFormatted} · Salmsach
            </p>
          </div>

          {/* Official SwissMosque sync badge with external link */}
          <a
            href={schedule.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20 transition-colors"
            title="Öffne Original-Webseite auf tv.swissmosque.ch"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SwissMosque #1019</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <GlassCard className="p-4 overflow-hidden border border-[#A58C6F]/30 shadow-lg shadow-[#A58C6F]/5">
          {/* Live Countdown Banner */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#A58C6F]/15 flex items-center justify-center text-[#A58C6F]">
                <Clock className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#A58C6F] uppercase tracking-wider block">
                  {t.liveCountdown}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {schedule.countdownText}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono tabular-nums px-2 py-1 rounded-lg bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-200 font-bold block">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          </div>

          {/* Prayers List: Genau die 5 gewünschten Gebete */}
          <div className="space-y-1.5">
            {schedule.prayers.map((prayer) => {
              const isHighlight = prayer.isNext;

              return (
                <div
                  key={prayer.id}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all duration-300 ${
                    isHighlight
                      ? 'bg-gradient-to-r from-[#A58C6F] to-[#8C7355] text-white shadow-[0_4px_16px_rgba(165,140,111,0.4)] scale-[1.02] border border-[#C5B095]/40 font-semibold'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm tracking-wide ${
                        isHighlight ? 'text-white font-bold' : 'font-medium'
                      }`}
                    >
                      {prayer.name}
                    </span>
                    <span
                      className={`text-xs ${
                        isHighlight ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {prayer.arabicName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isHighlight && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider backdrop-blur-sm">
                        {language === 'sq' ? 'Tani' : language === 'tr' ? 'Sıradaki' : 'Nächstes'}
                      </span>
                    )}
                    <span
                      className={`text-sm font-mono tabular-nums ${
                        isHighlight ? 'text-white font-bold' : 'font-semibold'
                      }`}
                    >
                      {prayer.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Iqamah & Freitagsgebet Info Banner */}
          <div className="mt-3 pt-2.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>{t.dhuhrIqamahNote}</span>
            <span><strong className="text-[#A58C6F]">{t.jummahNote}</strong></span>
          </div>
        </GlassCard>
      </section>

      {/* Sektion B: Vorstand & Imam (Horizontal scrollend) */}
      <section>
        <SectionHeader
          title={t.boardTitle}
          subtitle={t.boardSub}
        />

        <div className="flex gap-3.5 overflow-x-auto pb-2 pt-1 -mx-4 px-4 scrollbar-none snap-x snap-mandatory">
          {boardMembers.map((member) => (
            <div key={member.id} className="w-[200px] shrink-0 snap-center">
              <GlassCard className="p-4 flex flex-col justify-between h-[235px] border border-white/60 dark:border-white/10 hover:border-[#A58C6F]/40 transition-all">
                {/* Top content */}
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => onEditMemberPhoto && onEditMemberPhoto(member)}
                      title="Foto anpassen / ändern"
                    >
                      <Avatar
                        initials={member.initials}
                        name={member.name}
                        imageUrl={member.avatarUrl}
                        size="lg"
                      />
                      {onEditMemberPhoto && (
                        <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#A58C6F] text-white opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-sm">
                          <Camera className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>
                    <RoleBadge role={member.role} />
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-1">
                    {member.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {member.email}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-1.5">
                  <button
                    onClick={() => onInitiateCall(member)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#A58C6F]/15 text-[#A58C6F] border border-black/5 dark:border-white/10 text-xs font-semibold transition-all active:scale-95 group"
                    title={`${member.name} ${t.call.toLowerCase()}`}
                  >
                    <Phone className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                    <span className="truncate">{member.phone}</span>
                  </button>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </section>

      {/* Sektion C: Spenden & Beiträge (Ganz unten) */}
      <section>
        <SectionHeader
          title={t.donationsTitle}
          subtitle={t.donationsSub}
        />

        <GlassCard
          variant="accent"
          className="p-5 overflow-hidden relative border border-[#A58C6F]/40 shadow-xl shadow-[#A58C6F]/10"
        >
          {/* Subtle gold decorative background watermark */}
          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-[#A58C6F]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* TWINT QR Code Container */}
            <div className="relative group shrink-0">
              <QrCode
                value={`TWINT:SALMSACH:${TWINT_DETAILS.iban}`}
                size={140}
                className="ring-4 ring-white/60 dark:ring-white/10 shadow-lg"
                centerLogo={
                  <div className="px-1.5 py-0.5 bg-emerald-700 text-white rounded text-[9px] font-black tracking-tight">
                    TWINT
                  </div>
                }
              />
              <div className="absolute -bottom-2 inset-x-0 mx-auto w-fit px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#A58C6F] text-white shadow-sm flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Offiziell
              </div>
            </div>

            {/* Info and CTA */}
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A58C6F] uppercase tracking-wider">
                <QrIcon className="w-4 h-4" />
                {t.twintQuick}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                {t.twintDirect}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {t.twintDesc}
              </p>
            </div>
          </div>

          {/* Fullwidth Primary CTA Button */}
          <div className="mt-5">
            <button
              onClick={onOpenTwintModal}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#A58C6F] to-[#8C7355] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#A58C6F]/30 hover:brightness-105 active:scale-[0.99] transition-all"
            >
              <span>{t.openTwint}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};
