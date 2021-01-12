import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDos_M1ETFcDfg29niKUNJX7oKB0Ehh6FE",
    authDomain: "mylocationtracker-b3a0d.firebaseapp.com",
    databaseURL: "https://mylocationtracker-b3a0d-default-rtdb.firebaseio.com",
    projectId: "mylocationtracker-b3a0d",
    storageBucket: "mylocationtracker-b3a0d.appspot.com",
    messagingSenderId: "283988275934",
    appId: "1:283988275934:web:c94450541d0fd6f926884f",
    measurementId: "G-57Y2CV5T9Y"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log("Firebase Inititalized\n");

Vue.config.productionTip = false

let app: any;
firebase.auth().onAuthStateChanged((user) => {
  //console.log(user);
  if (!app) {
      app = new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app')
  } 
});
