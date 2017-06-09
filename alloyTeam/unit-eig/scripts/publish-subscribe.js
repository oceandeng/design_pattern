/**
 * publish-subscribe
 */
var Event = (function(){

	var global = this,
		Event,
		_default = 'default';

	Event = function(){
		var _listen,
			_trigger,
			_remove,
			_slice = Array.prototype.slice,
			_shift = Array.prototype.shift,
			_unshift = Array.prototype.unshift,
			namespaceCache = {},
			_create,
			find,
			each = function(ary, fn){
				var ret;
				for(var i = 0, l = ary.length; i < l; i++){
					var n = ary[i]
					ret = fn.call(n, i, n)
				}
				return ret
			}
	}


})()