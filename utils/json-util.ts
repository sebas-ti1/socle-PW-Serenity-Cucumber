// json-util.ts
import * as fs from 'fs';
import path from 'path';
import { create } from 'xmlbuilder2';
import { js2xml } from 'xml-js';  // Assurez-vous d'avoir installé xml-js avec npm install xml-js



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
 * @param jsonFilePath Chemin du fichier JSON
 * @param rootElement Nom de l'élément racine XML
 * @returns Le contenu XML sous forme de chaîne
 */
export async function convertJsonToXml(jsonFilePath: string, rootElement: string): Promise<string> {
    try {
        // Lire et parser le fichier JSON
        const jsonFileContent = await fs.promises.readFile(path.resolve(jsonFilePath), 'utf-8');
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
 * @param xmlFilePath Chemin du fichier XML
 * @param xmlContent Contenu XML
 */
export async function saveXmlToFile(xmlFilePath: string, xmlContent: string): Promise<void> {
    try {
        await fs.promises.writeFile(path.resolve(xmlFilePath), xmlContent, 'utf-8');
        console.log(`Fichier XML sauvegardé sous ${xmlFilePath}`);
    } catch (error) {
        console.error('Erreur lors de la sauvegarde du fichier XML:', error);
        throw error;
    }
}