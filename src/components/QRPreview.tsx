import React, { useMemo } from 'react';
import { QRTemplate, QRConfig } from '@/types/qr';

interface QRPreviewProps {
  template: QRTemplate;
  config: QRConfig;
  qrDataUrl: string;
}

const QRPreview: React.FC<QRPreviewProps> = ({ template, config, qrDataUrl }) => {
  // Create the combined SVG with QR code embedded
  const finalSvg = useMemo(() => {
    if (!qrDataUrl) return null;

    // Replace currentColor with the frame color
    let svgContent = template.svgContent.replace(
      /currentColor/g,
      template.frameColorizable ? config.frameColor : 'currentColor'
    );

    // Parse SVG to get viewBox dimensions
    const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1].split(' ').map(Number) : [0, 0, 200, 200];
    const [, , vbWidth, vbHeight] = viewBox;

    // Remove the qr-placeholder rect and replace with actual QR image
    svgContent = svgContent.replace(
      /<rect[^>]*class="qr-placeholder"[^>]*\/>/g,
      ''
    );

    // Insert the QR code image before the closing svg tag
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

    svgContent = svgContent.replace('</svg>', `${qrImageElement}</svg>`);

    return svgContent;
  }, [template, config, qrDataUrl]);

  if (!finalSvg || !qrDataUrl) {
    // Show template with placeholder
    const placeholderSvg = template.svgContent.replace(
      /currentColor/g,
      template.frameColorizable ? config.frameColor : '#7c3aed'
    );

    return (
      <div className="relative w-full aspect-square max-w-md mx-auto">
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ color: config.frameColor }}
          dangerouslySetInnerHTML={{ __html: placeholderSvg }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="text-sm font-medium text-muted-foreground bg-surface-elevated/80 px-3 py-1.5 rounded-md"
            style={{
              position: 'absolute',
              left: `${(template.qrPosition.x / 200) * 100}%`,
              top: `${(template.qrPosition.y / 200) * 100}%`,
              width: `${(template.qrPosition.width / 200) * 100}%`,
              height: `${(template.qrPosition.height / 200) * 100}%`,
            }}
          >
            <div className="flex items-center justify-center w-full h-full text-xs">
              Enter URL to generate QR
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="qr-preview-container"
      className="relative w-full aspect-square max-w-md mx-auto"
    >
      <div
        className="w-full h-full"
        dangerouslySetInnerHTML={{ __html: finalSvg }}
      />
    </div>
  );
};

export default QRPreview;
