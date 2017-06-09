// 最初代码实现
var calculateBonus = function(performanceLevel, salary){

	if(performanceLevel === 'S'){
		return salary * 4
	}

	if(performanceLevel === 'A'){
		return salary * 3
	}

	if(performanceLevel === 'B'){
		return salary * 2
	}

}

calculateBonus('B', 20000)
calculateBonus('S', 6000)

// 使用复合函数重构代码
var performanceS = function(salary){
	return salary * 4
}

var performanceA = function(salary){
	return salary * 3
}

var performanceB = function(salary){
	return salary * 2
}

var calculateBonus = function(performanceLevel, salary){

	if(performanceLevel === 'S'){
		return performanceS(salary)
	}

	if(performanceLevel === 'A'){
		return performanceA(salary)
	}

	if(performanceLevel === 'B'){
		return performanceB(salary)
	}

}

calculateBonus('A', 1000)

/**
 * 使用策略模式重构代码
 */

// 策略类
var performanceS = function(){}
performanceS.prototype.calculate = function(salary){
	return salary * 4
}

var performanceA = function(){}
performanceA.prototype.calculate = function(salary){
	return salary * 3
}

var performanceB = function(){}
performanceB.prototype.calculate = function(salary){
	return salary * 2
}

// 奖金类
var Bonus = function(){
	this.salary = null			// 原始工资
	this.strategy = null		// 绩效等级对应的策略对象
}
Bonus.prototype.setSalary = function(salary){
	this.salary = salary 		// 设置员工的原始工资
}
Bonus.prototype.setStrategy = function(strategy){
	this.strategy = strategy 	// 设置员工绩效等级对应的策略对象
}
Bonus.prototype.getBonus = function(){		// 取得奖金数额
	return this.strategy.calculate(this.salary)		// 把计算奖金的操作委托给对应的策略对象
}

var bonus = new Bonus()

bonus.setSalary(10000)
bonus.setStrategy(new performanceS)		// 设置策略对象

console.log(bonus.getBonus())

bonus.setStrategy(new performanceA)		// 设置策略对象
console.log(bonus.getBonus())