import { Navigate, PageElement, By, Click,Enter, Hover, Key, Press,isVisible } from '@serenity-js/web'
import { Answerable, Check, d, Task, Wait } from '@serenity-js/core';
import { contain, Ensure,equals } from '@serenity-js/assertions';

export class BaseTest {
    static renseignerUnInput(element: any, valeur: string) {
         return [ 
            Enter.theValue(valeur).into(element),
        ];
     }
}

module.exports = {BaseTest};

