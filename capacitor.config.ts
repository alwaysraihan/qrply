import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bizflow.com',
  appName: 'SoloDesk',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    },
    SystemBars: {
      insetsHandling: "css",
      style: "DARK",
      hidden: false,
      animation: "NONE"
    },
    Keyboard: {
      resize: "native",
      style: "DARK",
      resizeOnFullScreen: false
    },
    SafeArea: {
      offsetForKeyboardInsetBug: false
    }
  }
};


export default config;
