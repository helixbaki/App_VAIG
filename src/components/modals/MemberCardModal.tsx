import React, { useState } from 'react';
import { ShieldCheck, Share2, Download, Check } from 'lucide-react';
import { UserProfile } from '../../types';
import { BottomSheetContainer } from './BottomSheetContainer';
import { MosqueLogo } from '../common/MosqueLogo';
import { QrCode } from '../common/QrCode';
import { Avatar } from '../common/Avatar';
import { MOSQUE_INFO } from '../../data/mockData';
import { Language, TRANSLATIONS } from '../../utils/translations';

interface MemberCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  language?: Language;
}

export const MemberCardModal: React.FC<MemberCardModalProps> = ({
  isOpen,
  onClose,
  user,
  language = 'de',
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[language];

  const handleCopyId = () => {
    navigator.clipboard.writeText(user.memberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <BottomSheetContainer
      isOpen={isOpen}
      onClose={onClose}
      title={t.cardTitle}
      subtitle={t.cardSubtitle}
    >
      <div className="space-y-5">
        {/* The Digital Membership Card */}
        <div className="relative rounded-3xl overflow-hidden p-6 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] text-white shadow-2xl border border-white/20">
          {/* Gold ambient lighting reflection */}
          <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#A58C6F]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-[#A58C6F]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Card Top: VAIG Logo & Mosque Brand */}
          <div className="flex flex-col items-center text-center pb-4 border-b border-white/10 relative z-10">
            <MosqueLogo size={64} className="mb-2" />
            <span className="text-base font-bold tracking-tight text-white leading-snug">
              {MOSQUE_INFO.fullName}
            </span>
            <span className="text-xs font-semibold text-[#C5B095] tracking-wide mt-0.5">
              {MOSQUE_INFO.shortName} · {MOSQUE_INFO.fullAddress}
            </span>
          </div>

          {/* Member Photo, Name & Status */}
          <div className="flex flex-col items-center text-center py-4 relative z-10">
            <div className="relative mb-2">
              <Avatar
                initials={user.initials}
                name={user.name}
                imageUrl={user.avatarUrl}
                size="lg"
                className="ring-2 ring-[#A58C6F]/50 shadow-md"
              />
            </div>

            <h3 className="text-xl font-bold tracking-tight text-white">
              {user.name}
            </h3>
            <div className="mt-1.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.activeMember}</span>
            </div>
          </div>

          {/* Big Verification QR Code */}
          <div className="flex flex-col items-center justify-center my-1 relative z-10">
            <div className="p-3 bg-white rounded-3xl shadow-xl ring-4 ring-[#A58C6F]/40">
              <QrCode
                value={`VAIG:SALMSACH:MEMBER:${user.memberId}:NAME:${user.name}:FEE:CHF240:VALID:2026`}
                size={185}
                centerLogo={
                  <div className="w-6 h-6 rounded-md bg-[#A58C6F] text-white flex items-center justify-center font-bold text-[9px]">
                    VAIG
                  </div>
                }
              />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs text-slate-400">{t.memberIdLabel}:</span>
              <button
                onClick={handleCopyId}
                className="font-mono text-sm font-bold text-[#D5C2AB] hover:underline flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10"
                title={t.copyId}
              >
                <span>{user.memberId}</span>
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
            </div>
          </div>

          {/* Card Footer Details */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
            <div>
              <span className="block text-slate-500 text-[10px]">{t.validity}</span>
              <span className="font-semibold text-slate-300">{t.validUntil}</span>
            </div>
            <div className="text-right">
              <span className="block text-slate-500 text-[10px]">BEITRAG 2026</span>
              <span className="font-semibold text-emerald-400">CHF 240.00 {t.paid}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCopyId}
            className="py-3 px-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? t.copiedId : t.copyId}</span>
          </button>

          <button
            onClick={() => {
              alert(t.verifyAlert);
            }}
            className="py-3 px-4 rounded-2xl bg-[#A58C6F]/15 hover:bg-[#A58C6F]/25 border border-[#A58C6F]/30 text-xs font-semibold text-[#8C7355] dark:text-[#C5B095] flex items-center justify-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{t.verifyCard}</span>
          </button>
        </div>
      </div>
    </BottomSheetContainer>
  );
};
