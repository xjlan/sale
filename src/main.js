// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

Vue.use(router);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.productionTip = false


/* eslint-disable no-new */
Vue.filter('formatDateDtl', function(time, formatType){
	var date = new Date(time),
		year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate(),
		hour = date.getHours(),
		minutes = date.getMinutes();
		month = month > 9 ? month : '0' + month;
		minutes = minutes > 9 ? minutes : '0' + minutes;

	if(!formatType) formatType = 1;
	if(formatType == 1){
		return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
	}else if(formatType == 2){
		return month + '月' + day + '日';
	}else if(formatType == 3){
		return month + '-' + daty;
	}
	return time;
});
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
