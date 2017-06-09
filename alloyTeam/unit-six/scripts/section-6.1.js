/**
 * 小明追小红
 */
var Flower = function(){}

var xiaoming = {
	sendFlower: function(target){
		var flower = new Flower()
		target.receiveFlower(flower)
	}
}

var A = {
	receiveFlower: function(flower){
		 console.log('收到花' + flower)
	}
}

xiaoming.sendFlower(A)

/**
 * 代理模式
 */
var Flower = function(){}

var xiaoming = {
	sendFlower: function(target){
		var flower = new Flower()
		target.receiveFlower(flower)
	}
}

var B = {
	receiveFlower: function(flower){
		A.receiveFlower(flower)
	}
}

var A = {
	receiveFlower: function(flower){
		 console.log('收到花' + flower)
	}
}

xiaoming.sendFlower(B)

/**
 * 代理模式 加入监听
 */
var Flower = function(){}

var xiaoming = {
	sendFlower: function(target){
		var flower = new Flower()
		target.receiveFlower(flower)
	}
}

var B = {
	receiveFlower: function(flower){
		A.listenGoodMoon(function(){
			A.receiveFlower(flower)
		})
	}
}

var A = {
	receiveFlower: function(flower){
		 console.log('收到花' + flower)
	},
	listenGoodMoon: function(fn){
		setTimeout(function(){		// 假设10秒之后A的心情变好
			fn()
		}, 10000)
	}
}

xiaoming.sendFlower(B)