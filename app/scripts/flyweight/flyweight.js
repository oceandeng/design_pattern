// 享元优化版本
var Book = function(obj){
	this.title = obj.title;
	this.author = obj.author;
	this.genre = obj.genre;
	this.pageCount = obj.pageCount;
	this.publisherID = obj.publisherID;
	this.ISBN = obj.ISBN;
}

// 书籍工厂单例
var BookFactory = (function(){

	var existingBooks = {},
		existingBook;

	return {
		createBook: function(obj){
			existingBook = existingBooks[obj.ISBN];

			if(!!existingBook){
				return existingBook;
			}else{
				var book = new Book(obj);
				existingBooks[obj.ISBN] = book;
				return book;
			}
		}
	}
})()

// 书籍记录管理器单例
var BookRecordManager = (function(){

	var bookRecordDatabase = {};

	return {
		addBookRecord: function(obj){

			var book = BookFactory.createBook(obj);

			bookRecordDatabase[obj.id] = {
				checkoutMember: obj.checkoutMember,
				checkoutDate: obj.checkoutDate,
				dueReturnDate: obj.dueReturnDate,
				availability: obj.availability,
				book: book
			}
		},
		updateCheckoutStatus: function(obj){

			var record = bookRecordDatabase[obj.bookID];

			record.availability = obj.newStates;
			record.checkoutDate = obj.checkoutDate;
			record.checkoutMember = obj.checkoutMember;
			record.dueReturnDate = obj.dueReturnDate;
		},
		extendCheckoutPeriod: function(obj){
			bookRecordDatabase[obj.bookID].dueReturnDate = obj.newReturnDate;
		},
		isPastDue: function(bookID){
			var currentDate = new Date();
			return currentDate.getTime() > Date.parse(bookRecordDatabase[bookID].dueReturnDate);
		}
	}
})();


// 集中事件处理 accordion 组件
var stateManage = {

	fly: function(){
		var self = this;

		$('#container').unbind().on('click', function(e){
			var target = $(e.target || e.srcElement);

			if(target.is('div.toggle')){
				self.handleClick(target);
			}
		});
	},
	handleClick: function(elem){
		elem.find('span').toggle('slow');
	}
}

stateManage.fly();