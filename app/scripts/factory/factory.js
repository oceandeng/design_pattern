/*
* @Author: ocean_deng
* @Date:   2016-09-11 18:46:32
* @Last Modified by:   ocean_deng
* @Last Modified time: 2016-09-11 21:03:36
*/

'use strict';

// 定义Car构造函数
function Car(options){

	// 默认值
	this.doors = options.doors || 4;
	this.state = options.state || 'brand new';
	this.color = options.color || 'silver';
}

// 定义Truck构造函数
function Truck(options){

	// 默认值
	this.state = options.state || 'used';
	this.wheelSize = options.wheelSize || 'large';
	this.color = options.color || 'blue';
}

// 定义Vehicle工厂的代码
function VehicleFactory(){};

// 定义该工厂factory的原型和试用工具，默认的vehicleClass是Car
VehicleFactory.prototype.vehicleClass = Car;

// 创建Vehicle实例的工厂方法
VehicleFactory.prototype.createVehicle= function(options){

	if(options.vehicleType === "car"){
		this.vehicleClass = Car;
	}else{
		this.vehicleClass = Truck;
	}

	return new this.vehicleClass(options);
}

// 创建生成汽车的工厂实例
var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
	vehicleType: "car",
	color: 'yellow',
	doors: 6
});

// 测试汽车是由vehicleClass的原型prototype里的Car创建的
// 输出true
console.log(car instanceof Car);


var movingTruck = carFactory.createVehicle({
	vehicleType: 'truck',
	state: 'like new',
	color: 'red',
	wheelSize: 'small'
});

// 测试汽车是由vehicleClass的原型prototype里的Truck创建的
// 输出true
console.log(movingTruck instanceof Truck);
console.log(movingTruck);

function TruckFactory(){}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();

var myBigTruck = truckFactory.createVehicle({
	state: 'omg..so bad.',
	color: 'pink',
	wheelSize: 'so big'
});

// 确认myBigTruck是由原型Truck创建的
// 输出true
console.log(myBigTruck instanceof Truck);
console.log(myBigTruck);


// 抽象工厂 abstract factory
var AbstracVehicleFactory = (function(){

	// 存储车辆类型
	var type = {};

	return{
		getVehicle: function(type, customizations){
			var Vehicle = types[type];
			return (Vehicle) ? new Vehicle(customizations) : null;
		},
		registerVehicle: function(type, Vehicle){
			var proto = Vehicle.prototype;

			// 只注册实现车辆契约的类
			if(proto.drive && proto.breakDown){
				types[type] = Vehicle;
			}

			return AbstracVehicleFactory;
		}
	}

})();

// 使用方法
AbstracVehicleFactory.registerVehicle("car", Car);
AbstracVehicleFactory.registerVehicle("truck", Truck);

// 基于抽象车辆类型实例化一个新car对象
var car = AbstracVehicleFactory.getVehicle("car", {
	color: 'lime green',
	state: 'like new'
})

// 同理实例化一个新truck对象
var truck = AbstracVehicleFactory.getVehicle("truck", {
	wheelSize: 'memium',
	color: 'neon yellow'
})