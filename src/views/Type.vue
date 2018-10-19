<template>
    <div class="wrap">
        <div class="typeBox">
            <ul class="titleBox">
                <li v-for="(item, index) in titleData" :key="index"
                @click="changeData({item,index})"
                :class="index == ind?'active':''">{{item}}</li>
            </ul>
            <div class="content">
                <div v-for="(value, key) in contData" :key="key" class="itemBox">
                    <h5>{{key}}</h5>
                    <div 
                    class="cont" 
                    v-for="(item, index) in value" 
                    :key="index"
                    @click="typeClick(item.car_id)">
                        <p>{{item.market_attribute.year}}款{{item.car_name}}</p>
                        <h6>{{item.horse_power}}马力{{item.gear_num}}档</h6>
                        <p class="price"><span class="dirPrice">指导价：{{item.market_attribute.official_refer_price}}</span><span>{{item.market_attribute.dealer_price_min}}起</span></p>
                        <div class="button">询问底价</div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>
<script>
import {mapMutations, mapState, mapActions} from 'vuex';
export default {
    name:'type',
    computed:{
        ...mapState({
            titleData:state=>state.detail.titleData,
            contData:state=>state.detail.contData,
            ind:state=>state.detail.index,
            carId:state=>state.type.carId,
            SerialID:state=>state.img.query.SerialID
        })
    },
    methods:{
        ...mapMutations({
            changeData:'detail/changeData',
            changeCarId:'img/changeCarId'
        }),
        typeClick(carId){
            this.changeCarId(carId);
            this.$router.push({path:'/img',query:{SerialID:this.SerialID}});
            
        }
    },
    mounted(){
        console.log('titleData',this.titleData);
    }
}
</script>
<style lang="scss" scoped>
.wrap{
    width:100%;
    height:100%;
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
}
</style>
