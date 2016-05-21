/*
* @Author: ocean_deng
* @Date:   2016-03-27 21:14:10
* @Last Modified by:   ocean_deng
* @Last Modified time: 2016-04-04 22:15:49
*/
/************************************************
	Publish/Subscribe (发布/订阅) 模式 S
	## tips: 避免订阅者和发布者之间产生依赖关系 松散耦合
***********************************************/
// 简单的Mail处理程序
	/*
	var mailCounter = 0;

	var subscriber1 = subscribe("inbox/newMessage", function(topic, data){
		console.log("A new message was received: ", topic);

		$(".messageSender").html(data.sender);
		$(".messagePreview").html(data.body);
	});

	var subscriber2 = subscribe("inbox/newMessage", function(topic, data){
		$('.newMessageCounter').html(mailCounter++);
	});

	publish('inbox/newMessage', [{
		sender: 'hello@google.com',
		body: 'Hey there! How are you doing today?'
	}]);
	*/

/***********************
	(发布/订阅) 模式 E
************************/ 

// -- 使用上述Publish/Subscribe 实现
var messageLogger = function(topics, data){
	console.log("Logging: " + topics + ": " + data);
}

var subscription = pubsub.subscribe("inbox/newMessage", messageLogger);

pubsub.publish("inbox/newMessage", "hello world!");

pubsub.publish("inbox/newMessage", ["test", "a", "b", "c"]);

pubsub.publish("inbox/newMessage", {
	sender: "hello@google.com",
	body: "Hey again"
});

pubsub.publish("inbox/newMessage", "Hello! are you still there !");

// *******************************************************************

// -- 用户界面通知
// 在newDataAvailable topic上创建一个订阅
var subscriber = pubsub.subscribe("newDataAvailable", gridUpdate);

// 返回稍后界面上要用到的当前本地时间
function getCurrentTime(){
	var date = new Date(),
			m = date.getMonth() + 1,
			d = date.getDate(),
			y = date.getFullYear(),
			t = date.toLocaleTimeString().toLowerCase();

	return (m + "/" + d + "/" + y + " " + t);
}

// 向网格组件上添加新数据
function addGridRow(data){
	// ui.grid.addRow(data);
	console.log("updated grid component with:" + data);
}

// 更新网格上的最新更新时间
function updateCounter(data){
	// ui.grid.updateLastChangen(getCurrentTime());
	console.log("data last updated at:" + getCurrentTime() + " with " + data);
}

// 使用传递给订阅者的数据data更新网格
function gridUpdate(topic, data){
	if(data !== "undefined"){
		// grid.addGridRow(data);
		// grid.updateCounter(data);
		addGridRow(data);
		updateCounter(data);
	}
};

// 下面的代码描绘了数据层，一般应该使用ajax请求获取最新的数据后，告知程序有最新数据
pubsub.publish("newDataAvailable", {
	summary: "Apple made $5 billion",
	identifier: "APPL",
	stockPrice: 570.91
});

pubsub.publish("newDataAvailable", {
	summary: "Microsoft made $20 million",
	identifier: "MSFT",
	stockPrice: 30.85
});

// *******************************************************************

