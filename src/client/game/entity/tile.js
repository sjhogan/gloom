import { Glyph }        from './glyph';
import { GC_GOLDENROD } from '../core/constants'

export class Tile extends Glyph {
    constructor(properties = {}) {
        super(properties);

        this._diggable = properties.diggable;
        this._walkable = properties.walkable;
    }

    isDiggable() {
        return !!this._diggable;
    }

    isWalkable() {
        return !!this._walkable;
    }

    static get FloorTile() {
        return new Tile({ character: '.', walkable: true });
    }

    static get NullTile() {
        return new Tile();
    }

    static get WallTile() {
        return new Tile({ character: '#', foreground: GC_GOLDENROD, diggable: true });
    }
}