import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'accent' | 'subtle';
  interactive?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  onClick,
  variant = 'default',
  interactive = false,
}) => {
  const baseClasses = `
    relative rounded-3xl transition-all duration-300
    backdrop-blur-xl
  `;

  let variantClasses = '';
  if (variant === 'default') {
    variantClasses = `
      bg-white/70 dark:bg-slate-900/40
      border border-white/60 dark:border-white/10
      shadow-[0_8px_32px_0_rgba(165,140,111,0.06)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]
    `;
  } else if (variant === 'accent') {
    variantClasses = `
      bg-gradient-to-br from-[#A58C6F]/20 via-[#A58C6F]/10 to-transparent
      border border-[#A58C6F]/30 dark:border-[#A58C6F]/20
      shadow-[0_8px_32px_0_rgba(165,140,111,0.15)]
    `;
  } else if (variant === 'subtle') {
    variantClasses = `
      bg-white/40 dark:bg-slate-900/20
      border border-white/40 dark:border-white/5
    `;
  }

  const interactiveClasses = interactive || onClick
    ? 'cursor-pointer active:scale-[0.98] hover:border-[#A58C6F]/40 hover:shadow-lg'
    : '';

  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${interactiveClasses} ${className}`}
    >
      {children}
    </div>
  );
};
