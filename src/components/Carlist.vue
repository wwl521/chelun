<template>
    <div 
    :class="isShow ? 'listBox active' : 'listBox'" 
    ref="listBox" 
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend">
        <div v-for="(item, index) in carList" :key="index" class="typeBox">
            <h3>{{item.GroupName}}</h3>
            <ul>
                <li 
                v-for="(value, ind) in item.GroupList" 
                :key="ind"
                @click="carDetail(value)"
                >
                    <dl>
                        <dt><img :src="value.Picture"></dt>
                        <dd>
                            <span class="title">{{value.AliasName}}</span>
                            <b class="price">{{value.DealerPrice}}</b>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {
        mapState,
        mapActions,
        mapMutations
    } from 'vuex';
    export default {
        name: 'list',
        props: [],
        computed: {
            ...mapState({
                carList: state => state.app.carList,
                isShow: state => state.app.isShow
            })
        },
        methods: {
            ...mapMutations({
                'changeHide':'app/changeHide'
            }),
            touchstart(e){
                // 获取点击时候的时间对象 距离屏幕左边的距离
                this.clientStartX = e.changedTouches[0].clientX;
                // console.log(e.changedTouches[0].clientX);
            },
            touchmove(e){
                // console.log(this.clientStartX);
                // 获取移动手指的时候的时间对象距离屏幕左边的距离 - 开始点击的距离（实时获取屏幕的移动距离）
                this.distance = e.changedTouches[0].clientX - this.clientStartX;
                this.$refs.listBox.style = `transform:translate3d(${this.distance}px,0,0)`
            },
            touchend(e){
                // console.log(e);
                if(this.distance > 100){
                    this.$refs.listBox.style='';
                    this.changeHide();
                }else{
                    this.$refs.listBox.style='';
                }
            },
            carDetail(value){
                // 车辆ID
                let id = value.SerialID;
                this.$router.push({path:'/detail',query:{SerialID:id}})
            }
        },
        mounted() {}
    }
</script>
<style lang="scss">
    .listBox {
        width: 80%;
        height: 100%;
        background: #fff;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 999;
        overflow-y: auto;
        transform: translate3d(100%,0,0);
        transition: transform .3s linear;
        .typeBox {
            width: 100%;
            height: auto;
            h3 {
                width: 100%;
                height: 0.5rem;
                font-size: 0.15rem;
                color: #717171;
                font-weight: normal;
                line-height: 0.5rem;
                background: #f1f1f2;
                padding-left: 0.3rem;
                box-sizing: border-box;
            }
            ul {
                width: 100%;
                li {
                    &:last-child{
                        border-bottom:none;
                    }
                    margin-left: 0.1rem;
                    box-sizing: border-box;
                    background: #fff;
                    border-bottom: solid 1px #e1e1e1;
                    display: flex;
                    dl {
                        width: 100%;
                        display: flex;
                        dt {
                            width: 35%;
                            img {
                                width: 100%;
                                height: auto;
                            }
                        }
                        dd {
                            flex: 1;
                            padding: 0.3rem;
                            box-sizing: border-box;
                            .title {
                                line-height: 0.5rem;
                                display: block;
                            }
                            .price {
                                color: #ff0000;
                            }
                        }
                    }
                }
            }
        }
    }
    .listBox.active {
            transform: translate3d(0,0,0);
            transition: transform .3s linear;
        }
</style>
