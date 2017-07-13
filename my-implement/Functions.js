var _ = {};

/**
 * 绑定函数 function 到对象 object 上, 也就是无论何时调用函数, 函数里的 this 都指向这个 object.任意可选参数 arguments 可以传递给函数 function , 可以填充函数所需要的参数
 * @param  {Function}   fn
 * @param  {Object} object
 * @param  {any}   args [可选]
 */
_.bind = function(fn, object, args) {
    var args = [].slice.call(arguments,2);
    return function () {
        return fn.apply(object,args.concat([].slice.call(arguments)));//如何传多个参数，这里传过来的数组
    }
};

//测试
// var func = function(greeting){ return greeting + ': ' + this.name };
// func = _.bind(func, {name: 'moe'}, 'hi');
// console.log(func("1"));

/**
 * 把methodNames参数指定的一些方法绑定到object上，这些方法就会在对象的上下文环境中执行。绑定函数用作事件处理函数时非常便利，否则函数被调用时this一点用也没有
 * @param  {Object} object
 */
_.bindAll = function(object) {
    var funs = Array.prototype.slice.call(arguments,1);
    for(var i=0; i<funs.length; i++) {
        object[funs[i]] = this.bind(object[funs[i]], object);
    }
};
//测试
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.sayName = function() {
    console.log(this.name);
};

var wenyi = new Person('wenyi', 26);
_.bindAll(wenyi, 'sayName', 'sayAge');

// var func = wenyi.sayName;
// func();

/**
* 局部应用一个函数填充在任意个数的 arguments，不改变其动态this值
* @param  {Function}   fn
*/
_.partial = function(fn) {
    var args = Array.prototype.slice.call(arguments,1);
    if(args[0] === _) {
        args = args.slice(1);
    }
    return function () {
        return fn.apply(null,args.concat(Array.prototype.slice.call(arguments)));//如何传多个参数，这里传过来的数组
    }
};

//测试
// var subtract = function(a, b) { return b - a; };
// sub5 = _.partial(subtract, _, 5);
// console.log(sub5(20));

/**
 * 局部应用一个函数填充在任意个数的 arguments，不改变其动态this值
 * @param  {Function}   fn
 * @param  {Function} hasher  [可选]
 */
_.memoize = function(func, hasher) {
    var memoize = function(key) {
        var cache = memoize.cache;
        var address = '' + (hasher ? hasher.apply(this, arguments) : key);
        var is = false;
        for(var attr in cache) {
            if(attr === address) {
                is = true;
            }
        }
        if (!is) cache[address] = func.apply(this, arguments);
        return cache[address];
    };
    memoize.cache = {};
    return memoize;
};

//测试
// var fibonacci = _.memoize(function(n) {
//     return n < 2 ? n: fibonacci(n - 1) + fibonacci(n - 2);
// });
// console.log(fibonacci(3))

/**
 * 类似setTimeout，等待wait毫秒后调用function。如果传递可选的参数arguments，当函数function执行时， arguments 会作为参数传入。
 * @param  {Function}   fn
 * @param  {Number} wait
 */
_.delay = function(fn,wait) {
    var agrs = [].slice.call(arguments, 2);
    setTimeout(function() {
        return fn.apply(null,agrs);
    }, wait);
};

//测试
// var log = _.bind(console.log, console);
// _.delay(log, 1000, 'logged later');

/**
 * 类似setTimeout，等待wait毫秒后调用function。如果传递可选的参数arguments，当函数function执行时， arguments 会作为参数传入。
 * @param  {Number} wait
 */
_.defer = function(fn) {
    var agrs = [].slice.call(arguments, 1);
    setTimeout(function() {
        return fn.apply(null,agrs);
    }, 0);
};

//测试
// _.defer(function(){ console.log('deferred'); });


/**
 * throttle 方法：在 resize 的过程中，每隔5s执行一次函数 A；
 * @param  {Function}   fn
 * @param  {Number} wait
 * @param {Object} options
 */
_.throttle = function(fn,wait,options) {

    var timer = null;
    if(!options) {
        options = {
            leading: true,
            trailing: true//如何判断是最后一次
        };
    }

    return function() {
        if(options.leading) {
            options.leading = false;
            fn.apply(null, arguments);
        }else {
            if(!timer) {
                timer = setTimeout(function() {
                    timer = null;
                    fn.apply(null, arguments);
                },wait)
            }
        }
    }
};

//测试
//  _.throttle(function () {
//     console.log(88)
// }, 2000);
//throttled();

/**
 * debounce方法：在 resize 结束之后，过了 5s ，执行一次函数 A，如果没有到 5s ，就又开始 resize ，那么就重新计时，并不执行函数 A；
 * @param  {Function}   fn
 * @param  {Number} wait
 * @param {Boolean} immediate [可选]
 */
_.debounce = function(fn, wait, immediate) {

    var timer = null;

    return function() {
        if(immediate) {
            timer = null;
            fn.apply(null, arguments);
        }else {
            if(!timer) {
                temFn();
            }else {
                clearTimeout(timer);
                timer = null;
                temFn();
            }
        }

        function temFn() {
            timer = setTimeout(function() {
                timer = null;
                fn.apply(null, arguments);
            }, wait);
        }
    }
};

//测试
// lazyLayout  = _.debounce(function () {
//     console.log(10)
// }, 2000);
// lazyLayout();
// setTimeout(function() {
//     lazyLayout();
// },1000)



/**
 * 创建一个只能调用一次的函数。重复调用改进的方法也没有效果，只会返回第一次执行时的结果。 作为初始化函数使用时非常有用, 不用再设一个boolean值来检查是否已经初始化完成.
 * @param  {Function}   fn
 */
_.once = function(fn) {

    var one = false;
    var result;

    return function() {
        if(!one) {
            one = true;
            return result = fn.apply(null, arguments);
        }else {
            return result;
        }
    }
};

//测试
// var initialize = _.once(function(){console.log(1)});
// initialize();
// initialize();

/**
 * 创建一个函数, 只有在运行了 count 次之后才有效果. 在处理同组异步请求返回结果时, 如果你要确保同组里所有异步请求完成之后才 执行这个函数, 这将非常有用。
 * @param  {Number} count
 * @param  {Function}   fn
 */
_.after = function(count, fn) {
    return function() {
        count --;
        if(count<1) {
            return fn.apply(null, arguments);
        }
    }
};

//测试
// var fun = _.after(5,function() {
//     console.log(1);
// });
// fun();
// fun();
// fun();
// fun();
//fun();

/**
 * 创建一个函数,调用不超过count 次。 当count已经达到时，最后一个函数调用的结果将被记住并返回。
 * @param  {Number} count
 * @param  {Function}   fn
 */
_.before = function(count, fn) {
    var result;
    return function() {
        count --;
        if(count == 1) {
            return result;
        }else {
            return result = fn.apply(null, arguments);
        }
    }
};

//测试
// var fun = _.before(3,function() {
//     console.log(1);
// });
// fun();
// fun();
// fun();

/**
 * 将第一个函数 function 封装到函数 wrapper 里面, 并把函数 function 作为第一个参数传给 wrapper. 这样可以让 wrapper 在 function 运行之前和之后 执行代码, 调整参数然后附有条件地执行.
 * @param  {Function}   fn
 * @param  {Function}   wrapper
 */
_.wrap = function(fn, wrapper) {
    return function() {
        return wrapper(fn);
    }
};

//测试
// var hello = function(name) { return "hello: " + name; };
// hello = _.wrap(hello, function(func) {
//     return "before, " + func("moe") + ", after";
// });
// console.log(hello());

/**
 * 返回一个新的predicate函数的否定版本。
 * @param  {Function}   fn
 */
_.negate = function(fn) {
    return function() {
        return !fn.apply(null, arguments);
    }
};

//测试
var isFalsy = _.negate(Boolean);
// console.log(isFalsy);

/**
 * 返回函数集 functions 组合后的复合函数, 也就是一个函数执行完之后把返回的结果再作为参数赋给下一个函数来执行. 以此类推. 在数学里, 把函数 f(), g(), 和 h() 组合起来可以得到复合函数 f(g(h()))。
 * @param  {Function}   fn
 * @param  {Function}   wrapper
 */
_.compose = function() {
    var args = arguments;

    return function (attr) {
        for(var i=0; i<args.length-1; i++) {
            args[i+1](args[i]);
        }
    };
};

//测试
// var hello = function(name) { return "hello: " + name; };
// hello = _.wrap(hello, function(func) {
//     return "before, " + func("moe") + ", after";
// });
// console.log(hello());