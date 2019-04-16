## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. Use `--open` flag to see the result directly on auto-opened default browser.


## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Intro
This app retrieves reshaped data from a JSON file through rxjs subject as observable from a shared service.
App works in two way: serve and test.
serve: the real application of "sales taxes problem" as instruction
       (https://github.com/xpeppers/sales-taxes-problem), run "ng serve".
       In this case you can achieve automatic data just one time because the subject will go in completed after emitted. There are no logs in console, no hard-coded snippets here, this is the completed project.
test : tested application of real application with a button to randomize new elaborated data, run "ng test".
       In this case there're some check-controls of output data from service, DOM examples checks, with logs in console (each time you click on the button), on testing mode there is no "complete" status of subject, you can try click on the button more more more times and the app will go.
       On "src/app/models/app.config.ts" you can find every test runned on the entire project, i know tests are few but needful, i choose to put it there 'cause it's automated and if written in the same format will produce a success result.

ManageDataService built to work both in serve and testing mode, don't be scare if you see "serve" or "testing" within this service, if run serve and test on different browser tabs you can see them in action.
Go to /testing dir to see tools for testing, a component and a snippet of code to generate randomize data.
I like focusing settings and configs on a single place in fact in "src/app/models/app.config.ts" you'll find injected object and every kind of re-used and custom settings.

Enjoy my App,
Erik Fontanari
