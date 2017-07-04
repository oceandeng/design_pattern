/**
 * 引用父对象
 */

var Folder = function(name){
	this.name = name;
	this.parent = null;
	this.files = []
}

Folder.prototype.add = function(file){
	file.parent = this;		// 设置父对象
	this.files.push(file)
}

Folder.prototype.scan = function(){
	console.log('开始扫描文件夹：' + this.name)
	for(var i = 0, file, files = this.files; files[i++];){
		file.scan()
	}
}

// 移除方法
Folder.prototype.remove = function(){
	if(!this.parent){	// 根节点或者树外的游离节点
		return;
	}
	for(var files = this.parent.files, l = files.length - 1; l >= 0; l--){
		var file = files[l]
		if(file === this){
			files.splice(l, 1)
		}
	}
}


var File = function(name){
	this.name = name
	this.parent = null
}

File.prototype.add = function(){
	throw new Error('不能添加在文件下面')
}

File.prototype.scan = function(){
	console.log('开始扫描文件：' + this.name)
}

File.prototype.remove = function(){
	if(!this.parent){
		return
	}
	for(var files = this.parent.files, l = files.length - 1; l >= 0; l--){
		var file = files[l]
		if(file === this){
			files.splice(l, 1);
		}
	}
}

// test

var folder = new Folder('学习资料')
var folder1 = new Folder('Javascript')
var file1 = new File('深入浅出Node.js')

folder1.add(new File('Javascript设计模式与开发实践'))
folder.add(folder1)
folder.add(file1)

folder1.remove()
folder.scan()