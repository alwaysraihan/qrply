import React from 'react';
import { Label } from '@/components/ui/label';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  presets?: { name: string; value: string }[];
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  presets = [],
}) => {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      
      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          />
          <div
            className="w-10 h-10 rounded-lg border-2 border-border shadow-sm cursor-pointer transition-transform hover:scale-105"
            style={{ backgroundColor: value }}
          />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm font-mono uppercase"
          placeholder="#000000"
        />
      </div>
      
      {presets.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => onChange(preset.value)}
              className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${
                value === preset.value
                  ? 'border-primary ring-2 ring-primary/30'
                  : 'border-transparent'
              }`}
              style={{ backgroundColor: preset.value }}
              title={preset.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
