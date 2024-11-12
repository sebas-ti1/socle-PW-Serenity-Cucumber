import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { configure, Cast } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import * as playwright from 'playwright';
import { convertJsonToXml, saveXmlToFile } from '../../utils/json-util';
import { devices } from '@playwright/test';
import * as path from 'path';

const environment = process.env.ENV || 'DEV';
const browserType = process.env.BROWSER || 'chromium';
const deviceType = process.env.DEVICE || 'desktop';

const config = {
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
}[environment];

// Définir les projets pour les navigateurs et les appareils
export const projects = [
    {
        name: 'chromium',
        use: { ...config, browserName: 'chromium' },
    },
    {
        name: 'firefox',
        use: { ...config, browserName: 'firefox' },
    },
    {
        name: 'webkit',
        use: { ...config, browserName: 'webkit' },
    },
    {
        name: 'Pixel 5',
        use: { ...config, ...devices['Pixel 5'] },
    },
    {
        name: 'iPhone 12',
        use: { ...config, ...devices['iPhone 12'] },
    },
];

if (!config) {
    throw new Error(`Configuration introuvable pour l'environnement: ${environment}`);
}

let browser: playwright.Browser;
let context: playwright.BrowserContext;

// Fonction de conversion JSON → XML
async function convertAndSaveJsonToXml() {
    try {
        const xmlData = await convertJsonToXml(path.resolve(__dirname, './data/JSON/DATA_Client_BRU.json'), 'rootElement');
        await saveXmlToFile(path.resolve(__dirname, './data/JSON/output.xml'), xmlData);
        console.log('Conversion JSON en XML réussie et fichier sauvegardé sous output.xml');
    } catch (error) {
        console.error('Erreur lors de la conversion ou de la sauvegarde:', error);
    }
}

// Avant tous les tests, configurer le navigateur et Serenity/JS
BeforeAll(async () => {
    const launchOptions: playwright.LaunchOptions = { headless: environment !== 'DEV' };
    browser = await (playwright as any)[browserType]?.launch(launchOptions);

    // Configurer le contexte avec des options de l'appareil (mobile ou desktop)
    const contextOptions = {
        baseURL: config.baseURL,
        viewport: { width: 1600, height: 1200 }, // Par défaut pour desktop
        defaultNavigationTimeout: 30_000,
        defaultTimeout: 10_000,
        ...(deviceType !== 'desktop' ? devices[deviceType] : {}), // Si un appareil mobile est spécifié, appliquer les options de cet appareil
    };

    // Passer `browser` à Serenity/JS, puis utiliser `context` pour ouvrir des pages avec des paramètres spécifiques
    configure({
        actors: Cast.where(actor =>
            actor.whoCan(BrowseTheWebWithPlaywright.using(browser, contextOptions))
        ),
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            ['@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' }],
            ['@serenity-js/web:Photographer', { strategy: 'TakePhotosOfInteractions' }],
        ],
    });
});

// // Exemple de fonction pour ouvrir une page dans le contexte configuré
// async function openPageWithContext(url: string) {
//     const page = await context.newPage();
//     await page.goto(url);
//     return page;
// }

// Après tous les tests, fermer le navigateur et effectuer la conversion JSON → XML
AfterAll(async () => {
    await browser?.close();
    await convertAndSaveJsonToXml();
});

