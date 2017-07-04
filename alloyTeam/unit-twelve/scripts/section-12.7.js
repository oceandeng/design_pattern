/**
 * 对象池
 */

var toolTipFactory = (function(){
	var toolTipPool = [];	// toolTip对象池

	return {
		create: function(){
			if(toolTipPool.length === 0){		// 如果对象池为空
				var div = document.createElement('div')
				document.body.appendChild(div)
				return div
			}else{		// 如果对象池不为空
				return toolTipPool.shift()		// 则从对象池中取出一个dom
			}
		},
		recover: function(toolTipDom){
			return toolTipPool.push(toolTipDom)		// 对象池回收dom
		}
	}
})()


var ary = []

for(var i = 0, str; str = ['A', 'B'][i++]){
	var toolTip = toolTipFactory.create()
	toolTip.innerHTML = str
	ary.push(toolTip)
}

for(var i = 0, toolTip; toolTip = ary[i++];){
	toolTipFactory.recover(toolTip)
}

for(var i = 0, str; str = ['A', 'B', 'C', 'D', 'E', 'F'][i++];){
	var toolTip = toolTipFactory.create()
	toolTip.innerHTML = str
}

/**
 * 通用对象池实现
 */

var objectPoolFactory = function(createObjFn){
	var objectPool = []

	return {
		create: function(){
			var obj = objectPool.length === 0 ? createObjFn.apply(this, arguments) : objectPool.shift()
			return obj
		},
		recover: function(obj){
			objectPool.push(obj)
		}
	}
}


var iframeFactory = objectPoolFactory(function(){
	var iframe = document.createElement('iframe')
	document.body.appendChild(iframe)

	iframe.onload = function(){
		iframe.onload = null	// 防止iframe重复加载的BUG
		iframeFactory.recover(iframe)	// iframe加载完成之后回收节点
	}

	return iframe
})

var iframe1 = iframeFactory.create()
iframe1.src = 'http://baidu.com'

var iframe2 = iframeFactory.create()
iframe2.src = 'http://qq.com'

setTimeout(function(){
	var iframe3 = iframeFactory.create()
	iframe3.src = 'http://163.com'
}, 3000)