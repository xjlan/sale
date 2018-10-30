<template>
<div>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
    	<ul>
    		<li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
    			<span class="text border-1px">
    				<v-icon v-if="item.type>0" :iconSize="3" :iconType="item.type"></v-icon>{{item.name}}
    			</span>
    		</li>
    	</ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
    	<ul>
    		<li v-for="(item, idx) in goods" :key="idx" class="food-list food-list-hook">
    			<h1 class="title">{{item.name}}</h1>
    			<ul>
    				<li v-for="(food, i) in item.foods" :key="i" class="food-item border-1px" @click="selectFood(food, $event)">
    					<div class="icon">
    						<img :src="food.icon">
    					</div>
    					<div class="content">
    						<h2 class="name">{{food.name}}</h2>
    						<p class="desc">{{food.description}}</p>
    						<div class="extra">
    							<span>月售{{food.sellCount}}份</span>
    							<span>好评率{{food.rating}}%</span>
    						</div>
    						<div class="price">
    							<span>¥{{food.price}}</span>
    							<span v-show="food.oldPrice">¥{{food.oldPrice}}</span>
    						</div>
    						<div class="control-wrapper">
    							<v-cartcontrol :food="food"></v-cartcontrol>
    						</div>
    					</div>
    				</li>
    			</ul>
    		</li>
    	</ul>
    </div>
    <v-shopcart v-on:cartAdd="_drop" ref="shopcart" :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice">
    </v-shopcart>
  </div>
  <v-foodDetail :food="selectedFood" ref="food"></v-foodDetail>
</div>
</template>

<script>
import BScroll from 'better-scroll';
import icon from '../icon/icon';
import shopcart from '../shopcart/shopcart';
import cartcontrol from '../cartcontrol/cartcontrol';
import foodDetail from '../foodDetail/foodDetail';

const ERR_OK = 0;
export default {
  props: {
  	seller: {
  		type: Object
  	}
  },
  components: {
  	'v-icon': icon,
  	'v-shopcart': shopcart,
  	'v-cartcontrol': cartcontrol,
  	'v-foodDetail': foodDetail
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  created() {
  	this.$http.get('/api/goods').then((response) => {	//获取商品列表信息
        response = response.body;
        if(response.errno == ERR_OK){
          	this.goods = response.data;
          	this.$nextTick(() => {
          		this.initScroll();
          		this.calcHeight();
  			    });
          }
      });
  },
  computed: {
  	currentIndex(){
  		for(var i = 0; i < this.listHeight.length; i++){
  			var height1 = this.listHeight[i]; //当前索引值的高度
  			var height2 = this.listHeight[i + 1];
  			if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
  				return i;
  			}
  		}
  		return 0;
  	},
  	selectFoods(){
  		var foods = [];			//存放加入购物车的商品
  		this.goods.forEach((good) => {
  			good.foods.forEach((food) => {
  				if(food.count){
  					foods.push(food);
  				}
  			});
  		});
  		return foods;
  	}
  },
  methods: {
  	selectMenu: function(index, event){	//点击选择菜单
  		if(!event._constructed) return;
  		var foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
  		var el = foodList[index];
  		this.foodScroll.scrollToElement(el, 300);
  	},
  	selectFood: function(food, event){ 		//选择商品
  		if(!event._constructed) return;
  		this.selectedFood = food;
  		this.$refs.food.show();
  	},
  	initScroll: function(){				//初始化better-scroll
  		this.menuScroll = new BScroll(this.$refs.menuWrapper, {
  			click: true
  		});
  		this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
  			click: true,
  			probeType: 3
  		});
  		this.foodScroll.on('scroll', (pos) => {
  			this.scrollY = Math.abs(Math.round(pos.y));
  		});
  	},
  	calcHeight: function(){		//计算高度
  		var foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
  		var height = 0;
  		this.listHeight.push(height);
  		for(var i = 0; i < foodList.length; i++){	//通过循环foodList下的dom结构，将每一个li的高度依次送入数组
  			var item = foodList[i];
  			height += item.clientHeight;
  			this.listHeight.push(height);
  		}
  	},
  	_drop: function(target) {
  		console.log(target);
  		this.$refs.shopcart.drop(target);
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.goods{
		display: flex;
		position: absolute;
		top: 174px;
		bottom: 46px;
		width: 100%;
		overflow: hidden;
	}
	.goods .menu-wrapper{
		flex: 0 0 80px;
		width: 80px;
		background: #f3f5f7;
	}
	.menu-wrapper .current{
		/*position: absolute;*/
		z-index: 10;
		margin-top: -1px;
		background: #fff;
		font-weight: bold;
	}
	.menu-wrapper .menu-item{
		display: table;
		height: 54px;
		width: 56px;
		padding: 0 12px;
		line-height: 14px;
	}
	.menu-wrapper .menu-item .text{
		display: table-cell;
		width: 56px;
		vertical-align: middle;
		font-size: 12px;
	}
	.goods .foods-wrapper{
		flex: 1;
	}
	.foods-wrapper .title{
		padding-left: 14px;
		height: 26px;
		line-height: 26px;
		border-left: 2px solid #d9dde1;
		font-size: 12px;
		color: rgb(147, 153, 159);
		background: #f3f5f7;
	}
	.foods-wrapper .food-item{
		display: flex;
		margin: 18px;
		padding-bottom: 18px;
	}
	.foods-wrapper .food-item:last-child{
		margin-bottom: 0;
	}
	.foods-wrapper .icon{
		flex: 0 0 57px;
		margin-right: 10px;
	}
	.foods-wrapper .icon>img{
		width: 57px;
		height: 57px;
	}
	.foods-wrapper .content{
		flex: 1;
	}
	.foods-wrapper .content .name{
		margin: 2px 0 8px 0;
		height: 14px;
		font-size: 14px;
		color: rgb(7, 17, 27);
	}
	.foods-wrapper .content .desc,
	.foods-wrapper .content .extra{
		line-height: 10px;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.foods-wrapper .content .desc{
		margin-bottom: 8px;
		line-height: 12px;
	}
	.foods-wrapper .content .extra>span:first-child{
		margin-right: 12px;
	}
	.foods-wrapper .content .price{
		font-weight: bold;
		line-height: 24px;
	}
	.foods-wrapper .content .price>span:first-child{
		margin-right: 8px;
		font-size: 14px;
		color: rgb(240, 20, 20);
	}
	.foods-wrapper .content .price>span:last-child{
		text-decoration: line-through;
		font-size: 10px;
		color: rgb(147, 153, 159);
	}
	.foods-wrapper .content .control-wrapper{
		position: absolute;
		right: 0;
		bottom: 12px;
	}
</style>
