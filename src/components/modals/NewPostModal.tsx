import React, { useState } from 'react';
import { Info, Send, Sparkles } from 'lucide-react';
import { BottomSheetContainer } from './BottomSheetContainer';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
  authorName: string;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  authorName,
}) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit(content.trim());
      setContent('');
      setIsSubmitting(false);
      onClose();
    }, 200);
  };

  return (
    <BottomSheetContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Neuer Beitrag"
      subtitle={`Als ${authorName} posten`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Info Banner per requirements */}
        <div className="p-3.5 rounded-2xl bg-[#A58C6F]/10 dark:bg-[#A58C6F]/15 border border-[#A58C6F]/25 flex items-start gap-3 text-xs leading-relaxed text-[#7A644D] dark:text-[#D5C2AB]">
          <Info className="w-4 h-4 text-[#A58C6F] shrink-0 mt-0.5" />
          <p>
            Du postest im <strong>Community Feed</strong>. Bilder sind Vorstands-Ankündigungen vorbehalten. Bitte halte dich an die respektvollen Umgangsregeln unserer Gemeinschaft.
          </p>
        </div>

        {/* Text Area */}
        <div className="space-y-1.5">
          <label
            htmlFor="post-content"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Was möchtest du mitteilen?
          </label>
          <textarea
            id="post-content"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Schreibe eine Nachricht, Frage oder Anregung an die Gemeinde..."
            className="w-full p-4 rounded-2xl bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A58C6F] focus:border-transparent transition-all resize-none text-sm"
            autoFocus
          />
        </div>

        {/* Character count & Submit Button */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-slate-400">
            {content.length} Zeichen
          </span>

          <button
            type="submit"
            disabled={!content.trim() || isSubmitting}
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-[#A58C6F] to-[#8C7355] disabled:opacity-50 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#A58C6F]/30 hover:brightness-105 active:scale-95 transition-all"
          >
            {isSubmitting ? (
              <span>Wird gesendet...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Veröffentlichen</span>
              </>
            )}
          </button>
        </div>
      </form>
    </BottomSheetContainer>
  );
};
