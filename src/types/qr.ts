export interface QRTemplate {
  id: string;
  name: string;
  svgContent: string;
  thumbnail: string;
  isPremium: boolean;
  qrPosition: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  frameColorizable: boolean;
  category: 'simple' | 'business' | 'creative' | 'social';
}

export interface GradientConfig {
  start: string;
  end: string;
  angle: number;
}

export interface QRConfig {
  url: string;
  qrColor: string;
  qrColorType?: 'solid' | 'gradient';
  qrGradient?: GradientConfig;
  frameColor: string;
  frameColorType?: 'solid' | 'gradient';
  frameGradient?: GradientConfig;
  backgroundColor: string;
  logo: string | null;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  qrStyle: 'squares' | 'dots' | 'rounded';
  customText?: Record<string, string>; // For editable template text
}

export type DownloadFormat = 'png' | 'svg' | 'pdf';
