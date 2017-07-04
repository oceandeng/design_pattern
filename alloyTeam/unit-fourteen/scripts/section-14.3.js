/**
 * 中介者模式的例子 -- 购买商品
 */


/********************* 无模式 强耦合实现 ***********************/

// var colorSelect = document.getElementById('colorSelect'),
// 	numberInput = document.getElementById('numberInput'),
// 	colorInfo = document.getElementById('colorInfo'),
// 	numberInfo = document.getElementById('numberInfo'),
// 	nextBtn = document.getElementById('nextBtn');

// var goods = {	// 手机库存
// 	'red': 3,
// 	'blue': 6
// }

// colorSelect.onchange = function(){
// 	var color = this.value,		// 颜色
// 		number = numberInput.value		// 数量
// 		stock = goods[color];		// 该颜色手机对应的当前库存

// 	colorInfo.innerHTML = color;
// 	if(!color){
// 		nextBtn.disabled = true
// 		nextBtn.innerHTML = '请选择手机颜色'
// 		return;
// 	}

// 	if(Number.isInteger(number - 0) && number > 0){		// 用户输入的购买数量是否为正整数
// 		nextBtn.disabled = true
// 		nextBtn.innerHTML = '请输入正确的数量'
// 		return
// 	}

// 	if(number > stock){		// 当前选择数量超过库存量
// 		nextBtn.disabled = true;
// 		nextBtn.innerHTML = '库存不足'
// 		return
// 	}

// 	nextBtn.disabled = false
// 	nextBtn.innerHTML = '放入购物车'
// }

// numberInput.oninput = function(){
// 	var color = colorSelect.value,	// 颜色
// 		number = this.value,	// 数量
// 		stock = goods[color];

// 	numberInfo.innerHTML = number

// 	if(!color){
// 		nextBtn.disabled = true
// 		nextBtn.innerHTML = '请选择手机颜色'
// 		return;
// 	}

// 	if(((number - 0) | 0 ) !== number - 0){		// 用户输入的购买数量是否为正整数
// 		nextBtn.disabled = true
// 		nextBtn.innerHTML = '请输入正确的购买数量'
// 		return
// 	}

// 	if(number > stock){		// 当前选择数量没有超过库存量
// 		nextBtn.disabled = true
// 		nextBtn.innerHTML = '库存不足'
// 		return
// 	}

// 	nextBtn.disabled = false
// 	nextBtn.innerHTML = '放入购物车'
// }

/********************* 中介者模式实现 ************************/

var goods = {
	'red|32G': 3,
	'red|16G': 0,
	'blue|32G': 1,
	'blue|16G': 6
}

var colorSelect = document.getElementById('colorSelect'),
	memorySelect = document.getElementById('memorySelect'),
	numberInput = document.getElementById('numberInput'),
	colorInfo = document.getElementById('colorInfo'),
	memoryInfo = document.getElementById('memoryInfo'),
	numberInfo = document.getElementById('numberInfo'),
	nextBtn = document.getElementById('nextBtn');

var mediator = (function(){
	return {
		changed: function(obj){
			var color = colorSelect.value,	// 颜色
				memory = memorySelect.value,	// 内存
				number = numberInput.value,		// 数量
				stock = goods[color + '|' + memory];	// 颜色和内存对应的手机库存数量

			if( obj === colorSelect ){		// 如果改变的是选择颜色下拉框
				colorInfo.innerHTML = color
			}else if(obj === memorySelect){
				memoryInfo.innerHTML = memory
			}else if(obj === numberInput){
				numberInfo.innerHTML = number
			}

			if(!color){
				nextBtn.disabled = true
				nextBtn.innerHTML = '请选择手机颜色'
				return
			}

			if(!memory){
				nextBtn.disabled = true
				nextBtn.innerHTML = '请选择内存大小'
				return
			}

			if(Number.isInteger(number - 0) && number > 0){		// 输入数量是否为正整数
				nextBtn.disabled = true
				nextBtn.innerHTML = '请输入正确的购买数量'
				return
			}

			nextBtn.disabled = false
			nextBtn.innerHTML = '放入购物车'
		}
	}

})()

// 事件函数

colorSelect.onchange = function(){
	mediator.changed(this)
}

memorySelect.onchange = function(){
	mediator.changed(this)
}

numberInput.oninput = function(){
	mediator.changed(this)
}