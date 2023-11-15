Open console on backendDeliveryApp folder and write "npm install"
Read .env.example
Read serviceAccountKey.example

#TO GENERATE A KEY IN FIREBASE
To generate this file you must create a storage in Firebase.
Once created, go to "Service Accounts" and click "SDK of Firebase Admin ".
Then we click on the node.js option and generate a new key. That file
must be placed in the root folder of our Backend and renamed "serviceAccount.json"

#TO ENABLE GOOGLE MAPS
To link the map APIs to your project, you need to go to Google Cloud (https://console.cloud.google.com/) and log in with your Gmail account. Generate a new project, click it and go to "API and services enabled". Within this screen enable "SDK maps for Android" and "SDK maps for IOS"
