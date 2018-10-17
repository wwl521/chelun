<template>
    <div class="wrap" ref="content">
        <div class="contentList" ref="contentList">
            <div v-for="(item, index) in brandList" :key="index" class="typeBox" ref="child">
                <h3 :ref="index">{{index}}</h3>
                <ul>
                    <li v-for="(value, ind) in item" :key="ind" @click="chooseCar(value.MasterID)">
                        <img :data-src="value.CoverPhoto" alt="">
                        <p>{{value.Name}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <ol class="aside" 
        @touchmove="touchMove" ref="asideBox">
            <li 
            v-for="(value, key) in brandList" 
            :key="key" 
            @click="scrollTo(key)">{{key}}</li>
        </ol>
        <!-- loading组件引入 -->
        <Loading v-if="isLoad"></Loading>   
        <!-- 侧边栏组件 -->
        <List></List>
    </div>
</template>
<script>
import Bscroll from 'better-scroll';
import {mapState, mapActions, mapMutations} from 'vuex';
import Loading from '../components/Loading';
import List from '../components/Carlist';
import {lazyLoad} from '@/utils/lazyLoad';
export default {
    name: 'index',
    data(){
        return {
            isLoad:true
        }
    },  
    computed: {
        ...mapState({
            msg:state=>state.app.msg,
            brandList:state=>state.app.brandList,
            letterList:state=>state.app.letterList
        })
    },
    components:{
        Loading:Loading,
        List:List
    },
    methods:{
        ...mapActions({
            'getBrandList':'app/getBrandList',
            'chooseCar':'app/getChoosedList'
        }),
        scrollTo (cont) { 
            console.log(this.$refs[cont][0].offsetTop);
            this.$refs.content.scrollTo(0,this.$refs[cont][0].offsetTop)
        },
        touchMove(e){
            // 计算当前字母的下标
            let num = this.$refs.asideBox.children.length;
            let index = Math.floor((e.touches[0].pageY - this.offsetTop) / this.letterHeight);
            //console.log(index);
            // // 处理边界值
            if(index < 0){
                index = 0;
            }else if(index >= num-1){
                index = num-1;
            }
            console.log(index)
            // // 计算当前滑动到哪个字母
            //let letter = this.letterList[index];
            let offsetTop = this.$refs.child[index].offsetTop
            console.log(offsetTop)
            // // console.log(offsetTop);
             this.$refs.content.scrollTop = offsetTop;
        }
    },
    mounted(){ 
        this.getBrandList();
        
        // 图片懒加载
        lazyLoad('.wrap');
    },
    updated(){
        this.isLoad = false;
        // 字母盒子距离屏幕顶部的高度
        this.offsetTop = this.$refs.asideBox.getBoundingClientRect().top;
        // 每个字母的高度
        this.letterHeight = this.$refs.asideBox.children[0].getBoundingClientRect().height;
        
    }
}
</script>
<style lang="scss">

.wrap{
    width:100%;
    height:100%;
    overflow: scroll;
    position: relative;
    .contentList{
        width:100%;
        height:auto;
        .typeBox{
            width:100%;
            h3{
                width:100%;
                height:0.4rem;
                line-height: 0.4rem;
                font-size:0.15rem;
                background:#f3f3f3;
                color:#aaabab;
                padding-left:0.3rem;
                box-sizing: border-box;
                font-weight:normal;
            }
            ul{
                padding-left: 0.3rem;
                padding-right:0.3rem;
                box-sizing: border-box;
                li{
                    display: flex;
                    align-items: center;
                    height:1rem;
                    line-height: 1rem;
                    border-bottom:solid 1px #e3e3e3;
                    img{
                        width:0.5rem;
                        height:0.5rem;
                    }
                    p{
                        margin-left:0.5rem;
                    }
                }
            }
        }
    }
    .aside{
        width:0.5rem;
        position: fixed;
        right:0;
        top:1.5rem;
        li{
            text-align: center;
            line-height: 0.5rem;
            color:#aaabab;
        }
    }
}
    
</style>