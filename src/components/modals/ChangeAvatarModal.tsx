import React, { useRef, useState, useEffect } from 'react';
import { Camera, Upload, Check, Sparkles, User, RefreshCw } from 'lucide-react';
import { BottomSheetContainer } from './BottomSheetContainer';
import { Language, TRANSLATIONS } from '../../utils/translations';

interface ChangeAvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatarUrl?: string;
  onSaveAvatar: (newUrl: string | undefined) => void;
  userName: string;
  language?: Language;
}

export const ChangeAvatarModal: React.FC<ChangeAvatarModalProps> = ({
  isOpen,
  onClose,
  currentAvatarUrl,
  onSaveAvatar,
  userName,
  language = 'de',
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentAvatarUrl || '/IMG_0295-EDIT.jpg');
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[language];

  useEffect(() => {
    if (isOpen) {
      setPreviewUrl(currentAvatarUrl || '/IMG_0295-EDIT.jpg');
    }
  }, [isOpen, currentAvatarUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyPreset = (url: string | undefined) => {
    setPreviewUrl(url);
  };

  const handleSave = () => {
    onSaveAvatar(previewUrl);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <BottomSheetContainer
      isOpen={isOpen}
      onClose={onClose}
      title={t.avatarTitle}
      subtitle={`${t.avatarSubtitle} (${userName})`}
    >
      <div className="space-y-6">
        {/* Avatar Live Preview */}
        <div className="flex flex-col items-center justify-center p-5 rounded-3xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/5 dark:border-white/5">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-[#A58C6F]/40 shadow-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-slate-500">
                  {userName.split(' ').map((n) => n[0]).join('')}
                </span>
              )}
            </div>

            {/* Camera Overlay Icon */}
            <div className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-7 h-7" />
            </div>

            <button
              type="button"
              className="absolute bottom-0 right-0 p-2 rounded-full bg-[#A58C6F] text-white shadow-md hover:scale-105 active:scale-95 transition-all"
              title={t.setPhoto}
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-3">
            {language === 'sq' ? 'Kliko mbi foto për të ngarkuar një imazh të ri' : language === 'tr' ? 'Yeni bir fotoğraf yüklemek için görsele dokunun' : 'Tippe auf das Bild, um ein neues Foto hochzuladen'}
          </span>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Options & Presets */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            {language === 'sq' ? 'Zgjedhje e shpejtë & Opsionet' : language === 'tr' ? 'Hızlı Seçim & Seçenekler' : 'Schnellauswahl & Optionen'}
          </label>

          {/* Option 1: Upload from device */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] hover:bg-black/5 dark:hover:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-between text-left transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#A58C6F]/15 text-[#A58C6F] flex items-center justify-center">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {t.uploadFile}
                </span>
                <span className="text-[11px] text-slate-400">
                  {t.uploadFileSub}
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#A58C6F]">
              {language === 'sq' ? 'Zgjidh' : language === 'tr' ? 'Seç' : 'Auswählen'}
            </span>
          </button>

          {/* Option 2: Testfoto IMG_0295-EDIT */}
          <button
            type="button"
            onClick={() => handleApplyPreset('/IMG_0295-EDIT.jpg')}
            className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
              previewUrl === '/IMG_0295-EDIT.jpg'
                ? 'bg-[#A58C6F]/10 border-[#A58C6F]/40'
                : 'bg-black/[0.03] dark:bg-white/[0.03] border-black/5 dark:border-white/10 hover:bg-black/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden ring-1 ring-[#A58C6F]/30">
                <img
                  src="/IMG_0295-EDIT.jpg"
                  alt="Testfoto"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {t.testPhoto}
                </span>
                <span className="text-[11px] text-slate-400">
                  {t.testPhotoSub}
                </span>
              </div>
            </div>
            {previewUrl === '/IMG_0295-EDIT.jpg' ? (
              <Check className="w-4 h-4 text-[#A58C6F]" />
            ) : (
              <span className="text-xs font-semibold text-[#A58C6F]">
                {language === 'sq' ? 'Zgjidh' : language === 'tr' ? 'Seç' : 'Wählen'}
              </span>
            )}
          </button>

          {/* Option 3: Standard-Initialen */}
          <button
            type="button"
            onClick={() => handleApplyPreset(undefined)}
            className={`w-full p-3.5 rounded-2xl border flex items-center justify-between text-left transition-all ${
              !previewUrl
                ? 'bg-[#A58C6F]/10 border-[#A58C6F]/40'
                : 'bg-black/[0.03] dark:bg-white/[0.03] border-black/5 dark:border-white/10 hover:bg-black/5'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#A58C6F] to-[#7A644D] text-white flex items-center justify-center font-bold text-xs">
                SI
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {t.initialsOnly}
                </span>
                <span className="text-[11px] text-slate-400">
                  {t.initialsOnlySub}
                </span>
              </div>
            </div>
            {!previewUrl ? (
              <Check className="w-4 h-4 text-[#A58C6F]" />
            ) : (
              <span className="text-xs font-semibold text-[#A58C6F]">
                {language === 'sq' ? 'Zgjidh' : language === 'tr' ? 'Seç' : 'Wählen'}
              </span>
            )}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
          >
            {t.cancel}
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#A58C6F] to-[#8C7355] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#A58C6F]/25 hover:brightness-105 active:scale-95 transition-all"
          >
            {success ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>{t.saved}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>{t.savePhoto}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </BottomSheetContainer>
  );
};
