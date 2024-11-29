import { Ensure, equals } from '@serenity-js/assertions';
import { describe, it } from '@serenity-js/playwright-test';

import { DashboardPage, DismissCookiesIfPresent } from '../pageObjects/DashboardPage';
import { Navigate, PageElements, By, Click ,isSelected, Enter,Press,Key, isVisible } from '@serenity-js/web'
import { Wait,Check } from '@serenity-js/core'
import { AgencePage } from '../pageObjects/AgencePage';
import { NousContacterPage } from '../pageObjects/NousContacterPage';
import { getValueFromJson } from '../utils/json-util';
import {BaseTest} from '../pageObjects/BaseTest/BaseTest'


describe('Affichage EA', () => {

    describe('Dashboard Thelem', () => {

        it('Trouver une agence', async ({ actorCalled }) => {
            // Récupérer les données depuis le fichier JSON
            const username = await getValueFromJson('JSON/DATA_Client_BRU.json', 'username');
            const password = await getValueFromJson('JSON/DATA_Client_BRU.json', 'password');
            console.log("Extraction du nom :"+username);
            console.log("Extraction du nom :"+password);
            // You can use API interactions to manage test data, or to ensure services are up and running before performing any UI checks.
            // Since Serenity/JS demo app is deployed to GitHub Pages, before interacting with the website we ensure that GitHub is up and running.
            await actorCalled('Alice').attemptsTo(
                await DashboardPage.open(),
                Wait.until(DashboardPage.CookieConsentBanner, isVisible()),
                Check.whether(DashboardPage.CookieConsentBanner, isVisible())
                .andIfSo(
                  Click.on(DashboardPage.AcceptNecessaryCookies),
                ),
                Click.on(DashboardPage.trouverUneAgence()),
                ...BaseTest.renseignerUnInput("Votre code postal ou département","33000"),
                Click.on(DashboardPage.resultatRechercher),
                Wait.until(DashboardPage.resultatNombre, isVisible()),
                //Wait.until(DashboardPage.resultatListe, isVisible()),
                Click.on(DashboardPage.resultatListe),
                Click.on(AgencePage.boutonContact),
                Wait.until(NousContacterPage.titreContact, isVisible()),
            );

        });
    });
});
