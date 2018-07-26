

import Vue from 'vue'

import VueRouter from "vue-router";

Vue.use(VueRouter);

const Login = () => import('@/components/Login');
const ComplianceLogin = () => import('@/components/ComplianceLogin');
// const NotFound = () => import('@/components/404');

export default new VueRouter({
    mode: 'history',
    routes: [

// TRADERS ROUTES
        {
            path: '/login',
            component: Login,
        },


        //redirecting home
        {
            path: '/',
            redirect:'/login'
        },


// COMPLIANCE ROUTES
        {
            path: '/compliance/login',
            component: ComplianceLogin,
        },

        //redirecting home
        {
            path: '/compliance',
            redirect:'/compliance/login'
        },

        // {
        //     path: '*',
        //     component: NotFound,
        // }
    ]
});
