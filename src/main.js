import Vue from 'vue'
import App from './App.vue'

import notification from './services/notification';


//for making it global to use
window.notification=notification;

import router from "./router";
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Hero from './components/Hero';

Vue.use(Buefy);
import store from "./store";

//so that we could use it everywhere inside our project

Vue.use(Hero);

Vue.config.productionTip = false

new Vue({
    el:"#app",
    render: h => h(App),
    router,
    store
});