/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345, a:b}
 */
export function urlParse(){
	let url = window.location.search;
	let obj = {};
	let urlStr = '';
	if(url){
		urlStr = url.substring(1);
	}
	if(urlStr){
		var urlArr = urlStr.split('&');
		urlArr.forEach((item) => {
			let tempArr = item.split('=');
			let key = decodeURIComponent(tempArr[0]);
			let val = decodeURIComponent(tempArr[1]);
			obj[key] = val;
		});
	}
	return obj;
}