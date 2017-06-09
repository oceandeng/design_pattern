/**
 * 用策略模式验证表单
 */

var strategies = {
	isNonEmpty: function(value, errorMsg){		// 不为空
		if(value == ''){
			return errorMsg
		}
	},
	minLength: function(value, length, errorMsg){		// 限制最小长度
		if(value.length < length){
			return errorMsg
		}
	},
	isMobile: function(value, errorMsg){		// 手机号码格式
		var pattern = /(^1[358][0-9]{9}$)/;
		if(!pattern.test(value)){
			return errorMsg
		}
	}
}


var validataFunc = function(){

	var validator = new Validator()		// 创建一个validator对象

	// 添加一些校验规则
	validator.add(registerForm.username, 'isNonEmpty', '用户名不能为空')
	validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位')
	validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确')

	var errorMsg = validator.start()	// 获取校验结果
	return errorMsg
}

var registerForm = document.getElementById('registerForm')
registerForm.onsubmit = function(){
	var errorMsg = validataFunc()		// 如果errorMsg有确切的返回值，说明为通过校验
	if(errorMsg){
		console.log(errorMsg)
		return false	// 阻止表单提交
	}
}

/**
 * validator 类
 */
var Validator = function(){
	this.cache = []		// 保存校验规则
}

Validator.prototype.add = function(dom, rule, errorMsg){
	var ary = rule.split(':')		// 把strategy 和参数分开
	this.cache.push(function(){		// 把校验的步骤用空函数包装起来，并且放入cache
		var strategy = ary.shift()
		ary.unshift(dom.value)
		ary.push(errorMsg)
		return strategies[strategy].apply(dom, ary)
	})
}

Validator.prototype.start = function(){
	for(var i = 0, validatorFunc; validatorFunc == this.cache[i++]){
		var msg = validataFunc()		// 开始校验，并取得校验后的返回信息
		if(msg){		// 如果有确切的返回值，说明校验没有通过
			return msg
		}
	}
}