# Serenity/JS Playwright Test Template

En apprendre plus :
- [Serenity BDD reports for this project](https://serenity-js.github.io/serenity-js-playwright-test-template/serenity/)
- [Playwright Test reports for this project](https://serenity-js.github.io/serenity-js-playwright-test-template/playwright/)
- [Serenity/JS website, tutorials, and API docs](https://serenity-js.org/)
- [API Testing with Serenity/JS](https://serenity-js.org/handbook/api-testing/)

## Usage

Le repo GitHub de base se trouve à cette adresse : [create a new GitHub repository](https://help.github.com/en/articles/creating-a-repository-from-a-template), [clone it to your computer](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository).

Vous pouvez le tester à cette adresse sans l'installer sur votre ordinateur :
[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/from-referrer/)

### Installation

Avant de lancer le projet, vous devez avoir sur votre orindateur : 
- Node.js, sur la version 16 ou plus - [download](https://nodejs.org/en/)
- Java Runtime Environment (JRE) ou a Java Development Kit (JDK) version 11 ou plus - [download](https://adoptopenjdk.net/)

Clonez le projet sur votre ordinateur. 
Ouvrez le terminal de votre ordinateur lancer la commande suivante ou vous avez cloné le projet :
```
npm ci
```

### Execution

Une liste de commande pour exécuter les tests :


```
npm run clean           # supprimer les rapports
npm test                # executer l'ensemble des tests
                        # un rapport est généré dans ce dossier ./target/site/serenity
                        # il est visible en ouvrant index.html
npm start               # pour lancer un mini serveur HTTP et visualiser le rappotr playwright
                        # à http://localhost:8080

npm run cucumber        #Lancer tous les rapports sous cucumber
npm run dev_iphone      #Lancer les tests cucumber en DEV sous iPhone
npm run dev_firefox     #lancer les tests cucumber en DEV sous Firefox
```
Ces commandes sont définies dans le fichier package.json, partie Script.

### Structure du framework
```
├── /date
│   ├── /JSON                   # Stockage des fichiers JSON
│   │   ├── Client.json         # Stockage des informations clients
│   │   └── ...                 # Autres fichiers clients
│   ├── /XML                    # Stockage des fichiers XML
│   │   ├── Client.xml          # Converstion des fichiers json
│   └── └── ...                 # Autres fichiers xml
│
├── /features
│   ├── /step_definitions       # Définitions des étapes de Cucumber
│   │   ├── hooks.ts            # Hooks Before/After pour la configuration de l'environnement
│   │   ├── clientSteps.ts      # Exemples de définitions d'étapes spécifiques
│   │   └── ...                 # Autres fichiers d'étapes
│   │
│   ├── /support                # Support pour Cucumber (setup, utilities)
│   │   ├── serenity.config.ts  # Configuration de l'environnement de test Playwright
│   │   └── ...                 # Autres fichiers de support si nécessaire
│   └── client.feature          # Fichiers .feature (scénarios de test en cucumber)
│
├── /pageObjects                # Dossier définir les fonctions
│   ├── DashboardPage.ts        # Fonction utilisé sur une page précise 
│   └── └── ...                 # Autres fonctions liées à d'autres pages
│
├── /target                     # Dossier pour les rapports générés
│
├── playwright.config.ts        # Configuration principale de Playwright
├── cucumber.js                 # Configuration Cucumber (si applicable)
└── package.json                # L'ensemble necessaire à l'installation, et les scripts de lancement des tests
```

### Corporate networks

If your network administrators require you to use proxy servers or an internal artifact registry (Artifactory, Nexus, etc.), your development environment might require some additional configuration.

The easiest way to do it is to create an [`.npmrc` file](https://docs.npmjs.com/cli/v6/configuring-npm/npmrc) in your home directory: 

```
proxy=http://user:password@host.mycompany.com:8080/
https-proxy=http://user:password@host.mycompany.com:8080/
strict-ssl=false
registry=https://artifactory.mycompany.com/artifactory/
```

If you encounter issues downloading the Serenity BDD CLI jar, please follow the [detailed instructions in the Serenity/JS Handbook](https://serenity-js.org/api/serenity-bdd/#downloading-the-serenity-bdd-reporting-cli).
