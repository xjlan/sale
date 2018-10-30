<template>
	<div class="ratingselect">
		<div class="rating-type border-1px">
			<span @click="select(2, $event)" class="block positive" :class="{'active': sType===2}">
				{{desc.all}}
				<span class="count">{{ratings.length}}</span>
			</span>
			<span @click="select(0, $event)" class="block positive" :class="{'active': sType===0}">
				{{desc.positive}}
				<span class="count">{{positives.length}}</span>
			</span>
			<span @click="select(1, $event)" class="block negative" :class="{'active': sType===1}">
				{{desc.negative}}
				<span class="count">{{negatives.length}}</span>
			</span>
		</div>
		<div @click="toggleContent" class="switch" :class="{'switch-on': oContent}">
			<span class="icon-check_circle"></span>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	export default{
		props: {
			ratings: {
				type: Array,
				default(){
					return [];
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		},
		data() {
			return {
				sType: this.selectType,
				oContent: this.onlyContent
			}
		},
		computed: {
			positives: function(){		//推荐的评价
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE;
				});
			},
			negatives: function(){		//吐槽的评价
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE;
				});
			}
		},
		methods: {
			select: function(type, event){		//选择评论类型
				if(!event._constructed) return;
				this.sType = type;
				this.$emit('ratingtype', type);
			},
			toggleContent: function(event){		//切换是否只看有内容的评论
				if(!event._constructed) return;
				this.oContent = !this.oContent;
				this.$emit('togglecontent', this.oContent);
			}
		}
	}
</script>

<style scoped>
	.ratingselect .rating-type{
		padding: 18px 0;
		margin: 0 18px;
		font-size: 0;
	}
	.rating-type .block{
		display: inline-block;
		padding: 8px 12px;
		margin-right: 8px;
		font-size: 12px;
		line-height: 16px;
		border-radius: 1px;
		color: rgb(77, 85, 93);
	}
	.rating-type .block.active{
		color: #fff;
	}
	.rating-type .block .count{
		font-size: 8px;
		margin-left: 2px;
	}
	.rating-type .positive{
		background: rgba(0, 160, 220, 0.2);
	}
	.rating-type .positive.active{
		background: rgb(0, 160, 220);
	}
	.rating-type .negative{
		background: rgba(77, 85, 93, 0.2);
	}
	.rating-type .negative.active{
		background: rgb(77, 85, 93);
	}
	.ratingselect .switch{
		padding: 12px 18px;
		line-height: 24px;
		border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		color: rgb(147, 153, 159);
	}
	.ratingselect .switch .icon-check_circle{
		display: inline-block;
		vertical-align: top;
		margin-right: 2px;
		font-size: 24px;
	}
	.ratingselect .switch-on .icon-check_circle{
		color: #00c850;
	}
	.ratingselect .switch .text{
		font-size: 12px;
	}
</style>