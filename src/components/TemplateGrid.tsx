import React from 'react';
import { qrTemplates } from '@/data/templates';
import { QRTemplate } from '@/types/qr';
import TemplateCard from './TemplateCard';

interface TemplateGridProps {
  selectedTemplate: QRTemplate;
  onSelectTemplate: (template: QRTemplate) => void;
  frameColor: string;
  filter: 'all' | 'simple' | 'business' | 'creative' | 'social';
}

const TemplateGrid: React.FC<TemplateGridProps> = ({
  selectedTemplate,
  onSelectTemplate,
  frameColor,
  filter,
}) => {
  const filteredTemplates = filter === 'all' 
    ? qrTemplates 
    : qrTemplates.filter(t => t.category === filter);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {filteredTemplates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          isSelected={selectedTemplate.id === template.id}
          frameColor={frameColor}
          onClick={() => onSelectTemplate(template)}
        />
      ))}
    </div>
  );
};

export default TemplateGrid;
