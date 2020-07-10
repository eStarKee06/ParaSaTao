import Vue from 'vue'
import App from './App.vue'
import * as VueFire from 'vuefire'
import * as firebase from 'firebase/app'
import 'firebase/firestore'


Vue.use(VueFire)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

export function db(){
  firebase.initializeApp({
    apiKey: "AIzaSyAruD_gSy37DgMnLgi5cKfsA_l4y-KBYU4",
    authDomain: "parasatao-281916.firebaseapp.com",
    databaseURL: "https://parasatao-281916.firebaseio.com",
    projectId: "parasatao-281916",
    storageBucket: "parasatao-281916.appspot.com",
    messagingSenderId: "294180430896",
    appId: "1:294180430896:web:7af76411490297610979f5",
    measurementId: "G-8FH2C84P6Y"
  });
  return firebase.firestore();
}