export const moveable = {
    name:   'moveable',
    type:   'moveable',

    tryMove(x, y, map) {
        const pos = {
            x: this._position.x + x,
            y: this._position.y + y
        };

        if (map.getEntityAt(x, y)) {
            return false;
        }

        const tile = map.getTile(pos.x, pos.y);

        if (tile.isWalkable()) {
            this._position.x = pos.x;
            this._position.y = pos.y;

            return true;
        }

        if (tile.isDiggable()) {
            map.dig(pos.x, pos.y);

            return true;
        }

        return false;
    }
};