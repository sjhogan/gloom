import { Glyph } from './glyph';

export class Entity extends Glyph {
    constructor(properties = {}, ...mixins) {
        super(properties);

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

    getMap() {
        return this._map;
    }

    setMap(map) {
        this._map = map;
    }

    getName() {
        return this._name;
    }

    getPosition() {
        return Object.assign({}, this._position);
    }

    setPosition(nextPosition = {}) {
        this._position.x = nextPosition.x || 0;
        this._position.y = nextPosition.y || 0;
    }

    hasMixin(mixin) {
        if (typeof mixin === 'object') {
            return this._mixins.names[mixin.name];
        }

        return this._mixins.names[mixin] || this._mixins.types[mixin];
    }
}