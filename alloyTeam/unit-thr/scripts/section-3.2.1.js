var appendDiv = function(callback){
	for(var i = 0; i < 100; i++){
		var div = document.createElement('div')
		div.innerHTML = i
		document.body.appendChild(div)
		if(typeof callback === 'function'){
			callback(div)
		}
	}
}

appendDiv(function(node){
	node.style.display = 'none'
})

[1, 4, 3].sort(function(a, b){
	return a - b
})