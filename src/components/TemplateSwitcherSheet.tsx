import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { qrTemplates } from '@/data/templates';
import { QRTemplate } from '@/types/qr';
import CategoryTabs from './CategoryTabs';
import TemplateCard from './TemplateCard';

interface TemplateSwitcherSheetProps {
    isOpen: boolean;
    onClose: () => void;
    currentTemplateId: string;
}

const TemplateSwitcherSheet: React.FC<TemplateSwitcherSheetProps> = ({
    isOpen,
    onClose,
    currentTemplateId,
}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState<'all' | 'simple' | 'business' | 'creative' | 'social'>('all');

    const filteredTemplates = qrTemplates.filter(template => {
        const matchesCategory = category === 'all' || template.category === category;
        const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleTemplateSelect = (template: QRTemplate) => {
        navigate(`/customize/${template.id}`);
        onClose();
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent
                side="bottom"
                className="h-[85vh] rounded-t-2xl p-0"
            >
                <div className="h-full flex flex-col">
                    <SheetHeader className="px-6 py-4 border-b border-border">
                        <SheetTitle>Change Template</SheetTitle>

                        {/* Search */}
                        <div className="relative mt-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search templates..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Category Tabs */}
                        <div className="mt-4">
                            <CategoryTabs activeCategory={category} onChange={setCategory} />
                        </div>
                    </SheetHeader>

                    {/* Template Grid */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 pb-6">
                            {filteredTemplates.map((template) => (
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    isSelected={template.id === currentTemplateId}
                                    frameColor="#7c3aed"
                                    onClick={() => handleTemplateSelect(template)}
                                />
                            ))}
                        </div>

                        {filteredTemplates.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground">No templates found</p>
                            </div>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default TemplateSwitcherSheet;
