import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store'

// import Index from '@/views/Index';
// import Detail from '@/views/Detail';
// import Img from '@/views/Img';

const Index = () => import('@/views/Index');
const Detail = () => import('@/views/Detail');
const Img = () => import('@/views/Img');
const Inquriy = () => import('@/views/Inquriy');
const Color = () => import('@/views/Color');
const Type = () => import('@/views/Type');

Vue.use(VueRouter);
let router = new VueRouter({
    routes: [{
        path: '/index',
        name: 'index',
        component: Index
    }, {
        path: '/detail',
        name: 'detail',
        component: Detail
    }, {
        path: '/img',
        name: 'img',
        component: Img
    }, {
        path: '/inquriy',
        name: 'inquriy',
        component: Inquriy
    }, {
        path: '/color',
        name: 'color',
        component: Color
    }, {
        path: '/type',
        name: 'type',
        component: Type
    },{
        path: '*',
        redirect: '/index'
    }]
});

router.beforeEach((to, from, next)=>{
    store.commit('changeLoading', true);
    next();
});
router.afterEach((to, from)=>{
    store.commit('changeLoading',false);
});

export default router;