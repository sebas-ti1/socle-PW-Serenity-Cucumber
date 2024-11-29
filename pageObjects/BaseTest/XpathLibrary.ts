export class XpathLibrary{
    static xpathChampInput(texte :string): string[]{
        return[
            `//label[contains(;,"${texte}")]/following::input[1]`,
            `//label[contains(;,"${texte}")]/following::textaera[1]`
        ]
    }
}