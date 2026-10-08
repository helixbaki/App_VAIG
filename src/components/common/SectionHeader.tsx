import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionText,
  onActionClick,
  className = '',
}) => {
  return (
    <div className={`flex items-baseline justify-between mb-3 px-1 ${className}`}>
      <div>
        <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && onActionClick && (
        <button
          onClick={onActionClick}
          className="text-xs font-semibold text-[#A58C6F] hover:text-[#8C7355] dark:hover:text-[#C5B095] transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
