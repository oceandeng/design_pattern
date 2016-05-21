$("#charForm").on("submit", function(e){
	e.preventDefault();

	// 从UI上获取chat的数据
	var text = $("#chatBox").val(),
		from = $("#fromBox").val(),
		to = $("#toBox").val();

	// 将数据发布到newMessage主题上
	mediator.publish('newMessage', {message: text, from: from, to: to});
});

// 将新消息附加到聊天结果记录上
function displayChat(data){
	var date = new Date(),
		msg = data.from + " said\"" + data.message + "\" to " + data.to;

	$("#chatResult").prepend("" + msg + "(" + date.toLocaleTimeString() + ")"); 
}

// 记录消息日志
function logChat(data){
	if(window.console){
		console.log(data);
	}
}

// 通过mediator订阅新提交的newMessage主题
mediator.subscribe("newMessage", displayChat);
mediator.subscribe("newMessage", logChat);

// 如下代码仅在高级代码实现上可以使用
function amITalkingToMyself(data){
	return data.form === data.to;
}

function iAmClearlyCrazy(data){
	$("#chatResult").prepend("" + data.from + " is talking to himself.");
}

mediator.subscribe(amITalkingToMyself, iAmClearlyCrazy);