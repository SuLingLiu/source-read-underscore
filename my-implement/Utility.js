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