

import Vue from 'vue'

import VueRouter from "vue-router";

Vue.use(VueRouter);

const Login = () => import('@/components/User/Login');
const UserDashboard = () => import('@/components/User/Dashboard');
const ComplianceDashboard = () => import('@/components/Admin/Dashboard');
const ComplianceLogin = () => import('@/components/Admin/Login');
const Error404 = () => import('@/components/Error404');

export default new VueRouter({
    mode: 'history',
    routes: [

// TRADERS ROUTES
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/dashboard',
            component: UserDashboard,
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
        {
            path: '/compliance/dashboard',
            component: ComplianceDashboard,
        },

        //redirecting home
        {
            path: '/compliance',
            redirect:'/compliance/login'
        },

        {
            path: '*',
            component: Error404,
        }
    ]
});
