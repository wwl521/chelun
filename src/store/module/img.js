import {getImgList,getPicList} from '@/api/index';
const state = {
    imgList:[],   // 初始化的图片列表
    SerialID:"",
    ImageID:"",
    isShow:true,
    Page:1,
    picList:[],  // 展开后的图片列表
    showSwiper:false
}
const getters = {

}
const mutations = {
    updateImgList(state, payload){
        // 更新初始化图片列表
        state.imgList = payload[0].data;
        state.SerialID = payload[1].SerialID;
    },
    updatePicList(state, payload){
        // 更新展开列表 
       
        state.isShow = false;
        state.picList = state.picList.concat(payload[0].data.List);
        state.page += 1;
        state.ImageID = payload[1];
    },
    changeSwiper(state, payload){
        // 展示swiper
        console.log('piclist...',state.picList)
        state.showSwiper = payload.showSwiper
    }
}
const actions = {
    getImgList({commit}, payload){
        // 根据车系ID 请求出对应的所有图片列表 （payload.SerialID）;
        getImgList(payload.SerialID).then(res=>{
            commit('updateImgList',[res, payload]);
        })
    },
    showMore({commit},payload){
        // payload : ImageID 
        getPicList(state.SerialID, payload, state.Page).then(res=>{
            commit('updatePicList', [res, payload]);
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