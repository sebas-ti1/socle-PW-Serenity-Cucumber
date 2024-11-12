import { BeforeAll, AfterAll } from '@cucumber/cucumber'
import { configure, Cast } from '@serenity-js/core'
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright'
import { convertJsonToXml, saveXmlToFile } from '../../utils/json-util'


import * as playwright from 'playwright'

let browser: playwright.Browser;


async function convertAndSaveJsonToXml() {
    try {
        const xmlData = await convertJsonToXml('./data/JSON/DATA_Client_BRU.json', 'rootElement');
        await saveXmlToFile('output.xml', xmlData);
        console.log('Conversion JSON en XML réussie et fichier sauvegardé sous output.xml');
    } catch (error) {
        console.error('Erreur lors de la conversion ou de la sauvegarde:', error);
    }
}

BeforeAll(async () => {
    // Launch the browser once before all the tests
    // Serenity/JS will take care of managing Playwright browser context and browser tabs.
    browser = await playwright.chromium.launch({
        headless: true,
    });

    // Configure Serenity/JS
    configure({
        actors: Cast.where(actor =>
            actor.whoCan(BrowseTheWebWithPlaywright.using(browser, {
                baseURL: 'https://todo-app.serenity-js.org/',
            }))
        ),
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            [ '@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' } ],
            // ... any other reporting services
            [ '@serenity-js/web:Photographer', { strategy: 'TakePhotosOfInteractions' }],

        ],
    })
})

AfterAll(async () => {
    // Fermez le navigateur après tous les tests
    await browser?.close();
    
    // Effectuez la conversion JSON → XML
    await convertAndSaveJsonToXml();
})