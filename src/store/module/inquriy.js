import {getCityId, getCarList, getProvinceList, getCityList } from '@/api/index';
const state = {
    carList:{},
    areaList:[],
    nearByList:[],
    isSlide:false,
    provinceList:[],
    cityList:[],
    glide:false,
    carId:'',
    cityName:'北京'
}
const getters = {

}
const mutations = {
    updateCarList(state, payload){
        // 所有数据
        state.carList = payload;
        // 车辆ID
        state.carId = payload.data.details.car_id;
        // 地区默认进入为北京
        // state.cityName = 
        console.log('cityName...',payload);
        // 选择完地区之后对应的地区的车型信息
        state.areaList = payload.data.list;
    },
    updateAreaList(state, payload){
        // 选择完市区之后 将glide布尔值 置为false
        state.glide = false;
        state.isSlide = false;
        // 将input 的框置为 选择的城市
        state.cityName= payload[1];
        // 更新地区信息列表
        state.areaList = payload[0].data.list;
        // 附近经销商的信息数据
        state.nearByList = payload[0].data.nearbys;
        
    },
    changeCity(state, payload){
        // 
        state.isSlide = true;
    },
    updateList(state, payload){
        // 渲染出所有的省份
        state.provinceList = payload.data;
    },
    chooseCity(state, payload){
        // 省份ID payload
        // console.log(payload);
        // 根据glide判断省份对应的城市是否显示
        state.glide = true;
        getCityList(payload).then(res=>{
            // 根据省份对应的ID 找出省份对应的城市列表
            state.cityList = res.data;
        })
    }
}
const actions = {
    getCarInfo({commit}, payload){
        getCityId().then(res=>{
           getCarList(res.data.CityID, payload).then(res=>{
               commit('updateCarList',res);
           })
        })
    },
    getCityList({commit}, payload){
        getProvinceList().then(res=>{
            // console.log(res);
            commit('updateList',res);
        })
   },
   chooseArea({commit}, payload){
       /** 
        * @param payload[0]  城市ID
        * @param state.carId 车辆ID
        * @return promise 
       */
       getCarList(payload[0], state.carId).then(res=>{
           commit('updateAreaList', [res,payload[1]]);
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