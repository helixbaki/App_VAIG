import React, { useState, useEffect } from 'react';

interface AvatarProps {
  initials: string;
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showOnlineBadge?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  initials,
  name,
  imageUrl,
  size = 'md',
  showOnlineBadge = false,
  className = '',
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [imageUrl]);

  const sizeMap = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm font-semibold',
    lg: 'w-14 h-14 text-base font-semibold',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  const badgeSizeMap = {
    sm: 'w-2.5 h-2.5 ring-1',
    md: 'w-3.5 h-3.5 ring-2',
    lg: 'w-4 h-4 ring-2',
    xl: 'w-5 h-5 ring-2',
  };

  const showImage = Boolean(imageUrl && !hasError);

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      {showImage ? (
        <img
          src={imageUrl}
          alt={name}
          onError={() => setHasError(true)}
          className={`${sizeMap[size]} rounded-2xl object-cover ring-1 ring-white/20 shadow-sm`}
        />
      ) : (
        <div
          className={`${sizeMap[size]} rounded-2xl flex items-center justify-center bg-gradient-to-br from-[#A58C6F] to-[#7A644D] text-white shadow-md shadow-[#A58C6F]/20 select-none tracking-wider`}
          aria-label={name}
        >
          {initials}
        </div>
      )}

      {showOnlineBadge && (
        <span
          className={`absolute bottom-0 right-0 ${badgeSizeMap[size]} bg-emerald-500 ring-white dark:ring-slate-950 rounded-full shadow-sm`}
          title="Online"
        />
      )}
    </div>
  );
};
