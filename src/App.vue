<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller?id=1234">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>
<!-- <script src="./assets/filter/global.js"></script> -->

<script>
  import header from './components/header/header';
  import {urlParse} from './assets/js/util';
  const ERR_OK = 0;
  export default {
    name: 'app',
    components: {
      'v-header': header
    },
    data() {
      return {
        seller: {
          id: (() => {
            let queryParams = urlParse();
            return queryParams.id;
          })()
        }
      };
    },
    mounted() {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body;
        if(response.errno == ERR_OK){
          console.log(this.seller);
          console.log(response.data);
          this.seller = Object.assign({}, this.seller, response.data);
          console.log('this.seller.id', this.seller.id);
        }
      });
    },
    methods: {
    }
  }
</script>
<style>
  @import './assets/css/base.css';
  @import './assets/css/icon.css';
  #app .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  #app .tab-item{
    flex: 1;
    text-align: center;
  }
  #app .tab-item a{
    display: block;
    font-size: 14px;
  }
  #app .tab-item a.active{
    color: #f01414;
  }
</style>
