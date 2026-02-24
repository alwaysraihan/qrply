import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { QrCode, Sparkles, Crown } from "lucide-react";
import { qrTemplates } from "@/data/templates";
import { QRTemplate } from "@/types/qr";
import TemplateGrid from "@/components/TemplateGrid";
import CategoryTabs from "@/components/CategoryTabs";
import PremiumModal from "@/components/PremiumModal";

const Index = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<
    "all" | "simple" | "business" | "creative" | "social"
  >("all");
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [premiumFeature, setPremiumFeature] = useState("");
  const [isPremiumUser, setIsPremiumUser] = useState(false);

  const handleTemplateSelect = (template: QRTemplate) => {
    if (template.isPremium && !isPremiumUser) {
      setPremiumFeature("premium templates");
      setShowPremiumModal(true);
      return;
    }
    navigate(`/customize/${template.id}`);
  };

  const handlePremiumRequired = (feature: string = "this feature") => {
    setPremiumFeature(feature);
    setShowPremiumModal(true);
  };

  const handleUpgrade = () => {
    setIsPremiumUser(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <QrCode className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl">QRply</h1>
              <p className="text-xs text-muted-foreground">
                Create beautiful QR codes
              </p>
            </div>
          </div>

          {isPremiumUser ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-xs sm:text-sm">
              <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Premium Active</span>
              <span className="sm:hidden">Pro</span>
            </div>
          ) : (
            <button
              onClick={() => handlePremiumRequired("premium features")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full gradient-premium text-foreground font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Upgrade to Pro</span>
              <span className="sm:hidden">Pro</span>
            </button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="text-center sm:text-left">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-1">
              Choose a Template
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Select a frame style for your QR code
            </p>
          </div>

          <CategoryTabs activeCategory={category} onChange={setCategory} />

          <TemplateGrid
            selectedTemplate={qrTemplates[0]}
            onSelectTemplate={handleTemplateSelect}
            frameColor="#7c3aed"
            filter={category}
          />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-8 py-5">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} QRply. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy-policy"
              id="footer-privacy-policy-link"
              className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>

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

export default Index;
