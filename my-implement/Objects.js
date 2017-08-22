var _ = {};

/**
 * 检索object拥有的所有可枚举属性的名称。返回数组
 * @param  {Object}   obj
 */
_.keys = function (obj) {
    var newArr = [];
    for(var attr in obj) {
        newArr.push(attr);
    }
    return newArr;
};

//测试
// console.log(_.keys({one: 1, two: 2, three: 3}));

/**
 * 检索object拥有的和继承的所有属性的名称。返回数组
 * @param  {Object}   obj
 */
_.allKeys = function (obj) {
    var newArr = [];
    for(var attr in obj) {
        newArr.push(attr);
    }
    return newArr;
};

//测试
// function Stooge(name) {
//     bbb.call(this,10);
//     this.name = name;
// }
// Stooge.prototype.silly = true;
//
// function bbb(age) {
//     this.age = age;
// }
// console.log(_.allKeys(new Stooge("Moe")));

/**
 * 返回object对象所有的属性值
 * @param  {Object}   obj
 */
_.keys = function (obj) {
    var newArr = [];
    for(var attr in obj) {
        newArr.push(obj[attr]);
    }
    return newArr;
};

//测试
// console.log(_.keys({one: 1, two: 2, three: 3}));

/**
 * 它类似于map，但是这用于对象。转换每个属性的值。
 * @param  {Object}   obj
 * @param  {Function} fn
 * @param  {Object}   context [可选]
 */
_.mapObject = function (obj, fn, context) {
    var newObj = {};
    for(var i in obj) {
        newObj[i] = fn.call(context, obj[i], i, obj);
    }
    return newObj;
};

//测试
// var obj = _.mapObject({start: 5, end: 12}, function(val, key) {
//     return val + 5;
// });
// console.log(obj);


/**
 * 把一个对象转变为一个[key, value]形式的数组。
 * @param  {Object}   obj
 */
_.pairs = function (obj) {
    var newArr = [];
    var j = 0;
    for(var i in obj) {
        newArr[j] = [i, obj[i]];
        j++;
    }

    return newArr;
};

//测试
// var obj = _.pairs({one: 1, two: 2, three: 3});
// console.log(obj);

/**
 * 返回一个object副本，使其键（keys）和值（values）对换。对于这个操作，必须确保object里所有的值都是唯一的且可以序列号成字符串.
 * @param  {Object}   obj
 */
_.invert = function (obj) {
    var newObj = {};
    for(var i in obj) {
        newObj[obj[i]] = i;
    }
    return newObj;
};

//测试
// console.log(_.invert({Moe: "Moses", Larry: "Louis", Curly: "Jerome"}));

/**
 * 返回一个object副本，使其键（keys）和值（values）对换。对于这个操作，必须确保object里所有的值都是唯一的且可以序列号成字符串.
 * @param  {Object}   obj
 */
_.invert = function (obj) {
    var newObj = {};
    for(var i in obj) {
        newObj[obj[i]] = i;
    }
    return newObj;
};

//测试
// console.log(_.invert({Moe: "Moses", Larry: "Louis", Curly: "Jerome"}));

/**
 * 创建具有给定原型的新对象， 可选附加props 作为 own的属性。 基本上，和Object.create一样， 但是没有所有的属性描述符。
 * @param  {Object}   prototype
 * @param  {Object}   props [可选]
 */
_.create = function (prototype, props) {
    var Fn = function () {}
    Fn.prototype = prototype;
    function NewFn() {}
    NewFn.prototype = new Fn();
    var obj = new NewFn();
    if(props) {
        for(var i in props) {
            obj[i] = props[i];
        }
    }
    return obj;
};

//测试
// function Stooge(name) {
//     bbb.call(this,10);
//     this.name = name;
// }
// Stooge.prototype.silly = true;
//
// var moe = _.create(Stooge.prototype, {name: "Moe"});
// console.log(moe);

/**
 * 当fn通过真检查时，返回第一个值；否则返回-1
 * @param  {Object}   obj
 * @param  {Function} fn
 * @param  {Object}   context [可选]
 */
_.functions = function (obj) {
    var newArr = [];
    for(var i in obj) {
        if(Object.prototype.toString.call(obj[i]) === '[object Function]') {
            newArr.push(i);
        }
    }
    newArr.sort(function(a, b) {
        return a > b;
    })
    return newArr;
};

//测试
// console.log(_.functions(_));

/**
 * 跟数组方法的 _.findIndex 类似，找到对象的键值对中第一个满足条件的键值对，并返回该键值对 key 值
 * @param  {Object}   obj
 * @param  {Function} fn
 * @param  {Object}   context [可选]
*/
_.findKey = function (obj, fn, context) {
    for (var i in obj) {
        if(fn.call(context, obj[i], i, obj)) {
            return i;
        }
    }
    return -1;
};

//测试
// var val = _.findKey({Moe: "Moses", Larry: "Louis", Curly: "Jerome"}, function(val) {
//     return val === 'Louis';
// });
// console.log(val);

/**
 * 复制source对象中的所有属性覆盖到destination对象上，并且返回 destination 对象. 复制是按顺序的, 所以后面的对象属性会把前面的对象属性覆盖掉(如果有重复).
 * @param  {Object}   obj
 */
_.extend = function (obj) {
    var args = [].slice.call(arguments,1);
    function copy(obj,args) {
        var isType = Object.prototype.toString;
        if(!obj) {return obj};
        for(var i=0; i<args.length; i++) {
            if(!args[i]) {break;}
            for(var attr in args[i]) {
                var tem = args[i][attr];
                if(!tem) {
                    obj[attr] = tem;
                    break;
                }
                if(isType(tem) === '[object Array]') {
                    obj[attr] = copy([],tem);
                }else if(isType(tem) === '[object Object]') {
                    obj[attr] = copy({},tem);
                }else {
                    obj[attr] = tem;
                }
            }
        }

        return obj;
    }

    return copy(obj,args);
};

//测试
// var obj = _.extend({name: 'moe',c:{b:1,a:[1,2,3]}}, {age: 50,c:{b:1,d:3,a:[1,2,3,4]}});
// console.log(obj);
var a = {
    name: 'Bob',
    age: 20
};
// _.extend(a, {age: 15}, {age: 88, city: 'Beijing'});
// console.log(a);
_.extend(a, {ccc:new Date()});
console.log(a)


/**
 * 类似于 extend, 但只复制自己的属性覆盖到目标对象。
 * @param  {Object}   obj
 */
_.extendOwn = function (obj) {
    var args = [].slice.call(arguments,1);
    function copy(obj,args) {
        for(var i=0; i<args.length; i++) {
            for(var attr in args[i]) {
                if(args[i].hasOwnProperty(attr)) {
                    var tem = args[i][attr];
                    if(tem.constructor === 'Array') {
                        obj[attr] = copy([],tem);
                    }else if(tem.constructor === 'Object') {
                        obj[attr] = copy({},tem);
                    }else {
                        obj[attr] = tem;
                    }
                }
            }
        }

        return obj;
    }

    return copy(obj,args);
};

//测试
// function Stooge(name) {
//     bbb.call(this,10);
//     this.name = name;
// }
// Stooge.prototype.silly = true;
//
// function bbb(age) {
//     this.age = age;
// }
// var P = new Stooge('小米');
//
// var obj = _.extendOwn({name: 'moe',c:{b:1,a:[1,2,3,8]}}, P);
// console.log(obj);

/**
 * 返回一个object副本，只过滤出keys(有效的键组成的数组)参数指定的属性值。或者接受一个判断函数，指定挑选哪个
 * @param  {Object}   obj
 */
_.pick = function (obj) {
    var newObj = {};

    var args = [].slice.call(arguments, 1);
    if(args.length == 1 && Object.prototype.toString.call(args[0]) === '[object Function]') {
        for(var i in obj) {
            if(args[0](obj[i], i, obj)) {
                newObj[i] = obj[i];
            }
        }

    }else {
        for(var i in obj) {
            for(var j=0; j<args.length; j++) {
                if(i === args[j]) {
                    newObj[i] = obj[i];
                }
            }
        }
    }

    return newObj;
};

//测试
// console.log(_.pick({name: 'moe', age: 50, userid: 'moe1'}, 'name', 'age'));
// console.log(_.pick({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
//     return typeof value === 'number' ? true : false;
// }));

/**
 * 返回一个object副本，只过滤出除去keys(有效的键组成的数组)参数指定的属性值。 或者接受一个判断函数，指定忽略哪个key
 * @param  {Object}   obj
 */
_.omit = function (obj) {
    var newObj = {};

    var args = [].slice.call(arguments, 1);
    if(args.length == 1 && Object.prototype.toString.call(args[0]) === '[object Function]') {
        for(var i in obj) {
            if(!args[0](obj[i], i, obj)) {
                newObj[i] = obj[i];
            }
        }

    }else {
        for(var i in obj) {
            var is = false;
            for(var j=0; j<args.length; j++) {
                if(i === args[j]) {
                    is = true;
                }
            }
            if(!is) {newObj[i] = obj[i];}
        }
    }

    return newObj;
};

//测试
// console.log(_.omit({name: 'moe', age: 50, userid: 'moe1'}, 'userid', 'age'));
// console.log(_.omit({name: 'moe', age: 50, userid: 'moe1'}, function(value, key, object) {
//     return typeof value === 'number' ? true : false;
// }));

/**
 * 用defaults对象填充object 中的undefined属性。 并且返回这个object。一旦这个属性被填充，再使用defaults方法将不会有任何效果
 * @param  {Object}   obj
 */
_.defaults = function (obj) {
    var args = [].slice.call(arguments, 1);;
    for(var i=0; i<args.length; i++) {
        for(var attr in args[i]) {
            if(!obj[attr]) {
                obj[attr] = args[i][attr];
            }
        }
    }
    return obj;
};

//测试
// var iceCream = {flavor: "chocolate"};
// console.log(_.defaults(iceCream, {flavor: "vanilla", sprinkles: "lots", a: 3},{a: 1, b: 4, flavor: 3}));

/**
 * 创建 一个浅复制（浅拷贝）的克隆object。任何嵌套的对象或数组都通过引用拷贝，不会复制。
 * @param  {Object}   obj
 */
_.clone = function (obj) {
    var newObj;
    if(obj.constructor === Array) {
        newObj = obj.slice();
    }else {
        newObj = {};
        for(var i in obj) {
            newObj[i] = obj[i];
        }
    }

    return newObj;
};

//测试
// console.log(_.clone({name: 'moe'}));
// console.log(_.clone([1,3,4]))

/**
 * 用 object作为参数来调用函数fn，然后返回object。这种方法的主要意图是作为函数链式调用 的一环, 为了对此对象执行操作并返回对象本身。
 * @param  {Object}   obj
 * @param  {Function} fn
 */
_.tap = function (obj, fn) {
    fn(obj);
    return obj;
};

//测试
// console.log(_.tap([1,3,4], console.log));

/**
 * 对象是否包含给定的键吗？等同于object.hasOwnProperty(key)，但是使用hasOwnProperty 函数的一个安全引用，以防意外覆盖。
 * @param  {Object}   obj
 * @param  {String} key
 */
_.has = function (obj, key) {
    for(var i in obj) {
        if(i === key && obj.hasOwnProperty(i)) {
            return true;
        }
    }

    return false;
};

//测试
// function Stooge(name) {
//     bbb.call(this,10);
//     this.name = name;
// }
// Stooge.prototype.silly = true;
//
// function bbb(age) {
//     this.age = age;
// }
// var P = new Stooge('小米');
// console.log(_.has(P,'silly'));//false
// console.log(_.has(P,'age'));//true
// console.log(_.has(P,'name'));//true
// console.log(_.has({a: 1, b: 2, c: 3}, "b"));

/**
 * 返回一个函数，这个函数返回任何传入的对象的key属性。
 * @param  {String} key
 */
_.property = function (key) {
    return (!key ? function() {} : function(obj) { return obj[key]; } )
};

//测试
// var stooge = {name: 'moe'};
// console.log('moe' === _.property('name')(stooge));

/**
 * 和_.property相反。需要一个对象，并返回一个函数,这个函数将返回一个提供的属性的值。
 * @param  {Object}   obj
 */
_.propertyOf = function (obj) {
    return (!obj ? function() {} : function(key) { return obj[key]; });
};

//测试
// var stooge = {name: 'moe'};
// console.log(_.propertyOf(stooge)('name'));

_.filter = function(list, fn, context) {
    var type = list.constructor;
    var newArr = [];
    if(type === Array) {
        for(var i=0; i<list.length; i++) {
            if(fn.call(context, list[i], i, list)) {
                newArr.push(list[i]);
            }
        }
    }else if(type == Object) {
        for (var i in list) {
            if(fn.call(context, list[i], i, list)) {
                newArr.push(list[i]);
            }
        }
    }
    return newArr;
};

/**
 * 告诉你properties中的键和值是否包含在object中。
 * @param  {Object}   obj
 * @param  {Object}   attrs
 */
_.isMatch = function (obj, attrs) {
    var is = true;
    for(var i in attrs) {
        if(attrs[i] !== obj[i]) {
            is = false;
            break;
        }
    }

    return is;
};

//测试
// var stooge = {name: 'moe', age: 32};
// console.log(_.isMatch(stooge, {age: 32, name: 'moe'}));
// var stooge = {name: 'moe', age: 31};
// console.log(_.isMatch(stooge, {age: 32, name: 'moe'}));
// var stooge = {name: 'moe', age: 32,b: 1};
// console.log(_.isMatch(stooge, {age: 32}));

/**
 * 返回一个断言函数，这个函数会给你一个断言可以用来辨别给定的对象是否匹配attrs指定键/值属性。
 * @param  {Object}   attrs
 */
_.matcher = function (attrs) {
    return function(obj) {
        return _.isMatch(obj, attrs);
    }
};

//测试
// var ready = _.matcher({selected: true, visible: true});
// console.log(_.filter([1, {selected: true, visible: true}], ready));
// var ready = _.matcher({selected: true});
// console.log(_.filter([1, {selected: true,a:1}], ready));

/**
 * 执行两个对象之间的优化深度比较，确定他们是否应被视为相等。
 * @param  {Object}   obj1
 * @param  {Object}   obj2
 */
_.isEqual = function (obj1, obj2) {
    function fnCompare(obj1, obj2) {
        for(var attr in obj1) {
            var tem1 = obj1[attr];
            var tem2 = obj2[attr];
            if(tem1.constructor === Array || tem1.constructor === Object) {
                if(!fnCompare(tem1, tem2)) {
                    return false;
                };
            }else {
                if(tem1 !== tem2) {
                    return false;
                }
            }
        }

        return true;
    }

    return fnCompare(obj1, obj2);
};

//测试
// var stooge = {name: 'moe', luckyNumbers: [13, 27, 34], c: {a:1,d: {c:1}}};
// var clone  = {name: 'moe', luckyNumbers: [13, 27, 34], c: {a:1,d: {c:1}}};
// console.log(_.isEqual(stooge, clone));

/**
 * 如果object 不包含任何值(没有可枚举的属性)，返回true。 对于字符串和类数组（array-like）对象，如果length属性为0，那么_.isEmpty检查返回true。
 * @param  {Object}   obj
 */
_.isEmpty = function (obj) {
    var type = obj.constructor;
    if(type === Array) {
        return obj.length ? false : true;
    }else if(type === Object) {
        for(var i in obj) {
            return false;
        }
        return true;
    }
    return obj.length ? false : true;
};

//测试
// console.log(_.isEmpty('aa'));
// console.log(_.isEmpty([]));
// console.log(_.isEmpty([1]));
// console.log(_.isEmpty({}));
// console.log(_.isEmpty({a: 1}));



/**
 * 如果object是一个DOM元素，返回true。
 * @param  {Object}   obj
 */
_.isElement = function (elem) {
    //nodeType 1 元素节点  2 属性节点  3 文本节点  8 注释节点  9 document节点
    //元素节点的nodeName 就是元素的标签名称
    return (elem.nodeType === 1 && elem.nodeName) ? true : false;
};

//测试


/**
 * 如果object是一个数组，返回true。
 * @param  {Object}   obj
 */
_.isArray = function (obj) {

    var type = obj.constructor;
    return type === Array ? true : false;
};

//测试
// console.log(_.isArray([]));
// console.log((function(){ return _.isArray(arguments); })());


/**
 * 如果object是一个对象，返回true。需要注意的是JavaScript数组和函数是对象，字符串和数字不是。
 * @param  {Object}   obj
 */
_.isObject = function (obj) {
    if(!obj) {
        return false;
    }
    var type = obj.constructor;
    if(type !== String && type !== Number && type !== Boolean) {
        return true;
    }
    return false;
};

//测试
// console.log(_.isObject([]));
// console.log(_.isObject({}));
// console.log(_.isObject(function(){}));
// console.log(_.isObject('aa'));
// console.log(_.isObject(true));
// console.log(_.isObject(NaN));
// console.log(_.isObject(1));
// console.log(_.isObject(null));
// console.log(_.isObject(undefined));

/**
 * 如果object是一个参数对象，返回true。
 * @param  {Object}   obj
 */
_.isArguments = function (obj) {
    if(!obj) {return false;}
    return obj.callee ? true : false;
};

//测试
// console.log(_.isArguments([]));
// console.log((function(){ return _.isArguments(arguments); })(1, 2, 3));

/**
 * 如果object是一个函数（Function），返回true。
 * @param  {Object}   obj
 */
_.isFunction = function (obj) {
    return obj.constructor === Function ? true : false;
};

//测试
// console.log(_.isArguments([]));
// console.log((function(){ return _.isFunction(arguments); })(1, 2, 3));

/**
* 如果object是一个字符串，返回true。
* @param  {Object}   obj
*/
_.isString = function (obj) {
    return obj.constructor === String ? true : false;
};

//测试
// console.log(_.isString([]));
// console.log(_.isString(''));
// console.log((function(){ return _.isString(arguments); })(1, 2, 3));

/**
 * 如果object是一个数值，返回true (包括 NaN)。
 * @param  {Object}   obj
 */
_.isNumber = function (obj) {
    return obj.constructor === Number ? true : false;
};

//测试
// console.log(_.isNumber([]));
// console.log(_.isNumber(8.4 * 5));
// console.log(_.isNumber(NaN));
// console.log((function(){ return _.isNumber(arguments); })(1, 2, 3));

/**
 * 如果object是一个有限的数字，返回true。
 * @param  {Object}   obj
 */
_.isFinite = function (obj) {
    return obj.constructor === Number ? isFinite(obj) : false;
};

//测试
// console.log(_.isFinite(1));
// console.log(_.isFinite(NaN));
// console.log(_.isFinite(''));
// console.log(_.isFinite(-Infinity));

/**
 * 如果object是一个布尔值，返回true，否则返回false。
 * @param  {Object}   obj
 */
_.isBoolean = function (obj) {
    if(obj === null || obj === undefined) {
        return false;
    }
    return obj.constructor === Boolean ? true : false;
};

//测试
// console.log(_.isBoolean(null));
// console.log(_.isBoolean(true));



