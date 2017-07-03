#闭包

对于Javascript程序员来说，闭包(closure)是一个难懂又必须征服的概念。闭包的形成与变量的生存周期密切相关。

## 变量的作用域
变量的作用域，指变量的有效范围。我们最常谈到的是在函数中声明的变量作用域。
当在函数中声明一个变量的时候，如果该变量前面没有带上关键在var，这个变量就会成为全局变量，这当然是一种容易造成命名冲突的做法。(ES5严格模式下报错)
另一种情况是用var关键字在函数中声明变量，这时候的变量既是局部变量，只有在该函数内部才能访问到这个变量，在函数外面是访问不到的。
在Javascript中，函数可以用来创造函数作用域，在函数里面可以看到外面的变量，而在函数外面看不到函数里面的变量。因为在函数中搜索一个变量的时候，如果该函数内并没有声明这个变量，那么此次搜索的过程会随着代码执行环境创建的作用域链往外层逐层搜索，一直搜索到全局对象为止。变量的搜索是从内到外而非从外到内。

例：
var a = 1
var func1 = function(){
    var b = 1
    var func2 = function(){
        var c = 3
        console.log(b)  // 1
        console.log(a)  // 1
    }
    func2()
    console.log(c)  // 输出: Uncaught ReferenceError: c is not defined
}
func1()

##变量的声明周期
除了变量的作用域之外，另外一个跟闭包有关的概念是变量的生存周期
对于全局变量来说，全局变量的生存周期当然是永久的，除非我们主动销毁这个全局变量。
而对于在函数内用var关键字声明的局部变量来说，当退出函数时，这些局部变量即失去了让门的价值，它们都会随着函数调用的结束而被销毁。

例：
var func = function(){
    var a = 1;      // 退出函数后局部变量a将被销毁
    console.log(a)
}
func()

现在来看这段代码
var func = function(){
    var a = 1
    return function(){
        a++
        console.log(a)
    }
}
var f = func()

f() //2
f() //3
f() //4
f() //5

当退出函数后，变量a并没有被销毁，而是一直在某个地方存活着。这个因为当执行var f = func()时，f返回了一个匿名函数的引用，他可以访问到func()被调用时产生的环境，而局部变量a一直处在这个环境里。既然局部变量所在的环境还能被外界访问，这个局部变量就有了不被销毁的理由。在这里产生了一个闭包的结构，局部变量的生命看起来被延续了

闭包经典例子：
<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>

<script>
    var nodes = document.getElementsByTagName('div')

    for(var i = 0, len = nodes.length; i < len; i++){
        nodes[i].onclick = function(){
            console.log(i)
        }
    }
</script>

这段代码无论点击那个div结果都是5,这是因为div节点的onclick事件是被异步触发的，当事件被触发的时候，for循环早已经结束了，此时的i的值已经是5，当onclick事件函数中顺着作用域链从内到外查找变量i时，查找到的总是5

解决方案：
for(var i = 0, len = nodes.length; i < len; i++){
    (function(i){
        nodes[i].onclick = function(){
            console.log(i)
        }
    })(i)
}

实际应用:
var Type = {}

for(var i = 0, type; type = ['String', 'Array', 'Number'][i++];){
    (function(type){
        Type['is' + type] = function(obj){
            return Object.prototype.toString.call(obj) === '[object ' + type + ']'
        }
    })(type)
}

Type.isArray([])    // true
Type.isString('str')    // true
