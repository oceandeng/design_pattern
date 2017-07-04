/**
 * 灵活可拆分的职责链模式
 */

var order500 = function(orderType, pay, stock){
	if(orderType === 1 && pay === true){
		console.log('500元定金预购，得到100优惠券')
	}else{
		return 'nextSuccessor'		// 我不知道下一个节点是谁，反正把请求往后面传递
	}
}

var order200 = function(orderType, pay, stock){
	if(orderType === 2 && pay === true){
		console.log('200元定金预定，得到50元优惠券')
	}else{
		return 'nextSuccessor'
	}
}

var orderNormal = function(orderType, pay, stock){
	if(orderType === 1 && pay === true){
		console.log('普通购买，无优惠券')
	}else{
		return 'nextSuccessor'
	}
}

/**
 * constructor Chain
 * Chain.prototype.setNextSuccessor 指定在链中的下一个节点
 * Chain.prototype.passRequest 传递请求给某个节点
 */

var Chain = function(fn){
	this.fn = fn
	this.successor = null
}

Chain.prototype.setNextSuccessor = function(successor){
	return this.successor = successor
}

// 异步职责链
Chain.prototype.next = function(){
	return this.successor && this.successor.passRequest.apply(this.successor, arguments)
}

Chain.prototype.passRequest = function(){
	var ret = this.fn.apply(this, arguments)

	if(ret === 'nextSuccessor'){
		return this.successor && this.successor.passRequest.apply(this.successor, arguments)
	}

 	return ret
}

// 3个订单函数包装成职责链节点
var chainOrder500 = new Chain(order500)
var chainOrder200 = new Chain(order200)
var chainOrderNormal = new Chain(orderNormal)

chainOrder500.setNextSuccessor(chainOrder200)
chainOrder200.setNextSuccessor(chainOrderNormal)

chainOrder500.passRequest(1, true, 500)
chainOrder500.passRequest(2, true, 500)
chainOrder500.passRequest(3, true, 500)
chainOrder500.passRequest(1, false, 0)


// 支持300元定金购买
// 修改职责链

var order300 = function(){
	// 具体实现略
}

var chainOrder300 = new Chain(order300)
chainOrder500.setNextSuccessor(chainOrder300)
chainOrder300.setNextSuccessor(chainOrder200)


// 异步的例子

var fn1 = new Chain(function(){
	console.log(1)
	return 'nextSuccessor'
})

var fn2 = new Chain(function(){
	console.log(2)
	var self = this
	setTimeout(function(){
		self.next()
	}, 1000)
})

var fn3 = new Chain(function(){
	console.log(3)
})

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3)
fn1.passRequest()