var myRevealingModule = (function(){

	var privateVar = 'Ben Cherry',
		publicVar = 'Hey there';

	function privateFunction(){
		console.log('Name: ' + privateVar);
	}

	function publicSetName(strName){
		privateVar = strName;
	}

	function publicGetName(){
		privateFunction();
	}

	// 将暴露的共有指针指向到私有函数和属性上
	return {
		setName: publicSetName,
		greeting: publicVar,
		getName: publicGetName
	}
})();

myRevealingModule.setName('Paul kinlan');
myRevealingModule.getName();
console.log(myRevealingModule.greeting);

var myRevealingModule = (function(){

	var privateCounter = 0;

	function privateFunction(){
		privateCounter++;
	}
	
	function publicFunction(){
		publicIncrement();
	}

	function publicIncrement(){
		privateFunction();
	}

	function publicGetCount(){
		return privateCounter;
	}

	return {
		start: publicFunction,
		increment: publicIncrement,
		count: publicGetCount
	}
})();

myRevealingModule.start();

console.log(myRevealingModule.count());