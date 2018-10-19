import {getColorList} from '@/api/index';
const state = {
    yearList:[],
    colorList:{},
    currentKey:""
}
const getters = {

}
const mutations = {
    updateColorList(state, payload){
        state.colorList = payload.data;
        let arr = [];
        for(let i in payload.data){
            arr.push(i);
        }
        state.yearList = arr;
        state.currentKey = arr[0];
    },
    updateYear(state, payload){
        state.currentKey = payload;
    }
}
const actions = {
    getColorList({commit}, payload){
        getColorList(payload).then(res=>{
            console.log('res...',res);
            commit('updateColorList',res);
        })
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}