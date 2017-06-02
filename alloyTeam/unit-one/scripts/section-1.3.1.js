var myObject = (function(){
	var __name = 'sven';	// 私有(private)变量
	return {
		getName: function(){	// 公开(public)方法
			return __name
		}
	}
})();

console.log(myObject.getName())	// 'sven'
console.log(myObject.__name) // undefined