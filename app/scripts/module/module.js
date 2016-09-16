var basketModule = (function(){

	var basket = [];

	function doSomethingPrivate(){

	}
	function doSomethingElsePrivate(){

	}

	return {
		addItem: function(values){
			basket.push(values);
		},
		getItemCount: function(){
			return basket.length;
		},
		doSomething: doSomethingPrivate,
		getTotal: function(){
			var itemCount = this.getItemCount(),
				total = 0;

			while(itemCount--){
				total += basket[itemCount].price;
			}

			return total;
		}
	}
})();

basketModule.addItem({
	item: 'bread',
	price: 0.5
});
basketModule.addItem({
	item: 'butter',
	price: 0.3
});

console.log(basketModule.getItemCount());

console.log(basketModule.getTotal());
