var googleMap = {
	show: function(){
		console.log('开始渲染谷歌地图')
	}
}

var baiduMap = {
	show: function(){
		console.log('开始渲染百度地图')
	}
}

// 脆弱的实现
var randerMap = function(type){
	if(type == 'google'){
		googleMap.show()
	}else if(type == 'baidu'){
		baiduMap.show()
	}
}

randerMap('google')
randerMap('baidu')


// 正确实现
var randerMap = function(map){
	if(map.show instanceof Function){
		map.show()
	}
}

randerMap(googleMap)
randerMap(baiduMap)

var sosoMap = {
	show: function(){
		console.log('开始渲染搜搜地图')
	}
}

randerMap(sosoMap)