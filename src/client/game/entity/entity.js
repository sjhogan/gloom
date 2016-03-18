import { Glyph } from './glyph';

export function Entity(properties = {}, ...mixins) {
    Glyph.call(this, properties);

    this._map   = null;
    this._name  = properties.name;

    this._position = {
        x: properties.x || 0,
        y: properties.y || 0
    };

    this._mixins = {
        names: {},
        types: {}
    };

    mixins.forEach(mixin => {
        for (let key in mixin) {
            if (mixin.hasOwnProperty(key) && !(key === 'init' || key === 'name' || key === 'type' || this.hasOwnProperty(key))) {
                this[key] = mixin[key];
            }
        }

        this._mixins.names[mixin.name] = true;
        this._mixins.types[mixin.type] = true;

        if (mixins.init) {
            mixins.init.call(this, properties);
        }
    });
}

Entity.prototype = Object.create(Glyph.prototype);

Entity.prototype.getMap = function() {
    return this._map;
};

Entity.prototype.setMap = function(map) {
    this._map = map;
};

Entity.prototype.getName = function() {
    return this._name;
};

Entity.prototype.getPosition = function() {
    return Object.assign({}, this._position);
};

Entity.prototype.setPosition = function(nextPosition = {}) {
    this._position.x = nextPosition.x || 0;
    this._position.y = nextPosition.y || 0;
};

Entity.prototype.hasMixin = function(mixin) {
    if (typeof mixin === 'object') {
        return this._mixins.names[mixin.name];
    }

    return this._mixins.names[mixin] || this._mixins.types[mixin];
};

Entity.prototype.constructor = Entity;