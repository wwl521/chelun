import Vue from 'vue';
import Vuex from 'vuex';

import app from './module/app';
import detail from './module/detail';
import inquriy from './module/inquriy';
import img from './module/img';
import color from './module/color';
import type from './module/type';

Vue.use(Vuex);
export default new Vuex.Store({
    state:{
        loading:true
    },
    mutations:{
        changeLoading(state, payload){
            state.loading = payload;
        }
    },
    modules: {
        app,
        detail,
        inquriy,
        img,
        color,
        type
    }
});