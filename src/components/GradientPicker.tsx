import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { GradientConfig } from '@/types/qr';

interface GradientPickerProps {
    label: string;
    value: string;
    gradient?: GradientConfig;
    colorType: 'solid' | 'gradient';
    onChange: (color: string) => void;
    onGradientChange: (gradient: GradientConfig) => void;
    onTypeChange: (type: 'solid' | 'gradient') => void;
    solidPresets: Array<{ name: string; value: string }>;
}

const gradientPresets: Array<{ name: string; gradient: GradientConfig }> = [
    { name: 'Sunset', gradient: { start: '#FF6B6B', end: '#FFD93D', angle: 135 } },
    { name: 'Ocean', gradient: { start: '#667eea', end: '#764ba2', angle: 135 } },
    { name: 'Forest', gradient: { start: '#11998e', end: '#38ef7d', angle: 135 } },
    { name: 'Fire', gradient: { start: '#f12711', end: '#f5af19', angle: 135 } },
    { name: 'Sky', gradient: { start: '#2193b0', end: '#6dd5ed', angle: 135 } },
    { name: 'Berry', gradient: { start: '#8E2DE2', end: '#4A00E0', angle: 135 } },
    { name: 'Peach', gradient: { start: '#FFB6B9', end: '#FEC8C8', angle: 135 } },
    { name: 'Mint', gradient: { start: '#00d2ff', end: '#3a7bd5', angle: 135 } },
    { name: 'Rose', gradient: { start: '#ee0979', end: '#ff6a00', angle: 135 } },
    { name: 'Purple', gradient: { start: '#DA22FF', end: '#9733EE', angle: 135 } },
    { name: 'Emerald', gradient: { start: '#56ab2f', end: '#a8e063', angle: 135 } },
    { name: 'Coral', gradient: { start: '#FF7E5F', end: '#FEB47B', angle: 135 } },
];

const GradientPicker: React.FC<GradientPickerProps> = ({
    label,
    value,
    gradient = { start: '#667eea', end: '#764ba2', angle: 135 },
    colorType,
    onChange,
    onGradientChange,
    onTypeChange,
    solidPresets,
}) => {
    const [customGradient, setCustomGradient] = useState<GradientConfig>(gradient);

    const handleGradientSelect = (newGradient: GradientConfig) => {
        setCustomGradient(newGradient);
        onGradientChange(newGradient);
    };

    const updateCustomGradient = (updates: Partial<GradientConfig>) => {
        const updated = { ...customGradient, ...updates };
        setCustomGradient(updated);
        onGradientChange(updated);
    };

    const getGradientStyle = (grad: GradientConfig) => ({
        background: `linear-gradient(${grad.angle}deg, ${grad.start} 0%, ${grad.end} 100%)`,
    });

    return (
        <div className="space-y-3">
            <Label className="text-sm font-medium">{label}</Label>

            <Tabs value={colorType} onValueChange={(v) => onTypeChange(v as 'solid' | 'gradient')}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="solid">Solid</TabsTrigger>
                    <TabsTrigger value="gradient">Gradient</TabsTrigger>
                </TabsList>

                <TabsContent value="solid" className="space-y-3">
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-12 h-12 rounded-lg border-2 border-border cursor-pointer"
                        />
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm"
                            placeholder="#000000"
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                        {solidPresets.map((preset) => (
                            <button
                                key={preset.name}
                                onClick={() => onChange(preset.value)}
                                className="group relative aspect-square rounded-lg border-2 transition-all hover:scale-105"
                                style={{
                                    backgroundColor: preset.value,
                                    borderColor: value === preset.value ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                                }}
                                title={preset.name}
                            >
                                {value === preset.value && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-3 h-3 rounded-full bg-white shadow-lg" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="gradient" className="space-y-4">
                    {/* Gradient Presets */}
                    <div>
                        <p className="text-xs text-muted-foreground mb-2">Presets</p>
                        <div className="grid grid-cols-3 gap-2">
                            {gradientPresets.map((preset) => (
                                <button
                                    key={preset.name}
                                    onClick={() => handleGradientSelect(preset.gradient)}
                                    className="group relative aspect-square rounded-lg border-2 transition-all hover:scale-105"
                                    style={{
                                        ...getGradientStyle(preset.gradient),
                                        borderColor: gradient.start === preset.gradient.start && gradient.end === preset.gradient.end
                                            ? 'hsl(var(--primary))'
                                            : 'hsl(var(--border))',
                                    }}
                                    title={preset.name}
                                >
                                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-white drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        {preset.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Custom Gradient */}
                    <div className="space-y-3">
                        <p className="text-xs text-muted-foreground">Custom Gradient</p>

                        <div className="flex gap-2">
                            <div className="flex-1">
                                <Label className="text-xs">Start Color</Label>
                                <input
                                    type="color"
                                    value={customGradient.start}
                                    onChange={(e) => updateCustomGradient({ start: e.target.value })}
                                    className="w-full h-10 rounded-md border-2 border-border cursor-pointer"
                                />
                            </div>

                            <div className="flex-1">
                                <Label className="text-xs">End Color</Label>
                                <input
                                    type="color"
                                    value={customGradient.end}
                                    onChange={(e) => updateCustomGradient({ end: e.target.value })}
                                    className="w-full h-10 rounded-md border-2 border-border cursor-pointer"
                                />
                            </div>
                        </div>

                        <div>
                            <Label className="text-xs">Angle: {customGradient.angle}°</Label>
                            <Slider
                                value={[customGradient.angle]}
                                onValueChange={([angle]) => updateCustomGradient({ angle })}
                                min={0}
                                max={360}
                                step={15}
                                className="mt-2"
                            />
                        </div>

                        {/* Preview */}
                        <div
                            className="h-16 rounded-lg border-2 border-border"
                            style={getGradientStyle(customGradient)}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default GradientPicker;
