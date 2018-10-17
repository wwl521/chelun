import Vue from 'vue';
import App from './App.vue';

import router from './router/index';
import store from './store/index';

// 去掉请求提示
Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
