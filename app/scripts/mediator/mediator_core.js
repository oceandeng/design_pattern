/*
* @Author: ocean_deng
* @Date:   2016-04-10 16:44:41
* @Last Modified by:   ocean_deng
* @Last Modified time: 2017-02-24 13:13:56
*/

// Mediator 的简单实现原理 S
var mediator = (function(){

	// 存储可被广播或监听的topic
	var topics = {};

	// 订阅一个topic，提供一个回调函数，一旦topic被广播就执行该回调函数
	var subscribe = function(topic, fn){
		if(!topics[topic]){
			topics[topic] = [];
		}
		topics[topic].push({context: this, callback: fn});

		return this;
	};

	// 发布/广播事件到程序的剩余部分
	var publish = function(topic){

		var args;

		if(!topics[topic]){
			return false;
		}

		args = Array.prototype.slice.call(arguments, 1);
		for(var i = 0, l = topics[topic].length; i < l; i++){
			var subscription = topics[topic][i]
			subscription.callback.apply(subscription.context, args);
		}
		return this;
	};

	return {
		publish: publish,
		subscribe: subscribe,
		installTo: function(obj){
			obj.subscribe = subscribe;
			obj.publish = publish;
		}
	};

})();
// Mediator 的简单实现原理 E


// Mediator 高级实现 S
// 将context上下文传递给订阅者，默认上下文是window对象
(function(root){

	function guidGenerator(){/*..*/};

	// 订阅者构造函数
	function Subscriber(fn, options, context){

		if(!this instanceof Subscriber){
			return new Subscriber(fn, context, options);
		}else{
			// guidGenerator()是一个函数，用于为订阅者生成GUID，以便以后很方便的引用他们
			// 为了简洁，跳过具体实现
			this.id = guidGenerator();
			this.fn = fn;
			this.options = options;
			this.context = context;
			this.topic = null;
		}
	};

	// 模拟Topic
	// Javascript 允许我们使用Function对象作为原型的结合与新对象和构造函数一起调用
	function Topic(namespace){
		if(!this instanceof Topic){
			return new Topic(namespace);
		}else{
			this.namespace = namespace || "";
			this._callbacks = [];
			this._topics = [];
			this.stopped = false;
		}
	}

	// 定义topic的prototype原型，包括添加订阅者和获取订阅者的方式
	Topic.prototype = {

		// 添加新订阅者
		AddSubscriber: function(fn, options, callback){
			var callback = new Subscriber(fn, options, callback);

			this._callbacks.push(callback);
			callback.topic = this;

			return callback;
		},
		// 调用进一步的回调传播
		StopPropagation: function(){
			this.stopped = true;
		},
		// 当给定GUID标识符时，很容易获取现有的订阅者
		GetSubscriber: function(identifier){
			for(var x = 0, y = this._callbacks.length; x < y; x++){
				if(this._callbacks[x].id == identifier || this._callbacks[x].fn == identifier){
					return this._callbacks[x];
				}
			}

			for(var z in this._topics){
				if(this._topics.hasOwnProperty(z)){
					var sub = this._topics[z].GetSubscriber(identifier);
					if(sub !== undefined){
						return sub;
					}
				}
			}
		},
		// 提供简单方法来添加新Topic、检查现有topic或获取topic
		AddTopic: function(topic){
			this._topics[topic] = new Topic((this.namespace ? this.namespace + ":" : "") + topic);
		},
		HasTopic: function(topic){
			return this._topics.hasOwnProperty(topic);
		},
		ReturnTopic: function(topic){
			return this._topics[topic];
		},
		// 删除一位订阅者
		RemoveSubscriber: function(identifier){
			if(!identifier){
				this._callbacks = [];

				for(var z in this._topics){
					if(this._topics.hasOwnProperty(z)){
						this._topics[z].RemoveSubscriber(identifier);
					}
				}
			}

			for(var y = 0, x = this._callbacks.length; y < x; y++){
				if(this._callbacks[y].fn == identifier || this._callbacks[y].id == identifier){
					this._callbacks[y].topic = null;
					this._callbacks.splice(y, 1);
					x--;
					y--;
				}
			}
		},
		// 通过子topic递归向订阅者发布（Publish）任意参数
		Publish: function(data){
			for(var y = 0, x = this._callbacks.length; y < x; y++){
				var callback = this._callbacks[y], l;
				callback.fn.apply(callback.context, data);

				l = this._callbacks.length;

				if(l < x){
					y--;
					x = 1;
				}
			}

			for(var x in this._topics){
				if(!this.stopped){
					if(this._topics.hasOwnProperty(x)){
						this._topics[x].Publish(data);
					}
				}
			}

			this.stopped = false;
		}
	};

	// 这里暴露了我们将主要与之交互的Mediatro实例
	function Mediator(){
		if(!this instanceof Mediator){
			return new Mediator();
		}else{
			this._topics = new Topic("");
		}
	};

	// GetTopic根据命名空间返回相应的主题实例
	Mediator.prototype = {
		GetTopic: function(namespace){
			var topic = this._topics,

			namespaceHierarchy = namespace.split(":");
			if(namespace === ""){
				return topic;
			}

			if(namespaceHierarchy.length > 0){
				for(var i = 0, j = namespaceHierarchy.length; i < j; i++){
					if(!topic.HasTopic(namespaceHierarchy[i])){
						topic.AddTopic(namespaceHierarchy[i]);
					}
					topic = topic.ReturnTopic(namespaceHierarchy[i]);
				}
			}

			return topic;
		},
		Subscribe: function(topicName, fn, options, context){
			var options = options || {},
				context = context || {},
				topic = this.GetTopic(topicName),
				sub = topic.AddSubscriber(fn, options, context);

			return sub;
		},
		// 通过给定的订阅者ID/命名函数和topic命名空间返回一个订阅者
		GetSubscriber: function(identifier, topic){
			return this.GetTopic(topic || "").GetSubscriber(identifier);
		},
		// 通过给定的订阅者ID或命名函数，从给定的topic命名空间递归删除订阅者
		Remove: function(topicName, identifier){
			this.GetTopic(topicName).RemoveSubscriber(identifier);
		},
		// Mediator.Publish("inbox:messages:new", [args]);
		Publish: function(topicName){
			var args = Array.prototype.slice.call(arguments, 1),
				topic = this.GetTopic(topicName);

			args.push(topic);
			this.GetTopic(topicName).Publish(args);
		}
	};

	// 传递window对象作为Mediator的附加对象
	root.Mediator = Mediator;
	Mediator.Topic = Topic;
	Mediator.Subscriber = Subscriber;

})(window);

// Mediator 高级实现 E
