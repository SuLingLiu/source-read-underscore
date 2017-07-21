_.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
};

var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
};

var result = function(instance, obj) {
    return instance._chain ? _(obj).chain() : obj;
};

// Add your own custom functions to the Underscore object.
_.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
        var func = _[name] = obj[name];
        _.prototype[name] = function() {
            var args = [this._wrapped];
            push.apply(args, arguments);
            return result(this, func.apply(_, args));
        };
    });
};

// Add all of the Underscore functions to the wrapper object.
_.mixin(_);