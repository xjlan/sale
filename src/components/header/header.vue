<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="supports">
          <v-icon :iconSize="1" :iconType="seller.supports[0].type"></v-icon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个 ></span>
        <!-- <i class="icon-keyboard_arrow_right"></i> -->
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{ seller.bulletin }}</span>
      <i>></i>
    </div>
    <div class="background-img">
      <img :src="seller.avatar">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <v-star :size="48" :score="seller.score"></v-star>
            </div>

            <v-title content="商品信息"></v-title>
            
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                <v-icon :iconSize="2" :iconType="seller.supports[index].type"></v-icon>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>

            <v-title content="商家公告"></v-title>

            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>

          </div>
        </div>
        <div class="detail-close" @click="showDetail">
          <i class=""> X </i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from '../star/star';
import title from '../title/title';
import icon from '../icon/icon';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false,
    }
  },
  methods: {
    showDetail: function(){
      this.detailShow = !this.detailShow;
    }
  },
  components: {
    'v-star': star,
    'v-title': title,
    'v-icon': icon
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
    background: rgba(7, 17, 27, 0.5);
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  .header .content-wrapper{
    font-size: 0;
    position: relative;
    padding: 24px 16px 18px 24px;
  }
  .content-wrapper .avatar{
    display: inline-block;
    vertical-align: top;
  }
  .content-wrapper .avatar>img{
    border-radius: 2px;
    width: 64px;
    height: 64px;
  }
  .content-wrapper .content{
    display: inline-block;
    margin-left: 16px;
    font-size: 14px;
  }
  .content-wrapper .title{
    margin: 2px 0 8px 0;
  }
  .content-wrapper .brand{
    display: inline-block;
    width: 30px;
    height: 18px;
    vertical-align: top;
    background: url(img/brand@2x.png) no-repeat;
    background-size: contain;
  }
  .content-wrapper .name{
    font-size: 18px;
    font-weight: bold;
    line-height: 18px;
    margin-left: 6px;
  }
  .content-wrapper .description{
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 12px;
  }
  .content-wrapper .text{
    line-height: 12px;
    font-size: 10px;
  }
  .content-wrapper .support-count{
    position: absolute;
    right: 12px;
    bottom: 10px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    background: rgba(0, 0, 0, 0.2);
    text-align: center;
    border-radius: 10px;
  }
  .content-wrapper .count{
    font-size: 10px;
  }
  /*公告*/
  .header .bulletin-wrapper{
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: rgba(7,17,27,0.2);
    position: relative;
  }
  .bulletin-wrapper .bulletin-title{
    display: inline-block;
    vertical-align: top;
    margin-top: 8px;
    width: 22px;
    height: 12px;
    background: url(img/bulletin@2x.png) center no-repeat;
    background-size: contain;
  }
  .bulletin-wrapper .bulletin-text{
    font-size: 10px;
  }
  .bulletin-wrapper>i{
    position: absolute;
    right: 7px;
    bottom: -2px;
  }
  .header .background-img{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: -1;
    filter: blur(10px);
  }
  .header .background-img>img{
    width: 100%;
    height: 100%;
  }
  /*详情弹层*/
  .header .detail{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: auto;
    z-index: 100;
    transition: all 0.5s;
    background: rgba(7, 17, 27, 0.8);
  }
  /*.header .fade-enter-active, .fade-leave-active {
      transition:all .5s;
    }*/
    .header .fade-enter, .fade-leave-to /* .fade-leave-active 在低于版本 2.1.8 中 */ {
      background: rgba(7, 17, 27, 0);
      opacity: 0
    }
  .detail .detail-wrapper{
    min-height: 100%;
    width: 100%;
  }
  .detail .detail-main{
    margin-top: 64px;
    padding-bottom: 64px;
  }
  .detail .detail-close{
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
    color: rgba(255, 255, 255, 0.5);
  }
  .detail-main .name{
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    text-align: center;
    line-height: 16px;
  }
  .detail-main .star-wrapper{
    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }
  .detail-main .supports{
    width: 80%;
    margin: 0 auto;
  }
  .detail-main .support-item{
    padding: 0 12px;
    margin-bottom: 12px;
    font-size: 0;
  }
  .detail-main .support-item:last-child{
    margin-bottom: 0;
  }
  .detail-main .text{
    font-size: 12px;
    line-height: 16px;
    margin-left: 6px;
  }
  .detail .bulletin{
    width: 80%;
    margin: 0 auto;
  }
  .detail .bulletin .content{
    padding: 0 12px;
    line-height: 24px;
    font-size: 12px;
  }
</style>
