<template>
    <div :class="isSlide ? 'cityBox active' : 'cityBox'">
        <div class="contBox">
            <p class="type">自动定位</p>
            <h4>北京</h4>
            <p class="type">省市</p>
            <ul> 
                <li v-for="(item, index) in provinceList" :key="index" @click="chooseCity(item.CityID)">
                    {{item.CityName}}
                </li>
            </ul>
        </div>
        <div :class="glide?'content active':'content'">
            <ul :class="glide?'active':''">
                <li v-for="(item, index) in cityList" :key="index" @click="chooseArea([item.CityID, item.CityName])">
                    {{item.CityName}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex';
export default {
    name:'city',
    computed:{
        ...mapState({
            isSlide:state=>state.inquriy.isSlide,
            provinceList:state=>state.inquriy.provinceList,
            cityList:state=>state.inquriy.cityList,
            glide:state=>state.inquriy.glide
        })
    },
    methods:{
        ...mapMutations({
           chooseCity:'inquriy/chooseCity'
        }),
        ...mapActions({
            getCityList:'inquriy/getCityList',
            chooseArea:'inquriy/chooseArea'
        })
    },
    mounted(){
        this.getCityList();
    }
}
</script>
<style lang="scss" scoped>
    .cityBox{
        width:100%;
        height:100%;
        position: fixed;
        top:0;
        left:0;
        z-index: 200;
        background:#fff;
        transform: translate3d(0,100%,0);
        transition: all 0.3s linear;
        overflow: hidden;
        .contBox{
            width:100%;
            height:100%;
            overflow: hidden;
            overflow: auto;
            
        }
        .content{
            width:100%;
            height:100%;
            overflow-y: hidden;
            position: absolute;
            right:0;
            top:0;
            transform: translate3d(100%,0,0);
            background:rgba(0,0,0,0.3);
            ul{
                width:80%;
                height:100%;
                background:#fff;
                position: absolute;
                right:0;
                top:0;
                overflow-y: scroll;
            }
            ul.active{
                animation:showCity 1s;
            }
        }
        .content.active{
            transform: translate3d(0,0,0);
        }   
        .type{
            width:100%;
            height:0.4rem;
            line-height: 0.4rem;
            padding-left:0.3rem;
            box-sizing: border-box;
            background:#eee;
            font-size:0.25rem;
        }
        h4{
            width:100%;
            height:0.7rem;
            line-height: 0.7rem;
            font-size:0.32rem;
            border-bottom:solid 1px #eee;
            padding-left:0.34rem;
            font-weight:normal;
            box-sizing: border-box;
        }
        p.type{
                width:100%;
                height:0.4rem;
                line-height: 0.4rem;
                padding-left:0.3rem;
                box-sizing: border-box;
                background:#eee;
                font-size:0.25rem;
            }
        ul{
            width:100%;
            height:auto;
            padding-left:0.1rem;
            box-sizing: border-box;
            li{
                width:100%;
                height:0.7rem;
                line-height: 0.7rem;
                font-size:0.32rem;
                border-bottom:solid 1px #eee;
                padding-left:0.34rem;
                box-sizing: border-box;
            }
        }
    }
    .cityBox.active{
            transform: translate3d(0,0,0);
            transition: all 0.2s linear;
        }
        @keyframes showCity{
            0%{
                transform: translate3d(50%,0,0);
            }
            100%{
                transform: translate3d(0%,0,0);
            }
        }
</style>
