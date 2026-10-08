import React from 'react';

interface RoleBadgeProps {
  role: string;
  className?: string;
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide bg-[#A58C6F]/15 text-[#8C7355] dark:text-[#C5B095] border border-[#A58C6F]/25 ${className}`}
    >
      {role}
    </span>
  );
};
