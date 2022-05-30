# SynchronoTechExam

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.1.

## Basic Setup

```
$ git clone https://github.com/twetesaturday/syntechexam.git 
$ cd to clone repo
$ npm i or npm install
$ ng serve --open or npm start
```
Then, navigate to `http://localhost:4200/`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
You may also run `npm start`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Features check

1. Listed 28 questions
2. With basic form validators and custom error messages.
3. Mat Chip Input List will not accept duplicate values.
4. Autocomplete feature on one of the questions (`City`)
5. Parent-Child question relationship (Subquestions and Custom Answers) can be found on the ff:
* `GOALS` > `Which areas of your health are you looking to improve?` (A radio question should appear after selection of `Heart` value)
* `DIET` > `Are you allergic to any of the following?` (A Mat Chip Input should appear after selection of `Others` value)
6. JSON data can be found under `assets/`. Getters stores under `form-service`
7. Results printed under `RECOMMENDATIONS` panel.
