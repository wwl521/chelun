<template>
    <div class="detail">
        <div class="img">
            <img :src="carMakeList.CoverPhoto" alt="" @click="checkPic(SerialID)">
        </div>
        <div class="askPrice">
            <div>
                <p>{{carMakeList.market_attribute.dealer_price}}</p>
                <span>指导价：{{carMakeList.market_attribute.official_refer_price}}</span>
            </div>
            <p class="button" @click="askPrice(carMakeList.list[0].car_id)">{{carMakeList.BottomEntranceTitle}}</p>
        </div>
        <div class="typeBox">
            <ul class="titleBox">
                <li v-for="(item, index) in titleData" :key="index"
                @click="changeData({item,index})"
                :class="index == ind?'active':''">{{item}}</li>
            </ul>
            <div class="content">
                <div v-for="(value, key) in contData" :key="key" class="itemBox">
                    <h5>{{key}}</h5>
                    <div class="cont" v-for="(item, index) in value" :key="index">
                        <p>{{item.market_attribute.year}}款{{item.car_name}}</p>
                        <h6>{{item.horse_power}}马力{{item.gear_num}}档</h6>
                        <p class="price"><span class="dirPrice">指导价：{{item.market_attribute.official_refer_price}}</span><span>{{item.market_attribute.dealer_price_min}}起</span></p>
                        <div class="button">询问底价</div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="footer">
            <p>询问底价</p>
            <span>本地经销商为您报价</span>
        </footer>
    </div>
</template>
<script>
import {mapMutations, mapState, mapActions} from 'vuex';
import { setTimeout } from 'timers';

export default {
    name:'detail',
    computed:{
        ...mapState({
            carMakeList:state=>state.detail.carMakeList,
            mergeList:state=>state.detail.mergeList,
            titleData:state=>state.detail.titleData,
            contData:state=>state.detail.contData,
            ind:state=>state.detail.index,
            SerialID:state=>state.detail.SerialID
        })
    },
    methods:{
        ...mapActions({
            getCarMakeList:'detail/getCarMakeList'
        }),
        ...mapMutations({
            changeData:'detail/changeData',
            initialData:'detail/initialData',
            askPrice:'detail/askPrice'
        }),
        askPrice(car_id){
            // console.log(car_id);
            // 跳到询价页面
            this.$router.push({path:'/inquriy',query:{
                car_id:car_id
            }})
        },
        checkPic(SerialID){
            // 根据车系ID 跳转到图片页面并且带着参数 过去
            this.$router.push({path:'/img',query:{SerialID:SerialID}});
            console.log(SerialID);
        }
    },
    mounted(){
        // 点击车辆的ID
        let SerialID = this.$route.query.SerialID;
        this.getCarMakeList(SerialID); 
    }
}
</script>
<style lang="scss">
.detail{
    width:100%;
    height:100%;
    overflow: scroll;
    position: relative;
    .img{
        width:100%;
        height:3.29rem;
        overflow: hidden;
        position: relative;
        img{
            width:100%;
            position: absolute;
            transform: translateY(-15%);
        }
    }
    .askPrice{
        width:100%;
        display: flex;
        align-items: center;
        border-bottom:solid 10px #eee;
        div{
            width:50%;
            padding: 0.3rem 0;
            box-sizing: border-box;
            text-align: center;
            p{
                width:100%;
                color:red;
                line-height: 0.6rem;
            }
            span{
                font-size:0.25rem;
            }
        }
        .button{
            width:48%;
            color:#fff;
            text-align: center;
            line-height: 0.7rem;
            border:none;
            height:0.7rem;
            background:#00afff;
            border-radius:0.2rem;
        }
    }
    .typeBox{
        width:100%;
        
        .titleBox{
            width:100%;
            display: flex;
            li{
                padding: 0 0.4rem;
                line-height: 1rem;
                &.active{
                    color:#00afff;
                }
            }
        }
        .content{
            width:100%;
            .itemBox{
                h5{
                    width:100%;
                    height:0.6rem;
                    background:#eee;
                    line-height: 0.6rem;
                    font-weight:normal;
                    padding-left:0.2rem;
                    box-sizing: border-box;
                    color:#999;
                }
                .cont{
                    
                    p:nth-child(1){
                        padding-left:0.2rem;
                        padding-right:0.2rem;
                        box-sizing: border-box;
                        line-height: 0.7rem;
                    }
                    .price{
                        padding-left:0.2rem;
                        padding-right:0.2rem;
                        box-sizing: border-box;
                        width:100%;
                        text-align: right;
                        line-height: 0.6rem;
                        span{
                            color:#f00;
                            display: inline-block;
                            margin-left:0.3rem;
                            &.dirPrice{
                                font-size:0.25rem;
                                color:#666;
                            }
                        }
                    }
                    h6{
                        font-weight:normal;
                        color:#ccc;
                        padding-left:0.2rem;
                        padding-right:0.2rem;
                        box-sizing: border-box;
                    }
                    .button{
                        width:100%;
                        height:0.8rem;
                        border-top:solid 1px #ccc;
                        text-align: center;
                        line-height: 0.8rem;
                        color:#00afff;
                    }
                }
                
            }
        }
    }
    .footer{
        width:100%;
        height:1rem;
        background:#00afff;
        position: fixed;
        bottom:0;
        left:0;
        text-align: center;
        p{
            font-size:0.35rem;
            color:#fff;
            
        }
        span{
            color:#fff;
            font-size:0.25rem;
        }
    }
}
</style>
