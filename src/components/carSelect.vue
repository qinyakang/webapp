<style lang="scss">
#carSelect {
  background: #f8f8f8;
  .carOne {
    background: #fff;
    line-height: 0.64rem;
    height: 1.12rem;
    padding: 0.24rem 0 0.24rem 0.36rem;
    border-top: 1px solid #f8f8f8;
    .carImg {
      float: left;
      img {
        height: 0.64rem;
        width: 0.64rem;
      }
    }
    .carText {
      float: left;
      margin-left: 0.36rem;
      p {
        font-size: 0.3rem;
        color: #282828;
        vertical-align: middle;
      }
    }
  }
  .carList {
    .carGroup {
      height: 0.62rem;
      background: #f8f8f8;
      line-height: 0.62rem;
      padding-left: 0.2rem;
    }
    .el-collapse-item__header {
      height: 1.2rem;
      padding-left: 0.2rem;
      line-height: 1.2rem;
    }
  }
}
.el-collapse-item__content {
  padding: 0 !important;
  line-height: inherit;
}
.carGroup {
  clear: both;
}
</style>

<template>
	<yd-layout id="carSelect">
		<yd-navbar slot="navbar" :title="NavBar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<div class="carOne">
			<div class="carImg">
				<img :src="items.icon" alt="" />
			</div>
			<div class="carText">
				<p>{{items.name}}</p>
			</div>
		</div>
		<div class="carList"  v-for="(item,index) in items.subItems" :key="index">
			<div class="carGroup">
				<p>{{item.seriesGroupName}}</p>
			</div>
			<el-collapse accordion>
				<el-collapse-item v-for="(carItem,index) in item.carSeriesList" :key="index">
					<template slot="title">
						<div style="height:1.2rem;" @click="getCarList(carItem)">
							<img style="float: left;margin-right: .3rem;height: .68rem;width: 1.06rem;margin-top: .2rem;" :src="carItem.cover" />
							<div style="height: 1.2rem;float: left;padding-top: .2rem;" class="carText">
								<p style="line-height: .4rem;">{{carItem.name}}</p>
								<p v-if="carItem.minPrice != undefined && carItem.maxPrice != undefined && carItem.minPrice != carItem.maxPrice" style="line-height: .4rem;">厂商指导价：{{carItem.minPrice}}-{{carItem.maxPrice}}万</p>
								<p v-if="carItem.minPrice != undefined && carItem.maxPrice != undefined && carItem.minPrice == carItem.maxPrice" style="line-height: .4rem;">厂商指导价：{{carItem.minPrice}}万</p>
							</div>
						</div>
					</template>
					<div v-for="(item,index) in carItems" :key="index" @click="cartypeGo(item)" style="height: 1.2rem;padding-left: .4rem;border-bottom: 1px solid #ebeef5;">
						<img style="float: left;margin-right: .3rem;height: .68rem;width: 1.06rem;margin-top: .2rem;" :src="item.cover" />
						<div style="float: left;width: 5rem;margin-top: .2rem;" class="carText">
							<p style="width: 3rem;word-break: keep-all;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.name}}</p>
							<p v-if="item.guidePrice != undefined">厂商指导价：{{item.guidePrice}}万</p>
						</div>
					</div>
				</el-collapse-item>
			</el-collapse>
		</div>
	</yd-layout>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      NavBar: "车型选择",
      APIS: {
        //车型选择的数据接口
        getCarType: API.host + "/carseries/querySeriesByBrandId", //车系列表的数据接口
        getCarList: API.host + "/carmodel/queryModelBySeriesId" //车型列表的数据接口
      },
      items: {
        //车系数据
        icon: "",
        name: "",
        subItems: {
          carList: []
        },
        seriesId: ""
      },
      carItems: [] //车型数据
    };
  },
  methods: {
    getCarType() {
      //车系列表的数据接口
      let that = this;
      let brandId = this.$route.query.brandId;
      axios
        .get(that.APIS.getCarType, {
          params: {
            brandId: brandId
          }
        })
        .then(res => {
          that.items.subItems = res.data.result;
          that.items.subItems.carList = res.data.result.carSeriesList;
          that.items.icon = this.$route.query.icon;
          that.items.name = this.$route.query.name;
          console.log(that.items.subItems);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    getCarList(carItem) {
      //车型列表的数据接口
      let that = this;
      axios
        .get(that.APIS.getCarList, {
          params: {
            seriesId: carItem.id
          }
        })
        .then(res => {
          that.carItems = res.data.result;
          console.log(that.carItems);
        })
        .catch(function(err) {
          that.carItems = [];
          console.log(err);
        });
    },
    cartypeGo(item) {
      //单个车型的路由跳转
      this.$router.push({
        path: "/productChoosecom",
        query: {
          id: item.id
        }
      });
    }
  },
  mounted() {
    this.getCarType();
  }
};
</script>