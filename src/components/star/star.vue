<template>
	<div class="star" :class="starType">
		<span v-for="(itemClass, index) in itemClasses" :class="itemClass" class="star-item" :key="index"></span>
	</div>
</template>

<script>
	const LENGTH = 5;
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';

	export default{
		props: {
			size: {
				type: Number
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType: function(){
				return 'star-' + this.size;
			},
			itemClasses: function(){
				var result = [];
				var score = Math.floor(this.score * 2) / 2;
				var hasDecimal = score % 1 !== 0; //是否有小数（是否有半星）
				var integer = Math.floor(score);  //整数部分（全星个数）
				for (var i = 0; i < integer; i++) {
					result.push(CLS_ON);			//全星
				}
				if(hasDecimal){
					result.push(CLS_HALF);		//半星
				}
				while(result.length < LENGTH){
					result.push(CLS_OFF);
				}
				return result;
			}
		}
	}
</script>

<style scoped>
	.star .star-item{
		display: inline-block;
		background-repeat: no-repeat;
	}
	/*48*/
	.star-48 .star-item{
		width: 20px;
		height: 20px;
		margin-right: 22px;
		background-size: 20px 20px;
	}
	.star-48 .star-item:last-child{
		margin-right: 0;
	}
	.star-48 .star-item.on{
		background-image: url(img/star48_on@2x.png);
	}
	.star-48 .star-item.half{
		background-image: url(img/star48_half@2x.png);
	}
	.star-48 .star-item.off{
		background-image: url(img/star48_off@2x.png);
	}
	/*36*/
	.star-36 .star-item{
		width: 15px;
		height: 15px;
		margin-right: 16px;
		background-size: 15px 15px;
	}
	.star-36 .star-item:last-child{
		margin-right: 0;
	}
	.star-36 .star-item.on{
		background-image: url(img/star36_on@2x.png);
	}
	.star-36 .star-item.half{
		background-image: url(img/star36_half@2x.png);
	}
	.star-36 .star-item.off{
		background-image: url(img/star36_off@2x.png);
	}
	/*24*/
	.star-24 .star-item{
		width: 10px;
		height: 10px;
		margin-right: 3px;
		background-size: 10px 10px;
	}
	.star-24 .star-item:last-child{
		margin-right: 0;
	}
	.star-24 .star-item.on{
		background-image: url(img/star24_on@2x.png);
	}
	.star-24 .star-item.half{
		background-image: url(img/star24_half@2x.png);
	}
	.star-24 .star-item.off{
		background-image: url(img/star24_off@2x.png);
	}
</style>