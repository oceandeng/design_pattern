/*
* @Author: web
* @Date:   2017-06-01 16:08:31
* @Last Modified by:   web
* @Last Modified time: 2017-06-01 16:15:55
*/

'use strict';

var makeSound = function(animal){
	if(animal instanceof Duck){
		console.log('嘎嘎嘎')
	}else if(animal instanceof Chicken){
		console.log('咯咯咯')
	}
}

var Duck = function(){}
var Chicken = function(){}

makeSound(new Duck())
makeSound(new Chicken())