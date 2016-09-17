/*
* @Author: ocean_deng
* @Date:   2016-09-16 20:12:00
* @Last Modified by:   ocean_deng
* @Last Modified time: 2016-09-16 22:10:54
*/

'use strict';

// loadScript('scripts/test.js', function(){
// 	console.log('aa');
// })


// LazyLoad.js(['scripts/test.js'], function(){
// 	console.log('application init')
// })

$LAB.script('scripts/test.js')
	.wait(function(){
		console.log('LAB.js')
	})