var extent = function(){
	var value = 0
	return {
		call: function(){
			value++
			console.log(value)
		}
	}
}

var extent = extent()
extent()	// 1
extent()	// 2
extent()	// 3

var extent = {
	value: 0,
	call: function(){
		this.value++
		console.log(this.value)
	}
}

extend.call()	// 1
extend.call()	// 2
extend.call()	// 3

var Extent = function(){
	this.value = 0
}
Extent.prototype.call = function(){
	this.value++
	console.log(this.value)
}

var extent = new Extent()
extent.call()
extent.call()
extent.call()