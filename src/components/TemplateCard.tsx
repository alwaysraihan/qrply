import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { QRTemplate } from "@/types/qr";
import { Crown } from "lucide-react";
import QRCode from "qrcode";

interface TemplateCardProps {
  template: QRTemplate;
  isSelected: boolean;
  frameColor: string;
  onClick: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  frameColor,
  onClick,
}) => {
  const [finalSvg, setFinalSvg] = useState("");

  useEffect(() => {
    const generateQRAndSVG = async () => {
      try {
        // Generate QR code
        const dataUrl = await QRCode.toDataURL("https://qrcode.com", {
          width: 500,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#00000000",
          },
          errorCorrectionLevel: "M",
        });

        // Replace currentColor with the frame color
        let svgContent = template.svgContent.replace(
          /currentColor/g,
          template.frameColorizable ? frameColor : "currentColor",
        );

        // Remove the qr-placeholder rect
        svgContent = svgContent.replace(
          /<rect[^>]*class="qr-placeholder"[^>]*\/>/g,
          "",
        );

        // Insert the QR code image
        const qrImageElement = `
          <image 
            x="${template.qrPosition.x}" 
            y="${template.qrPosition.y}" 
            width="${template.qrPosition.width}" 
            height="${template.qrPosition.height}"
            href="${dataUrl}"
            preserveAspectRatio="xMidYMid meet"
          />
        `;

        svgContent = svgContent.replace("</svg>", `${qrImageElement}</svg>`);
        setFinalSvg(svgContent);
      } catch (error) {
        console.error("Error generating QR code:", error);
        // Fallback to template with placeholder
        const svgContent = template.svgContent.replace(
          /currentColor/g,
          template.frameColorizable ? frameColor : "currentColor",
        );
        setFinalSvg(svgContent);
      }
    };

    generateQRAndSVG();
  }, [template, frameColor]);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative cursor-pointer rounded-xl p-3 transition-all hover-lift ${
        isSelected
          ? "ring-2 ring-primary ring-offset-2 ring-offset-background bg-card shadow-glow"
          : "bg-card border border-border hover:border-primary/50"
      }`}
    >
      {template.isPremium && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="premium-badge flex items-center gap-1">
            <Crown className="w-3 h-3" />
            PRO
          </div>
        </div>
      )}

      <div className="w-full overflow-hidden flex items-center justify-center p-1">
        <div
          className="w-full"
          style={{ color: frameColor }}
          dangerouslySetInnerHTML={{ __html: finalSvg }}
        />
      </div>

      <p className="text-xs font-medium text-center mt-2 text-muted-foreground">
        {template.name}
      </p>
    </motion.div>
  );
};

export default TemplateCard;
