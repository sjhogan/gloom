import { Glyph }        from './glyph';
import { GC_GOLDENROD } from '../core/constants'

export function Tile(properties = {}) {
    Glyph.call(this, properties);

    this._diggable = properties.diggable;
    this._walkable = properties.walkable;
}

Tile.prototype = Object.create(Glyph.prototype);

Tile.prototype.isDiggable = function() {
    return !!this._diggable;
};

Tile.prototype.isWalkable = function() {
    return !!this._walkable;
};

Tile.prototype.constructor = Tile;

Tile.FloorTile = new Tile({ character: '.', walkable: true });
Tile.NullTile = new Tile();
Tile.WallTile = new Tile({ character: '#', foreground: 'goldenrod', diggable: true });