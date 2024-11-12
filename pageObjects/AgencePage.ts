import { Navigate, PageElement, By, Click,Enter, Hover, Key, Press } from '@serenity-js/web'
import { Answerable, Check, d, Task, Wait } from '@serenity-js/core';
import { contain, Ensure,equals } from '@serenity-js/assertions';

export class AgencePage {


    static boutonContact = PageElement.located(By.xpath("//a[contains(text(),'Contact')]"))



    
}


module.exports = {AgencePage};

