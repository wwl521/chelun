<template>
  <div id="app">
    
    <router-view></router-view>
    <Loading/>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import Loading from '@/components/Loading';
export default {
  name: 'app',
  data(){
    return {
      // isLoad:true
    }
  },
  components:{
    Loading 
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
body,html,#app{
  width:100%;
  height:100%;
  overflow: hidden;
  font-size:0.3rem;
}
</style>
