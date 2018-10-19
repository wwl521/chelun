import {getImgList,getPicList} from '@/api/index';
const state = {
    imgList:[],   // 初始化的图片列表
    ImageID:"",
    isShow:true,
    Page:1,
    picList:[],  // 展开后的图片列表
    showSwiper:false,
    isFetch:true,
    currentIndex:1,
    color:'',
    color:"颜色",
    query:{
        SerialID:"",
        ColorID:'',
        CarID:''
    }
}
const getters = {

}
const mutations = {
    updateImgList(state, payload){
        // 更新初始化图片列表
        console.log(1,payload)
        state.imgList = payload;
    },
    updatePicList(state, payload){
        // 更新展开列表 
       
        state.isShow = false;
        state.Page += 1;
        state.picList = state.picList.concat(payload[0].data.List);
        state.isFetch = true;
        state.ImageID = payload[1];
    },
    changeSwiper(state, payload){
        // 展示swiper
        state.showSwiper = payload.showSwiper;
        state.currentIndex = payload.id;
    },
    changeShake(state, payload){
        state.isFetch = false;
    },
    changeSerialID(state, payload){
        state.query.SerialID = payload;
    },
    changeColorID(state, payload){
        state.query.ColorID = payload.colorId;
        state.color = payload.color;
    },
    changeCarId(state, payload){
        state.query.CarID = payload;
    }
}
const actions = {
    getImgList({commit}, payload){
        console.log(payload)
        // 根据车系ID 请求出对应的所有图片列表 （payload.SerialID）;\
        commit('changeSerialID',payload);
        getImgList(state.query).then(res=>{
            commit('updateImgList',res.data);
        })
    },
    showMore({commit},payload){
        // payload : ImageID 
        commit('changeShake');
        getPicList(state.query.SerialID, payload, state.Page).then(res=>{
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