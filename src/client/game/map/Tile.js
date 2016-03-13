import { Glyph }        from './glyph';
import { GC_GOLDENROD } from '../core/constants'

export function Tile(glyph) {
    return {
        getGlyph() {
            return glyph;
        }
    }
}

Tile.floorTile = () => Tile(Glyph('.'));
Tile.nullTile = () => Tile(Glyph());
Tile.wallTile = () => Tile(Glyph('#', 'goldenrod'));