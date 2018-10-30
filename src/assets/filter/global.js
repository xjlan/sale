/**
 * 渲染日期格式为显示用格式，转换为YYYY-MM-DD格式或YYYY-MM-DD HH:II
 * @param str-(String)需要渲染的字符串
 * @param formatType-(Number)渲染结果格式，
 * 								1(默认)	-YYYY-MM-DD格式或YYYY-MM-DD HH:II:SS格式或HH:II:SS格式
 * 								2		-MM月DD日
 * 								3		-MM-DD
 * @return (String)渲染后结果
 */
// export function formatDateDtl(){
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

// } 

