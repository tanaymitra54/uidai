import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface AnalysisSectionProps {
  title: string;
  description: string;
  onAction: () => void;
  actionLabel: string;
  loading: boolean;
  disabled?: boolean;
  children?: ReactNode;
  borderColor?: string;
}

export function AnalysisSection({
  title,
  description,
  onAction,
  actionLabel,
  loading,
  disabled = false,
  children,
  borderColor = '#FF9933'
}: AnalysisSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between pb-4" style={{ borderBottom: `3px solid ${borderColor}` }}>
        <div>
          <h2 className="text-3xl font-bold text-[#1A1A1A]">{title}</h2>
          <p className="text-base text-[#6B6B6B] mt-2">{description}</p>
        </div>
        <Button 
          onClick={onAction} 
          disabled={loading || disabled}
          className="bg-[#FF9933] hover:bg-[#E88825] text-white font-semibold px-6 py-3 transition-all border-2 border-[#FF9933] hover:border-[#E88825]"
          style={{ borderRadius: '0' }}
        >
          {loading ? 'Computing...' : actionLabel}
        </Button>
      </div>
      {children}
    </div>
  );
}
