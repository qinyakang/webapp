import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
	shopType: [],//4s店
}

const mutations = {
	shopTypeChoose(state,index) {
		state.shopType.map(function(arr,idx){
			if(idx == index){
                arr.choose = true;
                localStorage.setItem("shopChoose",JSON.stringify(arr))
			}else{
				arr.choose = false;
			}
		})
	},
	shopTypeSet(state,arrList) {
		state.shopType = arrList;
	}
}

const store = new Vuex.Store({ //创建store
	state,
	mutations
})

export default store