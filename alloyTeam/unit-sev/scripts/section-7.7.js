/**
 * 迭代器模式的应用举例
 */
var getUploadObj = function(){
	try{
		return new ActiveXObject('TXFTNActiveX.FTNUpload')		// IE上传控件
	}catch(e){
		if(supportFlash()){
			var str = '<object type="application/x-shockwave-flash"></object>'
			return $(str).appendTo($('body'))
		}else{
			var str = '<input name="file" type="file" />'		// 表单上传
			return $(str).appendTo($('body'))
		}
	}
}

/**
 * 迭代器模式
 */
var getActiveUploadObj = function(){
	try{
		return new ActiveXObject('TXFTNActiveX.FTNUpload')		// IE上传控件
	}catch(e){
		return false
	}
}

var getFlashUploadObj = function(){
	if(supportFlash()){
		var str = '<object type="application/x-shockwave-flash"></object>'
		return $(str).appendTo($('body'))
	}
	return false
}

var getFormUploadObj = function(){
	var str = '<input name="file" type="file" class="ui-file" />'		// 表单上传
	return $(str).appendTo($('body'))
}

// 可以添加更多
var getWebkitUploadObj = function(){

}

var getHtml5UploadObj = function(){

}


// 迭代器代码
var iteratorUploadObj = function(){
	for(var i = 0, fn; fn = arguments[i++];){
		var uploadObj = fn()
		if(uploadObj !== false){
			return uploadObj
		}
	}
}

// 依照优先级添加到迭代器 
var uploadObj = iteratorUploadObj(getActiveUploadObj, getFlashUploadObj, getFormUploadObj)

