import { useCallback, useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QRConfig } from '@/types/qr';

export const useQRGenerator = (config: QRConfig) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [qrSvgString, setQrSvgString] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const injectGradient = (svg: string, gradient: any, color: string) => {
    const gradientDef = `
      <defs>
        <linearGradient id="qrGradient" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${gradient.angle})">
          <stop offset="0%" style="stop-color:${gradient.start}"/>
          <stop offset="100%" style="stop-color:${gradient.end}"/>
        </linearGradient>
      </defs>
    `;
    // Insert after opening svg tag safely
    // The previous regex replacement was buggy if attributes spanned lines or followed immediately
    // We target the first > that closes the <svg...> tag
    const svgOpenTagEnd = svg.indexOf('>');
    if (svgOpenTagEnd === -1) return svg;

    const svgWithDefs = svg.slice(0, svgOpenTagEnd + 1) + gradientDef + svg.slice(svgOpenTagEnd + 1);

    // Replace hex color fill with gradient url
    // QRCode lib uses exact hex string
    return svgWithDefs.replace(new RegExp(`fill="${color}"`, 'g'), 'fill="url(#qrGradient)"');
  };

  const generateQR = useCallback(async () => {
    if (!config.url.trim()) {
      setQrDataUrl('');
      setQrSvgString('');
      return;
    }

    setIsGenerating(true);
    try {
      // Base options
      const baseOptions = {
        errorCorrectionLevel: config.errorCorrectionLevel,
        margin: 1,
        width: 800,
      };

      // Determine the color to use
      // For Canvas generation (dots/rounded internal step), we use start color if gradient
      const qrColor = config.qrColorType === 'gradient' && config.qrGradient
        ? config.qrGradient.start
        : config.qrColor;

      // Generate QR with style support
      if (config.qrStyle === 'dots') {
        // For dots style, generate and convert to circles
        const canvas = document.createElement('canvas');
        await QRCode.toCanvas(canvas, config.url, {
          ...baseOptions,
          color: {
            dark: qrColor,
            light: '#00000000',
          },
        });

        const dataUrl = canvas.toDataURL();
        setQrDataUrl(dataUrl);

        // Generate SVG and replace rects with circles
        let svgString = await QRCode.toString(config.url, {
          type: 'svg',
          ...baseOptions,
          color: {
            dark: qrColor,
            light: config.backgroundColor,
          },
        });

        // Apply gradient if needed - BEFORE transforming shapes so we catch the fills
        if (config.qrColorType === 'gradient' && config.qrGradient) {
          svgString = injectGradient(svgString, config.qrGradient, qrColor);
        }

        // Replace rect with circles for dots effect
        // Note: if gradient applied, fill is now url(#qrGradient)
        // Regex needs to be robust
        svgString = svgString.replace(/<rect\s+([^>]*)\s*\/>/g, (match, attrs) => {
          const xMatch = attrs.match(/x="([^"]+)"/);
          const yMatch = attrs.match(/y="([^"]+)"/);
          const widthMatch = attrs.match(/width="([^"]+)"/);
          const fillMatch = attrs.match(/fill="([^"]+)"/);

          if (xMatch && yMatch && widthMatch && fillMatch) {
            const x = parseFloat(xMatch[1]);
            const y = parseFloat(yMatch[1]);
            const width = parseFloat(widthMatch[1]);
            const fill = fillMatch[1];

            // Skip background rect usually
            if (width > 100) return match; // Naive check for background or large finder patterns? 
            // Actually qrcode lib background is usually huge.
            // But here we set margin 1.

            const cx = x + width / 2;
            const cy = y + width / 2;
            const r = width / 2.2; // Slightly smaller for dot effect
            return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;
          }
          return match;
        });

        setQrSvgString(svgString);
      } else if (config.qrStyle === 'rounded') {
        const canvas = document.createElement('canvas');
        await QRCode.toCanvas(canvas, config.url, {
          ...baseOptions,
          color: {
            dark: qrColor,
            light: config.backgroundColor,
          },
        });

        const dataUrl = canvas.toDataURL();
        setQrDataUrl(dataUrl);

        let svgString = await QRCode.toString(config.url, {
          type: 'svg',
          ...baseOptions,
          color: {
            dark: qrColor,
            light: config.backgroundColor,
          },
        });

        // Apply gradient if needed
        if (config.qrColorType === 'gradient' && config.qrGradient) {
          svgString = injectGradient(svgString, config.qrGradient, qrColor);
        }

        // Add rounded corners to rects
        svgString = svgString.replace(/<rect\s+([^>]*)\s*\/>/g, (match, attrs) => {
          if (attrs.includes('fill') && !attrs.includes('rx=')) {
            // Avoid rounding background
            if (attrs.includes('width="800"')) return match;
            // Logic: Check if it's the module color
            // If gradient, fill="url(#...)"
            // If solid, fill="hex"
            // Simplest: round all small rects
            return match.replace('/>', ' rx="1.5"/>');
          }
          return match;
        });

        setQrSvgString(svgString);
      } else {
        // Default squares style
        const canvas = document.createElement('canvas');
        await QRCode.toCanvas(canvas, config.url, {
          ...baseOptions,
          color: {
            dark: qrColor,
            light: config.backgroundColor,
          },
        });

        const dataUrl = canvas.toDataURL();
        setQrDataUrl(dataUrl);

        let svgString = await QRCode.toString(config.url, {
          type: 'svg',
          ...baseOptions,
          color: {
            dark: qrColor,
            light: config.backgroundColor,
          },
        });

        // Apply gradient if needed
        if (config.qrColorType === 'gradient' && config.qrGradient) {
          svgString = injectGradient(svgString, config.qrGradient, qrColor);
        }

        setQrSvgString(svgString);
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  }, [config.url, config.qrColor, config.qrColorType, config.qrGradient, config.backgroundColor, config.errorCorrectionLevel, config.qrStyle]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      generateQR();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [generateQR]);

  return { qrDataUrl, qrSvgString, isGenerating };
};
