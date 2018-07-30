

const state={
    loggedIn:false,
    userId:'',
    name:'',

};

const getters={
    isLoggedIn(){
        return this.state.loggedIn;
    },
    getUserId(){
        return this.state.userId;
    },

    getName(){
        return this.state.name;
    }

};

const actions={
    loggedIn({commit}){
        commit("loggedIn",{})
    }
};

const mutations={
    loggedIn(){
        this.state.loggedIn=true;
    }

};

export default {
    state,
    getters,
    actions,
    mutations,
}