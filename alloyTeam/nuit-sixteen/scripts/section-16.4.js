/**
 * 缺少抽象类的变通方式
 */

var State = function(){}

State.prototype.buttonWasPressed = function(){
	throw new Error('父类的buttonWasPressed方法必须被重写')
}

var SuperStrongLightState = function(light){
	this.light = light
}

SuperStrongLightState.prototype = new State()		// 继承抽象父类

SuperStrongLightState.prototype.buttonWasPressed = function(){		// 重写buttonWasPressed
	console.log('关灯')
	this.light.setState(this.light.offLightState)
}

