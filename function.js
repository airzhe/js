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

/*
* 获得文字长度(英文两个算一个字符，中文汉字占一个字符。)
* 使用count=getMessageLength('这是a和bc的故事.')
*/
var getMessageLength = (function() { 
	var byteLength = function(b) { 
		if(typeof b == "undefined") { 
			return 0; 
		} 
		var a = b.match(/[^\x00-\x80]/g); 
		return(b.length + (!a ? 0 : a.length)); 
	}; 
	return function(message) { 
		message = message || ''; 
		message = message.replace(/\r\n/g, "\n"); 
		var c = 41, 
		d = 140, 
		e = 20, 
		f = message, 
		g = message.match(/http:\/\/[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+([-A-Z0-9a-z_\$\.\+\!\*\(\)\/,:;@&=\?\~\#\%]*)*/gi) || [], 
		h = 0; 

		for(var i = 0, j = g.length; i < j; i++) { 
			var k = byteLength(g[i]); 
			if(/^(http:\/\/t.cn)/.test(g[i])) { 
				continue; 
			} 
			/^(http:\/\/)+(t.sina.com.cn|t.sina.cn)/.test(g[i]) || /^(http:\/\/)+(weibo.com|weibo.cn)/.test(g[i]) ? h += k <= c ? k : k <= d ? e : k - d + e : h += k <= d ? e : k - d + e; 
			f = f.replace(g[i], ""); 
		} 
		var l = Math.ceil((h + byteLength(f)) / 2); 
		return l; 
	}; 
})(); 