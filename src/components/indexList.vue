<style scoped>
.yd-navbar:after {
  border: none !important;
}

.yd-navbar-center-title {
  font-weight: bold;
  font-size: 0.4rem !important;
}

body {
  background: #fff;
}

.title {
  font-size: 0.4rem;
  font-weight: bold;
  padding: 12px;
}

.yd-grids-5 .yd-grids-item:not(:nth-child(5n)):before {
  content: none !important;
}

.yd-grids-item:after {
  content: none !important;
}

.mint-indexlist-content {
  /*height: 400px !important*/
}

.yd-scrollview:after {
  height: 0 !important;
}
.yd-grids-item {
  padding: 0.15rem 0 !important;
}

.yd-grids-5:before {
  border: none !important;
}

</style>
<template>
	<yd-layout>
		<yd-navbar slot="navbar" v-bind:title="NavBar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<mt-index-list>
			<p class='title'>热门品牌</p>
			<yd-grids-group :rows="5">
				<yd-grids-item v-for="(brand,index) in items.hotBrands" :key="index" @click.native="brandGo(brand)">
					<img slot="icon" :src="brand.icon">
					<span slot="text">{{brand.name}}</span>
				</yd-grids-item>
			</yd-grids-group>
			<p class='title' style="border-top:.28rem solid #FAFAFA;">全部品牌</p>		
			<mt-index-section v-for='(item,index) in items.allBrands' :key="index" :index="item.type">
				<div v-for='(subItem,index) in item.items' @click="allbrandGo(subItem)" :key="index" style="height:1rem;border-top:1px solid #f8f8f8;line-height:1rem;padding-left:.3rem;">
					<!-- <mt-cell :title="subItem.label"></mt-cell> -->
					<img v-lazy="subItem.icon" src="" alt="" style="width:.6rem;height:.6rem;vertical-align: middle;margin-right:.3rem;">
					<span>{{subItem.label}}</span>
				</div>				
			</mt-index-section>
		</mt-index-list>
	</yd-layout>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      NavBar: "所有品牌",
      APIS: {
        //接口
        getBrands: API.host + "/sysallocation/queryBrands" //车辆品牌数据
      },
      items: {
        //车辆品牌数据
        allBrands: [], //全部车辆品牌
        hotBrands: [] //热门车辆品牌
      }
    };
  },
  methods: {
    getBrands() {
      //获取所有的品牌信息
      let that = this;
      axios
        .get(that.APIS.getBrands)
        .then(res => {
          //that.items.allBrands = res.data.result.carBrandsList;
          that.items.hotBrands = res.data.result.brandsConfigList;
          localStorage.setItem('hotBrans',JSON.stringify(that.items.hotBrands));
          var arr = {};
          res.data.result.carBrandsList.map(function(brand) {
            if (typeof arr[brand.initial] == "undefined") {
              arr[brand.initial] = [];
            }
            arr[brand.initial].push({
              type: brand.initial,
              label: brand.name,
              icon: brand.icon,
              brandId: brand.id
            });
          });
          console.log(arr);
          for (var key in arr) {
            that.items.allBrands.push({
              type: key,
              items: arr[key]
            });
          }
          console.log(that.items.allBrands);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    brandGo(brand) {
      //热门品牌列表的路由跳转
      console.log(this.items.allBrands);
      this.$router.push({
        path: "/carSelect",
        query: {
          brandId: brand.brandsId,
          icon: brand.icon,
          name: brand.name
        }
      });
    },
    allbrandGo(subItem) {
      //全部品牌列表的路由跳转
      console.log(this.items.allBrands);
      this.$router.push({
        path: "/carSelect",
        query: {
          brandId: subItem.brandId,
          icon: subItem.icon,
          name: subItem.label
        }
      });
    }
  },
  mounted() {
    this.getBrands();
  }
};
</script>