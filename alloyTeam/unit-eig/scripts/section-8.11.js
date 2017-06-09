/**
 * 全局事件的命名冲突
 */

/******************** 先发布后订阅 ************************/
Event.trigger('click', 1)
Event.listen('click', function(a){
	console.log(a)
})

/******************** 使用命名空间 ************************/
Event.create('namespace1').listen('click', function(a){
	console.log(a)
})
Event.create('namespace1').trigger('click', 1)

Event.create('namespace2').listen('click', function(a){
	console.log(a)
})
Event.create('namespace2').trigger('click', 2)

