import { Tile } from './../entity/tile';

export function getEmptyMap(width, height) {
    return new Array(width).fill(0).map(() => {
        return new Array(height).fill(0).map(() => Tile.nullTile());
    });
}

export function Map(floorPlan = [[]]) {
    const tiles     = [ ...floorPlan ];
    const width     = tiles.length;
    const height    = tiles[0].length;

    return {
        dig(x, y) {
            if (this.getTile(x, y).isDiggable()) {
                tiles[x][y] = Tile.floorTile();
            }
        },

        getDimensions() {
            return { height, width };
        },

        getHeight() {
            return height;
        },

        getRandomWalkablePosition() {
            let x = 0;
            let y = 0;

            while(!this.getTile(x, y).isWalkable()) {
                x = Math.floor(Math.random() * width);
                y = Math.floor(Math.random() * height);
            }

            return { x: x, y: y };
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