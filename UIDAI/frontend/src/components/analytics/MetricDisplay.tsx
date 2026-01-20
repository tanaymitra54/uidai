import React from 'react';

interface MetricDisplayProps {
  label: string;
  value: string | number;
  description?: string;
  colorClass?: string;
}

export function MetricDisplay({ label, value, description, colorClass = 'text-gray-800' }: MetricDisplayProps) {
  return (
    <div className="space-y-2">
      <div className="text-sm text-orange-600 font-bold uppercase tracking-wider">{label}</div>
      <div className={`text-5xl font-extrabold tabular-nums ${colorClass}`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      {description && <div className="text-sm text-gray-600 font-medium">{description}</div>}
    </div>
  );
}
