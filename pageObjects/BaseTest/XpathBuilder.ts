import { XpathLibrary } from "./XpathLibrary";

export class XpathBuilder{
    private static combineXpaths(xpaths: string[]): string{
        return xpaths.join(' | ');
    }

    static getXpathInput(texte: string): string {
        return XpathBuilder.combineXpaths(XpathLibrary.xpathChampInput(texte));
    }
}