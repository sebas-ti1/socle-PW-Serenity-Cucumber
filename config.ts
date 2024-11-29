// config.shared.ts
import { devices } from '@playwright/test';

const environment = process.env.ENV || 'DEV';
const browserType = process.env.BROWSER || 'chromium';
const deviceType = process.env.DEVICE || 'desktop';
const slowMo = process.env.SLOWMO ? parseInt(process.env.SLOWMO, 10) : 0;

const environments = {
  DEV: {
    baseURL: 'https://dev.example.com',
    apiURL: 'https://api.dev.example.com',
    authURL: 'https://auth.dev.example.com',
  },
  QA: {
    baseURL: 'https://qa.example.com',
    apiURL: 'https://api.qa.example.com',
    authURL: 'https://auth.qa.example.com',
  },
  PROD: {
    baseURL: 'https://prod.example.com',
    apiURL: 'https://api.prod.example.com',
    authURL: 'https://auth.prod.example.com',
  },
};

const config = environments[environment];

if (!config) {
  throw new Error(`Configuration introuvable pour l'environnement : ${environment}`);
}

// Définir les options pour les navigateurs et appareils
const browserOptions = {
    chromium: { browserName: 'chromium', ...devices['Desktop Chrome'] },
    firefox: { browserName: 'firefox', ...devices['Desktop Firefox'] },
    webkit: { browserName: 'webkit', ...devices['Desktop Safari'] },
  };
  
  const deviceOptions = {
    desktop: { viewport: { width: 1600, height: 1200 } },
    'Pixel 5': devices['Pixel 5'],
    'iPhone 12': devices['iPhone 12'],
  }[deviceType] || { viewport: { width: 1600, height: 1200 } }; // Défaut: desktop
  
  export const sharedConfig = {
    ...config,
    environment,
    browserType,
    deviceType,
    deviceOptions,
    slowMo,
    browserOptions: browserOptions[browserType], // Obtenez les options du navigateur spécifié
  };
