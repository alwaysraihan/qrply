import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import {
  QrCode,
  ArrowLeft,
  Shield,
  Eye,
  Database,
  Share2,
  Lock,
  Trash2,
  Bell,
  Globe,
  Mail,
  Calendar,
} from "lucide-react";

const LAST_UPDATED = "February 24, 2026";
const APP_NAME = "QRply";
const CONTACT_EMAIL = "support@qrply.app";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    color: "from-blue-500 to-cyan-500",
    items: [
      {
        subtitle: "Information You Provide",
        text: "QRply does not require you to create an account or provide any personal information to use the core features of the app. All QR code creation and customization happens locally on your device.",
      },
      {
        subtitle: "QR Code Content",
        text: "The content you enter to generate QR codes (URLs, text, contact information, etc.) is processed entirely on your device and is never transmitted to our servers.",
      },
      {
        subtitle: "Usage Data",
        text: "We may collect anonymous, aggregated usage statistics (such as app launch frequency, feature usage, and crash reports) to improve the app experience. This data cannot be used to identify you personally.",
      },
    ],
  },
  {
    icon: Database,
    title: "How We Use Your Information",
    color: "from-violet-500 to-purple-500",
    items: [
      {
        subtitle: "App Improvement",
        text: "Anonymous usage data helps us understand which features are most valuable, identify bugs, and prioritize future improvements to QRply.",
      },
      {
        subtitle: "No Advertising",
        text: "We do not use your data to serve personalized advertisements. QRply does not sell, rent, or trade your personal information to third parties for marketing purposes.",
      },
      {
        subtitle: "Technical Operations",
        text: "Crash logs and performance data may be used solely to diagnose technical issues and ensure the app functions correctly on your device.",
      },
    ],
  },
  {
    icon: Share2,
    title: "Data Sharing & Third Parties",
    color: "from-emerald-500 to-teal-500",
    items: [
      {
        subtitle: "No Data Selling",
        text: "We do not sell, share, or disclose your personal data to any third-party organizations for commercial purposes.",
      },
      {
        subtitle: "Analytics Services",
        text: "We may use privacy-respecting analytics tools (such as Firebase Crashlytics) that collect only anonymous crash and performance data. These services are bound by strict data processing agreements.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose information if required by law, court order, or governmental authority. We will notify you to the extent permitted by law before doing so.",
      },
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    color: "from-amber-500 to-orange-500",
    items: [
      {
        subtitle: "Local Processing",
        text: "All QR code generation and image processing occurs entirely on your device. Your QR code content never leaves your phone unless you explicitly choose to share it.",
      },
      {
        subtitle: "Secure Storage",
        text: "Any data stored locally on your device is protected by your device's operating system security mechanisms, including encryption at rest on supported devices.",
      },
      {
        subtitle: "No Passwords or Accounts",
        text: "Since QRply does not require account creation, there is no risk of your password or account credentials being compromised through our service.",
      },
    ],
  },
  {
    icon: Trash2,
    title: "Data Retention & Deletion",
    color: "from-rose-500 to-pink-500",
    items: [
      {
        subtitle: "Local Data",
        text: "Any QR codes or customizations saved on your device are stored locally and can be deleted at any time by uninstalling the app or clearing app data through your device settings.",
      },
      {
        subtitle: "Analytics Data",
        text: "Anonymous analytics data is retained for up to 12 months to identify trends and improve the product, after which it is automatically deleted.",
      },
      {
        subtitle: "Deletion Requests",
        text:
          "If you believe any personal data has been collected and wish to request its deletion, please contact us at " +
          CONTACT_EMAIL +
          " and we will respond within 30 days.",
      },
    ],
  },
  {
    icon: Bell,
    title: "Permissions We Request",
    color: "from-indigo-500 to-blue-500",
    items: [
      {
        subtitle: "Camera (Optional)",
        text: "Used only if you choose to scan an existing QR code. The camera feed is processed locally and never recorded or transmitted.",
      },
      {
        subtitle: "Storage / Media Access (Optional)",
        text: "Required to save generated QR code images to your device's photo library or files. We only write files when you explicitly choose to save or export.",
      },
      {
        subtitle: "Internet Access",
        text: "Used to load app updates, display in-app content, and send anonymous crash reports. We do not use internet access to transmit your QR code content.",
      },
    ],
  },
  {
    icon: Globe,
    title: "Children's Privacy",
    color: "from-cyan-500 to-sky-500",
    items: [
      {
        subtitle: "Age Restriction",
        text: `${APP_NAME} is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided personal data, please contact us immediately.`,
      },
      {
        subtitle: "Parental Guidance",
        text: "Parents and guardians are encouraged to monitor their children's device usage. QRply does not contain content that is inappropriate for children, but users under 13 should use the app under adult supervision.",
      },
    ],
  },
  {
    icon: Calendar,
    title: "Changes to This Policy",
    color: "from-purple-500 to-violet-500",
    items: [
      {
        subtitle: "Policy Updates",
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, regulatory, or operational reasons. The updated policy will be posted within the app and on our website.",
      },
      {
        subtitle: "Notification",
        text: "For significant changes that affect your rights, we will notify you through an in-app notification or via the email address you provided (if applicable). Continued use of the app after changes constitutes your acceptance of the updated policy.",
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
} satisfies Variants;

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] as const },
  },
} satisfies Variants;

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-effect border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            id="privacy-back-btn"
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-9 h-9 rounded-xl border border-border hover:bg-secondary transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <QrCode className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl">{APP_NAME}</h1>
              <p className="text-xs text-muted-foreground">Privacy Policy</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-glow mb-5">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3">
            Privacy <span className="gradient-text">Policy</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Your privacy matters to us. This policy explains how{" "}
            <strong className="text-foreground">{APP_NAME}</strong> collects,
            uses, and protects your information when you use our app.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground bg-secondary rounded-full px-4 py-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Last updated: {LAST_UPDATED}</span>
          </div>
        </motion.div>

        {/* Highlight banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 flex gap-4 items-start"
        >
          <div className="w-9 h-9 rounded-xl gradient-primary flex-shrink-0 flex items-center justify-center mt-0.5">
            <Lock className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">
              Privacy-First by Design
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {APP_NAME} generates all QR codes{" "}
              <strong className="text-foreground">100% on-device</strong>. Your
              QR content — whether it's a URL, phone number, or Wi-Fi password —
              never leaves your phone. We believe great tools don't need to spy
              on you.
            </p>
          </div>
        </motion.div>

        {/* Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-5"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                variants={itemVariants}
                className="card-elevated overflow-hidden"
              >
                {/* Section header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
                  </div>
                  <h3 className="font-display font-semibold text-base">
                    {section.title}
                  </h3>
                </div>

                {/* Section items */}
                <div className="px-5 py-4 space-y-4">
                  {section.items.map((item, i) => (
                    <div key={i}>
                      <p className="font-semibold text-sm text-foreground mb-1">
                        {item.subtitle}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.45 }}
          className="mt-8 rounded-2xl gradient-primary p-6 text-center shadow-glow"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-display font-bold text-white text-lg mb-2">
            Questions About Your Privacy?
          </h3>
          <p className="text-white/80 text-sm mb-4 leading-relaxed">
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or how we handle your data, please reach out to us.
          </p>
          <a
            id="privacy-contact-email"
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors text-white font-semibold text-sm px-5 py-2.5 rounded-xl border border-white/30"
          >
            <Mail className="w-4 h-4" />
            {CONTACT_EMAIL}
          </a>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="text-center text-xs text-muted-foreground mt-8 pb-8 leading-relaxed"
        >
          This privacy policy applies to the {APP_NAME} mobile application
          available on the Google Play Store and Apple App Store. By using our
          app, you agree to the terms described in this policy.
        </motion.p>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
