<template>
    <div class="wrap">
        <header class="header">全部颜色</header>
        <section class="scrollBox">
            <ul>
                <li v-for="(item, index) in yearList" 
                :key="index" 
                ref="scrollItem"
                @click="chooseColor(item)"
                :class="currentKey == item?'active':''">{{item}}</li>
            </ul>
        </section>
        <section class="color">
            <ol>
                <li 
                v-for="(value, ind) in colorList[currentKey]" 
                :key="ind"
                @click="colorClick(value.Name,value.ColorId)">
                    <span class="square" :style="`background:${value.Value}`"></span>
                    <span class="colorName">{{value.Name}}</span>
                </li>
            </ol>
        </section>
    </div>
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex';
import Bscroll from 'better-scroll';
export default {
    name:'color',
    computed:{
        ...mapState({
            colorList:state=>state.color.colorList,
            currentKey:state=>state.color.currentKey,
            yearList:state=>state.color.yearList,
            color:state=>state.img.color,
            SerialID:state=>state.img.query.SerialID
        })
    },
    methods:{
        ...mapMutations({
            updateYear:'color/updateYear',
            changeColorID:'img/changeColorID'
        }),
        ...mapActions({
            getColorList:'color/getColorList'
        }),
        // 改变年份
        chooseColor(year){
            this.updateYear(year);
        },
        // 颜色选择
        colorClick(color, colorId){
            this.changeColorID({color, colorId});
            this.$router.push({path:'/img',query:{SerialID:this.SerialID}});
        }
    },
    mounted(){
        console.log('SerailID...',this.SerialID);
        this.getColorList(this.SerialID);
    }
}
</script>
<style lang="scss" scoped>
    .wrap{
        width:100%;
        height:100%;
        overflow: hidden;
        background:#eee;
        .header{
            width:100%;
            height:0.8rem;
            background:#fff;
            margin-top:0.3rem;
            text-align: center;
            line-height: 0.8rem;
            color:#00afff;
        }
        .scrollBox{
            width:100%;
            height:0.8rem;
            padding-left:0.2rem;
            box-sizing: border-box;
            margin-top:0.3rem;
            background:#fff;
            ul{
                display: flex;
                overflow-x: scroll;
                
                li{
                    width:1.8rem;
                    padding-right:0.5rem;
                    line-height: 0.8rem;
                    &.active{
                        color:#3aacff;
                    }
                }
                
            }
        }
        .color{
            width:100%;
            ol{
                width:100%;
                display: flex;
                justify-content: space-between;
                padding: 0.3rem;
                box-sizing: border-box;
                flex-wrap:wrap;
                li{
                    width:48%;
                    border:1px solid #3aacff;
                    margin-bottom:0.3rem;
                    padding:0.1rem;
                    box-sizing: border-box;
                    .square{
                        display: inline-block;
                        width:0.4rem;
                        height:0.4rem;
                    }
                    .colorName{
                        
                    }
                }
            }
        }
    }
</style>
