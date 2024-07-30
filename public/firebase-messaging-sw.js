// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyB8MVrzzYxBgENxjqsFL25saH6jfuMeLKg",
    authDomain: "bakery-24d0f.firebaseapp.com",
    projectId: "bakery-24d0f",
    storageBucket: "bakery-24d0f.appspot.com",
    messagingSenderId: "9227892579",
    appId: "1:9227892579:web:e99fbb7cfc006bd8c78556",
    measurementId: "G-DPD3TZG59K"
});  
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();