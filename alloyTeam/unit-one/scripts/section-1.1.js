/*
* @Author: web
* @Date:   2017-06-01 15:25:05
* @Last Modified by:   web
* @Last Modified time: 2017-06-01 15:38:52
*/

'use strict';

var duck = {
	duckSinging: function(){
		console.log('嘎嘎嘎')
	}
}

var chicken = {
	duckSinging: function(){
		console.log('嘎嘎嘎')
	}
}

var choir = [];		// 合唱班

var joinChoir = function(animal){
	if(animal && typeof animal.duckSinging === 'function'){
		choir.push(animal)
		console.log('恭喜加入合唱团')
		console.log('合唱团已有成员数量：' + choir.length)
	}
}

joinChoir(duck)
joinChoir(chicken)