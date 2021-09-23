<template>
	<!-- 
		uniapp支持html标签,也支持小程序的组件
		uniapp中对小程序的标签兼容性极好,即使打包运行成html网页,也能实现兼容
		但是html的部分标签,在小程序没有对应组件,很可能失效
	 -->
	<!-- <div>
		indexContainer
		<i></i>
	</div> -->
	<view class="indexContainer">
		<!-- 头部区域 -->
		<view class="header">
			<image class="logo" src="../../static/images/logo.png" mode=""></image>
			<view class="search">
				<view class="iconfont icon-sousuo"></view>
				<input class="searchInput" placeholder-class="placeholder" placeholder="搜索商品" type="text" value="" />
			</view>
			<button class="username">七月</button>
		</view>
		
		<!-- 导航条区域 -->
		<scroll-view 
		class="navScroll" 
		enable-flex 
		scroll-x
		v-if="indexData.kingKongModule">
			<view class="navItem active">
				推荐
			</view>
			<!-- 在Vue2.0中v-for指令优先级更高,v-if更低
				在Vue3.0中,优先级颠倒
			 -->
			<view 
			class="navItem" 
			v-for="item in indexData.kingKongModule.kingKongList"
			:key="item.L1Id"
			>
				{{item.text}}
			</view>
		</scroll-view>
		
	</view>
		
</template>

<script>
	export default {
		data() {
			return {
				indexData:{}
			}
		},
		// uniapp兼容Vue和小程序的生命周期
		// onLoad() {
		// 	console.log('onLoad')
		// },
		created(){
			// console.log('mounted')
			uni.request({
				url:"/api/getIndexData",
				success:(res)=>{
					// console.log('success',res)
					const result = res.data;
					// this.setData({
					// 	indexData:result
					// })
					this.indexData= result;
				}
			})
		},
		methods:{

		}
	}
</script>

<style lang="stylus">
	.indexContainer
		.header
			display flex
			align-items  center
			padding-top 20rpx
			.logo
				width 118upx
				height 40upx
				margin 0 20upx
				flex-shrink  0
			.search
				background  pink
				flex-grow 1
				border-radius  10rpx
				height 60upx
				position relative
				padding-left 70upx
				.iconfont
					position absolute
					top 50%
					transform translateY(-50%)
					left 20upx
				.placeholder
					font-size 24upx
					text-align center
					text-indent -60upx
			.username
				width 140upx
				height 60upx
				margin 0 20upx
				font-size 24upx
				color red
				flex-shrink  0
		.navScroll
			// display flex
			white-space nowrap
			.navItem
				display inline-block
				width 140upx
				height 80upx
				font-size 28upx
				text-align center
				line-height 80upx
				&.active
					border-bottom 4upx solid red
</style>
