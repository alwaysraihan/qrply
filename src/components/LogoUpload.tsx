import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface LogoUploadProps {
  logo: string | null;
  onLogoChange: (logo: string | null) => void;
  isPremium: boolean;
  onPremiumRequired: () => void;
}

const LogoUpload: React.FC<LogoUploadProps> = ({
  logo,
  onLogoChange,
  isPremium,
  onPremiumRequired,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isPremium) {
      onPremiumRequired();
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onLogoChange(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    if (!isPremium) {
      onPremiumRequired();
      return;
    }
    inputRef.current?.click();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Logo (Center)</Label>
        {!isPremium && (
          <span className="premium-badge">PRO</span>
        )}
      </div>
      
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      {logo ? (
        <div className="relative w-20 h-20 rounded-lg border-2 border-border overflow-hidden group">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
          <button
            onClick={() => onLogoChange(null)}
            className="absolute inset-0 bg-destructive/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-5 h-5 text-destructive-foreground" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="w-full h-20 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-secondary/50 transition-colors"
        >
          <Upload className="w-5 h-5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">Upload Logo</span>
        </button>
      )}
    </div>
  );
};

export default LogoUpload;
