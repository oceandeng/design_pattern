/**
 * 用职责链模式获取文件上传对象
 */

var getActiveUploadObj = function(){
	try{
		return new ActiveXObject('TXFTNActiveX.FTNUpload')		// IE上传控件
	}catch(e){
		return 'nextSuccessor'
	}
}

var getFlashUploadObj = function(){
	if(supportFlash()){
		var str = '<object type="application/x-shockwave-flash"></object>'
		return $(str).appendTo($('body'))
	}
	return 'nextSuccessor'
}

var getFormUploadObj = function(){
	return $('<form><input type="file" name="file" /></form>').appendTo($('body'))
}

var getUploadObj = getActiveUploadObj.after(getFlashUploadObj).after(getFormUploadObj)
console.log(getUploadObj())