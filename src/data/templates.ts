import { QRTemplate } from '@/types/qr';

// SVG templates with precise QR code positioning
export const qrTemplates: QRTemplate[] = [
  {
    id: 'minimal-square',
    name: 'Minimal Square',
    category: 'simple',
    isPremium: false,
    thumbnail: '',
    qrPosition: { x: 20, y: 20, width: 160, height: 160 },
    frameColorizable: true,
    svgContent: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" rx="12" fill="currentColor"/>
      <rect x="10" y="10" width="180" height="180" rx="8" fill="white"/>
      <rect class="qr-placeholder" x="20" y="20" width="160" height="160" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'rounded-corners',
    name: 'Rounded Corners',
    category: 'simple',
    isPremium: false,
    thumbnail: '',
    qrPosition: { x: 25, y: 25, width: 150, height: 150 },
    frameColorizable: true,
    svgContent: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" rx="24" fill="currentColor"/>
      <rect x="12" y="12" width="176" height="176" rx="16" fill="white"/>
      <rect class="qr-placeholder" x="25" y="25" width="150" height="150" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'scan-me-banner',
    name: 'Scan Me Banner',
    category: 'business',
    isPremium: false,
    thumbnail: '',
    qrPosition: { x: 25, y: 40, width: 150, height: 150 },
    frameColorizable: true,
    svgContent: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="220" rx="16" fill="currentColor"/>
      <rect x="10" y="30" width="180" height="180" rx="10" fill="white"/>
      <text x="100" y="20" text-anchor="middle" fill="white" font-family="system-ui" font-weight="600" font-size="12">SCAN ME</text>
      <rect class="qr-placeholder" x="25" y="40" width="150" height="150" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'circle-frame',
    name: 'Circle Frame',
    category: 'creative',
    isPremium: false,
    thumbnail: '',
    qrPosition: { x: 35, y: 35, width: 130, height: 130 },
    frameColorizable: true,
    svgContent: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="98" fill="currentColor"/>
      <circle cx="100" cy="100" r="88" fill="white"/>
      <rect class="qr-placeholder" x="35" y="35" width="130" height="130" rx="8" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'business-card',
    name: 'Business Card',
    category: 'business',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 20, y: 45, width: 120, height: 120 },
    frameColorizable: true,
    svgContent: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="180" rx="12" fill="currentColor"/>
      <rect x="8" y="8" width="184" height="164" rx="8" fill="white"/>
      <text x="165" y="35" text-anchor="middle" fill="currentColor" font-family="system-ui" font-weight="700" font-size="10">YOUR</text>
      <text x="165" y="50" text-anchor="middle" fill="currentColor" font-family="system-ui" font-weight="700" font-size="10">BRAND</text>
      <line x1="145" y1="60" x2="185" y2="60" stroke="currentColor" stroke-width="2"/>
      <text x="165" y="80" text-anchor="middle" fill="#666" font-family="system-ui" font-size="6">www.example.com</text>
      <rect class="qr-placeholder" x="20" y="45" width="120" height="120" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'instagram-style',
    name: 'Instagram Style',
    category: 'social',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 55, width: 150, height: 150 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 235" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="instaGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#FCAF45"/>
          <stop offset="25%" style="stop-color:#F77737"/>
          <stop offset="50%" style="stop-color:#E1306C"/>
          <stop offset="75%" style="stop-color:#C13584"/>
          <stop offset="100%" style="stop-color:#833AB4"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="235" rx="20" fill="url(#instaGrad)"/>
      <rect x="10" y="45" width="180" height="180" rx="12" fill="white"/>
      <!-- Icon + text as one tight group, centered in 45px header: total=20+8=28px, start=(45-28)/2=8.5 -->
      <g transform="translate(100, 8.5)">
        <!-- Instagram camera icon 20x20 centered at x=0 -->
        <g transform="translate(-10, 0)">
          <rect width="20" height="20" rx="5" fill="none" stroke="white" stroke-width="2"/>
          <circle cx="10" cy="11" r="4.5" fill="none" stroke="white" stroke-width="1.8"/>
          <circle cx="15" cy="6" r="1.3" fill="white"/>
          <rect x="6" y="4" width="4" height="2.5" rx="0.8" fill="white"/>
        </g>
        <!-- Text immediately below, baseline at icon_bottom(20) + ascent(8) = 28 -->
        <text x="0" y="28" text-anchor="middle" fill="white" font-family="system-ui" font-weight="700" font-size="9">@instagram</text>
      </g>
      <rect class="qr-placeholder" x="25" y="55" width="150" height="150" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'wifi-style',
    name: 'WiFi Connect',
    category: 'business',
    isPremium: false,
    thumbnail: '',
    qrPosition: { x: 25, y: 55, width: 150, height: 150 },
    frameColorizable: true,
    svgContent: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="240" rx="16" fill="currentColor"/>
      <rect x="10" y="45" width="180" height="185" rx="10" fill="white"/>
      <path d="M100 12 C70 12, 50 28, 50 28" stroke="white" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M100 12 C130 12, 150 28, 150 28" stroke="white" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M100 20 C80 20, 65 32, 65 32" stroke="white" stroke-width="3" stroke-linecap="round" fill="none"/>
      <path d="M100 20 C120 20, 135 32, 135 32" stroke="white" stroke-width="3" stroke-linecap="round" fill="none"/>
      <circle cx="100" cy="38" r="4" fill="white"/>
      <rect class="qr-placeholder" x="25" y="55" width="150" height="150" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'arrow-pointer',
    name: 'Arrow Pointer',
    category: 'creative',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 25, width: 150, height: 150 },
    frameColorizable: true,
    svgContent: `<svg viewBox="0 0 230 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" rx="16" fill="currentColor"/>
      <polygon points="200,80 230,100 200,120" fill="currentColor"/>
      <rect x="10" y="10" width="180" height="180" rx="10" fill="white"/>
      <rect class="qr-placeholder" x="25" y="25" width="150" height="150" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'hexagon',
    name: 'Hexagon',
    category: 'creative',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 40, y: 40, width: 120, height: 120 },
    frameColorizable: true,
    svgContent: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,5 185,50 185,150 100,195 15,150 15,50" fill="currentColor"/>
      <polygon points="100,15 175,55 175,145 100,185 25,145 25,55" fill="white"/>
      <rect class="qr-placeholder" x="40" y="40" width="120" height="120" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'ticket-style',
    name: 'Ticket Style',
    category: 'business',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 40, width: 120, height: 120 },
    frameColorizable: true,
    svgContent: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 0 H190 A10 10 0 0 1 200 10 V70 A15 15 0 0 0 200 110 V170 A10 10 0 0 1 190 180 H10 A10 10 0 0 1 0 170 V110 A15 15 0 0 0 0 70 V10 A10 10 0 0 1 10 0" fill="currentColor"/>
      <path d="M15 8 H185 A8 8 0 0 1 193 16 V67 A12 12 0 0 0 193 113 V164 A8 8 0 0 1 185 172 H15 A8 8 0 0 1 7 164 V113 A12 12 0 0 0 7 67 V16 A8 8 0 0 1 15 8" fill="white"/>
      <text x="165" y="55" text-anchor="middle" fill="currentColor" font-family="system-ui" font-weight="700" font-size="10">EVENT</text>
      <text x="165" y="75" text-anchor="middle" fill="#666" font-family="system-ui" font-size="7">ADMIT ONE</text>
      <line x1="148" y1="20" x2="148" y2="90" stroke="currentColor" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="165" y="135" text-anchor="middle" fill="currentColor" font-family="system-ui" font-weight="600" font-size="8">#0001</text>
      <rect class="qr-placeholder" x="25" y="40" width="120" height="120" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'menu-style',
    name: 'Menu QR',
    category: 'business',
    isPremium: false,
    thumbnail: '',
    qrPosition: { x: 25, y: 65, width: 150, height: 150 },
    frameColorizable: true,
    svgContent: `<svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="250" rx="12" fill="currentColor"/>
      <rect x="8" y="55" width="184" height="187" rx="8" fill="white"/>
      <text x="100" y="25" text-anchor="middle" fill="white" font-family="system-ui" font-weight="700" font-size="14">🍽️ MENU</text>
      <text x="100" y="45" text-anchor="middle" fill="white" font-family="system-ui" font-size="10">Scan to view</text>
      <rect class="qr-placeholder" x="25" y="65" width="150" height="150" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'payment-style',
    name: 'Payment QR',
    category: 'business',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 65, width: 150, height: 150 },
    frameColorizable: true,
    svgContent: `<svg viewBox="0 0 200 250" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="250" rx="16" fill="currentColor"/>
      <rect x="10" y="55" width="180" height="185" rx="10" fill="white"/>
      <text x="100" y="28" text-anchor="middle" fill="white" font-family="system-ui" font-weight="700" font-size="14">💳 PAY HERE</text>
      <text x="100" y="48" text-anchor="middle" fill="white" font-family="system-ui" font-size="10">Quick & Secure</text>
      <rect class="qr-placeholder" x="25" y="65" width="150" height="150" fill="#f5f5f5"/>
    </svg>`
  },
  // PREMIUM ADVANCED TEMPLATES
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    category: 'creative',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 30, y: 30, width: 140, height: 140 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feFlood flood-color="#00ffff" result="color"/>
          <feComposite in="color" in2="blur" operator="in" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="neonBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a0a"/>
          <stop offset="100%" style="stop-color:#1a1a2e"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="200" rx="20" fill="url(#neonBg)"/>
      <rect x="15" y="15" width="170" height="170" rx="12" fill="none" stroke="#00ffff" stroke-width="2" filter="url(#neonGlow)"/>
      <rect x="22" y="22" width="156" height="156" rx="8" fill="#0a0a0a"/>
      <rect class="qr-placeholder" x="30" y="30" width="140" height="140" fill="#111"/>
    </svg>`
  },
  {
    id: 'holographic',
    name: 'Holographic',
    category: 'creative',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 25, width: 150, height: 150 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="holoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ff006e"/>
          <stop offset="25%" style="stop-color:#8338ec"/>
          <stop offset="50%" style="stop-color:#3a86ff"/>
          <stop offset="75%" style="stop-color:#06ffa5"/>
          <stop offset="100%" style="stop-color:#ffbe0b"/>
        </linearGradient>
        <linearGradient id="holoGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#ffbe0b"/>
          <stop offset="50%" style="stop-color:#ff006e"/>
          <stop offset="100%" style="stop-color:#3a86ff"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="200" rx="24" fill="url(#holoGrad)"/>
      <rect x="4" y="4" width="192" height="192" rx="20" fill="url(#holoGrad2)" opacity="0.5"/>
      <rect x="12" y="12" width="176" height="176" rx="16" fill="white"/>
      <rect class="qr-placeholder" x="25" y="25" width="150" height="150" fill="#f8f8f8"/>
    </svg>`
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    category: 'business',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 30, y: 50, width: 140, height: 140 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f7d36b"/>
          <stop offset="25%" style="stop-color:#d4a82f"/>
          <stop offset="50%" style="stop-color:#f7d36b"/>
          <stop offset="75%" style="stop-color:#c5992b"/>
          <stop offset="100%" style="stop-color:#f7d36b"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="220" rx="8" fill="#1a1a1a"/>
      <rect x="6" y="6" width="188" height="208" rx="6" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
      <rect x="12" y="40" width="176" height="168" rx="4" fill="white"/>
      <text x="100" y="28" text-anchor="middle" fill="url(#goldGrad)" font-family="Georgia, serif" font-weight="700" font-size="16" letter-spacing="4">PREMIUM</text>
      <rect class="qr-placeholder" x="30" y="50" width="140" height="140" fill="#fafafa"/>
    </svg>`
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    category: 'creative',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 25, width: 150, height: 150 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="glassBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea"/>
          <stop offset="100%" style="stop-color:#764ba2"/>
        </linearGradient>
        <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
        </filter>
      </defs>
      <rect x="0" y="0" width="200" height="200" rx="24" fill="url(#glassBg)"/>
      <circle cx="30" cy="30" r="60" fill="white" opacity="0.2" filter="url(#blur)"/>
      <circle cx="180" cy="180" r="50" fill="white" opacity="0.15" filter="url(#blur)"/>
      <rect x="10" y="10" width="180" height="180" rx="18" fill="white" fill-opacity="0.25" stroke="white" stroke-opacity="0.4" stroke-width="1"/>
      <rect x="18" y="18" width="164" height="164" rx="12" fill="white"/>
      <rect class="qr-placeholder" x="25" y="25" width="150" height="150" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'tiktok-style',
    name: 'TikTok Style',
    category: 'social',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 55, width: 150, height: 150 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 235" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="235" rx="20" fill="#010101"/>
      <rect x="10" y="45" width="180" height="180" rx="12" fill="#ffffff"/>
      <!-- TikTok icon(22px) + text(8px) = 30px, start=(45-30)/2=7.5, centered at x=100 -->
      <g transform="translate(85.4, 7.5)">
        <!-- Cyan shadow offset left -->
        <path d="M14.8 0 C14.8 0 15.2 2.6 17 4 C18.8 5.4 21 5.4 21 5.4 L21 9.4 C21 9.4 19 9.2 17.3 8.2 L17.3 15 C17.3 18.7 14.4 21.7 10.7 21.7 C7 21.7 4.1 18.7 4.1 15 C4.1 11.3 7 8.3 10.7 8.3 C10.9 8.3 11.1 8.3 11.3 8.3 L11.3 12.4 C11.1 12.4 10.9 12.3 10.7 12.3 C9.2 12.3 8.1 13.5 8.1 15 C8.1 16.5 9.2 17.7 10.7 17.7 C12.2 17.7 13.3 16.5 13.3 15 L13.3 0 Z" fill="#25F4EE" transform="translate(-1.2, 0.8)"/>
        <!-- Red shadow offset right -->
        <path d="M14.8 0 C14.8 0 15.2 2.6 17 4 C18.8 5.4 21 5.4 21 5.4 L21 9.4 C21 9.4 19 9.2 17.3 8.2 L17.3 15 C17.3 18.7 14.4 21.7 10.7 21.7 C7 21.7 4.1 18.7 4.1 15 C4.1 11.3 7 8.3 10.7 8.3 C10.9 8.3 11.1 8.3 11.3 8.3 L11.3 12.4 C11.1 12.4 10.9 12.3 10.7 12.3 C9.2 12.3 8.1 13.5 8.1 15 C8.1 16.5 9.2 17.7 10.7 17.7 C12.2 17.7 13.3 16.5 13.3 15 L13.3 0 Z" fill="#FE2C55" transform="translate(1.2, 0.8)"/>
        <!-- White main logo -->
        <path d="M14.8 0 C14.8 0 15.2 2.6 17 4 C18.8 5.4 21 5.4 21 5.4 L21 9.4 C21 9.4 19 9.2 17.3 8.2 L17.3 15 C17.3 18.7 14.4 21.7 10.7 21.7 C7 21.7 4.1 18.7 4.1 15 C4.1 11.3 7 8.3 10.7 8.3 C10.9 8.3 11.1 8.3 11.3 8.3 L11.3 12.4 C11.1 12.4 10.9 12.3 10.7 12.3 C9.2 12.3 8.1 13.5 8.1 15 C8.1 16.5 9.2 17.7 10.7 17.7 C12.2 17.7 13.3 16.5 13.3 15 L13.3 0 Z" fill="#FFFFFF"/>
        <!-- Text immediately below icon (icon height=22, text baseline=22+8=30) -->
        <text x="10.7" y="30" text-anchor="middle" fill="#ffffff" font-family="system-ui" font-weight="700" font-size="8">@tiktok</text>
      </g>
      <rect class="qr-placeholder" x="25" y="55" width="150" height="150" fill="#f8f8f8"/>
    </svg>`
  },
  {
    id: 'youtube-style',
    name: 'YouTube Style',
    category: 'social',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 55, width: 150, height: 150 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 235" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="235" rx="16" fill="#FF0000"/>
      <rect x="10" y="45" width="180" height="180" rx="10" fill="white"/>
      <!-- Icon(20px) + text(8px) = 28px, center in 45px header: start=(45-28)/2=8.5 -->
      <g transform="translate(100, 8.5)">
        <!-- YouTube play button icon 36x20 centered at x=0 -->
        <rect x="-18" y="0" width="36" height="20" rx="5" fill="white"/>
        <polygon points="-5,4 -5,16 10,10" fill="#FF0000"/>
        <!-- Text immediately below: baseline = 20 + 8 = 28 -->
        <text x="0" y="28" text-anchor="middle" fill="white" font-family="system-ui" font-weight="700" font-size="8">YouTube</text>
      </g>
      <rect class="qr-placeholder" x="25" y="55" width="150" height="150" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'spotify-style',
    name: 'Spotify Style',
    category: 'social',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 55, width: 150, height: 150 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 235" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="235" rx="16" fill="#1DB954"/>
      <rect x="10" y="45" width="180" height="180" rx="10" fill="white"/>
      <!-- Icon circle(20px diam) + text(8px) = 28px, start=(45-28)/2=8.5 at x=100 -->
      <g transform="translate(100, 8.5)">
        <!-- Spotify: white circle, radius=10 -->
        <circle cx="0" cy="10" r="10" fill="white"/>
        <!-- 3 green Spotify arcs inside the circle -->
        <path d="M-7 7 Q0 3.5 8 6" stroke="#1DB954" stroke-width="1.8" stroke-linecap="round" fill="none"/>
        <path d="M-6 10.5 Q0 7.5 7 9.5" stroke="#1DB954" stroke-width="1.6" stroke-linecap="round" fill="none"/>
        <path d="M-4.5 14 Q0 11.5 5.5 13" stroke="#1DB954" stroke-width="1.4" stroke-linecap="round" fill="none"/>
        <!-- Text immediately below: baseline = 20 + 8 = 28 -->
        <text x="0" y="28" text-anchor="middle" fill="white" font-family="system-ui" font-weight="700" font-size="8">Spotify</text>
      </g>
      <rect class="qr-placeholder" x="25" y="55" width="150" height="150" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'linkedin-style',
    name: 'LinkedIn Style',
    category: 'social',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 55, width: 150, height: 150 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 235" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="235" rx="16" fill="#0A66C2"/>
      <rect x="10" y="45" width="180" height="180" rx="10" fill="white"/>
      <!-- Icon(20px) + text(8px) = 28px, center in 45px: start=(45-28)/2=8.5 at x=100 -->
      <g transform="translate(100, 8.5)">
        <!-- White rounded square 20x20, centered at x=0 -->
        <rect x="-10" y="0" width="20" height="20" rx="4" fill="white"/>
        <!-- LinkedIn blue 'in' mark, scaled to fit 20x20 -->
        <!-- i dot -->
        <circle cx="-5" cy="4.5" r="1.8" fill="#0A66C2"/>
        <!-- i stem -->
        <rect x="-6.5" y="7.5" width="3" height="8" fill="#0A66C2"/>
        <!-- n: left stem -->
        <rect x="-1" y="7.5" width="3" height="8" fill="#0A66C2"/>
        <!-- n: arch + right stem -->
        <path d="M2 10 C2 6.5, 10 6.5, 10 10 L10 15.5 L7 15.5 L7 10.5 C7 9 5 9 5 10.5 L5 15.5 L2 15.5 Z" fill="#0A66C2"/>
        <!-- Text immediately below: baseline = 20 + 8 = 28 -->
        <text x="0" y="28" text-anchor="middle" fill="white" font-family="system-ui" font-weight="700" font-size="8">LinkedIn</text>
      </g>
      <rect class="qr-placeholder" x="25" y="55" width="150" height="150" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    category: 'creative',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 35, width: 150, height: 150 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ff00ff"/>
          <stop offset="100%" style="stop-color:#00ffff"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="220" fill="#0d0d0d"/>
      <polygon points="0,0 200,0 200,15 185,30 15,30 0,15" fill="url(#cyberGrad)"/>
      <polygon points="0,220 200,220 200,205 185,190 15,190 0,205" fill="url(#cyberGrad)"/>
      <line x1="0" y1="30" x2="0" y2="190" stroke="#ff00ff" stroke-width="2"/>
      <line x1="200" y1="30" x2="200" y2="190" stroke="#00ffff" stroke-width="2"/>
      <rect x="10" y="25" width="180" height="170" fill="#1a1a1a"/>
      <rect x="18" y="30" width="164" height="160" rx="4" fill="white"/>
      <text x="100" y="12" text-anchor="middle" fill="#0d0d0d" font-family="monospace" font-weight="900" font-size="10">SCAN_CODE</text>
      <text x="100" y="210" text-anchor="middle" fill="#0d0d0d" font-family="monospace" font-weight="700" font-size="8">ACCESS GRANTED</text>
      <rect class="qr-placeholder" x="25" y="35" width="150" height="150" fill="#f0f0f0"/>
    </svg>`
  },
  {
    id: 'minimal-line',
    name: 'Minimal Line',
    category: 'simple',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 25, width: 150, height: 150 },
    frameColorizable: true,
    svgContent: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="200" fill="white"/>
      <rect x="8" y="8" width="184" height="184" fill="none" stroke="currentColor" stroke-width="1"/>
      <line x1="0" y1="0" x2="20" y2="0" stroke="currentColor" stroke-width="3"/>
      <line x1="0" y1="0" x2="0" y2="20" stroke="currentColor" stroke-width="3"/>
      <line x1="200" y1="0" x2="180" y2="0" stroke="currentColor" stroke-width="3"/>
      <line x1="200" y1="0" x2="200" y2="20" stroke="currentColor" stroke-width="3"/>
      <line x1="0" y1="200" x2="20" y2="200" stroke="currentColor" stroke-width="3"/>
      <line x1="0" y1="200" x2="0" y2="180" stroke="currentColor" stroke-width="3"/>
      <line x1="200" y1="200" x2="180" y2="200" stroke="currentColor" stroke-width="3"/>
      <line x1="200" y1="200" x2="200" y2="180" stroke="currentColor" stroke-width="3"/>
      <rect class="qr-placeholder" x="25" y="25" width="150" height="150" fill="#fafafa"/>
    </svg>`
  },
  {
    id: 'diamond',
    name: 'Diamond',
    category: 'creative',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 50, y: 50, width: 100, height: 100 },
    frameColorizable: true,
    svgContent: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,5 195,100 100,195 5,100" fill="currentColor"/>
      <polygon points="100,18 182,100 100,182 18,100" fill="white"/>
      <rect class="qr-placeholder" x="50" y="50" width="100" height="100" fill="#f5f5f5" transform="rotate(0 100 100)"/>
    </svg>`
  },
  {
    id: 'app-store',
    name: 'App Store',
    category: 'business',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 55, width: 150, height: 150 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="appStoreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#2196F3"/>
          <stop offset="100%" style="stop-color:#1565C0"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="240" rx="20" fill="url(#appStoreGrad)"/>
      <rect x="10" y="45" width="180" height="185" rx="12" fill="white"/>
      <text x="100" y="18" text-anchor="middle" fill="white" font-family="system-ui" font-weight="500" font-size="9">Download on the</text>
      <text x="100" y="35" text-anchor="middle" fill="white" font-family="system-ui" font-weight="700" font-size="14">App Store</text>
      <rect class="qr-placeholder" x="25" y="55" width="150" height="150" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'google-play',
    name: 'Google Play',
    category: 'business',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 55, width: 150, height: 150 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="240" rx="20" fill="#1a1a1a"/>
      <rect x="10" y="45" width="180" height="185" rx="12" fill="white"/>
      <text x="100" y="18" text-anchor="middle" fill="white" font-family="system-ui" font-weight="500" font-size="9">GET IT ON</text>
      <text x="100" y="35" text-anchor="middle" fill="white" font-family="system-ui" font-weight="700" font-size="14">Google Play</text>
      <polygon points="55,12 55,32 70,22" fill="#4CAF50"/>
      <rect class="qr-placeholder" x="25" y="55" width="150" height="150" fill="#f5f5f5"/>
    </svg>`
  },
  // {
  //   id: 'yellow-bow',
  //   name: 'Yellow Bow',
  //   category: 'creative',
  //   isPremium: true,
  //   thumbnail: '',
  //   qrPosition: { x: 25, y: 60, width: 150, height: 150 },
  //   frameColorizable: false,
  //   svgContent: `<svg viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg">
  //     <defs>
  //       <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
  //         <stop offset="0%" style="stop-color:#FDD835"/>
  //         <stop offset="100%" style="stop-color:#F9A825"/>
  //       </linearGradient>
  //     </defs>
  //     <rect x="0" y="0" width="200" height="230" rx="16" fill="url(#yellowGrad)"/>
  //     <rect x="10" y="50" width="180" height="170" rx="10" fill="white"/>
  //     <rect x="15" y="55" width="170" height="4" fill="url(#yellowGrad)"/>
  //     <ellipse cx="60" cy="15" rx="35" ry="12" fill="#1a1a1a"/>
  //     <ellipse cx="140" cy="15" rx="35" ry="12" fill="#1a1a1a"/>
  //     <circle cx="100" cy="15" r="10" fill="#1a1a1a"/>
  //     <rect x="95" y="15" width="10" height="25" fill="#1a1a1a"/>
  //     <text x="100" y="32" text-anchor="middle" fill="white" font-family="system-ui" font-weight="700" font-size="12">SCAN ME</text>
  //     <rect class="qr-placeholder" x="25" y="60" width="150" height="150" fill="#f5f5f5"/>
  //   </svg>`
  // },

  {
    id: 'pink-ribbon',
    name: 'Pink Ribbon',
    category: 'creative',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 30, y: 30, width: 140, height: 140 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#FF80AB"/>
          <stop offset="100%" style="stop-color:#FF4081"/>
        </linearGradient>
      </defs>
      <rect x="15" y="15" width="170" height="170" rx="12" fill="white"/>
      <path d="M0 175 L10 175 L15 190 L10 205 L0 205 L5 190 Z" fill="#1E3A8A"/>
      <path d="M200 175 L190 175 L185 190 L190 205 L200 205 L195 190 Z" fill="#1E3A8A"/>
      <rect x="0" y="175" width="200" height="30" fill="url(#pinkGrad)"/>
      <text x="100" y="196" text-anchor="middle" fill="#1a1a1a" font-family="system-ui" font-weight="700" font-size="14">SCAN ME</text>
      <rect class="qr-placeholder" x="30" y="30" width="140" height="140" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'blue-script',
    name: 'Blue Script',
    category: 'creative',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 30, y: 20, width: 140, height: 140 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blueScriptGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2196F3"/>
          <stop offset="100%" style="stop-color:#1976D2"/>
        </linearGradient>
      </defs>
      <rect x="15" y="10" width="170" height="160" rx="12" fill="white"/>
      <path d="M20 180 Q30 175, 35 185" stroke="url(#blueScriptGrad)" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M35 185 L40 180 L35 187 L30 185 Z" fill="url(#blueScriptGrad)"/>
      <text x="70" y="205" text-anchor="start" fill="url(#blueScriptGrad)" font-family="'Brush Script MT', cursive" font-style="italic" font-size="32">Scan me</text>
      <rect class="qr-placeholder" x="30" y="20" width="140" height="140" fill="#f5f5f5"/>
    </svg>`
  },
  {
    id: 'cyan-speech',
    name: 'Cyan Speech Bubble',
    category: 'social',
    isPremium: true,
    thumbnail: '',
    qrPosition: { x: 25, y: 60, width: 150, height: 150 },
    frameColorizable: false,
    svgContent: `<svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cyanSpeechGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#00E5FF"/>
          <stop offset="100%" style="stop-color:#00B8D4"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="40" rx="10" fill="url(#cyanSpeechGrad)"/>
      <text x="100" y="26" text-anchor="middle" fill="white" font-family="system-ui" font-weight="700" font-size="14">SCAN ME</text>
      <rect x="10" y="50" width="180" height="180" rx="12" fill="none" stroke="url(#cyanSpeechGrad)" stroke-width="4"/>
      <rect x="15" y="55" width="170" height="170" rx="8" fill="white"/>
      <rect class="qr-placeholder" x="25" y="60" width="150" height="150" fill="#f5f5f5"/>
    </svg>`
  }
];

export const colorPresets = [
  { name: 'Classic Black', value: '#000000' },
  { name: 'Deep Navy', value: '#1a365d' },
  { name: 'Royal Purple', value: '#6b21a8' },
  { name: 'Forest Green', value: '#166534' },
  { name: 'Crimson Red', value: '#b91c1c' },
  { name: 'Ocean Blue', value: '#0369a1' },
  { name: 'Sunset Orange', value: '#c2410c' },
  { name: 'Rose Pink', value: '#be185d' },
];

export const frameColorPresets = [
  { name: 'Electric Purple', value: '#7c3aed' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Coral', value: '#f97316' },
  { name: 'Sky Blue', value: '#0ea5e9' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Hot Pink', value: '#ec4899' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Slate', value: '#475569' },
];
