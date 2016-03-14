import { Glyph }        from './glyph';
import { GC_GOLDENROD } from '../core/constants'

export function Tile(properties = {}) {
    const { walkable, diggable } = properties;

    const glyph = Glyph(properties);

    glyph.isDiggable = () => !!diggable;
    glyph.isWalkable = () => !!walkable;

    return glyph;
}

Tile.floorTile = () => Tile({ character: '.', walkable: true });
Tile.nullTile = () => Tile();
Tile.wallTile = () => Tile({ character: '#', foreground: 'goldenrod', diggable: true });