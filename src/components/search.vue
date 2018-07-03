<style lang="scss">

</style>

<template>
	<yd-layout id="search">
		<yd-navbar>
			<template slot="center">
				<yd-search v-model="value1" placeholder="大家都在搜索"></yd-search>
			</template>
			<div @click="$router.back(-1);" slot="right">
				取消
			</div>
		</yd-navbar>
	</yd-layout>
</template>

<script>
	import $ from 'jquery'
	export default {
		name: '',
		data() {
			return {

			}
		}
	}
</script>