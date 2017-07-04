/**
 * 电灯程序
 */

// 无状态模式实现
var Light = function(){
	this.state = 'off'	// 给电灯设置初始状态off
	this.button = null	// 电灯开关按钮
}

Light.prototype.init = function(){
	var button = document.createElement('button'),
		self = this;

	button.innerHTML = '开关'
	this.button = document.body.appendChild(button)
	this.button.onclick = function(){
		self.buttonWasPressed()
	}
}

Light.prototype.buttonWasPressed = function(){
	if(this.state === 'off'){
		console.log('开灯')
		this.state = 'on'
	}else if(this.state === 'on'){
		console.log('关灯')
		this.state = 'off'
	}
}

var light = new Light()
light.init()

// 状态模式实现

// OffLightState
var OffLightState = function(light){
	this.light = light
}
OffLightState.prototype.buttonWasPressed = function(){
	console.log('弱光')		// offLightState 对应的行为
	this.light.setState(this.light.weakLightState)		// 切换状态到strongLightState
}

// WeakLightState
var WeakLightState = function(light){
	this.light = light
}
WeakLightState.prototype.buttonWasPressed = function(){
	console.log('弱光')		// weakLIghtState
	this.light.setState(this.light.strongLightState)	// 切换状态到strongLightState
}

// StrongLightState
var StrongLightState = function(light){
	this.light = light
}
StrongLightState.prototype.buttonWasPressed = function(){
	console.log('超强光')		// strongLightState对应的行为
	this.light.setState(this.light.superStrongLightState)		// 切换状态到offLightState
}


var Light = function(){
	this.offLightState = new OffLightState(this)
	this.weakLIghtState = new WeakLightState(this)
	this.strongLightState = new StrongLightState(this)
	this.superStrongLightState = new SuperStrongLightState(this)
	this.button = null
}

Light.prototype.init = function(){
	var button = document.createElement('button'),
		self = this;

	this.button = document.body.appendChild(button)
	this.button.innerHTML = '开关'

	this.currState = this.offLightState;	// 设置当前状态

	this.button.onclick = function(){
		self.currState.buttonWasPressed()
	}
}

Light.prototype.setState = function(newState){
	this.currState = newState
}

var light = new Light()
light.init()

// 增加一种新状态
var SuperStrongLightState = function(light){
	this.light = light
}
SuperStrongLightState.prototype.buttonWasPressed = function(){
	console.log('关灯')
	this.light.setState(this.light.offLightState)
}