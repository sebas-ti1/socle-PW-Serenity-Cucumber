import { Navigate, PageElement, By, Click,Enter, Hover, Key, Press,isVisible } from '@serenity-js/web'
import { Answerable, Check, d, Task, Wait } from '@serenity-js/core';
import { contain, Ensure,equals } from '@serenity-js/assertions';

export class DashboardPage {
    static password = PageElement.located(By.css('.todo-list li'))
    static inputChercherAgence = PageElement.located(By.css('#city'))
    static boutonRechercher = PageElement.located(By.css('#storelocatorSearch'))
    static resultatRechercher = PageElement.located(By.css('.pac-matched'))
    static resultatNombre = PageElement.located(By.xpath("//span[contains(text(),'Nous avons trouvé') and @class='agences__content__number']"))
    static resultatListe = PageElement.located(By.xpath("//*[contains(text(),'BORDEAUX') and @class='agences__list__city']"))
    static CookieConsentBanner = PageElement.located(By.css('.didomi-continue-without-agreeing'))
    static AcceptNecessaryCookies = PageElement.located(By.xpath('//span[contains(text(),"Continuer sans accepter")]'))


    static async open() {
        return Navigate.to('https://www.thelem-assurances.fr/');
    }

    static trouverUneAgence = () =>
        PageElement.located(By.css('.header__location'));

}

export const DismissCookiesIfPresent = () =>
    Task.where(`#actor ferme la popin de cookies si elle est présente`,
        Check.whether(PageElement.located(By.css('.cookie-popup-selector')).describedAs('cookie popin'), isVisible())
            .andIfSo(
                Click.on(PageElement.located(By.css('.cookie-popup-dismiss-button')).describedAs('bouton de fermeture des cookies'))
            )
    );

module.exports = {DashboardPage};

