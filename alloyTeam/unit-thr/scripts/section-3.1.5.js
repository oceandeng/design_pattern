// 闭包实现 command 模式
var Tv = {
	open: function(){
		console.log('打开电视机')
	},
	close: function(){
		console.log('关上电视机')
	}
}

var createCommand = function(receiver){
	var execute = function(){
		return receiver.open()		// 执行命令，打开电视机
	}
	var undo = function(){
		return receiver.close()		// 执行命令，关闭电视机
	}

	return {
		execute: execute,
		undo: undo
	}	
}

var setCommand = function(command){
	document.getElementById('execute').onclick = function(){
		command.execute()
	}
	document.getElementById('undo').onclick = function(){
		command.undo()
	}
}

setCommand(createCommand(Tv))

 


