var Plane = function(){
	this.blood = 100
	this.attackLevel = 1
	this.defenseLevel = 1
}

var plane = new Plane()

plane.blood = 500
plane.attackLevel = 10
plane.defenseLevel = 7

var clonePlane = Object.create(plane)

console.log(plane)
console.log(clonePlane)


console.log(clonePlane.blood)
console.log(clonePlane.attackLevel)
console.log(clonePlane.defenseLevel)

// 兼容不支持Object.create()方法的浏览器
Object.create = Object.create || function(obj){
	var F = function(){}
	F.prototype = obj
	return new F()
}
