/**
 * 享元模式
 */

// 普通模式
var Model = function(sex, underwear){
	this.sex = sex
	this.underwear = underwear
}

Model.prototype.takePhoto = function(){
	console.log('sex= ' + this.sex + 'underwear= ' + this.underwear)
}

for(var i = 1; i <= 50; i++){
	var maleModel = new Model('male', 'underwear' + i)
	maleModel.takePhoto()
}

for(var j = 1; j <= 50; j++){
	var femaleModel = new Model('female', 'underwear' + j)
	femaleModel.takePhoto()
}


// 享元模式优化
var Model = function(sex){
	this.sex = sex
}

Model.prototype.takePhoto = function(){
	console.log('sex= ' + this.sex + 'underwear= ' + this.underwear)
}

var maleModel = new Model('male'),
	femaleModel = new Model('female');

// 给男模特穿上所有男装，并拍照
for(var i = 1; i <= 50; i++){
	maleModel.underwear = 'underwear' + i
	maleModel.takePhoto();
}

// 给女模特穿上所有女装，并拍照
for(var i = 1; i <= 50; i++){
	femaleModel.underwear = 'underwear' + i
	femaleModel.takePhoto();
}

