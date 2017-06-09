var cache = []

var miniConsole = {
	log: function(){
		var args = arguments
		cache.push(function(){
			return miniConsole.log.apply(miniConsole, args)
		})
	}
}

miniConsole.log(1)

var handler = function(ev){
	if(ev.keycode === 113){
		var script = document.createElement('script')
		script.onload = function(){
			for(var i = 0, fn; fn = cache[i++];){
				fn()
			}
		}
		script.src = 'miniConsole.js'
		document.getElementsByTagName('head')[0].appendChild(script)
	}
}

miniConsole = {
	log: function(){
		// 真正的代码
		console.log(Array.prototype.join.call(arguments))
	}
}


var miniConsole = (function(){
	var cache = []
	var handler = function(ev){
		if(ev.keycode === 113){
			var script = document.createElement('script')
			script.onload = function(){
				for(var i = 0, fn; fn = cache[i++];){
					fn()
				}
			}
			script.src = 'miniConsole.js'
			document.getElementsByTagName('head')[0].appendChild(script)
			document.body.removeEventListener('keydown', handler); 		// 只加载一次miniConsole.js
		}
	}

	document.body.addEventListener('keydown', handler, false)

	return {
		log: function(){
			var args = arguments;
			cache.push(function(){
				return miniConsole.log.apply(miniConsole, args)
			})
		}
	}
})()

miniConsole.log(11)

miniConsole = {
	log: function(){
		// 真正代码 略
		console.log(Array.prototype.join.call(arguments))
	}
}




