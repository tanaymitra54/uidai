import React from 'react';

interface StatusBadgeProps {
  status: string;
  variant: 'success' | 'warning' | 'danger' | 'neutral';
}

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const colorMap = {
    success: 'text-green-700 border-green-500',
    warning: 'text-yellow-700 border-yellow-500',
    danger: 'text-red-700 border-red-500',
    neutral: 'text-blue-900 border-blue-500'
  };

  return (
    <div className={`text-4xl font-extrabold uppercase tracking-tight border-l-4 pl-4 ${colorMap[variant]}`}>
      {status}
    </div>
  );
}
