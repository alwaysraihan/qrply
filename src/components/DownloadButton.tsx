import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, Image, FileText, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { DownloadFormat, QRTemplate, QRConfig } from '@/types/qr';
import jsPDF from 'jspdf';

interface DownloadButtonProps {
  template: QRTemplate;
  config: QRConfig;
  qrDataUrl: string;
  onPremiumRequired: () => void;
  isPremium?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  template,
  config,
  qrDataUrl,
  onPremiumRequired,
  isPremium = true, // Set to true for now so all features work
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showFormats, setShowFormats] = useState(false);
  const { toast } = useToast();

  const generateFinalSVG = useCallback(() => {
    let svgContent = template.svgContent;

    // Inject IDs into text elements if missing (same logic as InteractiveQRPreview)
    let textIndex = 0;
    svgContent = svgContent.replace(/<text([^>]*)>/g, (match, attributes) => {
      if (!attributes.includes('id=')) {
        const newAttributes = `${attributes} id="text-${textIndex}"`;
        textIndex++;
        return `<text${newAttributes}>`;
      }
      textIndex++;
      return match;
    });

    svgContent = svgContent.replace(
      /currentColor/g,
      template.frameColorizable ? config.frameColor : '#7c3aed'
    );

    // Apply custom text if any
    if (config.customText) {
      Object.entries(config.customText).forEach(([id, text]) => {
        const regex = new RegExp(`(<text[^>]*id="${id}"[^>]*>)(.*?)(</text>)`, 'g');
        svgContent = svgContent.replace(regex, `$1${text}$3`);
      });
    }

    svgContent = svgContent.replace(
      /<rect[^>]*class="qr-placeholder"[^>]*\/>/g,
      ''
    );

    const qrImageElement = `
      <image 
        x="${template.qrPosition.x}" 
        y="${template.qrPosition.y}" 
        width="${template.qrPosition.width}" 
        height="${template.qrPosition.height}"
        href="${qrDataUrl}"
        preserveAspectRatio="xMidYMid meet"
      />
      ${config.logo ? `
        <image 
          x="${template.qrPosition.x + template.qrPosition.width * 0.35}" 
          y="${template.qrPosition.y + template.qrPosition.height * 0.35}" 
          width="${template.qrPosition.width * 0.3}" 
          height="${template.qrPosition.height * 0.3}"
          href="${config.logo}"
          preserveAspectRatio="xMidYMid meet"
        />
      ` : ''}
    `;

    return svgContent.replace('</svg>', `${qrImageElement}</svg>`);
  }, [template, config, qrDataUrl]);

  const downloadAsPng = useCallback(async () => {
    if (!qrDataUrl) return;

    setIsDownloading(true);
    try {
      const svgContent = generateFinalSVG();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new window.Image();

      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        // High resolution export - 2000x2000
        canvas.width = 2000;
        canvas.height = 2000;
        ctx?.drawImage(img, 0, 0, 2000, 2000);

        const link = document.createElement('a');
        link.download = `qr-${template.id}-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        URL.revokeObjectURL(url);
        setIsDownloading(false);
        setShowFormats(false);

        toast({
          title: "Download Complete",
          description: "Your QR code has been downloaded as PNG.",
        });
      };

      img.onerror = () => {
        console.error('Failed to load SVG');
        setIsDownloading(false);
        toast({
          title: "Download Failed",
          description: "Failed to generate PNG. Please try again.",
          variant: "destructive",
        });
      };

      img.src = url;
    } catch (error) {
      console.error('Download error:', error);
      setIsDownloading(false);
      toast({
        title: "Download Failed",
        description: "An error occurred while downloading.",
        variant: "destructive",
      });
    }
  }, [template, qrDataUrl, generateFinalSVG, toast]);

  const downloadAsSvg = useCallback(async () => {
    if (!qrDataUrl) return;

    setIsDownloading(true);
    try {
      const svgContent = generateFinalSVG();
      const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.download = `qr-${template.id}-${Date.now()}.svg`;
      link.href = url;
      link.click();

      URL.revokeObjectURL(url);
      setIsDownloading(false);
      setShowFormats(false);

      toast({
        title: "Download Complete",
        description: "Your QR code has been downloaded as SVG.",
      });
    } catch (error) {
      console.error('SVG download error:', error);
      setIsDownloading(false);
      toast({
        title: "Download Failed",
        description: "Failed to download SVG.",
        variant: "destructive",
      });
    }
  }, [template, qrDataUrl, generateFinalSVG, toast]);

  const downloadAsPdf = useCallback(async () => {
    if (!qrDataUrl) return;

    setIsDownloading(true);
    try {
      const svgContent = generateFinalSVG();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new window.Image();

      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        canvas.width = 2000;
        canvas.height = 2000;
        ctx?.drawImage(img, 0, 0, 2000, 2000);

        // Create PDF
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const imgData = canvas.toDataURL('image/png');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const size = Math.min(pageWidth, pageHeight) - 20;
        const x = (pageWidth - size) / 2;
        const y = (pageHeight - size) / 2;

        pdf.addImage(imgData, 'PNG', x, y, size, size);
        pdf.save(`qr-${template.id}-${Date.now()}.pdf`);

        URL.revokeObjectURL(url);
        setIsDownloading(false);
        setShowFormats(false);

        toast({
          title: "Download Complete",
          description: "Your QR code has been downloaded as PDF.",
        });
      };

      img.src = url;
    } catch (error) {
      console.error('PDF download error:', error);
      setIsDownloading(false);
      toast({
        title: "Download Failed",
        description: "Failed to generate PDF.",
        variant: "destructive",
      });
    }
  }, [template, qrDataUrl, generateFinalSVG, toast]);

  const handleFormatSelect = (format: DownloadFormat) => {
    if (!isPremium && (format === 'svg' || format === 'pdf')) {
      onPremiumRequired();
      setShowFormats(false);
      return;
    }

    switch (format) {
      case 'png':
        downloadAsPng();
        break;
      case 'svg':
        downloadAsSvg();
        break;
      case 'pdf':
        downloadAsPdf();
        break;
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setShowFormats(!showFormats)}
        disabled={!qrDataUrl || isDownloading}
        variant="gradient"
        className="w-full"
        size="lg"
      >
        {isDownloading ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <Download className="w-5 h-5 mr-2" />
        )}
        Download QR Code
      </Button>

      {showFormats && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border border-border shadow-xl overflow-hidden z-20"
        >
          <button
            onClick={() => handleFormatSelect('png')}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary transition-colors"
          >
            <Image className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-sm font-medium">PNG Image</p>
              <p className="text-xs text-muted-foreground">High resolution (2000x2000)</p>
            </div>
            <span className="ml-auto text-xs text-muted-foreground">Default</span>
          </button>

          <button
            onClick={() => handleFormatSelect('svg')}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary transition-colors border-t border-border"
          >
            <svg className="w-5 h-5 text-premium" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm7 6l4 4-4 4V9z" />
            </svg>
            <div className="text-left flex-1">
              <p className="text-sm font-medium">SVG Vector</p>
              <p className="text-xs text-muted-foreground">Scalable quality</p>
            </div>
            {!isPremium && (
              <span className="premium-badge flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> PRO
              </span>
            )}
          </button>

          <button
            onClick={() => handleFormatSelect('pdf')}
            className="w-full px-4 py-3 flex items-center gap-3 hover:bg-secondary transition-colors border-t border-border"
          >
            <FileText className="w-5 h-5 text-premium" />
            <div className="text-left flex-1">
              <p className="text-sm font-medium">PDF Document</p>
              <p className="text-xs text-muted-foreground">Print ready (A4)</p>
            </div>
            {!isPremium && (
              <span className="premium-badge flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> PRO
              </span>
            )}
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default DownloadButton;
