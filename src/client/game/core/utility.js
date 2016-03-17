function mixin(target, ...mixins) {
    target._mixins = [];

    if (mixins && mixins.length) {
        mixins.forEach(mixin => {
            for (let prop in mixin) {
                if (mixin.hasOwnProperty(prop)) {
                    target[prop] = source[prop];
                }

                target._mixins.push(mixin.prototype.constructor.name);
            }
        });
    }

    return target;
}