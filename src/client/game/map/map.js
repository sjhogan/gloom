import { Engine, Scheduler }    from 'rot-js';
import { Tile }                 from './../entity/tile';

export function getEmptyMap(width, height) {
    return new Array(width).fill(0).map(() => {
        return new Array(height).fill(0).map(() => Tile.NullTile);
    });
}

export class Map {
    constructor(floorPlan = [[]], scheduler = new Scheduler.Simple()) {
        this._entities  = [];

        this._scheduler = scheduler;
        this._engine    = new Engine(this._scheduler);

        this._tiles     = [ ...floorPlan ];
        this._height    = this._tiles[0].length;
        this._width     = this._tiles.length;
    }

    addEntity(entity) {
        const pos = entity.getPosition();
        
        if (pos.x < 0 || pos.x >= this._width || pos.y < 0 || pos.y >= this._height) {
            throw new Error('Entity added out of bounds.');
        }
        
        entity.setMap(this);
        
        this._entities.push(entity);

        if (entity.hasMixin('actor')) {
            this._scheduler.add(entity, true);
        }
    }

    addEntityAtRandomPosition(entity) {
        entity.setPosition(this.getRandomWalkablePosition());

        this.addEntity(entity);
    }
    
    dig(x, y) {
        if (this.getTile(x, y).isDiggable()) {
            this._tiles[x][y] = Tile.FloorTile;
        }
    }

    getDimensions() {
        return {
            height: this._height,
            width:  this._width
        };
    }

    getEngine() {
        return this._engine;
    }

    getEntities() {
        return this._entities;
    }

    getEntityAt(x, y) {
        for (let i = 0; i < this._entities.length; i++) {
            const pos = this._entities[i].getPosition();

            if (pos.x === x && pos.y === y) {
                return this._entities[i];
            }
        }

        return false;
    }
    
    getHeight() {
        return this._height;
    }

    getRandomWalkablePosition() {
        let x = 0;
        let y = 0;

        while(!this.getTile(x, y).isWalkable() || this.getEntityAt(x, y)) {
            x = Math.floor(Math.random() * this._width);
            y = Math.floor(Math.random() * this._height);
        }

        return { x: x, y: y };
    }

    getTile(x, y) {
        if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
            return Tile.NullTile;
        }

        return this._tiles[x][y] || Tile.NullTile;
    }

    getTiles() {
        return [ ...this._tiles ];
    }

    getWidth() {
        return this._width;
    }
}