// 丢失的 this

var obj = {
	myName: 'sven',
	getName: function(){
		return this.myName
	}
}

console.log(obj.getName())

var getName2 = obj.getName 	// 'sven'
console.log(getName2()) 	// undefined