import { When, Then } from '@cucumber/cucumber'
import { Ensure, equals } from '@serenity-js/assertions'
import { Actor } from '@serenity-js/core'
import { Navigate, PageElements, By } from '@serenity-js/web'

When('{actor} opens the todo app for the first time', async (actor: Actor) => {
    await actor.attemptsTo(
        Navigate.to('https://todo-app.serenity-js.org/')
    )
})

Then('{pronoun} todo list should be empty', async (actor: Actor) => {
    const displayedItems = () =>
        PageElements.located(By.css('.todo-list li'))
            .describedAs('displayed items')

    await actor.attemptsTo(
        Ensure.that(displayedItems().count(), equals(0))
    )
})