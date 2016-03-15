import { Tile } from './../entity/tile';

export function getEmptyMap(width, height) {
    return new Array(width).fill(0).map(() => {
        return new Array(height).fill(0).map(() => Tile.NullTile);
    });
}

export function Map(floorPlan = [[]]) {
    this._tiles     = [ ...floorPlan ];
    this._width     = this._tiles.length;
    this._height    = this._tiles[0].length;
}

Map.prototype.dig = function(x, y) {
    if (this.getTile(x, y).isDiggable()) {
        this._tiles[x][y] = Tile.FloorTile;
    }
};

Map.prototype.getDimensions = function() {
    return {
        height: this._height,
        width:  this._width
    };
};

Map.prototype.getHeight = function() {
    return this._height;
};

Map.prototype.getRandomWalkablePosition = function() {
    let x = 0;
    let y = 0;

    while(!this.getTile(x, y).isWalkable()) {
        x = Math.floor(Math.random() * this._width);
        y = Math.floor(Math.random() * this._height);
    }

    return { x: x, y: y };
};

Map.prototype.getTile = function(x, y) {
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
        return Tile.NullTile;
    }

    return this._tiles[x][y] || Tile.NullTile;
};

Map.prototype.getTiles = function() {
    return [ ...this._tiles ];
};

Map.prototype.getWidth = function() {
    return this._width;
};