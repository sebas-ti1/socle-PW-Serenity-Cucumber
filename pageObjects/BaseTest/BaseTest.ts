import { Navigate, PageElement, By, Click,Enter, Hover, Key, Press,isVisible, Scroll } from '@serenity-js/web'
import { Answerable, Check, d, Task, Wait } from '@serenity-js/core';
import { contain, Ensure,equals } from '@serenity-js/assertions';
import {XpathBuilder} from './XpathBuilder'

export class BaseTest {
    static renseignerUnInput(label: string, valeur: string) {
        const element = PageElement.located(By.xpath(XpathBuilder.getXpathInput(label)));
         return [ 
            Scroll.to(element),
            Enter.theValue(valeur).
            into(element),
        ];
     }
}

module.exports = {BaseTest};

