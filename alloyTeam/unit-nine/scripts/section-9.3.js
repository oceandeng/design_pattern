/**
 * 闭包实现
 */

var button = document.getElementById('button')

var setCommand = function(button, func){
	button.onclick = function(){
		func()
	}
}

var MenuBar = {
	refresh: function(){
		console.log('刷新菜单界面')
	}
}

var RefreshMenuBarCommand = function(receiver){
	return function(){
		receiver.refresh()
	}
}

var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar)

setCommand(button, refreshMenuBarCommand)


/**
 * 闭包带 execute 方法
 */
var RefreshMenuBarCommand = function(receiver){
	return {
		execute: function(){
			receiver.execute()
		}
	}
}

var setCommand = function(button, command){
	button.onclick = function(){
		command.execute()
	}
}

var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar)
setCommand(button, refreshMenuBarCommand)