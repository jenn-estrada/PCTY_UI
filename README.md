# PCTY_UI
Angular UI for benefit cost calculator

To get started:

0. You will need to have the latest version of the Angular CLI installed. Read isntructions here: https://angular.io/cli
1. Clone the Repository locally
2. Open a command prompt which has the Angular CLI installed.  Navigate to the base directory.
3. Type 'npm install'.
4. Type 'npm run start'.
5. This site serves on localhost port 4200.  Open a browser and navigate to http://localhost:4200/
6. You will not see any calculation data until you run the GQL back end project first, PCTY_GQL.  
PCTY_GQL serves to localhost port 4000.  This app was designed to have a UI on port 4200 connected to a back end on port 4000.


Known issues:
1. In case of error:
`Schema validation failed with the following errors:
  Data path ".builders['app-shell']" should have required property 'class'.`

You are running an out-of-sync version of build-angular or the cli.  Run the following commands to fix:

npm i --global @angular/cli@latest
npm uninstall @angular-devkit/build-angular
npm install @angular-devkit/build-angular@0.13.0

2.  There is currently a bug when deleting the last dependent from a list of dependents.
