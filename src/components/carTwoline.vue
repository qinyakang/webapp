<style lang="scss" scoped>
.carList {
  overflow: hidden;
  background: #fff;
  padding: 0 0.34rem 0 0.3rem;
  .carOut{
	  width:6.9rem;
	.carDetail {
		height: 4.4rem;
		width: 3.3rem;
		float: left;
		&:nth-child(even) {
		margin-left: 0.3rem;
		}
		img {
		width: 100%;
		height: 100%;
		}
	}
  }
}
</style>

<template>
	<yd-layout id="carTwoline">
		<yd-navbar slot="navbar" :title="NavBar">
			<div @click="$router.back(-1);" slot="left">
				<i class="iconfont">&#xe720;</i>返回
			</div>
		</yd-navbar>
		<div class="mySection">
			<div class="carList">
				<div class="carOut">
					<div v-for="(item,index) in items" class="carDetail">
						<img @click="towlineGo(item)" :src="item.refererPicture" />
					</div>
				</div>
			</div>
		</div>
	</yd-layout>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  data() {
    return {
      NavBar: "",
      APIS: {
        //单列车型的数据接口
        getAll: API.host + "/sysallocation/queryByGroupId" //单列车型的信息
      },
      items: [] //单列车型的信息
    };
  },
  methods: {
    getAll() {
      let that = this;
      let groupId = this.$route.query.groupId;
      axios
        .get(that.APIS.getAll, {
          params: {
            groupId: groupId
          }
        })
        .then(res => {
          that.items = res.data.result.data;
          that.NavBar = this.$route.query.name;
          console.log(res.data.result.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    towlineGo(item) {
      //双列车型的路由跳转
      this.$router.push({
        path: "/productChoosecom",
        query: {
          id: item.refererNo
        }
      });
    }
  },
  mounted() {
    this.getAll();
  }
};
</script>