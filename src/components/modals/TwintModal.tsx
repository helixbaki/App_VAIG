import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, HeartHandshake, ShieldCheck } from 'lucide-react';
import { BottomSheetContainer } from './BottomSheetContainer';
import { QrCode } from '../common/QrCode';
import { TWINT_DETAILS } from '../../data/mockData';

interface TwintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteDonation: (amount: number) => void;
}

export const TwintModal: React.FC<TwintModalProps> = ({
  isOpen,
  onClose,
  onCompleteDonation,
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(20);
  const [copiedIban, setCopiedIban] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleCopyIban = () => {
    navigator.clipboard.writeText(TWINT_DETAILS.iban);
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };

  const handleLaunchTwint = () => {
    // In KMP: calls TwintLauncher.openTwint(amount)
    setSuccessMessage(true);
    setTimeout(() => {
      onCompleteDonation(selectedAmount);
      setSuccessMessage(false);
      onClose();
    }, 1200);
  };

  return (
    <BottomSheetContainer
      isOpen={isOpen}
      onClose={onClose}
      title="TWINT Spende"
      subtitle="Schnell, sicher & bargeldlos spenden"
    >
      <div className="space-y-5">
        {/* Suggested amount buttons */}
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
            Spendenbetrag auswählen (CHF)
          </label>
          <div className="grid grid-cols-4 gap-2">
            {TWINT_DETAILS.suggestedAmounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setSelectedAmount(amt)}
                className={`py-2.5 rounded-2xl font-bold text-sm transition-all border ${
                  selectedAmount === amt
                    ? 'bg-[#A58C6F] text-white border-[#A58C6F] shadow-md shadow-[#A58C6F]/20 scale-105'
                    : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-[#A58C6F]/40'
                }`}
              >
                CHF {amt}
              </button>
            ))}
          </div>
        </div>

        {/* QR Code display */}
        <div className="p-4 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex flex-col items-center text-center">
          <div className="p-2 bg-white rounded-2xl shadow-md">
            <QrCode
              value={`TWINT:AMOUNT:${selectedAmount}:CH8209000000123456789:MOSCHEE-SALMSACH`}
              size={150}
              centerLogo={
                <div className="px-1.5 py-0.5 bg-emerald-600 text-white rounded text-[8px] font-black">
                  TWINT
                </div>
              }
            />
          </div>

          <div className="mt-3">
            <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              {TWINT_DETAILS.recipient}
            </div>
            <div className="text-[11px] text-slate-400">
              Betrag: CHF {selectedAmount}.00 · {TWINT_DETAILS.purpose}
            </div>
          </div>
        </div>

        {/* Primary Launch Action */}
        <button
          onClick={handleLaunchTwint}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#A58C6F] to-[#8C7355] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#A58C6F]/30 hover:brightness-105 active:scale-95 transition-all"
        >
          {successMessage ? (
            <>
              <Check className="w-5 h-5 text-white" />
              <span>TWINT Übergabe erfolgreich...</span>
            </>
          ) : (
            <>
              <HeartHandshake className="w-4 h-4" />
              <span>TWINT App öffnen (CHF {selectedAmount}.00)</span>
              <ArrowUpRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Bank transfer info fallback */}
        <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="truncate mr-2">
            <span className="block text-[10px] text-slate-400">IBAN FÜR E-BANKING</span>
            <span className="font-mono text-xs text-slate-700 dark:text-slate-300">
              {TWINT_DETAILS.iban}
            </span>
          </div>

          <button
            onClick={handleCopyIban}
            className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 text-slate-600 dark:text-slate-300 shrink-0"
            title="IBAN kopieren"
          >
            {copiedIban ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </BottomSheetContainer>
  );
};
