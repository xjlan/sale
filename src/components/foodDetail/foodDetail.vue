<template>
	<transition name="move">
		<div v-show="showFlag" class="foodDetail" ref="foodDetail">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image">
					<div class="back" @click="hide"><i class="icon-arrow_lift"></i></div>
				</div>
				<div class="content">
					<h2 class="title">{{food.name}}</h2>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}</span>
					</div>
					<div class="price">
						<span>¥{{food.price}}</span>
    					<span v-show="food.oldPrice">¥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
						<v-cartcontrol :food="food"></v-cartcontrol>
					</div>
					<transition name="fade">
						<div @click.stop.prevent="addCart" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
					</transition>
				</div>
				<v-split v-show="food.info"></v-split>
				<div class="info" v-show="food.info">
					<h2 class="title">商品信息</h2>
					<p class="text">{{food.info}}</p>
				</div>
				<v-split></v-split>
				<div class="rating">
					<h2 class="title">商品评价</h2>
					<v-ratingselect v-on:ratingtype="ratingTypeSelect" :selectType="selectType" v-on:togglecontent="contentType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></v-ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img :src="rating.avatar" class="avatar">
								</div>
								<div class="time">{{rating.rateTime | formatDateDtl}}</div>
								<p class="text">
									<i :class="{'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1}"></i>
									{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import Vue from 'vue';
	import BScroll from 'better-scroll';
	import cartcontrol from '../cartcontrol/cartcontrol';
	import ratingselect from '../ratingselect/ratingselect';
	import split from '../split/split'

	const POSITIVE = 0;		 //推荐
	const NEGATIVE = 0;		 //吐槽
	const ALL = 2;			//全部评价
	export default{
		props: {
			food: Object
		},
		components: {
			'v-cartcontrol': cartcontrol,
			'v-ratingselect': ratingselect,
			'v-split': split
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: false,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			};
		},
		methods: {
			show: function(){
				this.showFlag = true;		//控制显示/隐藏商品详情页
				this.selectType = ALL;		//评价的显示类型
				this.onlyContent = false;	//是否只显示有内容的评价
				this.$nextTick(() => {
					if(!this.scroll){		//实例化better-scroll
						this.scroll = new BScroll(this.$refs.foodDetail, {
							click: true
						});
					}else{
						this.scroll.refresh();
					}
				})
			},
			hide: function(){		//隐藏商品详情
				this.showFlag = false;
			},
			addCart: function(event){	//加入购物车
				// if(event._constructed) return;
				Vue.set(this.food, 'count', 1);
			},
			needShow: function(type, text){
				if(this.onlyContent && !text){
					return false;
				}
				if(this.selectType === ALL){
					return true;
				}else{
					return type === this.selectType;
				}
			},
			ratingTypeSelect: function(type){
				this.selectType = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			contentType: function(oContent){
				this.onlyContent = oContent;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
				// return false;
			}
		}
	};
</script>

<style scoped>
	.foodDetail{
		position: fixed;
		left: 0;
		top: 0;
		bottom: 48px;
		right: 0;
		z-index: 30;
		background: #fff;
		transition: all 0.2s linear;
		transform: translate3d(0, 0, 0);
	}
	.move-enter,
	.move-leave-to {
		transform: translate3d(100%, 0, 0);
	}
	.foodDetail .image-header{
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 100%;
	}
	.foodDetail .image-header>img{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.foodDetail .back{
		position: absolute;
		top: 10px;
		left: 0;

	}
	.foodDetail .back>i{
		display: block;
		padding: 10px;
		font-stretch: 20px;
		color: #f5f5f5;
	}
	.foodDetail .content{
		padding: 18px;
		position: relative;
	}
	.foodDetail .content .title{
		line-height: 14px;
		margin-bottom: 8px;
		font-size: 14px;
		font-weight: bold;
		color: rgb(7, 17, 27);
	}
	.foodDetail .content .detail{
		margin-bottom: 18px;
		line-height: 10px;
		font-size: 0;
	}
	.foodDetail .content .sell-count,
	.foodDetail .content .rating{
		font-size: 10px;
		color: rgb(147, 153, 159);

	}
	.foodDetail .content .sell-count{
		margin-right: 12px;
	}
	.foodDetail .content .price{
		font-weight: bold;
		line-height: 24px;
	}
	.foodDetail .content .price>span:first-child{
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240, 20, 20);
	}
	.foodDetail .content .price>span:last-child{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.foodDetail .cartcontrol-wrapper{
		position: absolute;
		right: 12px;
		bottom: 12px;
	}
	.foodDetail .buy{
		position: absolute;
		right: 18px;
		bottom: 18px;
		z-index: 10;
		height: 24px;
		line-height: 24px;
		padding: 0 12px;
		box-sizing: border-box;
		font-size: 10px;
		border-radius: 12px;
		color: #fff;
		background: rgb(0, 160, 220);
		transition: all 0.2s;
		opacity: 1;
	}
	.foodDetail .fade-enter,
	.foodDetail .fade-leave-to {
		opacity: 0;
	}
	.foodDetail .food-content .info{
		padding: 18px;
	}
	.foodDetail .info .title{
		line-height: 14px;
		margin-bottom: 6px;
		font-size: 14px;
		color: rgb(7, 17, 27);
	}
	.foodDetail .info .text{
		font-size: 12px;
		line-height: 24px;
		color: rgb(77, 85, 93);
	}
	.foodDetail .rating{
		padding-top: 18px;
	}
	.foodDetail .rating .title{
		line-height: 14px;
		margin-left: 18px;
		font-size: 14px;
		color: rgb(7, 17, 27);
	}
	.foodDetail .rating-wrapper{
		padding: 0 18px;
	}
	.foodDetail .rating-item{
		position: relative;
		padding: 16px 0;
	}
	.foodDetail .user{
		position: absolute;
		right: 0;
		top: 16px;
		font-size: 0;
		line-height: 12px;
	}
	.foodDetail .user>img{
		width: 12px;
		height: 12px;
	}
	.foodDetail .user .name{
		display: inline-block;
		vertical-align: top;
		margin-right: 6px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.foodDetail .user .avatar{
		border-radius: 50%;
	}
	.foodDetail .time{
		margin-bottom: 6px;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.foodDetail .text{
		line-height: 16px;
		font-size: 12px;
		color: rgb(7, 17, 27);
	}
	.foodDetail .text .icon-thumb_up,
	.foodDetail .text .icon-thumb_down{
		margin-right: 4px;
		line-height: 16px;
		font-size: 12px;
	}
	.foodDetail .text .icon-thumb_up{
		color: rgb(0, 160, 220);
	}
	.foodDetail .text .icon-thumb_down{
		color: rgb(147, 153, 159);
	}
	/*暂无评价*/
	.foodDetail .no-rating{
		padding: 16px 0;
		font-size: 12px;
		color: rgb(147, 153, 159);
	}
</style>