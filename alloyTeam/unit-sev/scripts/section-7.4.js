/**
 * 迭代类数组对象和字面量对象
 * jQuery 中提供了$.each函数
 */
$.each = function(obj, callback){
	var value,
		i = 0,
		length = obj.length,
		isArray = isArraylike(obj);

	if(isArray){	// 迭代类数组
		for( ; i < length; i++){
			value = callback.call(obj[i], i, obj[i])

			if(value === false){
				break
			}
		}
	}else{
		for(i in obj){		// 迭代object对象
			value = callback.call(obj[i], i, obj[i])

			if(value === false){
				break
			}
		}
	}

	return obj
}