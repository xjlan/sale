<template>
	<span :class="iconClass"></span>
</template>

<script>
	export default {
		props: {
			iconSize: {
				type: Number
			},
			iconType: {
				type: Number
			}
		},
		computed: {
			iconClass: function(){
				return 'icon-' + this.iconSize + ' ' + 'icon-item-' + this.iconType
			}
		}
	}
</script>

<style scoped>
	/*1X*/
	.icon-1{
		display: inline-block;
	    vertical-align: top;
	    width: 12px;
	    height: 12px;
	}
	.icon-1.icon-item-0{
		background: url(img/decrease_1@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-1.icon-item-1{
		background: url(img/discount_1@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-1.icon-item-2{
		background: url(img/special_1@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-1.icon-item-3{
		background: url(img/invoice_1@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-1.icon-item-4{
		background: url(img/guarantee_1@2x.png) no-repeat;
		background-size: contain;
	}
	/*2X*/
	.icon-2{
		display: inline-block;
	    vertical-align: top;
	    width: 16px;
	    height: 16px;
	}
	.icon-2.icon-item-0{
		background: url(img/decrease_2@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-2.icon-item-1{
		background: url(img/discount_2@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-2.icon-item-2{
		background: url(img/special_2@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-2.icon-item-3{
		background: url(img/invoice_2@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-2.icon-item-4{
		background: url(img/guarantee_2@2x.png) no-repeat;
		background-size: contain;
	}
	/*3X*/
	.icon-3{
		display: inline-block;
	    vertical-align: top;
	    width: 12px;
	    height: 12px;
	    margin-right: 2px;
	}
	.icon-3.icon-item-0{
		background: url(img/decrease_3@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-3.icon-item-1{
		background: url(img/discount_3@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-3.icon-item-2{
		background: url(img/special_3@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-3.icon-item-3{
		background: url(img/invoice_3@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-3.icon-item-4{
		background: url(img/guarantee_3@2x.png) no-repeat;
		background-size: contain;
	}
	/*4X*/
	.icon-4{
		display: inline-block;
	    vertical-align: top;
	    width: 16px;
	    height: 16px;
	    margin-right: 6px;
	}
	.icon-4.icon-item-0{
		background: url(img/decrease_4@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-4.icon-item-1{
		background: url(img/discount_4@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-4.icon-item-2{
		background: url(img/special_4@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-4.icon-item-3{
		background: url(img/invoice_4@2x.png) no-repeat;
		background-size: contain;
	}
	.icon-4.icon-item-4{
		background: url(img/guarantee_4@2x.png) no-repeat;
		background-size: contain;
	}
</style>