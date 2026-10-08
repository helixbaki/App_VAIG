import React, { useState } from 'react';
import { Moon, Bell, UserCheck, ChevronRight, Check, Save, Globe } from 'lucide-react';
import { UserProfile } from '../../types';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { BottomSheetContainer } from './BottomSheetContainer';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  pushEnabled: boolean;
  onTogglePush: () => void;
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  onToggleDarkMode,
  pushEnabled,
  onTogglePush,
  language,
  onChangeLanguage,
  user,
  onUpdateUser,
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const t = TRANSLATIONS[language];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const initials = formData.name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase();

    onUpdateUser({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      initials: initials || user.initials,
    });

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditingProfile(false);
    }, 800);
  };

  const languages: { id: Language; label: string; flag: string; nativeName: string }[] = [
    { id: 'de', label: 'Deutsch', flag: '🇩🇪', nativeName: 'Standard' },
    { id: 'sq', label: 'Shqip', flag: '🇦🇱', nativeName: 'Albanisht' },
    { id: 'tr', label: 'Türkçe', flag: '🇹🇷', nativeName: 'Türkçe' },
  ];

  return (
    <BottomSheetContainer
      isOpen={isOpen}
      onClose={() => {
        setIsEditingProfile(false);
        onClose();
      }}
      title={t.settingsTitle}
      subtitle={t.settingsSubtitle}
    >
      <div className="space-y-5">
        {/* If editing profile mode */}
        {isEditingProfile ? (
          <form onSubmit={handleSaveProfile} className="space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/5">
              <span className="text-xs font-bold text-[#A58C6F] uppercase tracking-wider">
                {t.editPersonalData}
              </span>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {t.cancel}
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 block mb-1">
                  {t.fullName}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#A58C6F]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 block mb-1">
                  {t.emailAddress}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#A58C6F]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 block mb-1">
                  {t.phoneNumber}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-[#A58C6F]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-[#A58C6F] hover:bg-[#8C7355] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>{t.saved}</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{t.save}</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Normal settings list */
          <div className="space-y-4">
            {/* Setting: Sprache der App (Deutsch, Shqip, Türkçe) */}
            <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A58C6F]/15 text-[#A58C6F] flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {t.languageLabel}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.languageSub}
                  </div>
                </div>
              </div>

              {/* Language selection pills */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                {languages.map((item) => {
                  const isSelected = language === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onChangeLanguage(item.id)}
                      className={`p-2.5 rounded-xl text-center transition-all border flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'bg-[#A58C6F] text-white border-[#A58C6F] shadow-md shadow-[#A58C6F]/20 scale-102 font-bold'
                          : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-[#A58C6F]/40'
                      }`}
                    >
                      <span className="text-base">{item.flag}</span>
                      <span className="text-xs leading-none">{item.label}</span>
                      <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                        {item.nativeName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Toggle: Dunkelmodus */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {t.darkMode}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.darkModeSub}
                  </div>
                </div>
              </div>

              <button
                role="switch"
                aria-checked={isDarkMode}
                onClick={onToggleDarkMode}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isDarkMode ? 'bg-[#A58C6F]' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    isDarkMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Toggle: Push-Benachrichtigungen */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-[#A58C6F] flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {t.pushNotifs}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.pushNotifsSub}
                  </div>
                </div>
              </div>

              <button
                role="switch"
                aria-checked={pushEnabled}
                onClick={onTogglePush}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  pushEnabled ? 'bg-[#A58C6F]' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    pushEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Click-Row: Persönliche Daten ändern */}
            <button
              onClick={() => setIsEditingProfile(true)}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] hover:bg-black/5 dark:hover:bg-white/5 border border-black/5 dark:border-white/5 transition-all text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    {t.editPersonalData}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {t.editPersonalDataSub}
                  </div>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors" />
            </button>
          </div>
        )}
      </div>
    </BottomSheetContainer>
  );
};
