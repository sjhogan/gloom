import { Map as Generator } from 'rot-js';
import { Tile } from './tile';

function getEmptyMap(width, height) {
    return new Array(width).fill(0).map(() => {
        return new Array(height).fill(0).map(() => Tile.nullTile());
    });
}

function getCellularGenerator(width, height, aliveRatio) {
    const generator = new Generator.Cellular(width, height);

    generator.randomize(aliveRatio);

    return generator;
}

export function CellularMap(width, height, aliveRatio = 0.575, iterations = 5) {
    const tiles     = getEmptyMap(width, height);
    const mapper    = getCellularGenerator(width, height, aliveRatio);
    const preseed   = iterations - 1;

    for (let i = 0; i < preseed; i++) {
        mapper.create();
    }

    mapper.create((x, y, alive) => tiles[x][y] = alive ? Tile.floorTile() : Tile.wallTile());

    return Map(tiles);
}

export function Map(floorPlan = [[]]) {
    const tiles     = [ ...floorPlan ];
    const width     = tiles.length;
    const height    = tiles[0].length;

    return {
        getHeight() {
            return height;
        },

        getTile(x, y) {
            if (x < 0 || x >= width || y < 0 || y >= height) {
                return Tile.nullTile();
            }

            return tiles[x][y] || Tile.nullTile();
        },

        getTiles() {
            return [ ...tiles ];
        },

        getWidth() {
            return width;
        }
    };
}