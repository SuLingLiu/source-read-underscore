刘正午(598535774)  15:28:47
var SuperClass = function(){
    console.log(1111)
    this.name = 'superclass';
    this.colors = [1,2];
}

SuperClass.prototype.say = function(){
    console.log('super say');
};

var ChildClass = function(){

    SuperClass.call(this);
}

//类式继承

function inheritObject(obj){
    var F = function(){};
    F.prototype = obj;
    return new F();
}

//原型继承
function inheritPrototype(subClass,parentClass){
    var p = inheritObject(parentClass);
    subClass.prototype = p;
    p.constructor = subClass;
}

inheritPrototype(ChildClass,Superclass);

ChildClass.prototype.say = function(){
    console.log('child say');
};

var child1 = new ChildClass();
child1.colors.push(4);

var child2 = new ChildClass();
console.log(child2.colors)
刘正午(598535774)  16:21:31
(function(){
    //构造函数
    var $ = function(selector,context){
        return new $.fn.init(selector,context);
    };

    $.fn = $.prototype = {
        constructor:$;
    init:function(selector,context){
        this.selector = selector;
        this.dom = dom;
        this.context = context;
        return this;
    },
    attr:function(){

    },
    css:function(){}
};

    $.fn.init.prototype = $.fn;

    function extend(){

    }
    $.extend = extend;
    $.fn.extend = extend;

    $.extend = $.fn.extend = function(){

    }

    $.extend({
        inArray:function(){

        },
        each:function(){

        },
    });

    $.fn.extends({
        each:function(){

        }
    });



    //工具方法
    jQuery.each = function(){};
    jQuery.extends = function(){};


    // $(selector).attr()
})();


(function(window,document,undefined){
    $.fn.extend({
        aPlugin:function(){

        },
        bPlugin:fucntion(){

    };
});




    $.fn.xxPlugin = function(){
        return this.each(function(){
            this.attr(s)
        });
    }
})(window,document);

$('.selector').xxPlugin();

    // 提取变量，便于压缩
    //
    // 防止多层包裹
    //
    // with，没名字的对象
    //
    // 为了执行字符，
    //
    // eval不能传参
    //
    // create
    //
    // 不再初始化，增加不影响父类，
    //
    // 一个变量用两次就提出来缓存，因为它可能多次初始化
    //
    // undefined 在jquery传进去，防止被修改
    //
    // jquery插件的return是为了链式调用