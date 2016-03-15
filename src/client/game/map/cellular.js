import { Map as generator } from 'rot-js';
import { getEmptyMap, Map } from './map';
import { Tile }             from '../entity/tile';

function getMapper(width, height, aliveRatio) {
    const mapper = new generator.Cellular(width, height);

    mapper.randomize(aliveRatio);

    return mapper;
}

export function cellularMap(width, height, aliveRatio = 0.575, iterations = 5) {
    const tiles     = getEmptyMap(width, height);
    const mapper    = getMapper(width, height, aliveRatio);
    const preseed   = iterations - 1;

    for (let i = 0; i < preseed; i++) {
        mapper.create();
    }

    mapper.create((x, y, alive) => tiles[x][y] = alive ? Tile.FloorTile : Tile.WallTile);

    return new Map(tiles);
}