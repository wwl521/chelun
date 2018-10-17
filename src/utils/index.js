/**
 * // 合并车辆列表
 * @param
 * @returns 
 */

export function getTitleList(list){
    let titleList = ['全部'];
    list.forEach((item, index)=>{
        let year = item.market_attribute.year;
        if(titleList.indexOf(year) == -1){
            titleList.push(year);
        }
    });
    return titleList;
}

export function mergeData (list){
    let keys = [],
        arr = {};
    list.forEach((item)=>{
        let key = item.exhaust_str+'/'+item.max_power_str+' '+item.inhale_type;
        if(keys.indexOf(key) != -1){// 存在key属性
            arr[key].push(item);
        }else { // 不存在key属性
            keys.push(key);
            arr[key] = [item];
        }
    });
    return arr;
}



/** 
 * 进行排序操作
 * @param
 * @returns
*/
export function sort(list){
    list.sort((a, b)=>{
        if(a.exhaust_str != b.exhaust_str){
            // 根据排量排序 升序
            return a.exhaust_str - b.exhaust_str;
        }else {
            // 根据车辆的功率排序 升序
            if(a.max_power_str != b.max_power_str){
                return a.max_power_str - b.max_power_str;
            }else {
                // 根据吸气方式排序 
                if(a.inhale_type != b.inhale_type){
                    return a.inhale_type - b.inhale_type;
                } else {
                    // 根据年份排序 降序
                    return b.market_attribute.year - a.market_attribute.year;
                }
            }
        }
    })
    return list;
}

/** 
 * 根据年份进行分类
 * @param
 * @returns 
*/

export function filter (year, list){
   return list.filter(item => item.market_attribute.year == year);
}