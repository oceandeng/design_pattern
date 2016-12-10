(function(root, factory){
	if(typeof exports === 'object'){
		// commonJS
		factory(exports, require('b'))
	}else if(typeof define === 'function' && define.amd){
		// AMD. 注册为一个匿名模块
		define(['exports', 'b'], factory);
	}else{
		// 浏览器全局对象
		factory((root.commonJsscript = {}), root.b);
	}
})(this, function(exports, b){
	// 附件属性到exports对象上， 以定义导出的module属性。
	exports.action = function(){

	};
})