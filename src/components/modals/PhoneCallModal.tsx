import React from 'react';
import { Phone, PhoneCall, Mail } from 'lucide-react';
import { BoardMember } from '../../types';
import { BottomSheetContainer } from './BottomSheetContainer';
import { Avatar } from '../common/Avatar';
import { RoleBadge } from '../common/RoleBadge';

interface PhoneCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: BoardMember | null;
}

export const PhoneCallModal: React.FC<PhoneCallModalProps> = ({
  isOpen,
  onClose,
  member,
}) => {
  if (!member) return null;

  const handleDial = () => {
    window.location.href = `tel:${member.phone.replace(/\s+/g, '')}`;
  };

  const handleMail = () => {
    window.location.href = `mailto:${member.email}`;
  };

  return (
    <BottomSheetContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Kontakt aufnehmen"
      subtitle={`${member.role} der Moschee Salmsach`}
    >
      <div className="space-y-5">
        {/* Contact Profile Header */}
        <div className="flex flex-col items-center text-center p-4 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
          <Avatar
            initials={member.initials}
            name={member.name}
            size="xl"
            className="mb-3"
          />

          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {member.name}
          </h3>
          <RoleBadge role={member.role} className="mt-1" />

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Verantwortlich für Gemeindemitglieder, Seelsorge & Koordination
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleDial}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#A58C6F] to-[#8C7355] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#A58C6F]/30 hover:brightness-105 active:scale-95 transition-all"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Jetzt anrufen ({member.phone})</span>
          </button>

          <button
            onClick={handleMail}
            className="w-full py-3 px-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 border border-black/5 dark:border-white/10 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Mail className="w-4 h-4 text-[#A58C6F]" />
            <span>E-Mail senden ({member.email})</span>
          </button>
        </div>
      </div>
    </BottomSheetContainer>
  );
};
