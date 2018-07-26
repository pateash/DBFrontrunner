

import Vue from 'vue'

import VueRouter from "vue-router";

Vue.use(VueRouter);

const Login = () => import('@/components/Login');
const NotFound = () => import('@/components/404');

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            component: Login,
        },


        //redirecting home
        {
            path: '/',
            redirect:'/login'
        },

        // {
        //     path: '*',
        //     component: NotFound,
        // }
    ]
});
