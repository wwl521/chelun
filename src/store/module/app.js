import {getBrandList, getChoosedList, getCarMakeList} from '@/api/index';
const state = {
    msg: 'hello',
    brandList: {},
    letterList:[],
    carList: [],
    isLoad: false,
    isShow: false
};

const getters = {

};

const mutations = {
    updateBrandList (action, payload) {
        let obj = {

        },
        letters = [];
        payload.forEach((item, index) => {
            // 接取车辆品牌的首字母大写
            let letter = item.Spelling.slice(0, 1);
            if (obj[letter] === undefined) {
                obj[letter] = [];
                obj[letter].push(item);
            } else if (letters.indexOf(letter) == -1) { 
                letters.push(letter);
            }else {
                obj[letter].push(item);
            }
        });
        // 所有字母的数组集合
        state.letterList = letters;
        state.brandList = obj;
    },
    updateCarList (action, payload) {
        state.carList = payload;
        state.isShow = true;
    },
    
    changeHide (action, payload) {
        state.isShow =false
    }
};

const actions = {
    getBrandList ({commit}) {
        // 获取车辆列表
        getBrandList().then(res => {
            // console.log(res.data);
            commit('updateBrandList', res.data);
        });
    },
    getChoosedList ({commit}, payload) {
        getChoosedList(payload).then(res => {
            // console.log(res.data);
            commit('updateCarList', res.data);
        });
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};