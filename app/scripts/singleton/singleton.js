/*
* @Author: ocean_deng
* @Date:   2016-09-16 18:27:26
* @Last Modified by:   ocean_deng
* @Last Modified time: 2016-09-16 18:41:44
*/

'use strict';

var mySingleton = (function(){

	var instance;
	function init(){
		function privateMethod(){
			console.log('I`m private');
		}
		var privateVariable = 'I`m also private';
		var privateRandomNumber = Math.random();
		return {
			publicMethod: function(){
				console.log('The public can see me');
			},
			publicProperty: 'I`m also public',
			getRandomNumber: function(){
				return privateRandomNumber;
			}
		}
	}
	return{
		getInstance: function(){
			if(!instance){
				instance = init();
			}
			return instance;
		}
	}
})();


var myBadSingleton = (function(){

	var instance;
	function init(){
		var privateRandomNumber = Math.random();
		return{
			getRandomNumber: function(){
				return privateRandomNumber;
			}
		}
	};

	return {
		getInstance: function(){
			instance = init();
			return instance;
		}	
	}
})();

var singleA = mySingleton.getInstance();
var singleB = mySingleton.getInstance();
console.log(singleA.getRandomNumber() === singleB.getRandomNumber());

var badSingleA = myBadSingleton.getInstance(); 
var badSingleB = myBadSingleton.getInstance(); 
console.log(badSingleA.getRandomNumber() !== badSingleB.getRandomNumber())



var SingletonTester = (function(){

	function Singleton(options){
		options = options || {};
		this.name = 'SingletonTester';
		this.pointX = options.pointX || 6;
		this.pointY = options.pointY || 10;
	}

	var instance;

	var _static = {
		name: 'SingletonTester',
		getInstance: function(options){
			if(instance === undefined){
				instance = new Singleton(options);
			}
			return instance;
		}
	};

	return _static;
})();

var singletonTest = SingletonTester.getInstance({
	pointX: 5
})

console.log(singletonTest.pointX);
console.log(singletonTest.pointY);