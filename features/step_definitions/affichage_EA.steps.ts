import { When, Then, Given } from '@cucumber/cucumber'
import { Ensure, equals } from '@serenity-js/assertions'
import { Actor, Wait,Check } from '@serenity-js/core'
import { Navigate, PageElements, By, Click ,isSelected, Enter,Press,Key, isVisible } from '@serenity-js/web'
import { DashboardPage, DismissCookiesIfPresent } from '../../pageObjects/DashboardPage';
import { AgencePage } from '../../pageObjects/AgencePage';
import { NousContacterPage } from '../../pageObjects/NousContacterPage';
import { actorCalled } from '@serenity-js/core';


Given('{actor} se rend sur le site Thelem', { timeout: 30000 },  async (actor: Actor) => {
    console.log(`Client identifié: ${actor}`);
    await actor.attemptsTo(
      await DashboardPage.open(),
      Check.whether(DashboardPage.CookieConsentBanner, isVisible())
      .andIfSo(
        Click.on(DashboardPage.AcceptNecessaryCookies),
      )
  );
})

Given('{pronoun} todo list should be', async (actor: Actor) => {
    const displayedItems = () =>
        PageElements.located(By.css('.todo-list li'))
            .describedAs('displayed items')

    await actor.attemptsTo(
        Ensure.that(displayedItems().count(), equals(0))
    )
})

When('{pronoun} cherche une agence à {string} dans le {string}', { timeout: 30000 }, async (actor: Actor,ville:string,codePostal:string) => {
  console.log(`Client identifié: ${actor}`);
  await actor.attemptsTo(
    Click.on(DashboardPage.trouverUneAgence()),
    Enter.theValue(codePostal).into(DashboardPage.inputChercherAgence),
    Click.on(DashboardPage.resultatRechercher),
    Wait.until(DashboardPage.resultatNombre, isVisible()),
    //Wait.until(DashboardPage.resultatListe, isVisible()),
    Click.on(DashboardPage.resultatListe),
  )

})

When('{pronoun} renseigne le formulaire de contact', { timeout: 30000 }, async (actor: Actor) => {
  console.log(`Client identifié: ${actor}`);
  await actor.attemptsTo(
    Click.on(AgencePage.boutonContact),
    Wait.until(NousContacterPage.titreContact, isVisible()),

  )

})

Then('on a ça', async () => {
    console.log('ALORS on ça');
})