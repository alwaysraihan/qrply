import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { QRConfig } from '@/types/qr';

interface QRStyleSelectorProps {
  value: QRConfig['qrStyle'];
  onChange: (value: QRConfig['qrStyle']) => void;
}

const styles: { value: QRConfig['qrStyle']; label: string; icon: React.ReactNode }[] = [
  {
    value: 'squares',
    label: 'Squares',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <rect x="2" y="2" width="6" height="6" fill="currentColor" />
        <rect x="9" y="2" width="6" height="6" fill="currentColor" />
        <rect x="16" y="2" width="6" height="6" fill="currentColor" />
        <rect x="2" y="9" width="6" height="6" fill="currentColor" />
        <rect x="16" y="9" width="6" height="6" fill="currentColor" />
        <rect x="2" y="16" width="6" height="6" fill="currentColor" />
        <rect x="9" y="16" width="6" height="6" fill="currentColor" />
        <rect x="16" y="16" width="6" height="6" fill="currentColor" />
      </svg>
    ),
  },
  {
    value: 'dots',
    label: 'Dots',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <circle cx="5" cy="5" r="3" fill="currentColor" />
        <circle cx="12" cy="5" r="3" fill="currentColor" />
        <circle cx="19" cy="5" r="3" fill="currentColor" />
        <circle cx="5" cy="12" r="3" fill="currentColor" />
        <circle cx="19" cy="12" r="3" fill="currentColor" />
        <circle cx="5" cy="19" r="3" fill="currentColor" />
        <circle cx="12" cy="19" r="3" fill="currentColor" />
        <circle cx="19" cy="19" r="3" fill="currentColor" />
      </svg>
    ),
  },
  {
    value: 'rounded',
    label: 'Rounded',
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <rect x="2" y="2" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="9" y="2" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="16" y="2" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="2" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="16" y="9" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="2" y="16" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="9" y="16" width="6" height="6" rx="1.5" fill="currentColor" />
        <rect x="16" y="16" width="6" height="6" rx="1.5" fill="currentColor" />
      </svg>
    ),
  },
];

const QRStyleSelector: React.FC<QRStyleSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">QR Style</Label>
      
      <div className="grid grid-cols-3 gap-2">
        {styles.map((style) => (
          <button
            key={style.value}
            onClick={() => onChange(style.value)}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
              value === style.value
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary/50'
            }`}
          >
            <div className={value === style.value ? 'text-primary' : 'text-muted-foreground'}>
              {style.icon}
            </div>
            <span className="text-xs font-medium">{style.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QRStyleSelector;
