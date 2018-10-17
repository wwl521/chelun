<template>
    <div class="img">
        <!-- 车选型信息 -->
        <ul class="title" v-if="isShow">
            <li @click="chooseColor"><span>颜色</span></li>
            <li><span>车款</span></li>
        </ul>
        <!-- 图片列表 -->
        <div class="imgList">
            <div v-for="(item, index) in imgList" :key="index" class="typeBox">
                <p v-for="(value, ind) in item.List" :key="ind">
                    <span v-if="ind == 0" @click="showMore(item.Id)"><b>{{item.Name}}</b><i>{{item.Count}}张</i></span>
                    <img :data-src="value.Url.replace('{0}',value.LowSize)" alt="">
                </p>
            </div>
        </div>
        <!-- 图片详细列表 -->
        <div class="picList" v-if="!isShow" @scroll="loadMore">
            <ul>
                <li v-for="(item, index) in picList" :key="index" @click="itemClick">
                    <img :data-src="item.Url.replace('{0}',item.LowSize)" alt="" :data-id="index">
                </li>
            </ul>
        </div>
        <!-- 图片swiper -->
        <section class="swiper" v-if="showSwiper" @click="swiperClick">
            <swiper :options="swiperOption" ref="mySwiper">
                <!-- slides -->
                <swiper-slide v-for="(item, index) in picList" :key="index">
                    <img :src="item.Url.replace('{0}',item.HighSize)" alt="">
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </section>
    </div>    
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

import {mapState, mapActions, mapMutations} from 'vuex';

import {lazyLoad} from '@/utils/lazyLoad';
export default {
    name:'IMG',
    data(){
        return {
            swiperOption: {
            
            }
        }
    },
    computed:{
        ...mapState({
            imgList:state=>state.img.imgList,
            SerialID:state=>state.img.SerialID,
            ImageID:state=>state.img.ImageID,
            isShow:state=>state.img.isShow,
            picList:state=>state.img.picList,
            page:state=>state.img.page,
            showSwiper:state=>state.img.showSwiper
        }),
        swiper() {
            return this.$refs.mySwiper.swiper
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    methods:{
        
        ...mapActions({
            getImgList:'img/getImgList',
            showMore:'img/showMore'
        }),
        ...mapMutations({
            changeSwiper:'img/changeSwiper'
        }),
        chooseColor(){
            this.$router.push({path:'/color',query:{SerialID:this.SerialID}});
        },
        itemClick(e){
            let id = e.target.dataset.id;
            this.changeSwiper({
                id,
                showSwiper:true
            });
            
            // this.swiper.slideTo(id,1000, false);
        },
        swiperClick(e){
            // console.log('e.target...',e.target)  点击的事件源
            // console.log('e.currentTarget...', e.currentTarget)  绑定的当前事件对象
            if(e.target == e.currentTarget){
                this.changeSwiper({
                    showSwiper:false
                })
            }
        },
        loadMore(){
            // 滚动 加载更多
            //console.log('this.SerialID',this.ImageID);
            this.showMore(this.ImageID);
        }
    },
    updated(){
        lazyLoad('.imgList');
        lazyLoad('.picList');
    },
    mounted(){
        let SerialID = this.$route.query;
        this.getImgList(SerialID);
    }
}
</script>
<style lang="scss" scoped>
    .img{
        width:100%;
        height:100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        .title{
            width:100%;
            height:0.8rem;
            display: flex;
            align-items: center;
            flex-shrink: 0;
            li{
                flex:1;
                text-align: center;
                span{
                    &:after{
                        content:"";
                        display: inline-block;
                        width:0.2rem;
                        height:0.2rem;
                        transform: rotate3d(0,0,1,45deg);
                        border:solid 1px #333;
                        border-top:none;
                        border-left:none;
                        margin-left:0.2rem;
                    }
                }
            }
        }
        .imgList{
            flex:1;
            overflow: auto;
            .typeBox{
                width:100%;
                display: flex;
                flex-wrap: wrap;
                p{
                    width:32%;
                    height:2.3rem;
                    margin-right:5px;
                    margin-bottom:5px;
                    position: relative;
                    overflow: hidden;
                    span{
                        width:100%;
                        height:100%;
                        background:rgba(0,0,0,0.4);
                        position: absolute;
                        left:0;
                        top:0;
                        padding-top:1rem;
                        display: inline-block;
                        box-sizing:border-box;
                        b{
                            width:100%;
                            height:0.5rem;
                            display: block;
                            text-align: center;
                            color:#fff;
                        }   
                        i{
                            width:100%;
                            height:0.5rem;
                            display: block;
                            text-align: center;
                            color:#fff;
                        }
                    }
                    img{
                        width:2.46rem;
                        height:2.3rem;
                       background-size:cover;
                       background-repeat:no-repeat;
                       background-position: center;
                       margin-bottom:5px;
                    }
                }
            }
        }
        .picList{
            width:100%;
            height:100%;
            overflow: auto;
            ul{
                width:100%;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                li{

                    width:2.46rem;
                    height:2.46rem;
                    margin-bottom:0.04rem;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
            }
        }
        .swiper{
            width:100%;
            height:100%;
            background:#000;
           position: absolute;
           left:0;
           top:0;
           .swiper-container{
               position: relative;
               top:30%;
               img{
                   width:100%;

               }
           }
        }
    }
</style>
