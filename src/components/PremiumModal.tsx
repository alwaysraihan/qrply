import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Sparkles, Check, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  featureName?: string;
}

const features = [
  'Unlimited premium templates',
  'High-resolution downloads (SVG, PDF)',
  'Custom logo placement',
  'Remove watermarks',
  'Priority support',
  'Commercial usage rights',
];

const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  featureName = 'this feature',
}) => {
  const handleUpgrade = () => {
    onUpgrade();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden">
              {/* Gradient header */}
              <div className="gradient-premium p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                <motion.div
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4"
                >
                  <Crown className="w-8 h-8 text-foreground" />
                </motion.div>
                <h2 className="text-2xl font-display font-bold text-foreground relative z-10">
                  Upgrade to Premium
                </h2>
                <p className="text-foreground/80 mt-1 relative z-10">
                  Unlock {featureName} and more
                </p>
                
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center gap-3"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full gradient-premium flex items-center justify-center">
                        <Check className="w-3 h-3 text-foreground" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Pricing */}
                <div className="bg-surface-sunken rounded-xl p-4 mb-6">
                  <div className="flex items-baseline gap-2 justify-center">
                    <span className="text-4xl font-display font-bold text-foreground">$9</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-1">
                    or $79/year (save 27%)
                  </p>
                </div>
                
                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="premium"
                    className="w-full h-12 text-base"
                    size="lg"
                    onClick={handleUpgrade}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Upgrade Now
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full h-10 text-sm border-dashed"
                    onClick={handleUpgrade}
                  >
                    <Star className="w-4 h-4 mr-2 text-premium" />
                    Try Free for 7 Days
                  </Button>
                </div>
                
                <p className="text-center text-xs text-muted-foreground mt-4">
                  Cancel anytime • Instant access to all features
                </p>
              </div>
              
              {/* Sparkle decorations */}
              <Sparkles className="absolute top-20 left-6 w-4 h-4 text-premium opacity-60" />
              <Sparkles className="absolute top-16 right-12 w-3 h-3 text-premium opacity-40" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PremiumModal;
