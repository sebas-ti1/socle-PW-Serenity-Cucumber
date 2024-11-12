import { When, Then, Given } from '@cucumber/cucumber'
import { Ensure, equals } from '@serenity-js/assertions'
import { Actor } from '@serenity-js/core'
import { Navigate, PageElements, By } from '@serenity-js/web'


Given('{string} opens the todo app for the first', async (client: String) => {
    console.log(`Client identifié: ${client}`);
})

Given('{pronoun} todo list should be', async (actor: Actor) => {
    const displayedItems = () =>
        PageElements.located(By.css('.todo-list li'))
            .describedAs('displayed items')

    await actor.attemptsTo(
        Ensure.that(displayedItems().count(), equals(0))
    )
})

When('il fait ca', async () => {
        console.log('QUAND je fais ça');
})

Then('on a ça', async () => {
    console.log('ALORS on ça');
})