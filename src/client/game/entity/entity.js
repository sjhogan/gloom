import { Glyph } from './glyph';

export function Entity(properties = {}) {
    Glyph.call(this, properties);

    this._name = properties.name;

    this._position = {
        x: properties.x || 0,
        y: properties.y || 0
    };
}

Entity.prototype = Object.create(Glyph.prototype);

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

Entity.prototype.constructor = Entity;