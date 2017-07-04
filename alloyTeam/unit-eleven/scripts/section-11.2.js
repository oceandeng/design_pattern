/**
 * Coffee or Tea
 */

var Coffee = function(){}

Coffee.prototype.boilWater = function(){
	console.log('把水煮沸')
}

Coffee.prototype.brewCoffeeGriends = function(){
	console.log('用沸水冲泡咖啡')
}

Coffee.prototype.pourInCup = function(){
	console.log('把咖啡倒进杯子')
}

Coffee.prototype.addSugarAndMilk = function(){
	console.log('加糖和牛奶')
}

Coffee.prototype.init = function(){
	this.boilWater()
	this.brewCoffeeGriends()
	this.pourInCup()
	this.addSugarAndMilk()
}

var coffee = new Coffee()
coffee.init()


var Tea = function(){}

Tea.prototype.boilWater = function(){
	console.log('把水煮沸')
}

Tea.prototype.steepTeaBag = function(){
	console.log('用沸水浸泡茶叶')
}

Tea.prototype.pourInCup = function(){
	console.log('把茶水倒进杯子')
}

Tea.prototype.addLemon = function(){
	console.log('加柠檬')
}

Tea.prototype.init = function(){
	this.boilWater()
	this.steepTeaBag()
	this.pourInCup()
	this.addLemon()
}

var tea = new Tea()
tea.init()


/**
 * 抽象父类  Beverage类
 */

var Beverage = function(){}

Beverage.prototype.boilWater = function(){
	console.log('把水煮沸')
}

// 空方法，应该由子类重写
Beverage.prototype.brew = function(){
	throw new Error('子类必须重写brew方法')
}

Beverage.prototype.pourInCup = function(){
	throw new Error('子类必须重写pourInCup方法')
}

Beverage.prototype.addCondiments = function(){
	throw new Error('子类必须重写addCondiments方法')
}

// 钩子方法
Beverage.prototype.customerWantsCondiments = function(){
	return true; 	// 默认需要饮料
}

Beverage.prototype.init = function(){
	this.boilWater()
	this.brew()
	this.pourInCup()
	if(this.customerWantsCondiments){	// 如果钩子返回true,则需要调料
		this.addCondiments()
	}
}


// Coffee and Tea 子类

var Coffee = function(){}

Coffee.prototype = new Beverage()

Coffee.prototype.brew = function(){
	console.log('用沸水冲泡咖啡')
}

Coffee.prototype.pourInCup = function(){
	console.log('把咖啡倒进杯子')
}

Coffee.prototype.addCondiments = function(){
	console.log('加糖和牛奶')
}

var coffee = new Coffee()
coffee.init()


var Tea = function(){}

Tea.prototype = new Beverage()

Tea.prototype.brew = function(){
	console.log('用沸水浸泡茶叶')
}

Tea.prototype.pourInCup = function(){
	console.log('把茶水倒进杯子')
}

Tea.prototype.addCondiments = function(){
	console.log('加柠檬')
}

var tea = new Tea()
tea.init()


var CoffeeWithHook = function(){}

CoffeeWithHook.prototype = new Beverage()

CoffeeWithHook.prototype.brew = function(){
	console.log('用沸水冲泡咖啡')
}

CoffeeWithHook.prototype.pourInCup = function(){
	console.log('把咖啡倒进杯子')
}

CoffeeWithHook.prototype.addCondiments = function(){
	console.log('加糖和牛奶')
}

CoffeeWithHook.prototype.customerWantsCondiments = function(){
	return window.confirm('请问需要调料吗？')
}

var coffeeWithHook = new CoffeeWithHook
coffeeWithHook.init()