
import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:7777';

Vue.use(Vuex);


import createPersistedState from "vuex-persistedstate";


const state={
    user:{
        loggedIn:false,
        id:'',
        name:'',
        password:'',
        orders:[],
        securities:[]
    },
    admin:{
        loggedIn:false,
        id:'',
        name:'',
        password:''
    },
};

const getters={
    isLoggedIn(state) {
        return state.user.loggedIn;
    },
    getUser(state){
        return state.user;
    },
    isAdminLoggedIn(state) {
        return state.admin.loggedIn;
    },
    getAdmin(state){
        return state.admin;
    },
};


const actions= {
    logIn({commit}, {id, password}) {
        return new Promise((resolve, reject) => {
            axios.post("/users/login", {
                'id': id, 'password': password
            })
                .then((response) => {
                    commit('logIn', response.data);
                    return resolve(response.data);//successfully logged in
                })
                .catch((error) => {
                    console.error(error);
                    return reject(error); //can't logIn
                });
        })
    },
    logOut({commit}) {
        commit('logOut');
        return true;
    },
    adminLogIn({commit}, {id, password}) {
        return new Promise((resolve, reject) => {
            axios.post("/admin/login", {
                'id': id, 'password': password
            })
                .then((response) => {
                    commit('adminLogIn', response.data);
                    return resolve(response.data);//successfully logged in
                })
                .catch((error) => {
                    console.error(error);
                    return reject(error); //can't logIn
                });
        })
    },
    adminLogOut({commit}) {
        commit('adminLogOut');
        return true;
    },

// order related functions
    getOrders({commit}, {id}) {
        return new Promise((resolve, reject) => {
            axios.post("/users/orders", {
                'brokerid': id,
            })
                .then((response) => {
                    // console.log(response.data);
                    commit("updateOrders", response.data);
                    return resolve(response.data);//successfully logged in
                })
                .catch((error) => {
                    return reject(error); //can't get orders
                });
        });
    },

    //security related functions
    getSecurities({commit}, {id}) {
        return new Promise((resolve, reject) => {
            axios.post("/users/securities", {
                'brokerid': id,
            })
                .then((response) => {
                    console.log(response.data);
                    commit("updateSecurities", response.data);
                    return resolve(response.data);//successfully logged in
                })
                .catch((error) => {
                    return reject(error); //can't get orders
                });
        });
    }

};

const mutations={
    logIn(state,payload){
        //loggedIn: true, will override
        state.user=Object.assign({},state.user,payload.data,{'loggedIn':true});
        console.log("loggedin! state updated");
    },
    logOut(state){
        state.user=Object.assign({},{
            loggedIn:false,
            id:'',
            name:'',
            password:''
        });
        console.log("logged Out successfully");
    },
    adminLogIn(state,payload){
        //loggedIn: true, will override
        state.admin=Object.assign({},state.admin,payload.data,{'loggedIn':true});
        console.log("loggedin! state updated");
    },
    adminLogOut(state){
        state.admin=Object.assign({},{
            loggedIn:false,
            id:'',
            name:'',
            password:''
        });
        console.log("logged Out successfully");
    },

    updateOrders(state,payload){
        state.user.orders=Object.assign({},state.user.orders,payload);
    },
    updateSecurities(state,payload){
        state.user.securitiess=Object.assign({},state.user.securities,payload);
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: [createPersistedState()]

});

