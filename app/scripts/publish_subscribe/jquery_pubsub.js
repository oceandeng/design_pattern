/*
* @Author: ocean_deng
* @Date:   2016-04-04 23:03:41
* @Last Modified by:   ocean_deng
* @Last Modified time: 2016-04-05 10:20:03
*/

// *******************************************************************

/* jQuery Tiny Pub/Sub - v0.7 - 10/27/2011
 * http://benalman.com/
 * Copyright (c) 2011 "Cowboy" Ben Alman; Licensed MIT, GPL */

(function($) {

	var o = $({});

	$.subscribe = function() {
		o.on.apply(o, arguments);
	};

	$.unsubscribe = function() {
		o.off.apply(o, arguments);
	};

	$.publish = function() {
		o.trigger.apply(o, arguments);
	};

}(jQuery));

// *******************************************************************

;(function($){

	// 订阅new user 主题，提交评论的时候在用户列表上添加一个用户
	$.subscribe("/new/user", function(e, data){

		var compiledTemplate;
		if(data){
			compiledTemplate = _.template($("#userTemplate").html());

			$("#users").append(compiledTemplate(data));
		}
	});

	// 订阅new rating主题，rating主题由title和rating组成，新rating添加到已有用户的rating列表上
	$.subscribe("/new/rating", function(e, data){

		var compiledTemplate;
		if(data){
			compiledTemplate = _.template($("#ratingsTemplate").html());
			$("#ratings").append(compiledTemplate(data));
		}
	});

	// 添加新用户处理程序
	$("#add").on('click', function(e){
		e.preventDefault();
		var strUser = $("#twitter_handle").val(),
			strMovie = $("#movie_seen").val(),
			strRating = $("#movie_rating").val();

		// 通知程序，新用户有效
		$.publish("/new/user", {name: strUser});
		// 通知程序新rating评价有效
		$.publish("/new/rating", {title: strMovie, rating: strRating});
	});

})(jQuery);