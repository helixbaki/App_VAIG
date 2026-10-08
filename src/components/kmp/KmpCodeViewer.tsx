import React, { useState } from 'react';
import { Copy, Check, Code, FileText, Smartphone, Laptop, Layers, Terminal } from 'lucide-react';
import { KMP_PROJECT_FILES, KmpFile } from './kmpCodeData';
import { BottomSheetContainer } from '../modals/BottomSheetContainer';

interface KmpCodeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KmpCodeViewer: React.FC<KmpCodeViewerProps> = ({ isOpen, onClose }) => {
  const [selectedFileId, setSelectedFileId] = useState<string>(KMP_PROJECT_FILES[0].id);
  const [copied, setCopied] = useState(false);

  const activeFile = KMP_PROJECT_FILES.find((f) => f.id === selectedFileId) || KMP_PROJECT_FILES[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <BottomSheetContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Kotlin Multiplatform (KMP) Quellcode"
      subtitle="Vollständige Projektstruktur, Compose Code & Setup"
    >
      <div className="space-y-4">
        {/* Category Pills / File Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2">
          {KMP_PROJECT_FILES.map((file) => {
            const isSelected = file.id === selectedFileId;
            return (
              <button
                key={file.id}
                onClick={() => setSelectedFileId(file.id)}
                className={`py-2 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-[#A58C6F] text-white border-[#A58C6F] shadow-sm'
                    : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:border-[#A58C6F]/40'
                }`}
              >
                {file.category === 'build' && <Layers className="w-3.5 h-3.5" />}
                {file.category === 'platform' && <Smartphone className="w-3.5 h-3.5" />}
                {file.category === 'ui' && <Laptop className="w-3.5 h-3.5" />}
                {file.category === 'domain' && <Code className="w-3.5 h-3.5" />}
                {file.category === 'guide' && <Terminal className="w-3.5 h-3.5" />}
                <span>{file.filename.split('/').pop()}</span>
              </button>
            );
          })}
        </div>

        {/* File Header Details */}
        <div className="p-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 block truncate">
              {activeFile.filename}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {activeFile.description}
            </span>
          </div>

          <button
            onClick={handleCopyCode}
            className="py-1.5 px-3 rounded-xl bg-[#A58C6F]/15 hover:bg-[#A58C6F]/25 text-[#8C7355] dark:text-[#C5B095] text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
            title="Code kopieren"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Kopiert' : 'Kopieren'}</span>
          </button>
        </div>

        {/* Code Block with high contrast syntax container */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-700/60 bg-[#0B0F19] text-slate-100 shadow-xl">
          <div className="flex items-center justify-between px-4 py-2 bg-[#111827] border-b border-slate-800 text-[11px] text-slate-400 font-mono">
            <span>{activeFile.filename}</span>
            <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
              {activeFile.language}
            </span>
          </div>

          <pre className="p-4 text-xs font-mono overflow-x-auto max-h-[380px] leading-relaxed select-text text-amber-100/90 whitespace-pre">
            <code>{activeFile.code}</code>
          </pre>
        </div>
      </div>
    </BottomSheetContainer>
  );
};
