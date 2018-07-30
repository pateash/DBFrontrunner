import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'


import router from "./router";
import Buefy from 'buefy';
import 'buefy/lib/buefy.css';
import Hero from './components/Hero';
// import axios from "axios";

Vue.use(Buefy);

Vue.use(Vuex);

import store from "./store";

//so that we could use it everywhere inside our project
// window.axios=axios;

Vue.use(Hero);

Vue.config.productionTip = false

new Vue({
    el:"#app",
    render: h => h(App),
    router,
    store
})