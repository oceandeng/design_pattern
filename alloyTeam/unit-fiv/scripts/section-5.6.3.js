/**
 * 策略对象 验证规则
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

/**
 * Valitor类
 */
var Validator = function(){
	this.cache = []
}

Validator.prototype.add = function(dom, rules){
	var self = this

	for(var i = 0, rule; rule = rules[i++];){
		(function(rule){
			var strategyAry = rule.strategy.split(':')
			var errorMsg = rule.errorMsg

			self.cache.push(function(){
				var strategy = strategyAry.shift()
				strategyAry.unshift(dom.value)
				strategyAry.push(errorMsg)
				return strategies[strategy].apply(dom, strategyAry)
			})
		})(rule)
	}
}

Validator.prototype.start = function(){
	for(var i = 0, validatorFunc; validataFunc = this.cache[i++];){
		if(errorMsg){
			return errorMsg
		}
	}
}

/**
 * 客户调用代码
 */
var registerForm = document.getElementById('registerForm')

var validataFunc = function(){
	var validator = new Validator()

	validator.add(registerForm.userName, [{
		strategy: 'isNonEmpty',
		errorMsg: '用户名不能为空'
	},{
		strategy: 'minLength:10',
		errorMsg: '用户名长度不能小于10位'
	}])

	validator.add(registerForm.password, [{
		strategy: 'minLength:6',
		errorMsg: '密码长度不能小于6位'
	}])

	validator.add(registerForm.phoneNumber, [{
		strategy: 'isMobile',
		errorMsg: '手机号码格式不正确'
	}])

	var errorMsg = validator.start()
	return errorMsg
}

registerForm.onsubmit = function(){
	var errorMsg = validatorFunc()

	if(errorMsg){
		console.log(errorMsg)
		return false
	}
}