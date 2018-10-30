<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
    	<div class="overview">
    		<div class="overview-left">
    			<h1 class="score">{{seller.score}}</h1>
    			<div class="title">综合评分</div>
    			<div class="rank">高于周边商家{{seller.rankRate}}%</div>
    		</div>
    		<div class="overview-right">
    			<div class="score-wrapper">
    				<span class="title">服务态度</span>
    				<v-star :size="36" :score="seller.serviceScore"></v-star>
    				<span class="score">{{seller.serviceScore}}</span>
    			</div>
    			<div class="score-wrapper">
    				<span class="title">商品评分</span>
    				<v-star :size="36" :score="seller.foodScore"></v-star>
    				<span class="score">{{seller.foodScore}}</span>
    			</div>
    			<div class="delivery-wrapper">
    				<span class="title">送达时间</span>
    				<span class="delivery">{{seller.deliveryTime}}分钟</span>
    			</div>
    		</div>
    	</div>
    	<v-split></v-split>
    	<v-ratingselect v-on:ratingtype="ratingTypeSelect" :selectType="selectType" v-on:togglecontent="contentType" :onlyContent="onlyContent" :desc="desc" :ratings="ratings"></v-ratingselect>
		<div class="rating-wrapper">
			<ul v-show="ratings && ratings.length">
				<li v-show="needShow(rating.rateType, rating.text)" v-for="rating in ratings" class="rating-item border-1px">
					<div class="avatar">
						<img :src="rating.avatar">
					</div>
					<div class="content">
						<h1 class="name">{{rating.username}}</h1>
						<div class="star-wrapper">
							<v-star :size="24" :score="rating.score"></v-star>
							<span class="delivery" v-show="rating.delivery">{{rating.delivery}}</span>
						</div>
						<p class="text">{{rating.text}}</p>
						<div v-show="rating.recommend.length" class="recommend">
							<span class="icon-thumb_up"></span>
							<span v-for="item in rating.recommend" class="item">{{item}}</span>
						</div>
						<div class="time">{{rating.rateTime | formatDateDtl}}</div>
					</div>
				</li>
			</ul>
			<div class="no-rating" v-show="!ratings || !ratings.length">暂无评价</div>
		</div>
    </div>
  </div>
</template>

<script>
	import BScroll from 'better-scroll';
	import star from '../star/star';
	import split from '../split/split';
	import ratingselect from '../ratingselect/ratingselect';

	const POSITIVE = 0;		 //推荐
	const NEGATIVE = 0;		 //吐槽
	const ALL = 2;			//全部评价
	const ERR_OK = 0;
	export default {
		name: 'seller',
		props: {
		  	seller: Object
		},
		components: {
		  	'v-star': star,
		  	'v-split': split,
		  	'v-ratingselect': ratingselect
		},
		data() {
			return {
				ratings: [],
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
		created(){
		  	this.$http.get('/api/ratings').then((response) => {
		  		response = response.body;
		  		if(response.errno === ERR_OK){
		  			this.ratings = response.data;
		  			this.$nextTick(() => {
		  				this.scroll = new BScroll(this.$refs.ratings, {
			  				click: true
			  			});
		  			});
		  		}
		  	});
		},
		methods: {
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
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.ratings{
		position: absolute;
		top: 174px;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: hidden;
	}
	.ratings .overview{
		display: flex;
		padding: 18px 0;
	}
	/*评分左侧*/
	.ratings .overview-left{
		flex: 0 0 120px;
		padding: 6px 0;
		width: 120px;
		border-right: 1px solid rgba(7, 17, 27, 0.1);
		text-align: center;
		@media only screen and (max-width: 320px){
			flex: 0 0 100px;
			width: 100px;
		}
	}
	.ratings .overview-left .score{
		margin-bottom: 6px;
		line-height: 24px;
		font-size: 24px;
		color: rgb(255, 253, 0);
	}
	.ratings .overview-left .title{
		margin-bottom: 8px;
		line-height: 12px;
		font-size: 12px;
		color: rgb(7, 17, 27);
	}
	.ratings .overview-left .rank{
		line-height: 10px;
		font-size: 10px;
		color: rgb(7, 17, 27);
	}
	/*评分右侧*/
	.ratings .overview-right{
		flex: 1;
		padding: 6px 0 6px 24px;
		@media only screen and (max-width: 320px){
			padding: 6px;
		}
	}
	.ratings .overview-right .score-wrapper{
		line-height: 18px;
		margin-bottom: 8px;
		font-size: 0;
	}
	.ratings .overview-right .title{
		font-size: 12px;
		color: rgb(7, 17, 27);
	}
	.ratings .overview-right .star{
		display: inline-block;
		margin: 0 12px;
		vertical-align: top;
	}
	.ratings .overview-right .score{
		display: inline-block;
		line-height: 18px;
		vertical-align: top;
		font-size: 12px;
		color: rgb(255, 253, 0)
	}
	.ratings .overview-right .delivery-wrapper{
		font-size: 0;
	}
	.ratings .delivery-wrapper .title{
		line-height: 18px;
		font-size: 12px;
		color: rgb(7, 17, 27);
	}
	.ratings .delivery-wrapper .delivery{
		margin-left: 12px;
		font-size: 12px;
		color: rgb(147, 153, 159);
	}
	/*评论列表*/
	.ratings .rating-wrapper{
		padding: 0 18px;
	}
	.ratings .rating-wrapper .rating-item{
		display: flex;
		padding: 18px 0;
	}
	.ratings .rating-wrapper .avatar{
		flex: 0 0 28px;
		width: 28px;
		margin-right: 12px;
	}
	.ratings .rating-wrapper .avatar>img{
		width: 28px;
		height: 28px;
		border-radius: 50%;
	}
	.ratings .rating-wrapper .user .avatar{
		border-radius: 50%;
	}
	.ratings .rating-wrapper .content{
		position: relative;
		flex: 1;
	}
	.ratings .rating-wrapper .content .name{
		margin-bottom: 4px;
		line-height: 12px;
		font-size: 10px;
		color: rgb(7, 17, 27);
	}
	.ratings .rating-wrapper .star-wrapper{
		margin-bottom: 6px;
		font-size: 0;
	}
	.ratings .rating-wrapper .star-wrapper .star{
		display: inline-block;
		margin-right: 6px;
		vertical-align: top;
	}
	.ratings .rating-wrapper .star-wrapper .delivery{
		display: inline-block;
		vertical-align: top;
		color: rgb(147, 153, 159);
	}
	.ratings .rating-wrapper .text{
		line-height: 18px;
		color: rgb(7, 17, 27);
		margin-bottom: 18px;
		font-size: 12px;
	}
	.ratings .rating-wrapper .recommed{
		line-height: 16px;
		font-size: 0;
	}
	.ratings .rating-wrapper .icon-thumb_up,
	.ratings .rating-wrapper .item{
		display: inline-block;
		margin: 0 8px 4px 0;
		font-size: 9px;
	}
	.ratings .rating-wrapper .icon-thumb_up{
		color: rgb(0, 160, 220);
	}
	.ratings .rating-wrapper .item{
		padding: 0 6px;
		border: 1px solid rgba(7, 17, 27);
		border-radius: 1px;
		color: rgb(147, 153, 159);
		background: #fff;
	}
	.ratings .rating-wrapper .time{
		position: absolute;
		top: 0;
		right: 0;
		line-height: 12px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	/*暂无评价*/
	.ratings .rating-wrapper .no-rating{
		padding: 16px 0;
		font-size: 12px;
		color: rgb(147, 153, 159);
	}
</style>
