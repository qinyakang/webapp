import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store.js' //引入store
import Axios from 'axios'
/* import tool from './tool.js' */
Vue.prototype.$axios = Axios;// 封装的请求接口
/* Vue.prototype.tool = tool;// 全局公用方法 */

/*ydui框架*/
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
import 'vue-ydui/dist/ydui.flexible.js'
Vue.use(YDUI);

/* mint UI */
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

/* element UI */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//swiper
import '../node_modules/swiper/dist/css/swiper.min.css'

new Vue({
	el: '#app',
	router,
	store,//挂载store
	components: { App },
	template: '<App/>'
})
