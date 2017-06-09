/**
 * 保护代理 虚拟代理
 */
var B = {
	receiveFlower: function(flower){
		A.listenGoodMoon(function(){	// 监听A的好心情
			var flower = new Flower()
			A.receiveFlower(flower)
		})
	}
}