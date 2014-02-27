/**
* ========================
* js函数库
* ========================
/

/*设置cookie的值*/
function addCookie(name,value,expiresHours){ 
	var cookieString=name+"="+escape(value); 
	//判断是否设置过期时间 
	if(expiresHours>0){ 
		var date=new Date(); 
		date.setTime(date.getTime+expiresHours*3600*1000); 
		cookieString=cookieString+"; expires="+date.toGMTString(); 
	} 
	document.cookie=cookieString; 
}
/*获得cookie的值*/
function getCookie(name){ 
	var strCookie=document.cookie; 
	var arrCookie=strCookie.split("; "); 
	for(var i=0;i<arrCookie.length;i++){ 
		var arr=arrCookie[i].split("="); 
		if(arr[0]==name)return arr[1]; 
	} 
	return ""; 
}
/*成功操作函数*/
function success(msg){
	alert(msg);
}
/*失败操作函数*/
function error(msg){
	alert(msg);
}

/**	
* /获得文字长度(英文两个算一个字符，中文汉字占一个字符。)
*/
function getMessageLength (b) { 
	var a = b.match(/[^\x00-\x80]/g); 
	var l=b.length + (!a ? 0 : a.length);
	return Math.ceil(l/2); 
}

/**
 * 获取get参数
 * @return {[object]} [返回数组对象]
 */
function getArgs(){
	var args = {};
	var match = null;
	var search = decodeURIComponent(location.search.substring(1));
	var reg = /(?:([^&]+)=([^&]+))/g;
	while((match = reg.exec(search))!==null){
		args[match[1]] = match[2];
	}
	return args;
}