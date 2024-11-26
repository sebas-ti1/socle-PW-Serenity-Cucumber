// serenity.config.ts
import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { configure, Cast } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import * as playwright from 'playwright';
import { convertJsonToXml, saveXmlToFile } from '../../utils/json-util';
import { devices } from '@playwright/test';
import { sharedConfig } from '../../config';

let browserInstance: playwright.Browser;

BeforeAll(async () => {
    const launchOptions: playwright.LaunchOptions = { headless: sharedConfig.baseURL !== 'https://dev.example.com' };
    //browserInstance = await (playwright as any)[browser].launch(launchOptions);
    browserInstance = await playwright[sharedConfig.browserType].launch({
        headless: sharedConfig.environment !== 'DEV',
      });
    // const contextOptions = {
    //     baseURL: sharedConfig.baseURL,
    //     viewport: { width: 1600, height: 1200 },
    //     defaultNavigationTimeout: 30_000,
    //     defaultTimeout: 10_000,
    //     ...device,
    // };
    configure({
        actors: Cast.where(actor =>
            actor.whoCan(BrowseTheWebWithPlaywright.using(browserInstance, {
              baseURL: sharedConfig.baseURL,
              ...sharedConfig.deviceOptions,
            })),
          ),
        crew: [
            '@serenity-js/console-reporter',
            '@serenity-js/serenity-bdd',
            ['@serenity-js/core:ArtifactArchiver', { outputDirectory: 'target/site/serenity' }],
            ['@serenity-js/web:Photographer', { strategy: 'TakePhotosOfInteractions' }],
        ],
    });
});

AfterAll(async () => {
    await browserInstance?.close();
    //await convertAndSaveJsonToXml();
});
