import { Glyph }        from './glyph';
import { GC_GOLDENROD } from '../core/constants'

export function Tile(properties = {}) {
    const { walkable, diggable } = properties;

    return Object.assign(Glyph(properties), {
        isDiggable: () => !!diggable,
        isWalkable: () => !!walkable
    });
}

Tile.floorTile = () => Tile({ character: '.', walkable: true });
Tile.nullTile = () => Tile();
Tile.wallTile = () => Tile({ character: '#', foreground: 'goldenrod', diggable: true });