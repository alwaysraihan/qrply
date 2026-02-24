import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Link2, Download, Palette } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { qrTemplates, colorPresets, frameColorPresets } from '@/data/templates';
import { QRTemplate, QRConfig } from '@/types/qr';
import { useQRGenerator } from '@/hooks/useQRGenerator';
import GradientPicker from '@/components/GradientPicker';
import InteractiveQRPreview from '@/components/InteractiveQRPreview';
import QRStyleSelector from '@/components/QRStyleSelector';
import LogoUpload from '@/components/LogoUpload';
import DownloadButton from '@/components/DownloadButton';
import TemplateSwitcherSheet from '@/components/TemplateSwitcherSheet';
import PremiumModal from '@/components/PremiumModal';

const Customize = () => {
    const { templateId } = useParams<{ templateId: string }>();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [selectedTemplate, setSelectedTemplate] = useState<QRTemplate | null>(null);
    const [config, setConfig] = useState<QRConfig>({
        url: 'https://qrcode.com',
        qrColor: '#000000',
        qrColorType: 'solid',
        frameColor: '#7c3aed',
        frameColorType: 'solid',
        backgroundColor: '#ffffff',
        logo: null,
        errorCorrectionLevel: 'M',
        qrStyle: 'squares',
        customText: {},
    });
    const [showPremiumModal, setShowPremiumModal] = useState(false);
    const [premiumFeature, setPremiumFeature] = useState('');
    const [isPremiumUser, setIsPremiumUser] = useState(true); // Set to true for demo
    const [showTemplateSwitcher, setShowTemplateSwitcher] = useState(false);

    const { qrDataUrl, isGenerating } = useQRGenerator(config);

    useEffect(() => {
        const template = qrTemplates.find(t => t.id === templateId);
        if (template) {
            if (template.isPremium && !isPremiumUser) {
                setPremiumFeature('premium templates');
                setShowPremiumModal(true);
            }
            setSelectedTemplate(template);
        } else {
            navigate('/');
        }
    }, [templateId, navigate, isPremiumUser]);

    const handlePremiumRequired = (feature: string = 'this feature') => {
        setPremiumFeature(feature);
        setShowPremiumModal(true);
    };

    const handleUpgrade = () => {
        setIsPremiumUser(true);
    };

    const updateConfig = (updates: Partial<QRConfig>) => {
        setConfig(prev => ({ ...prev, ...updates }));
    };

    const handleTextEdit = (textId: string, newText: string) => {
        setConfig(prev => ({
            ...prev,
            customText: {
                ...prev.customText,
                [textId]: newText,
            },
        }));
    };

    const handleLogoClick = () => {
        if (!isPremiumUser) {
            handlePremiumRequired('logo placement');
            return;
        }
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target?.result as string;
            updateConfig({ logo: dataUrl });
        };
        reader.readAsDataURL(file);
    };

    if (!selectedTemplate) {
        return null;
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-40 glass-effect border-b border-border">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                        className="gap-2 flex items-center"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Back to Templates</span>
                        <span className="sm:hidden">Back</span>
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => setShowTemplateSwitcher(true)}
                        className="gap-2 flex items-center"
                    >
                        <Palette className="w-4 h-4" />
                        <span className="hidden sm:inline">Change Template</span>
                        <span className="sm:hidden">Change</span>
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-6 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* Left Column - Preview */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card-elevated p-6 relative"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-display font-semibold text-lg">Preview</h3>
                            </div>

                            <InteractiveQRPreview
                                template={selectedTemplate}
                                config={config}
                                qrDataUrl={qrDataUrl}
                                onTextEdit={handleTextEdit}
                                onLogoClick={handleLogoClick}
                            />

                            {isGenerating && (
                                <div className="absolute inset-0 bg-card/80 flex items-center justify-center rounded-lg">
                                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </motion.div>

                        {/* Download Button - Mobile */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="lg:hidden"
                        >
                            <DownloadButton
                                template={selectedTemplate}
                                config={config}
                                qrDataUrl={qrDataUrl}
                                onPremiumRequired={() => handlePremiumRequired('high-quality exports')}
                                isPremium={isPremiumUser}
                            />
                        </motion.div>
                    </div>

                    {/* Right Column - Customization */}
                    <div className="space-y-6">
                        {/* URL Input */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card-elevated p-6 space-y-4"
                        >
                            <div className="space-y-3">
                                <Label className="text-sm font-medium flex items-center gap-2">
                                    <Link2 className="w-4 h-4" />
                                    QR Code Content
                                </Label>
                                <Input
                                    placeholder="Enter URL, text, or any content..."
                                    value={config.url}
                                    onChange={(e) => updateConfig({ url: e.target.value })}
                                    className="h-12 text-base"
                                />
                            </div>

                            {/* Error Correction Level */}
                            <div className="space-y-3">
                                <Label className="text-sm font-medium">Error Correction</Label>
                                <Select
                                    value={config.errorCorrectionLevel}
                                    onValueChange={(value: QRConfig['errorCorrectionLevel']) =>
                                        updateConfig({ errorCorrectionLevel: value })
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="L">Low (7%)</SelectItem>
                                        <SelectItem value="M">Medium (15%)</SelectItem>
                                        <SelectItem value="Q">Quartile (25%)</SelectItem>
                                        <SelectItem value="H">High (30%)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    Higher levels allow more damage but increase density
                                </p>
                            </div>
                        </motion.div>

                        {/* Customization Options */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="card-elevated p-6 space-y-6"
                        >
                            <h3 className="font-display font-semibold text-lg">Customize</h3>

                            <GradientPicker
                                label="QR Code Color"
                                value={config.qrColor}
                                gradient={config.qrGradient}
                                colorType={config.qrColorType || 'solid'}
                                onChange={(color) => updateConfig({ qrColor: color })}
                                onGradientChange={(gradient) => updateConfig({ qrGradient: gradient })}
                                onTypeChange={(type) => updateConfig({ qrColorType: type })}
                                solidPresets={colorPresets}
                            />

                            {selectedTemplate.frameColorizable && (
                                <GradientPicker
                                    label="Frame Color"
                                    value={config.frameColor}
                                    gradient={config.frameGradient}
                                    colorType={config.frameColorType || 'solid'}
                                    onChange={(color) => updateConfig({ frameColor: color })}
                                    onGradientChange={(gradient) => updateConfig({ frameGradient: gradient })}
                                    onTypeChange={(type) => updateConfig({ frameColorType: type })}
                                    solidPresets={frameColorPresets}
                                />
                            )}

                            <div className="space-y-3">
                                <Label className="text-sm font-medium">Background Color</Label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={config.backgroundColor}
                                        onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                                        className="w-12 h-12 rounded-lg border-2 border-border cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        value={config.backgroundColor}
                                        onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                                        className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm"
                                        placeholder="#ffffff"
                                    />
                                </div>
                            </div>

                            <QRStyleSelector
                                value={config.qrStyle}
                                onChange={(style) => updateConfig({ qrStyle: style })}
                            />

                            <LogoUpload
                                logo={config.logo}
                                onLogoChange={(logo) => updateConfig({ logo })}
                                isPremium={isPremiumUser}
                                onPremiumRequired={() => handlePremiumRequired('logo placement')}
                            />
                        </motion.div>

                        {/* Download Button - Desktop */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="hidden lg:block"
                        >
                            <DownloadButton
                                template={selectedTemplate}
                                config={config}
                                qrDataUrl={qrDataUrl}
                                onPremiumRequired={() => handlePremiumRequired('high-quality exports')}
                                isPremium={isPremiumUser}
                            />
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Hidden file input for logo upload */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Template Switcher Sheet */}
            <TemplateSwitcherSheet
                isOpen={showTemplateSwitcher}
                onClose={() => setShowTemplateSwitcher(false)}
                currentTemplateId={selectedTemplate.id}
            />

            {/* Premium Modal */}
            <PremiumModal
                isOpen={showPremiumModal}
                onClose={() => setShowPremiumModal(false)}
                onUpgrade={handleUpgrade}
                featureName={premiumFeature}
            />
        </div>
    );
};

export default Customize;
