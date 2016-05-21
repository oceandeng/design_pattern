// demo one
// var myCar = {
// 	name: "Ford Escort",
// 	drive: function(){
// 		console.log("Weee. I`m driving!");
// 	},
// 	panic: function(){
// 		console.log("Wait. How do you stop this thing?");
// 	}
// };

// 使用Object.create实例化一个新Car
// var yourCar = Object.create(myCar);
// console.log(yourCar.name);

// // demo two
// var vehicle = {
// 	getModel: function(){
// 		console.log("The model of this vehicle is .." + this.model);
// 	}
// };

// var car = Object.create(vehicle, {
// 	"id": {
// 		// value: MY_GLOBAL.nextId(),
// 		value: 0,
// 		// writable: false, configurable: false 默认值
// 		enumerable: true
// 	},
// 	"model": {
// 		value: "Ford",
// 		enumerable: true
// 	}
// });

// car.getModel();

// demo three
var vehiclePrototype = {
	init: function(carModel){
		this.model = carModel;
	},
	getModel: function(){
		console.log("The model of this vehicle is.." + this.model);
	}
}

function vehicle (model){
	function F(){};
	F.prototype = vehiclePrototype;

	var f = new F();
	f.init(model);
	return f;
}

var car = vehicle("Ford Escort");
car.getModel();

var beget = (function(){
	function F(){};
	return function(proto){
		F.prototype = proto;
		return new F();
	};
})();