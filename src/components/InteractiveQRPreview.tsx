import React, { useMemo, useState, useRef } from 'react';
import { QRTemplate, QRConfig } from '@/types/qr';
import { Image as ImageIcon } from 'lucide-react';

interface InteractiveQRPreviewProps {
    template: QRTemplate;
    config: QRConfig;
    qrDataUrl: string;
    onTextEdit?: (textId: string, newText: string) => void;
    onLogoClick?: () => void;
}

const InteractiveQRPreview: React.FC<InteractiveQRPreviewProps> = ({
    template,
    config,
    qrDataUrl,
    onTextEdit,
    onLogoClick,
}) => {
    const [editingTextId, setEditingTextId] = useState<string | null>(null);
    const [defaultTextValues, setDefaultTextValues] = useState<Record<string, string>>({});
    const previewRef = useRef<HTMLDivElement>(null);

    // Create the combined SVG with QR code embedded
    const finalSvg = useMemo(() => {
        if (!qrDataUrl) return null;

        let svgContent = template.svgContent;

        // Inject IDs into text elements if missing so we can target them
        // This ensures compatibility with the click handler which uses index-based IDs
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

        // Apply Frame Color / Gradient
        if (template.frameColorizable) {
            if (config.frameColorType === 'gradient' && config.frameGradient) {
                const gradId = "frameGradient";
                const gradDef = `
                    <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%" gradientTransform="rotate(${config.frameGradient.angle})">
                        <stop offset="0%" style="stop-color:${config.frameGradient.start}"/>
                        <stop offset="100%" style="stop-color:${config.frameGradient.end}"/>
                    </linearGradient>
                `;

                // Inject defs
                // Check if defs exist to append, or create new defs block
                if (svgContent.includes('</defs>')) {
                    svgContent = svgContent.replace('</defs>', `${gradDef}</defs>`);
                } else {
                    // Inject after opening svg tag safely
                    const svgOpenTagEnd = svgContent.indexOf('>');
                    if (svgOpenTagEnd !== -1) {
                        svgContent = svgContent.slice(0, svgOpenTagEnd + 1) + `<defs>${gradDef}</defs>` + svgContent.slice(svgOpenTagEnd + 1);
                    }
                }

                // Replace currentColor
                svgContent = svgContent.replace(/currentColor/g, `url(#${gradId})`);
            } else {
                svgContent = svgContent.replace(
                    /currentColor/g,
                    config.frameColor
                );
            }
        } else {
            // Even if not colorizable, SVG might have currentColor which needs to stay or be black?
            // Usually 'currentColor' relies on parent color. We'll leave it or set to black/default.
            // But per code logic: template.frameColorizable ? config.frameColor : 'currentColor'
            svgContent = svgContent.replace(/currentColor/g, 'currentColor');
        }

        // Apply custom text if any
        if (config.customText) {
            Object.entries(config.customText).forEach(([id, text]) => {
                const regex = new RegExp(`(<text[^>]*id="${id}"[^>]*>)(.*?)(</text>)`, 'g');
                svgContent = svgContent.replace(regex, `$1${text}$3`);
            });
        }

        // Parse SVG to get viewBox dimensions (helper for positioning)
        // const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
        // const viewBox = viewBoxMatch ? viewBoxMatch[1].split(' ').map(Number) : [0, 0, 200, 200];

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

    const handleSvgClick = (e: React.MouseEvent) => {
        if (!previewRef.current) return;

        const svgElement = previewRef.current.querySelector('svg');
        if (!svgElement) return;

        const pt = svgElement.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const svgP = pt.matrixTransform(svgElement.getScreenCTM()?.inverse());

        // Check if click is on text element
        const textElements = svgElement.querySelectorAll('text');
        textElements.forEach((textEl, index) => {
            const bbox = textEl.getBBox();
            if (
                svgP.x >= bbox.x &&
                svgP.x <= bbox.x + bbox.width &&
                svgP.y >= bbox.y &&
                svgP.y <= bbox.y + bbox.height
            ) {
                const textId = textEl.getAttribute('id') || `text-${index}`;
                if (!textEl.getAttribute('id')) {
                    textEl.setAttribute('id', textId);
                }

                // Capture current text content as default if not customized yet
                const currentContent = textEl.textContent || '';
                setDefaultTextValues(prev => ({ ...prev, [textId]: currentContent }));

                setEditingTextId(textId);
            }
        });

        // Check if click is on logo/QR area
        const logoX = template.qrPosition.x + template.qrPosition.width * 0.35;
        const logoY = template.qrPosition.y + template.qrPosition.height * 0.35;
        const logoWidth = template.qrPosition.width * 0.3;
        const logoHeight = template.qrPosition.height * 0.3;

        if (
            svgP.x >= logoX &&
            svgP.x <= logoX + logoWidth &&
            svgP.y >= logoY &&
            svgP.y <= logoY + logoHeight
        ) {
            onLogoClick?.();
        }
    };

    const handleTextChange = (textId: string, newText: string) => {
        onTextEdit?.(textId, newText);
        // Don't close immediately to allow typing
    };

    const handleTextBlur = () => {
        setEditingTextId(null);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setEditingTextId(null);
        }
    };

    // Calculate input position
    const inputStyle: React.CSSProperties | null = useMemo(() => {
        if (!editingTextId || !previewRef.current) return null;

        const svgElement = previewRef.current.querySelector('svg');
        const textElement = svgElement?.querySelector(`text[id="${editingTextId}"]`) as SVGTextElement;

        if (!svgElement || !textElement) return null;

        const bbox = textElement.getBBox();
        const pt = svgElement.createSVGPoint();

        // Transform top-left
        pt.x = bbox.x;
        pt.y = bbox.y;
        const topLeft = pt.matrixTransform(svgElement.getScreenCTM()!);

        // Transform bottom-right
        pt.x = bbox.x + bbox.width;
        pt.y = bbox.y + bbox.height;
        const bottomRight = pt.matrixTransform(svgElement.getScreenCTM()!);

        return {
            position: 'fixed',
            left: topLeft.x,
            top: topLeft.y,
            minWidth: Math.max(50, bottomRight.x - topLeft.x),
            height: Math.max(24, bottomRight.y - topLeft.y),
            fontSize: '14px',
            zIndex: 50,
            transform: 'translateY(-2px)', // Slight adjustment
        };
    }, [editingTextId, finalSvg]);

    if (!finalSvg || !qrDataUrl) {
        // Placeholder view
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
                    <div className="text-sm font-medium text-muted-foreground bg-surface-elevated/80 px-3 py-1.5 rounded-md">
                        Enter URL to generate QR
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={previewRef}
            id="qr-preview-container"
            className="relative w-full aspect-square max-w-md mx-auto group cursor-pointer"
            onClick={handleSvgClick}
        >
            <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{ __html: finalSvg }}
            />

            {/* Editable Input Overlay */}
            {editingTextId && inputStyle && (
                <input
                    autoFocus
                    value={config.customText?.[editingTextId] ?? defaultTextValues[editingTextId] ?? ''}
                    onChange={(e) => handleTextChange(editingTextId, e.target.value)}
                    onBlur={handleTextBlur}
                    onKeyDown={handleKeyDown}
                    style={inputStyle}
                    className="bg-background/90 border-2 border-primary rounded px-1 shadow-lg outline-none text-foreground font-bold text-center"
                    onClick={(e) => e.stopPropagation()}
                />
            )}

            {/* Logo hover hint */}
            {config.logo && (
                <div
                    className="absolute opacity-0 hover:opacity-100 transition-opacity pointer-events-auto"
                    style={{
                        left: `${((template.qrPosition.x + template.qrPosition.width * 0.35) / 200) * 100}%`,
                        top: `${((template.qrPosition.y + template.qrPosition.height * 0.35) / 200) * 100}%`,
                        width: `${(template.qrPosition.width * 0.3 / 200) * 100}%`,
                        height: `${(template.qrPosition.height * 0.3 / 200) * 100}%`,
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onLogoClick?.();
                    }}
                >
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                        <ImageIcon className="w-6 h-6 text-white" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default InteractiveQRPreview;
