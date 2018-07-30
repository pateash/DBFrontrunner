
import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:7777';

Vue.use(Vuex);


const state={
    user:{
        loggedIn:false,
        id:'',
        name:'',
        password:''
    },
    message:"hello"
};

const getters={
    isLoggedIn(state) {
        return state.user.loggedIn;
    },
    getUser(state){
        return state.user;
    }
};


const actions={
    logIn({commit},{id,password}){
        axios.post("/users/login",{
            'id':id,'password':password
        })
            .then((response)=>{
                console.log(response.data);
                commit('logIn',response.data);
                return true;//successfully logged in
            })
            .catch((response)=>{
                console.error(response);
                return false; //can't logIn
            });
    },
    logOut({commit}){
        commit('logOut');
        return true;
    }
};

const mutations={
    logIn(state,payload){
        //loggedIn: true, will override
        state.user=Object.assign({},state.user,payload.data,{'loggedIn':true});
        console.log("state updated");
    },
    logOut(state){
        state.user=Object.assign({},{
            loggedIn:false,
            id:'',
            name:'',
            password:''
        });
        console.log("logged Out successfully");
    }
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
});

