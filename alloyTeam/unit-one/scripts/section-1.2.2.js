/*
* @Author: web
* @Date:   2017-06-01 16:17:43
* @Last Modified by:   denghaiyang
* @Last Modified time: 2017-06-01 16:25:12
*/

'use strict';

var makeSound = function(animal){
	animal.sound()
}


var Duck = function(){}

Duck.prototype.sound = function(){
	console.log('嘎嘎嘎')
}

var Chicken = function(){}

Chicken.prototype.sound = function(){
	console.log('咯咯咯')
}

makeSound(new Duck())
makeSound(new Chicken())

var Dog = function(){}

Dog.prototype.sound = function(){
	console.log('汪汪汪')
}

makeSound(new Dog())