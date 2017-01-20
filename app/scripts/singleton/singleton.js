/*
* @Author: ocean_deng
* @Date:   2016-09-16 18:27:26
* @Last Modified by:   denghaiyang
* @Last Modified time: 2017-01-20 10:14:32
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


/*
 * singleton 单体
 */

var mySingleton = (function(){

	// 实例存储了该单体的引用
	var instance;
	function init(){
		// 单体
		// 私有方法和变量
		function privateMethod(){
			console.log('I am private')
		}

		var privateVariable = 'I`m also private'
		var privateRandomNumber = Math.random();

		return {
			// 公有方法和变量
			publicMethod: function(){
				console.log('The public can see me!')
			},
			publicProperty: 'I am also public',
			getRandomNumber: function(){
				return privateRandomNumber
			}
		}

	}

	return {
		// 如果存在的话，就获取该单体实例
		// 如果存在的话，就创建一个单体实例
		getInstance: function(){
			if(!instance){
				instance = init()
			}
			return instance
		}		
	}
})()