<template>
	<div>
		<div class="shopcart">
			<div class="content" @click="toggleList">
				<div class="content-left">
					<div class="logo-wrapper">
						<div class="logo" :class="{'highlight': totalCount>0}">
							<i class="icon-shopping_cart" :class="{'highlight': totalCount>0}"></i>
						</div>
						<div class="num" v-show="totalCount>0">{{totalCount}}</div>
					</div>
					<div class="price"  :class="{'highlight': totalPrice>0}">¥ {{totalPrice}}</div>
					<div class="desc">另需配送费¥{{deliveryPrice}}元</div>
				</div>
				<div class="content-right" @click.stop.prevent="pay">
					<div class="pay" :class="{'enough': totalPrice >= minPrice}">{{payDesc}}</div>
				</div>
			</div>
			<div class="ball-container">
				<!-- <transition name="drop"> -->
					<div v-for="(ball,index) in balls" v-show="ball.show" class="ball" :key="index">
						<div class="inner"></div>
					</div>
				<!-- </transition> -->
			</div>
			<transition name="fold">
			<div class="shopcart-list" v-show="listShow">
				<div class="list-header">
					<h2 class="title">购物车</h2>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list-content" ref="listContent">
					<ul>
						<li class="food  border-1px" v-for="(food,index) in selectFoods" :key="index">
							<span class="name">{{food.name}}</span>
							<div class="price">
								<span>¥{{food.price * food.count}}</span>
							</div>
							<div class="cartcontrol-wrapper">
								<v-cartcontrol :food="food"></v-cartcontrol>
							</div>
						</li>
					</ul>
				</div>
			</div>
			</transition>
		</div>
		<transition name="fade">
			<div v-show="listShow" class="list-mask" @click="hideList"></div>
		</transition>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import cartcontrol from '../cartcontrol/cartcontrol'
	export default {
		props: {
			selectFoods: {
				type: Array,
				default() {
					return [];
				}
			},
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
			}
		},
		components: {
			'v-cartcontrol': cartcontrol
		},
		data() {
			return {
				balls: [
					{show: false},
					{show: false},
					{show: false},
					{show: false},
					{show: false}
				],
				fold: true
			}
		},
		mounted: function(){
			this.$on('cartAdd', (target) => {
				console.log(target);
			});
		},
		computed: {
			totalPrice: function() {		//商品总价
				var total = 0;
				this.selectFoods.forEach((food) => {
					total += food.price * food.count;
				});
				return total;
			},
			totalCount: function() {		//所有商品总和
				var count = 0;
				this.selectFoods.forEach((food) => {
					count += food.count;
				});
				return count;
			},
			payDesc: function() {			//判断是否满足配送条件
				if(this.totalPrice === 0){
					return `¥${this.minPrice}元起送`;
				}else if(this. totalPrice < this.minPrice){
					var diff = this.minPrice - this.totalPrice
					return `还差¥${diff}元起送`
				}else{
					return '去结算'
				}
			},
			listShow: function(){
				if(!this.totalCount){
					this.fold = true;
					return false;
				}
				var show = !this.fold;
				if(show){
					this.$nextTick(() => {
						if(!this.scroll) {
							this.scroll = new BScroll(this.$refs.listContent, {
								click: true
							});
						}else{
							this.scroll.refresh();
						}
					});
				}
				return show;
			}
		},
		methods: {
			drop: function(el) {
				console.log(el);
			},
			toggleList: function(){			//打开购物车列表
				if(!this.totalCount){
					return;
				}
				this.fold = !this.fold;
			},
			empty: function(){		//清空购物车
				this.selectFoods.forEach((food) => {
					food.count = 0;
				})
			},
			hideList: function(){		//收起购物车列表
				this.fold = true;
			},
			pay: function(){
				if(this.totalPrice < this.minPrice) return;
				window.alert(`支付${this.totalPrice}元`);
			}
		}
	}
</script>

<style scoped>
	.shopcart{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 50;
		width: 100%;
		height: 48px;
	}
	.shopcart .content{
		display: flex;
		background: #141d27;
		font-size: 0;
		color: rgba(255, 255, 255, 0.4);
	}
	.shopcart .content-left{
		flex: 1;
	}
	.shopcart .content-left .logo-wrapper{
		display: inline-block;
		position: relative;
		top: -10px;
		margin: 0 12px;
		padding: 6px;
		width: 56px;
		height: 56px;
		box-sizing: border-box;
		vertical-align: top;
		border-radius: 50%;
		background: #141d27;
	}
	.shopcart .content-left .num{
		position: absolute;
		top: 0;
		right: 0;
		width: 24px;
		height: 16px;
		line-height: 16px;
		text-align: center;
		border-radius: 16px;
		font-size: 9px;
		font-weight: bold;
		background: rgb(240, 20, 20);
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
	}
	.shopcart .content-left .logo{
		width: 100%;
		height: 100%;
		text-align: center;
		border-radius: 50%;
		background: #2b343c;
	}
	.shopcart .content-left .logo.highlight{
		background: rgb(0, 160, 220);
	}
	.shopcart .content-left .logo>i{
		font-size: 24px;
		color: #80858a;
		line-height: 44px;
	}
	.shopcart .content-left .logo>i.highlight{
		color: #fff;
	}
	.shopcart .content-left .price{
		display: inline-block;
		vertical-align: top;
		margin-top: 12px;
		line-height: 24px;
		padding-right: 12px;
		box-sizing: border-box;
		border-right: 1px solid rgba(255, 255, 255, 0.1);
		font-size: 16px;
		font-weight: bold;
	}
	.shopcart .content-left .price.highlight{
		color: #fff;
	}
	.shopcart .content-left .desc{
		display: inline-block;
		vertical-align: top;
		line-height: 24px;
		margin: 12px 0 0 12px;
		font-size: 10px;
	}
	.shopcart .content-right{
		flex: 0 0 105px;
		width: 105px;
	}
	.shopcart .content-right .pay{
		height: 48px;
		line-height: 48px;
		text-align: center;
		font-size: 12px;
		font-weight: 700;
		background: #2b333b;
	}
	.shopcart .content-right .pay.enough{
		background: #00b43c;
		color: #fff;
	}
	/*小球*/
	.shopcart .ball-container .ball{
		position: fixed;
		left: 32px;
		bottom: 22px;
		z-index: 200;
		transition: all 0.4s;
	}
	.shopcart .ball-container .ball .inner{
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: rgb(0, 160, 220);
		transition: all 0.4s;
	}
	/*购物车列表*/
	.shopcart .shopcart-list{
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		width: 100%;
		transition: all 0.5s;
		transform: translate3d(0, -100%, 0);
	}
	.shopcart .fold-enter, .fold-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
      transform: translate3d(0, 0, 0);
    }
    .shopcart-list .list-header{
    	height: 40px;
    	line-height: 40px;
    	padding: 0 18px;
    	background: #f3f5f7;
    	border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    .shopcart-list .title{
    	float: left;
    	font-size: 14px;
    	color: rgb(7, 17, 27, 0.1);
    }
    .shopcart-list .empty{
    	float: right;
    	font-size: 14px;
    	color: rgb(0, 160, 330);
    }
    .shopcart-list .list-content{
    	padding: 0 18px;
    	max-height: 217px;
    	overflow: hidden;
    	background: #fff;
    }
    .shopcart-list .list-content .food{
    	position: relative;
    	padding: 12px 0;
    	box-sizing: border-box;
    }
    .shopcart-list .list-content .name{
    	line-height: 24px;
    	font-size: 14px;
    	color: rgb(7, 17, 27);
    }
    .shopcart-list .list-content .price{
    	position: absolute;
    	right: 90px;
    	bottom: 12px;
    	line-height: 24px;
    	font-size: 14px;
    	font-weight: bold;
    	color: rgb(240, 20, 20);
    }
    .shopcart-list .list-content .cartcontrol-wrapper{
		position: absolute;
		right: 0;
		bottom: 6px;
    }
    .list-mask{
    	position: fixed;
    	top: 0;
    	left: 0;
    	right: 0;
    	bottom: 0;
    	z-index: 40;
    	backdrop-filter: blur(10px);
    	background: rgba(7, 17, 27, 0.6);
    	opacity: 1;
    	transition: all 0.5s;
    }
    .fade-enter, .fade-leave-to{
    	background: rgba(7, 17, 27, 0);
    }
</style>