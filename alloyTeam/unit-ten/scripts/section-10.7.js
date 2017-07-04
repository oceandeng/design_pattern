/**
 * 组合模式的例子 --- 扫描文件夹
 */

/************ Folder ************/
var Folder = function(name){
	this.name = name;
	this.files = [];
}

Folder.prototype.add = function(file){
	this.files.push(file);
}

Folder.prototype.scan = function(){
	console.log('开始扫描文件夹：' + this.name)
	for(var i = 0, file, files = this.files; file = files[i++];){
		file.scan()
	}
}

/************* File *************/
var File = function(name){
	this.name = name
}

File.prototype.add = function(){
	throw new Error('文件下面不能再添加文件');
}

File.prototype.scan = function(){
	console.log('开始扫描文件：' + this.name)
}

var folder = new Folder('学习资料')
var folder1 = new Folder('Javascript')
var folder2 = new Folder('jQuery')

var file1 = new File('Javascript 设计模式与开发实践')
var file2 = new File('精通jQuery')
var file3 = new File('重构与模式')

folder1.add(file1)
folder2.add(file2)

folder.add(folder1)
folder.add(folder2)
folder.add(file3)


/************ 移入文件 *************/
var folder3 = new Folder('Node.js')
var file4 = new File('深入浅出Node.js')

var file5 = new File('Javascript 语言精粹与编程实践')

folder.add(folder3)
folder.add(file5)


// 开始扫描
folder.scan()