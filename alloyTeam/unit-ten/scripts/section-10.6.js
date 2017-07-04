/**
 * 透明性带来的安全问题
 */

var MacroCommand = function(){
	return {
		commandList: [],
		add: function(){
			this.commandList.push(command)
		},
		execute: function(){
			for(var i = 0, command; command = this.commandList[i++];){
				command.execute()
			}
		}
	}
}

var openTvCommand = {
	execute: function(){
		console.log('打开电视');
	},
	add: function(){
		throw new Error('叶对象不能添加子节点')
	}
}

var macroCommand = MacroCommand()

macroCommand.add(openTvCommand)
openTvCommand.add(macroCommand)			// Uncaught: Error: 叶对象不能添加子节点