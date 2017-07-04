/**
 * 适配器模式
 */

var getGuandongCity = function(){
	var guangdongCity = [
		{
			name: 'shenzhen',
			id: 11
		},
		{
			name: 'guangzhou',
			id: 12
		}
	]

	return guangdongCity
}

var render = function(fn){
	console.log('开始渲染广东省地图')
	document.write(JSON.stringify(fn()))
}

render(getGuandongCity())

// 数据结构变更

var guangzhouCity = {
	shenzhen: 11,
	guangzhou: 12,
	zhuhai: 13
}

var getGuandongCity = function(){
	var guangdongCity = [
		{
			name: 'shenzhen',
			id: 11
		},
		{
			name: 'guangzhou',
			id: 12
		}
	]

	return guangdongCity；
}

var render = function(fn){
	console.log('开始渲染广东省地图')
	document.write(JSON.stringify(fn()))
}

// 适配器
var addressAdapter = function(oldAddressfn){
	var address = {},
		oldAddress = oldAddressfn();

	for(var i = 0, c; c = oldAddress[i++];){
		address[c.name] = c.id
	}

	return function(){
		return address
	}
}

render(addressAdapter(getGuandongCity))