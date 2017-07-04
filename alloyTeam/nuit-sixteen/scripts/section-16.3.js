/**
 * 状态模式的通用结构
 */

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
	this.currState = this.offLightState

	this.button.onclick = function(){
		self.currState.buttonWasPressed()
	}
}

var OffLightState = function(light){
	this.light = light
}

OffLightState.prototype.buttonWasPressed = function(){
	console.log('弱光')
	this.light.setState(weakLIghtState)
}