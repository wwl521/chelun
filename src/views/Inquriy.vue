<template>
    <div class="inqurity">
        <header class="header">
            可向多个商家咨询最低价，商家及时回复
        </header>
        <div class="carInfo">
            <img :src="carList.data.details.serial.Picture" alt="">
            <div>
                <h4>{{carList.data.details.serial.AliasName}}</h4>
                <p>{{carList.data.details.market_attribute.year}}款{{carList.data.details.car_name}}</p>
            </div>
        </div>
        <section>
            <div class="userInfo">
                <h4>个人信息</h4>
                <div>
                    <p>
                        <span>姓名</span>
                        <input type="text" placeholder="请输入您真实的中文姓名"></p>
                    <p>
                        <span>手机</span>
                        <input type="text" placeholder="请输入您真实的手机号码"></p>
                    <p @click="changeCity"><span>城市</span><span class="cityName">{{cityName}}</span></p>
                </div>
                <p class="button">询最低价</p>
            </div>
            <div class="dealer">
                <h4>选择报价经销商</h4>
                <ul>
                    <li v-for="(item, index) in areaList" :key="index">
                        <p class="shopName">
                            <span>{{item.dealerShortName}}</span>
                            <span>{{item.vendorPrice}}</span>
                        </p>
                        <p>
                            <span class="address">{{item.address}}</span>
                            <span class="region">{{item.saleRange}}</span>
                        </p>
                    </li>
                </ul>
                <div class="nearBy dealer" v-show="nearByList">
                    <h4>根据您所在的城市，同时为您匹配附近优质经销商，货比三家，才有好价</h4>
                    <ul>
                        <li v-for="(item, index) in nearByList" :key="index">
                            <p class="shopName">
                                <span>{{item.dealerShortName}}</span>
                                <span>{{item.vendorPrice}}</span>
                            </p>
                            <p>
                                <span class="address">{{item.address}}</span>
                                <span class="region">{{item.saleRange}}</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <!-- 城市页面 -->
        <City />
    </div>
</template>
<script>
import {mapState, mapActions, mapMutations} from 'vuex';
import City from '@/components/City';
export default {
    name:'inqurity',
    computed:{
        ...mapState({
            carList:state=>state.inquriy.carList,
            areaList:state=>state.inquriy.areaList,
            cityName:state=>state.inquriy.cityName,
            nearByList:state=>state.inquriy.nearByList
        })
    },
    components:{
        City:City
    },
    methods:{
        ...mapActions({
            getCarInfo:'inquriy/getCarInfo'
        }),
        ...mapMutations({
            changeCity:'inquriy/changeCity'
        })
    },
    mounted(){
        let carTypeId = this.$route.query.car_id;

        // 获取车型信息
        this.getCarInfo(carTypeId);
        
    }
}
</script>
<style lang="scss" scoped>
.inqurity{
    width:100%;
    height:100%;
    overflow: scroll;
    position: relative;
    .header{
        width:100%;
        height:0.6rem;
        background:#79cd92;
        text-align: center;
        color:#fff;
        line-height: 0.6rem;
        position: absolute;
        left:0;
        top:0;
        z-index: 99;
    }
    .carInfo{
        width:100%;
        margin-top:0.6rem;
        padding: 0.32rem 0.2rem 0.2rem;
        box-sizing: border-box;
        display: flex;
        img{
            width:2.32rem;
            height:1.4rem;
        }
        div{
            flex:1;
            margin-left:0.3rem;
            position: relative;
            &:after{
                content:"";
                width:0.2rem;
                height:0.2rem;
                position: absolute;
                border-right:solid 1px #333;
                border-top:solid 1px #333;
                
                display: inline-block;
                right:0;
                top:30%;
                transform: rotateZ(45deg);
            }
            h4{
                font-weight:normal;
                font-size:0.35rem;
                line-height: 1.5;
            }
            p{
                font-size:0.34rem;
                color:#333;
            }
        }
    }
    section{
        width:100%;
        
        .userInfo{
            width:100%;
            h4{
                width:100%;
                padding-left:0.3rem;
                height:0.5rem;
                line-height: 0.5rem;
                background:#eee;
                color:#666;
                font-size:0.23rem;
                font-weight:normal;
                box-sizing: border-box;
            }
            div{
                width:100%;
                padding: 0 0.3rem;
                box-sizing: border-box;
                p{
                    width:100%;
                    border-bottom:solid 1px #ccc;
                    height:0.8rem;
                    line-height: 0.8rem;
                    display: flex;
                    justify-content: space-between;
                    input{
                        appearance: none;
                        border:none;
                        font-size:0.33rem;
                        color:#ccc;
                    }
                    .cityName{
                        color:#666;
                        margin-right:0.2rem;
                        &:after{
                            content:'';
                            display: inline-block;
                            margin-left:0.2rem;
                            width:0.2rem;
                            height:0.2rem;
                            border:solid 1px #333;
                            border-left:none;
                            border-bottom:none;
                            transform: rotate3d(0, 0 ,1 ,45deg);
                        }
                    }
                }
            }
            .button{
                width:70%;
                height:0.7rem;
                background:#3aacff;
                border-radius:0.1rem;
                color:#fff;
                margin:0 auto;
                text-align: center;
                line-height: 0.7rem;
                margin: 0.3rem auto;
            }
        }
        .dealer{
            width:100%;
            h4{
                width:100%;
                padding-left:0.3rem;
                height:0.5rem;
                line-height: 0.5rem;
                background:#eee;
                color:#666;
                font-size:0.23rem;
                font-weight:normal;
                box-sizing: border-box;
            }
            ul{
                width:100%;
                padding:0.18rem;
                box-sizing: border-box;
                li{
                    width:100%;
                    border-bottom:solid 1px #ccc;
                    position: relative;
                    padding: .26rem 0 .26rem .54rem;
                    border-bottom: 1px solid #eee;
                    box-sizing: border-box;
                    height: 1.65rem;
                    &:before{
                        content:'';
                        width:0.3rem;
                        height:0.3rem;
                        position: relative;
                        display: inline-block;
                        border:solid 1px #666;
                        left:-0.5rem;
                        top:0.7rem;
                        border-radius:50%;
                    }
                    &.active{
                        &:before{
                            background:#f00;
                        }
                    }
                    p{
                        display: flex;
                        justify-content: space-between;
                        &:first-child{
                            font-size:0.3rem;
                            line-height: 0.6rem;
                            span:last-child{
                                color:#f00;
                                font-size:0.26rem;
                            }
                        }
                        &:last-child{
                            color:#ccc;
                            .address{
                                font-size:0.25rem;
                                
                                width:60%;
                            }
                            .region{
                                font-size:0.24rem;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
