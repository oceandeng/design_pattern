/**
 * 缓动动画
 * @params t 动画已消耗的时间
 * @params b 小球的原始位置
 * @params c 小球的目标位置
 * @params d 动画持续时间
 */

var tween = {
	linear: function(t, b, c, d){
		return c * t / d + b
	},
	easeIn: function(t, b, c, d){
		return c * (t /= d) * t + b
	},
	strongEaseIn: function(t, b, c, d){
		return c * (t /= d) * t * t * t + b
	},
	strongEaseOut: function(t, b, c, d){
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b
	},
	sineaseIn: function(t, b, c, d){
		return c * (t /= d) * t * t + b
	},
	sineaseOut: function(t, b, c, d){
		return c * ((t = t / d - 1) * t * t + 1) + b
	}
}

/**
 * Animate
 * @contrutor
 * @params this.dom 进行运动的dom节点
 * @params this.startTime 动画开始时间
 * @params this.startPos 动画开始时，dom节点的位置，即dom的初始位置
 * @params this.endPos 动画结束时，dom节点的位置，即dom的目标位置
 * @params this.propertyName dom节点需要被改变的css属性名
 * @params this.easing 缓动算法
 * @params this.duration 动画持续时间
 */
var Animate = function(dom){
	this.dom = dom
	this.startTime = 0
	this.startPos = 0
	this.endPos = 0
	this.propertyName = null
	this.easing = null
	this.duration = null
}

/**
 * 启动动画
 * @params propertyName dom节点
 * @params endPos 即dom的目标位置
 * @params duration 动画持续时间
 * @params easing 缓动算法
 */
Animate.prototype.start = function(propertyName, endPos, duration, easing){
	this.startTime = + new Date()		// 动画启动时间
	// this.startPos = this.dom.getBoundingClientRect()[propertyName]		// dom节点初始位置
	this.startPos = 0		// dom节点初始位置
	this.propertyName = propertyName	// dom节点需要被改变的css属性名
	this.endPos = endPos		// dom节点目标位置
	this.duration = duration	// 动画持续时间
	this.easing = tween[easing]		// 缓动算法

	var self = this
	var timeId = setInterval(function(){
		if(self.step() === false){
			clearInterval(timeId)
		}
	}, 19)
}

/**
 * 每一帧要做的事情
 */
Animate.prototype.step = function(){
	var t = + new Date()	// 取得当前时间
	if( t >= this.startTime + this.duration){		// (1)
		this.update(this.endPos)	// 更新小球的css属性值
		return false
	}
	var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration) // pos为小球当前的位置
	this.update(pos)
}

/**
 * 更新小球css属性
 * @params pos 小球当前的位置
 */
Animate.prototype.update = function(pos){
	this.dom.style[this.propertyName] = pos + 'px'
}
