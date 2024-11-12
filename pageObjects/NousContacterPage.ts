import { Navigate, PageElement, By, Click,Enter, Hover, Key, Press } from '@serenity-js/web'
import { Answerable, Check, d, Task, Wait } from '@serenity-js/core';
import { contain, Ensure,equals } from '@serenity-js/assertions';

export class NousContacterPage {

    static titreContact = PageElement.located(By.xpath("//h1[contains(text(),'Nous contacter')]"))



    
}


module.exports = {NousContacterPage};

