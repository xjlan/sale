<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
				<i class="inner icon-remove_circle_outline"></i>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default {
		props: {
			food: Object
		},
		methods: {
			addCart: function(event) {
				if(!event._constructed) return;
				if(!this.food.count){
					Vue.set(this.food, 'count', 1);
				}else{
					this.food.count++;
				}
				this.$emit('cartAdd', event.target);
			},
			decreaseCart: function(event){
				if(!event._constructed) return;
				if(this.food.count){
					this.food.count--;
				}
			}
		}
	}
</script>

<style scoped>
	.cartcontrol{
		font-size: 0;
	}
	.cartcontrol .cart-decrease{
		display: inline-block;
		padding: 6px;
		transition: all .5s linear;
	}
	.cartcontrol .cart-decrease .inner{
		display: inline-block;
		line-height: 24px;
		font-size: 24px;
		color: rgb(0, 160, 220);
		transition: all .5s linear;
	}
    .cartcontrol .move-enter,
    .cartcontrol .move-leave-to {	/* .fade-leave-active 在低于版本 2.1.8 中 */ 
      transform: translate3d(24px, 0, 0);
      opacity: 0
    }
    .cartcontrol .move-enter .inner,
    .cartcontrol .move-leave-to .inner{
    	transform: rotate(180deg);
    }
	.cartcontrol .cart-count{
		display: inline-block;
		vertical-align: top;
		width: 12px;
		padding-top: 6px;
		text-align: center;
		font-size: 10px;
		line-height: 24px;
		color: rgb(147, 153, 159);
	}
	.cartcontrol .cart-add{
		display: inline-block;
		padding: 6px;
		line-height: 24px;
		font-size: 24px;
		color: rgb(0, 160, 220);
	}
</style>