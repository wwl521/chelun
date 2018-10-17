import { getCarMakeList} from '@/api/index';
import {mergeData, sort, filter, getTitleList} from '@/utils/index';
const state = {
    carMakeList:{},
    mergeList:{},
    titleData:[],
    contData:{},
    index:0,
    SerialID:''
}

const getters = {

}

const mutations = {
    updateCarMakeList (action, payload){
        // console.log(payload.data);
        // console.log(payload.data.list);

        // 车系ID
        state.SerialID = payload.data.SerialID;
        
        // 得到标题数据
        state.titleData = getTitleList(payload.data.list)

        // 调用合并方法 合并数据并且排序
        let list = mergeData(sort(payload.data.list));
        state.contData = list;
      
        // 得到的未排序数据 (只渲染了头部img)
        state.carMakeList = payload.data;
    },
    changeData(action, payload) {
        let ind = payload.index;
        let title = payload.item;
        if(title == '全部'){
            state.contData = mergeData(sort(state.carMakeList.list));
            console.log(state.contData);
        } else {
            state.contData = mergeData(sort(filter(title, state.carMakeList.list)));
            console.log(state.contData);
        }
        
        state.index = ind;
    }
}
const actions = {
    getCarMakeList({commit}, payload){
        getCarMakeList(payload).then(res=>{
            commit('updateCarMakeList', res);
        })
    }
}
export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}