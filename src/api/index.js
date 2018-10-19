import { get } from "https";

// 动态判断域名
// const host = /localhost/.test(window.location.host) ? 'http://baojia-test.chelun.com' : 'https://baojia.chelun.com';
const host = 'https://baojia.chelun.com';
function getData (url, method = 'GET', data = {}) {
    let paramas = {
        method
    };
    // 如果是post方式传参，带上请求头信息
    if (method === 'POST') {
        paramas.body = JSON.stringify(data);
    }
    if (url.indexOf('?') === -1) {
        url += `?_=${new Date() * 1}`;
    } else {
        url += `&_=${new Date() * 1}`;
    }
    return fetch(host + url, paramas).then(res => res.json()).then(body => body);
}

// 请求车辆列表
export let getBrandList = () => {
    return getData('/v2-car-getMasterBrandList.html');
};

// 请求选中的车辆列表
export let getChoosedList = (id) => {
    return getData(`/v2-car-getMakeListByMasterBrandId.html?MasterID=${id}`);
};

/** 
 *   获取详情页面列表
 * @param 
 * @returns 
*/
export let getCarMakeList = (id) => {
    return getData(`/v2-car-getInfoAndListById.html?SerialID=${id}`)
}

/** 
 *  获取询价页面数据
 * @param 
 * @returns 
*/

// export let getInqurityData = (id) => {
//     return getData('')
// }

/** 
 * 获取车辆信息
*/
export let getCityId = () => {
    return getData('/location-client.html');
}

/** 
 * @param city_id 城市ID
 * @param carTypeId 车辆的ID
 * @returns promise
*/
export let getCarList = (city_id, carTypeId) => {
    return getData(`/v2-dealer-alllist.html?carId=${carTypeId}&cityId=${city_id}`);
}

/** 
 * // 获取省份
 * @param
 * @returns promise
*/
export let getProvinceList = () => {
    return getData('/v1-city-alllist.html');
}

/** 
 *  获取省份对应的城市
 * @param provinceId 省份id
 * @returns promise
*/

export let getCityList = (provinceId) => {
    return getData(`/v1-city-alllist.html?provinceid=${provinceId}`)
}

/**
 * 获取图片列表 
 * @param car_id 车系ID
 * @returns promise
 * 
*/
export let getImgList = (obj) => {
    console.log(obj)
    let query = '';
    for(var key in obj){
        if(obj[key] != ''){
            query += `&${key}=${obj[key]}`
        }
    }
    query = query.slice(1);
    console.log(query);
    return getData(`/v2-car-getImageList.html?${query}`);
}

/** 
 * 获取图片
 * @param  SerialID 车系ID
 * @param  ImageID  图片ID
 * @param  page   页数
 * @param  PageSize  一页的数据量
 * 
*/
export let getPicList = (SerialId, ImageID, Page) => {
    return getData(`/v2-car-getCategoryImageList.html?SerialID=${SerialId}&ImageID=${ImageID}&Page=${Page}&PageSize=30`)
}

/**
 * 获取车系颜色数据 
 * @param SerialID 
 * @returns promise
 * /v2-car-getModelImageYearColor.html?SerialID=2593
*/
export let getColorList = (SerialID) => {
    return getData(`/v2-car-getModelImageYearColor.html?SerialID=${SerialID}`)
}
