// json-util.ts
import * as fs from 'fs';
import path from 'path';
import { create } from 'xmlbuilder2';


// Fonction pour lire les données JSON
export async function readTestData(filename: string) {
    const dataPath = path.resolve(__dirname, filename);
    const data = await fs.promises.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
}

// Fonction pour écrire les données JSON
export async function writeTestData(filename: string, newData: any) {
    const dataPath = path.resolve(__dirname, filename);
    const dataString = JSON.stringify(newData, null, 2);
    await fs.promises.writeFile(dataPath, dataString, 'utf-8');
}

// Fonction pour lire un fichier JSON et récupérer une clé spécifique
export async function getValueFromJson(filename: string, key: string) {
    const dataPath = path.resolve(__dirname, '../data', filename);
    const data = await fs.promises.readFile(dataPath, 'utf-8');
    const jsonData = JSON.parse(data);
    return jsonData[key]; // Retourne la valeur associée à la clé spécifiée
}

/**
 * Convertit un fichier JSON en XML
 * @param jsonNomClient Nom du client
 * @param rootElement Nom de l'élément racine XML
 * @returns Le contenu XML sous forme de chaîne
 */
export async function convertJsonToXml(jsonNomClient: string, rootElement: string): Promise<string> {
    try {
        // Lire et parser le fichier JSON
        const jsonFileContent = await fs.promises.readFile(path.resolve(__dirname, '../data/JSON/DATA_'+jsonNomClient+'.json'), 'utf-8');
        const jsonData = JSON.parse(jsonFileContent);

        // Crée le document XML avec xmlbuilder2
        const xmlData = create({ version: '1.0' })
            .ele(rootElement)
            .ele(jsonData)
            .end({ prettyPrint: true });

        return xmlData;
    } catch (error) {
        console.error('Erreur lors de la conversion JSON en XML:', error);
        throw error;
    }
}

/**
 * Sauvegarde le contenu XML dans un fichier
 * @param xmlNomClient Nom du client
 * @param xmlContent Contenu XML
 */
export async function saveXmlToFile(xmlNomClient: string, xmlContent: string): Promise<void> {
    try {
        await fs.promises.writeFile(path.resolve(__dirname, '../data/XML/DATA_'+xmlNomClient+'.xml'), xmlContent, 'utf-8');
        console.log(`Fichier XML sauvegardé sous ${xmlNomClient}`);
    } catch (error) {
        console.error('Erreur lors de la sauvegarde du fichier XML:', error);
        throw error;
    }
}