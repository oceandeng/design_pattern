/**
 * 职责链模式
 */

// 500元订单
var order500 = function(orderType, pay, stock){
	if(orderType === 1 && pay === true){
		console.log('500元定金预购，得到100优惠券')
	}else{
		order200(orderType, pay, stock)		// 将请求传递给200元订单
	}
}

// 200元订单
var order200 = function(orderType, pay, stock){
	if(orderType === 2 && pay === true){
		console.log('200元定金预购，得到50元优惠券')
	}else{
		orderNormal(orderType, pay, stock)
	}
}

// 普通购买订单
var orderNormal = function(orderType, pay, stock){
	if(stock > 0){
		console.log('普通购买，无优惠券')
	}else{
		console.log('手机库存不足')
	}
}

order500(1, true, 500)
order500(1, false, 500)
order500(2, true, 500)
order500(3, false, 500)
order500(3, false, 0)