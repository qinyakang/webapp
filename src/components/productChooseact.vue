<style lang="scss">
#productChooseone {
  background: #fafafa;
  .yd-scrollview {
    .yd-grids-2 .yd-grids-item:not(:nth-child(2n)):before {
      height: 60%;
      top: 10px;
    }
    .yd-grids-item:after {
      content: none;
    }
    .yd-grids-2:before {
      content: none;
    }
  }
  .yd-scrollview:after {
    content: none;
  }
}

.mt-range-progress {
  background-color: #ea5252;
}

.my-pro span {
  height: 14px;
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  color: rgba(153, 153, 153, 1);
  line-height: 14px;
  width: 11.5%;
  display: inline-block;
}

.el-slider__bar {
  background: #ea5252;
}

.el-slider__button {
  border: 2px solid #ea5252;
}
.sliderOne {
  .el-slider__runway {
    background-color: #ea5252 !important;
    .el-slider__bar {
      background-color: #ea5252 !important;
    }
    .el-slider__button-wrapper {
      left: 100% !important;
      .el-slider__button {
        border: 2px solid #ea5252 !important;
      }
    }
  }
}
.mysliderShow {
  display: flex;
  justify-content: space-between;
  font-size: 0.24rem;
  color: rgba(153, 153, 153, 1);
}
</style>
<template>
	<yd-layout id="productChooseone">
		<yd-navbar slot="navbar" v-bind:title="NavBar">
			<div @click="carShopback()" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<yd-slider autoplay="3000">
			<yd-slider-item v-for="(item,index) in priceItems.banners" :key="index">
				<a href="#">
					<img style="height: 3.76rem;" :src="item.picture">
				</a>
			</yd-slider-item>
		</yd-slider>
		<div style="float:left;padding:10px;background: #fff;margin-bottom: .18rem;width: 100%;">
			<p style="font-size:.30rem;color:#282828;font-weight: bold;line-height: .4rem;width: 100%;font-family:'微软雅黑'">{{priceItems.name}}</p>
			<p style="font-size:.25rem;color:#999999;font-family:'微软雅黑';margin-top:6px;line-height: .34rem;width: 100%;">活动价：¥{{priceItems.activityPrice}}万</p>
		</div>
		<br/>
		<div style='clear:both;padding:10px;background:#fff;border-bottom: 1px solid #f2f2f2;'>
			<p style='width:28px;
				height:20px; 
				font-size:14px;
				font-family:PingFangSC-Regular;
				color:rgba(102,102,102,1);
				line-height:20px;'>首付</p>
			<el-slider v-model="progress1" show-stops :step="10" :max="70"></el-slider>
			<div style='width:100%;' class='my-pro'>
				<span style=''>
					0%
				</span>
				<span style=''>
					10%
				</span>
				<span style=''>
					20%
				</span>
				<span style='text-align: center;'>
					30%
				</span>
				<span style='text-align: right;'>
					40%
				</span>
				<span style='text-align: right;width:13%'>
					50%
				</span>
				<span style='text-align: right;width:13%'>
					60%
				</span>
				<span style='text-align: right;width:4%;margin-left:.3rem'>
					70%
				</span>
			</div>
			<br /><br />
			<p style='width:28px;
				height:20px; 
				font-size:14px;
				font-family:PingFangSC-Regular;
				color:rgba(102,102,102,1);
				line-height:20px;'>期限</p>
			<el-slider v-model="progress2" v-if="periodsFirst != periodsLast" show-stops :step="step" :min="periodsFirst" :max="periodsLast"></el-slider>
            <el-slider class="sliderOne" v-model="progress2" v-if="periodsFirst == periodsLast" show-stops :step="step" :min="periodsFirst" :max="periodsLast" disabled></el-slider>
			<div class='mysliderShow'>
                <span v-for="(item,index) in planItems.periodsItems" v-if="planItems.periodsItems.length === 1" :key="index" style="width:100%;text-align:right;">
                    {{item.periods}}
                </span>
				<span class="sliderShow" v-for="(item,index) in planItems.periodsItems" v-if="planItems.periodsItems.length != 1" :key="index">
                    {{item.periods}}
                </span>
			</div>
		</div>
		<yd-grids-group :rows="2">
			<yd-grids-item>
				<span slot="text">
            	首付金额<br/><br/>
            	<span style='color:#EA5252;font-family:PingFangSC-Regular;'>{{firstPay}}万</span>
				</span>
			</yd-grids-item>
			<yd-grids-item>
				<span slot="text">
            	月还金额<br/><br/>
            	<span style='color:#EA5252;font-family:PingFangSC-Regular;'>{{mounthPay}}元</span>
				</span>
			</yd-grids-item>
		</yd-grids-group>
		<br/>
		<div v-for="(item,index) in plansItems" @click="planChoose(plansItems,index)" v-if = "item.choose" style='padding:20px;background:#fff;height:3.06rem;margin-bottom: .24rem;'>
			<p style='margin-bottom:18px;color:#666666;font-size:14px'>
				<span style='font-size:8px;color:#fff;background: #FFCD00;padding:4px'>推荐</span> &nbsp;&nbsp;
				<span>{{item.schemeName}}</span>
			</p>
			<p style='margin-bottom:18px;'>
				<span v-if="item.schemeSummary != '' && item.schemeSummary != '' " v-for="(subItem,index) in item.schemeSummary" style='padding:4px;border:1px solid #4586FF;color:#4586FF;font-size:12px;margin-right: .2rem;'>
					{{subItem}}
				</span>
			</p>
			<p style='color:#999999'>方案信息仅供参考，实际已到店为准</p>
			<p v-if="plansItems.length > 1 && item.choose" @click="morePlan()" style="line-height: .86rem;color: #F54D42;text-align: center;background: #fff;margin-bottom: .2rem;">更多金融产品选择</p>
		</div>
		<div v-if="moreShow && item.choose == false" v-for="(item,index) in plansItems" @click="planChoose(plansItems,index)" style='padding:20px;background:#fff;height:3.06rem;margin-bottom: .24rem;'>
			<p style='margin-bottom:18px;color:#666666;font-size:14px'>
				<span style='font-size:8px;color:#fff;background: #FFCD00;padding:4px'>推荐</span> &nbsp;&nbsp;
				<span>{{item.schemeName}}</span>
			</p>
			<p style='margin-bottom:18px;'>
				<span v-if="item.schemeSummary != '' && item.schemeSummary != undefined " v-for="(subItem,index) in item.schemeSummary" style='padding:4px;border:1px solid #4586FF;color:#4586FF;font-size:12px;margin-right: .2rem;'>
					{{subItem}}
				</span>
			</p>
			<p style='color:#999999'>方案信息仅供参考，实际已到店为准</p>
		</div>
		<div style='background: #fff;margin-bottom:20px' v-for="(item,index) in $store.state.shopType" v-if="item.choose">
				<div style='padding:12px;border-bottom: 1px solid #f3f3f3;'>
					<p style='font-size:.3rem;margin-bottom:.3rem;'>
						<span style="width:80%;display:inline-block">预约4S店</span>
						<span @click="more4sShop" style='color:#999999;font-size:12px'>更多4S店</span>
					</p>
					<p style='font-size:.3rem;margin-bottom:.3rem;'>{{item.name}}</p>
					<p style='color:#666666'>{{item.address}}</p>
				</div>
			<div style='height:50px;padding:10px'>
				<a href='/#/baiduMap' style='display:inline-block;width:50%;text-align: center;line-height: 30px;'>
					<img src='/static/img/map.png' style='width: .2rem;'> 地图
				</a>
				<a :href="'tel:'+ item.phone " style='display:inline-block;width:40%;text-align: center;border-left:1px solid #ccc'>
					<img src='/static/img/phone.png'> 电话
				</a>
			</div>
		</div>
			<yd-button @click.native="orderGo()" style="border-radius: 0;background: #F54D42;font-family: 'PingFangSC';" size="large" type="danger">
				立即预约
			</yd-button>
	</yd-layout>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      NavBar: "金融产品选择",
      cityName: "", //城市名称
      APIS: {
        //金融产品选择的数据接口
        getActivitycar: API.host + "/activityquery/queryAll" //金融产品选择页所有数据(活动型)
      },
      periodsFirst: 0, //默认活动方案第一期
      periodsLast: 0, //默认活动方案最后一期
      priceItems: {
        banners: [], //活动车型轮播图
        name: "", //活动车型名称
        activityPrice: "", //活动车型价格
        cover: '' //活动车型背景图
      },
      planItems: {
        //默认金融产品选择方案
        activityId: "",
        periodsItems: []
      },
      plansItems: [], //全部金融产品选择方案
      areaItems: {},
      progress1: 20, //默认首付比例
      maps: "",
      phone: "13717898203",
      progress2: 12, //默认首付期数
      standardRate: 0, //月还金额利率
      moreShow: false //更多金融放方案的显示隐藏
    };
  },
  computed: {
    step: function() {
      //金额步长
      return (
        (this.periodsLast - this.periodsFirst) /
        (this.planItems.periodsItems.length - 1)
      );
    },
    firstPay: function() {
      //首付金额
      return (this.priceItems.activityPrice * this.progress1 / 100).toFixed(2);
    },
    mounthPay: function() {
      //月还金额
      return Math.floor(
        this.priceItems.activityPrice *
          10000 *
          (1 - this.progress1 / 100) *
          (1 + this.standardRate) /
          this.progress2
      );
    }
  },
  methods: {
    carShopback() {
      //返回到首页
      this.$router.push({
        path: "/carShop"
      });
    },
    more4sShop() {
      //更多4S店选择
      this.$router.push({
        path: "s4Choose"
      });
    },
    morePlan() {
      //更多金融方案显示隐藏
      console.log(this);
      if (this.moreShow == false) {
        this.moreShow = true;
      } else if (this.moreShow == true) {
        this.moreShow = false;
      }
    },
    planChoose(items, index) {
      //金融方案选择
      var that = this;
      items.map(function(item, idx) {
        if (idx == index) {
          item.choose = true;
          localStorage.setItem("plan",JSON.stringify(item));
          that.planItems.periodsItems = item.schemeDetailList; //金融活动默认方案
          that.periodsFirst = that.planItems.periodsItems[0].periods; //默认活动方案第一期
          that.periodsLast =
            that.planItems.periodsItems[
              that.planItems.periodsItems.length - 1
            ].periods; //默认活动方案最后一期
        } else {
          item.choose = false;
        }
      });
      this.getStandardRateByPeriods();
    },
    getStandardRateByPeriods() {
      //根据期数返回利率
      //this.progress2
      var that = this;
      var standardRate = "";
      this.planItems.periodsItems.map(function(item) {
        if (item.periods == that.progress2) {
          standardRate = item.standardRate;
          return false;
        }
      });
      this.standardRate = standardRate / 100;
    },
    getActivitycar() {
      //金融产品选择页所有数据(活动型)
      let that = this;
      let activityId = this.$route.query.activityId;
      let carModelId = this.$route.query.carModelId;
      let belongRegion = localStorage.getItem("code");
      console.log(belongRegion);
      console.log(this.$route.query);
      axios
        .get(that.APIS.getActivitycar, {
          params: {
            activityId: activityId,
            carModelId: carModelId,
            belongRegion: belongRegion
          }
        })
        .then(res => {
          that.priceItems.name = res.data.result.activityCarModelVO.name; //活动车型名称
          that.priceItems.cover = res.data.result.activityCarModelVO.cover; //活动车型背景图
          that.priceItems.activityPrice =
            res.data.result.activityCarModelVO.activityPrice; //活动车型价格
          that.planItems.periodsItems =
            res.data.result.activitySchemeList[0].schemeDetailList; //金融活动默认方案
          that.periodsFirst = that.planItems.periodsItems[0].periods; //默认活动方案第一期
          that.periodsLast =
            that.planItems.periodsItems[
              that.planItems.periodsItems.length - 1
            ].periods; //默认活动方案最后一期
          res.data.result.activitySchemeList.map(function(planArr, index) {
            //所有的活动方案
            if (index == 0) {
              planArr.choose = true;
            } else {
              planArr.choose = false;
            }
            planArr.schemeSummary = planArr.schemeSummary.split(";");
          });
          that.plansItems = res.data.result.activitySchemeList; //所有的活动方案
          console.log(that.plansItems.length);
          that.shopTypeSet(res.data.result.activityDealerList); //vuex存储4s;
          let arr = {};
          arr = res.data.result.activityCarModelVO.carouselPicture.split(",");
          for (var key in arr) {
            that.priceItems.banners.push({
              //活动车型轮播图
              picture: arr[key]
            });
          }
          console.log(arr);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    shopTypeSet(arrList) {
      if (this.$route.query.isPost == undefined) {
        //是从首页跳过来的
        arrList.map(function(arr, index) {
          if (index == 0) {
            arr.choose = true;
          } else {
            arr.choose = false;
          }
        });
        this.$store.commit("shopTypeSet", arrList); //调用mutations修改state
      }
    },
    orderGo() { //跳转预约订单
    var query = {
        carModelId: this.$route.query.carModelId,
        activityId: this.$route.query.activityId,
        carModelName: this.priceItems.name,
        cover: this.priceItems.cover,
        loanAmount : ((this.priceItems.activityPrice - this.firstPay) * 10000).toFixed(2),
        totalAmount: this.priceItems.activityPrice * 10000,
        firstPayment: this.firstPay * 10000,
    }
        localStorage.setItem("param",JSON.stringify(query));//存储跳转参数
        this.$router.push({
            path: '/orderShop',
            query: query
        })
    }
  },
  mounted() {
    this.getActivitycar(); //金融产品选择页所有数据(活动型)
    this.getStandardRateByPeriods();
  }
};
</script>