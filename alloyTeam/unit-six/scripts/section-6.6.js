var synchronousFile = function(id){
	console.log('开始同步文件，id为 ' + id)
}

var checkbox = document.getElementsByTagName('input')

for(var i = 0, c; c = checkbox[i++];){
	c.onclick = function(){
		if(this.checked === true){
			synchronousFile(this.id)
		}
	}
}

/**
 * 收集一段时间的请求
 */
var synchronousFile = function(id){
	console.log('开始同步文件，id为 ' + id)
}

var proxySynchronousFile = (function(){
	var cache = [],		//  保存一段时间内需要同步的ID
		timer = null;	// 定时器

	return function(id){
		cache.push(id)
		if(timer) return		// 保证不会覆盖已经启动的定时器
	
		timer = setTimeout(function(){
			synchronousFile(cache.join(','))	// 2秒后向本体发送需要同步的ID集合
			clearTimeout(timer)			// 清空定时器
			timer = null
			cache.length = 0		// 清空ID集合
		}, 2000)
	}
})()

var checkbox = document.getElementsByTagName('input')

for(var i = 0, c; c = checkbox[i++];){
	c.onclick = function(){
		if(this.checked === true){
			proxySynchronousFile(this.id)
		}
	}
}

