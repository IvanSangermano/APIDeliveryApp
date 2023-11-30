# DeliveryApp BACK-END

This project focuses on the development of a backend system (API) designed to manage various functions for a gastronomic establishment. The platform integrates key features, including user authentication with registration and login, role assignment, management of categories and products, order tracking and status changes, as well as user address management for route mapping. Security technologies such as JWT, Passport, and Bcrypt are implemented, and communication is established with payment services such as Stripe and Mercado Pago. The database is structured in MySQL, with Firebase used for image storage and management.

## Steps to follow to start the application

### First step
Download the project. Open console on backendDeliveryApp folder and write
```
npm install
```
### Second step
For this step it is necessary to have created a database within MySQL. Once created, open a new SQL tab by copying the code from the **db.sql** file and executing it to create the tables. Then create a file in the root folder called **".env"**, inside this replace the variables with their references explained in the **".env.example"** file

### Third step
Read **"serviceAccountKey.example"** and follow the steps.

### Fourth step
Within the "Config" folder, replace the **"secretorkey"** variables with a random variable generated on any website Internet page (this key has to be conveniently 504bits)

#### TO GENERATE A KEY IN FIREBASE
To generate this file you must create a storage in Firebase.
Once created, go to "Service Accounts" and click "SDK of Firebase Admin ".
Then we click on the node.js option and generate a new key. That file
must be placed in the root folder of our Backend and renamed "serviceAccount.json"

### TO ENABLE GOOGLE MAPS
To link the map APIs to your project, you need to go to Google Cloud (https://console.cloud.google.com/) and log in with your Gmail account. Generate a new project, click it and go to "API and services enabled". Within this screen enable "SDK maps for Android" and "SDK maps for IOS"
