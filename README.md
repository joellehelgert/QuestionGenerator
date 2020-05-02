# HUXE2020 - QuestionsGenerator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.
The deployed project can be found [here](https://kinectquiz-questiongenerator.netlify.app/)

## Team Members
Julia Gruber - S1910629004  
Joelle Helgert - S1910629006  
Anna Moser - S1910629007

## TODOS (remove before submission)
- [ ] update access rules in firebase (possible after authentication is done)
- [ ] check database structure
- [ ] maybe remove Crud service part of README
- [ ] remove or update authentication part of README
- [ ] Consider handling/db structure for questions of different types

## Project Idea
First of all the *Question Generator* shall be a supporting project of our term project, since we need questions to make a quiz game out of it. 

The users shall be able to log in into the application and add questions to their game.
They can have one or more questionnaires and each of the questionnaire can have a different set of questions.
The game supports different types of questions which need different input. For example there can be questions for a hiding game and for a buzzer-game. 
The hiding game would need one wrong answer and the buzzer game only one right answer.

For one question the user shall add at least 4 answers. For each answer they can also upload an image which can be used in the game instead of the text on it's own.

The questions then should be saved in a CMS.

## Backend
For this project the [Firebase]() is used as headless CMS. This system was choosen because it allows an easy intgration to an angular project with the [@angular/fire](https://github.com/angular/angularfire) library and on the other side provides a lot of documentation on how to integrate the database into (Desktop)-Unity projects. This is important since the purpose of the whole application is to provide a GUI for the [Kinect-Quiz]() to manage the questionaires.

### CRUD Service
The CRUD Service provides the basic interaction with the database (create, read, update and delete). It is implemented in a Generic way, so that every Service can use it. It needs to be initialized in the constructor of a service and can than be used to implement a corresponding service. At the moment no fixed database structure is provided. It is structured so that every questionaire has its own document with belonging questions, museum and the question itself stores the answers. In order to manage the questionaires and questions the "QuestionaireService" is provided. In order to manage the questions Answers the "QuestionService" is provided. Renaming is considered but maybe it should only be one service that manages all other services? #moreInputNeeded #DiscussionTime.

## Authentication
At the moment the firebase ruleset is enabled to allow *everyone* access to the database. This *needs* to be changed as soon as the authentication is implemented. For the authentication Firestore also provides functionality. Please check out [firebase.auth](https://firebase.google.com/docs/reference/js/firebase.auth?authuser=0)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
