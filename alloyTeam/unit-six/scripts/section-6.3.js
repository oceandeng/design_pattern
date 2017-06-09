/**
 * 虚拟代理实现图片预加载
 */
var myImage = (function(){
	var imgNode = document.createElement('img')
	document.body.appendChild(imgNode)

	return {
		setSrc: function(src){
			imgNode.src = src
		}
	}
})()

var proxyImage = (function(){
	var img = new Image()
	img.onload = function(){
		myImage.src = this.src
	}

	return {
		setSrc: function(src){
			myImage.src = '../images/loading.gif'
			img.src = src;
		}
	}
})()

myImage.setSrc('http://imgpath')
