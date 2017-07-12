var _ = {};

/**
 * 遍历list中的所有元素，按顺序用遍历输出每个元素。
 * @param  {Array,Object}   list    
 * @param  {Function} fn
 * @param  {Object}   context [可选]
 */
_.each = function(list, fn, context) {
    var type = list.constructor;
    if (type === Array) {
        for (var i = 0; i < list.length; i++) {
            fn.call(context, list[i], i, list);
        }
    }
    if (type === Object) {
        for (var i in list) {
            fn.call(context, list[i], i, list)
        }
    }
};

//测试
// _.each([1, 2, 3], console.log);
// _.each({one: 1, two: 2, three: 3}, console.log);

/**
 * 通过转换函数(iteratee迭代器)映射列表中的每个值产生价值的新数组。
 * @param  {Array,Object}   list
 * @param  {Function} fn
 * @param  {Object}   context [可选]
 */
_.map = function(list, fn, context) {
    var type = list.constructor;
    var newList = [];
    if(type === Array) {
        for(var i=0; i<list.length; i++) {
            newList.push(fn.call(context, list[i], i, list));
        }
    }else if(type == Object) {
        for(var i in list) {
            newList.push(fn.call(context, list[i], i, list));
        }
    }
    return newList;
};

//测试
// console.log( _.map([1, 2, 3], function(num){ return num * 3; }) );
// console.log( _.map({one: 1, two: 2, three: 3}, function(num, key){ return num * 3; }) );


/**
 * reduce方法把list中元素归结为一个单独的数值
 * @param  {Array,Object}   list
 * @param  {Function} fn
 * @param  {Any} memo [可选]
 * @param  {Object}   context [可选]
 */
_.reduce = function(list, fn, memo, context) {
    var type = list.constructor;
    if(type === Array) {
        for(var i=0; i<list.length; i++) {
            memo = ( !memo ? list[i] : fn.call(context, memo, list[i], i, list) );
        }
    }else if(type == Object) {
        for (var i in list) {
            memo = ( !memo ? list[i] : fn.call(context, memo, list[i], i, list) );
        }
    }
    return memo;
};

//测试
// var sum = _.reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);
// console.log(sum);
// var sum = _.reduce({a:1, b:2, c:3}, function(memo, num){ return memo + num; });
// console.log(sum);

/**
 * reducRight是从右侧开始组合的元素的reduce函数
 * @param  {Array,Object}   list
 * @param  {Function} fn
 * @param  {Any} memo [可选]
 * @param  {Object}   context [可选]
 */
_.reduceRight = function(list, fn, memo, context) {
    var type = list.constructor;
    var newList = [];
    if(type == Object) {
        for(var i in list) {
            newList.push(list[i]);
        }
        list = newList;
    }
    for(var i=list.length-1; i>=0; i--) {
        memo = ( !memo ? list[i] : fn.call(context, memo, list[i], i, list) );
    }
    return memo;
};

//测试
// var list = [[0, 1], [2, 3], [4, 5]];
// var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
// console.log(flat);
// var list = {a:[0, 1], b:[2, 3], c:[4, 5]};
// var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
// console.log(flat);

/**
 * 在list中逐项查找，返回第一个通过predicate迭代函数真值检测的元素值，如果没有值传递给测试迭代器将返回undefined。 如果找到匹配的元素，函数将立即返回，不会遍历整个list。
 * @param  {Array,Object}   list
 * @param  {Function} fn
 * @param  {Object}   context [可选]
 */
_.find = function(list, fn, context) {
    var type = list.constructor;
    var value;
    if(type === Array) {
        for(var i=0; i<list.length; i++) {
            if(fn.call(context, list[i], i, list)) {
                value = list[i];
                break;
            }
        }
    }else if(type == Object) {
        for (var i in list) {
            if(fn.call(context, list[i], i, list)) {
                value = list[i];
                break;
            }
        }
    }
    return value;
};

//测试
// var even = _.find([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// console.log(even);
// var even = _.find({a:1, b:2, c:3, d:4, e:5, f:6}, function(num){ return num % 2 == 0; });
// console.log(even);

/**
 * 遍历list中的每个值，返回包含所有通过predicate真值检测的元素值
 * @param  {Array,Object}   list
 * @param  {Function} fn
 * @param  {Object}   context [可选]
 */
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

//测试
// var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// console.log(evens);
// var evens = _.filter({a:1, b:2, c:3, d:4, e:5, f:6}, function(num){ return num % 2 == 0; });
// console.log(evens);

/**
 * 遍历list中的每一个值，返回一个数组，这个数组包含properties所列出的属性的所有的 键 - 值对。
 * @param  {Array,Object}   list
 * @param  {Object} properties
 */
_.where = function(list, properties) {
    var type = list.constructor;
    var newArr = [];
    if(type === Array) {
        for(var i=0; i<list.length; i++) {
            if(fnCommon(i,list)) {
                newArr.push(list[i]);
            }
        }
    }else if(type == Object) {
        for(var i in list) {
            if(fnCommon(i,list)) {
                newArr.push(list[i]);
            }
        }
    }

    function fnCommon(i,list) {
        var tem = {};
        for(var attr in properties) {
            tem[attr] = false;
            for(var j in list[i]) {
                if(attr === j && properties[attr] === list[i][j]) {
                    tem[attr] = true;
                }
            }
            //只要有一个找不到就没有必要继续循环下去
            if(!tem[attr]) {
                break;
            }

        }

        var tem1 = true;
        for(var attr in tem) {
            if(!tem[attr]) {
                tem1 = false;
                break;
            }
        }
        if(tem1) {
            return true;
        }

        return false
    }
    return newArr;
};

//测试
// var listOfPlays = [{author: "Shakespeare", year: 1611, age: 10},{author: "Shakespeare", year: 1611, c:1},{b: "Shakespeare", year: 1611}];
// console.log( _.where(listOfPlays, {author: "Shakespeare", year: 1611}) );
// var listOfPlays = {a:{author: "Shakespeare", year: 1611, age: 10},b:{author: "Shakespeare", year: 1611, c:1},c:{b: "Shakespeare", year: 1611}};
// console.log( _.where(listOfPlays, {author: "Shakespeare", year: 1611}) );

/**
 * 遍历整个list，返回匹配 properties参数所列出的所有 键 - 值 对的第一个值。
 * @param  {Array,Object}   list
 * @param  {Object} properties
 */
_.findWhere = function(list, properties) {
    var type = list.constructor;
    var newVal;
    if(type === Array) {
        for(var i=0; i<list.length; i++) {
            if(fnCommon(i,list)) {
                newVal = list[i];
                break;
            }
        }
    }else if(type == Object) {
        for(var i in list) {
            if(fnCommon(i,list)) {
                newVal = list[i];
                break;
            }
        }
    }

    function fnCommon(i,list) {
        var tem = {};
        for(var attr in properties) {
            tem[attr] = false;
            for(var j in list[i]) {
                if(attr === j && properties[attr] === list[i][j]) {
                    tem[attr] = true;
                }
            }
            //只要有一个找不到就没有必要继续循环下去
            if(!tem[attr]) {
                break;
            }

        }

        var tem1 = true;
        for(var attr in tem) {
            if(!tem[attr]) {
                tem1 = false;
                break;
            }
        }
        if(tem1) {
            return true;
        }

        return false
    }
    return newVal;
};

//测试
// var listOfPlays = [{author: "Shakespeare", year: 1611, age: 10},{author: "Shakespeare", year: 1611, c:1},{b: "Shakespeare", year: 1611}];
// console.log( _.findWhere(listOfPlays, {author: "Shakespeare", year: 1611}) );
// var listOfPlays = {a:{author: "Shakespeare", year: 1611, age: 10},b:{author: "Shakespeare", year: 1611, c:1},c:{b: "Shakespeare", year: 1611}};
// console.log( _.findWhere(listOfPlays, {author: "Shakespeare", year: 1611}) );

/**
 * 返回list中没有通过predicate真值检测的元素集合，与filter相反。
 * @param  {Array,Object}   list
 * @param  {Function} fn
 * @param  {Object}   context [可选]
 */
_.reject = function(list, fn, context) {
    var type = list.constructor;
    var newArr = [];
    if(type === Array) {
        for(var i=0; i<list.length; i++) {
            if(!fn.call(context, list[i], i, list)) {
                newArr.push(list[i]);
            }
        }
    }else if(type == Object) {
        for (var i in list) {
            if(!fn.call(context, list[i], i, list)) {
                newArr.push(list[i]);
            }
        }
    }

    return newArr;
};

//测试
// var evens = _.reject([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// console.log(evens);
// var evens = _.reject({a:1, b:2, c:3, d:4, e:5, f:6}, function(num){ return num % 2 == 0; });
// console.log(evens);

/**
 * 如果list中的所有元素都通过predicate的真值检测就返回true
 * @param  {Array,Object}   list
 * @param  {Function} fn
 * @param  {Object}   context [可选]
 */
_.every = function(list, fn, context) {
    var type = list.constructor;
    var value = true;
    if(type === Array) {
        for(var i=0; i<list.length; i++) {
            if(!fn.call(context, list[i], i, list)) {
                value = false;
                break;
            }
        }
    }else if(type == Object) {
        for (var i in list) {
            if(!fn.call(context, list[i], i, list)) {
                value = false;
                break;
            }
        }
    }
    return value;
};

//测试
// var even = _.every([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// console.log(even);
// var even = _.every([2, 4, 6], function(num){ return num % 2 == 0; });
// console.log(even);
// var even = _.every({a:1, b:2, c:3, d:4, e:5, f:6}, function(num){ return num % 2 == 0; });
// console.log(even);
// var even = _.every({b:2, d:4, f:6}, function(num){ return num % 2 == 0; });
// console.log(even);


/**
 * 如果list中有任何一个元素通过 predicate 的真值检测就返回true。如果都未找到返回false,一旦找到了符合条件的元素, 就直接中断对list的遍历
 * @param  {Array,Object}   list
 * @param  {Function} fn
 * @param  {Object}   context [可选]
 */
_.some = function(list, fn, context) {
    var type = list.constructor;
    var value = false;
    if(type === Array) {
        for(var i=0; i<list.length; i++) {
            if(fn.call(context, list[i], i, list)) {
                value = true;
                break;
            }
        }
    }else if(type == Object) {
        for (var i in list) {
            if(fn.call(context, list[i], i, list)) {
                value = true;
                break;
            }
        }
    }
    return value;
};

//测试
// var even = _.some([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// console.log(even);
// var even = _.some([1, 3], function(num){ return num % 2 == 0; });
// console.log(even);
// var even = _.some({a:1, b:2, c:3, d:4, e:5, f:6}, function(num){ return num % 2 == 0; });
// console.log(even);
// var even = _.some({b:1, d:3, f:5}, function(num){ return num % 2 == 0; });
// console.log(even);

/**
 * 如果list包含指定的value则返回true（愚人码头注：使用===检测）。如果list 是数组，内部使用indexOf判断。使用fromIndex来给定开始检索的索引位置。
 * @param  {Array,Object}   list
 * @param  {String/Number/Boolean/null/undefined} value
 * @param  {Number}   fromIndex [可选]
 */
_.contains = function(list, value, fromIndex ) {
    var type = list.constructor;
    fromIndex = fromIndex || 0;
    var is = false;
    if(type === Array) {
        var l = list.indexOf(value, fromIndex);
        is = (l == -1 ? false : true);
    }else if(type == Object) {
        var j = 0;
        for(var i in list) {
            if(j >= fromIndex) {
                if(list[i] === value) {
                    is = true;
                }
            }
            j++;
        }
    }
    return is;
};

//测试
// var even = _.contains([1, 2, 3], 3, 3);
// console.log(even);
// var even = _.contains([null, 2, 3], null);
// console.log(even);
// var even = _.contains([null, 2, 3], undefined);
// console.log(even);
// var even = _.contains({a:undefined, b:2, c:3}, undefined,0);
// console.log(even);
// var even = _.contains({a:null, b:2, c:3}, null);
// console.log(even);
// var even = _.contains({a:1, b:2, c:3}, 3);
// console.log(even);

/**
 * 在list的每个元素上执行methodName方法。 任何传递给invoke的额外参数，invoke都会在调用methodName方法的时候传递给它。
 * @param  {Array,Object}   list
 * @param  {Function} fn
 * @param  {Any}   args [可选]
 */
_.invoke = function(list, fn, args ) {
    var isF = (fn.constructor === Function) ? true : false;
    return this.map(list, function(val) {
        var func = isF ? fn : val[fn];
        return !func ? func : func.apply(val, args);
    })
};

//测试
// var even = _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
// console.log(even);
// var even = _.invoke({a:[5, 1, 7], b:[3, 2, 1]}, 'sort');
// console.log(even);

/**
 * pluck也许是map最常使用的用例模型的简化版本，即萃取数组对象中某属性值，返回一个数组。
 * @param  {Array,Object}   list
 * @param  {String} propertyName
 */
_.pluck = function(list, propertyName ) {
    var _this = this;
    return _this.map(list, function(val) {
        for(var i in val) {
            if(i === propertyName) {
                return val[i];
            }
        }
    })
};

//测试
// var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
// console.log(_.pluck(stooges, 'name'));

/**
 * 返回list中的最大值。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。如果list为空，将返回-Infinity
 * @param  {Array,Object}   list
 * @param  {any} iteratee
 * @param  {Object}   context [可选]
 */
_.max = function(list, iteratee, context ) {
    var _this = this;
    var type = list.constructor;
    var isF = (iteratee && iteratee.constructor === Function) ? true : false;
    var filter = '';
    var max = 0;
    var tem;
    var tem1 = true;
    if(type === Array) {
        if(!list.length) {
            return Infinity;
        }
        for(var i=0; i<list.length; i++) {
            if(iteratee) {
                if(isF) {
                    filter = iteratee.call(context, list[i]);
                    if(filter !== undefined) {
                        if(tem1) {
                            tem1 = false;
                            max == filter;
                            tem = list[i];
                        }
                        if(max < filter) {
                            max = filter;
                            tem = list[i];
                        }
                    }
                }else {
                    filter = iteratee;
                    if(list[i][filter] && tem1) {
                        tem1 = false;
                        max = list[i][filter];
                        tem = list[i];
                    }
                    if(list[i][filter] && max < list[i][filter]) {
                        max = list[i][filter];
                        tem = list[i];
                    }
                }

            }else {
                if(tem1) {
                    tem1 = false;
                    max = list[i];
                    tem = max;
                }
                if(max < list[i]) {
                    max = list[i];
                    tem = max;
                }
            }
        }
        return (tem ? tem : Infinity);
    }else {
        return Infinity;
    }
};

//测试
// var stooges = [{name: 'moe', age: 40, c: 90}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
// console.log( _.max(stooges, function(stooge){ return stooge.age; }) );
// var arr = [1,3,2,5,6];
// console.log(_.max(arr));
// var stooges = [{name: 'moe', age: 40, c: 90}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
// console.log( _.max(stooges, 'age') );
// var stooges = [111, {name: 'larry', age: 30}, {name: 'curly', age: 60}];
// console.log( _.max(stooges, 'age') );
// var stooges = [33, {name: 'larry', age: 50}, {name: 'curly', age: 40}];
// console.log( _.max(stooges, function(stooge){ return stooge.age; }) );

/**
 * 返回list中的最小值。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。如果list为空，将返回-Infinity，
 * @param  {Array,Object}   list
 * @param  {any} iteratee
 * @param  {Object}   context [可选]
 */
_.min = function(list, iteratee, context ) {
    var _this = this;
    var type = list.constructor;
    var isF = (iteratee && iteratee.constructor === Function) ? true : false;
    var filter = '';
    var min = 0;
    var tem;
    var tem1 = true;
    if(type === Array) {
        if(!list.length) {
            return Infinity;
        }
        for(var i=0; i<list.length; i++) {

            if(iteratee) {
                if(isF) {
                    filter = iteratee.call(context, list[i]);

                    if(filter !== undefined) {
                        if(tem1) {
                            tem1 = false;
                            min == filter;
                            tem = list[i];
                        }
                        if(min > filter) {
                            min = filter;
                            tem = list[i];
                        }
                    }

                }else {
                    filter = iteratee;

                    if(list[i][filter] && tem1) {
                        tem1 = false;
                        min = list[i][filter];
                        tem = list[i];
                    }
                    if(list[i][filter] && min > list[i][filter]) {
                        min = list[i][filter];
                        tem = list[i];
                    }
                }

            }else {
                if(tem1) {
                    tem1 = false;
                    min = list[i];
                    tem = min;
                }
                if(min > list[i]) {
                    min = list[i];
                    tem = min;
                }
            }
        }
        return (tem ? tem : Infinity);
    }else {
        return Infinity;
    }
};

//测试
// var stooges = [{name: 'moe', age: 40, c: 90}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
// console.log( _.min(stooges, function(stooge){ return stooge.age; }) );
// var arr = [1,3,2,5,6];
// console.log(_.min(arr));
// var stooges = [{name: 'moe', age: 40, c: 90}, {name: 'larry', age: 30}, {name: 'curly', age: 60}];
// console.log( _.min(stooges, 'age') );
// var stooges = [111, {name: 'larry', age: 30}, {name: 'curly', age: 60}];
// console.log( _.min(stooges, 'age') );
// var stooges = [33, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
// console.log( _.min(stooges, function(stooge){ return stooge.age; }) );

/**
 * 返回一个排序后的list拷贝副本。如果传递iteratee参数，iteratee将作为list中每个值的排序依据。迭代器也可以是字符串的属性的名称进行排序的(比如 length)。
 * @param  {Array,Object}   list
 * @param  {any} iteratee
 * @param  {Object}   context [可选]
 */
_.sortBy = function(list, iteratee, context ) {
    var _this = this;
    var type = list.constructor;
    var iteratee = iteratee.constructor === Function ? iteratee : function(obj) {
            return obj[iteratee];
        };

    if(type === Array) {
        if(!list.length) {
            return Infinity;
        }
        if(iteratee) {
            if(isF) {
                var key='';
                filter = iteratee.call(context, list[0]);
                list.sort(function(a, b) {
                    var m = a[iteratee] > b[iteratee];
                    return (m ? 1 : -1);
                });
                // for(var i=0; i<list.length; i++) {
                //     filter = iteratee.call(context, list[i]);
                //     if(filter) {
                //
                //     }
                //     if(list[i].constructor !== Object) {
                //
                //     }
                //     // for(var j in list[i]) {
                //     //     if(list[i][j] === filter) {
                //     //         key = j;
                //     //     }
                //     // }
                // }

            }else {
                list.sort(function(a, b) {
                    var m = a[iteratee] > b[iteratee];
                    return (m ? 1 : -1);
                });
            }
            // for(var i=0; i<list.length; i++) {
            //
            //     if(isF) {
            //         filter = iteratee.call(context, list[i]);
            //
            //         if(filter !== undefined) {
            //
            //         }
            //
            //     }else {
            //         filter = iteratee;
            //
            //         if(list[i][filter] && tem1) {
            //             tem1 = false;
            //             min = list[i][filter];
            //             tem = list[i];
            //         }
            //         if(list[i][filter] && min > list[i][filter]) {
            //             min = list[i][filter];
            //             tem = list[i];
            //         }
            //     }
            // }

        }else {
            list.sort(function(a, b) {
                return b - a;
            });
        }
        return list;
    }else if( type === Object) {

    }else {
        return Infinity;
    }

};

//测试
// var arr = [1,3,2,5,6];
// console.log(_.sortBy(arr));
var stooges = [{name: 'moe', age: 40}, {name: 'larry', age: 50}, {name: 'curly', age: 60}];
console.log(_.sortBy(stooges, 'name'));
