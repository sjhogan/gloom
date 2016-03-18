export const playable = {
    name:   'playable',
    type:   'actor',

    act() {
        if (this._game) {
            this._game.refresh();
        }

        this.getMap().getEngine().lock();
    },

    setGame(game) {
        this._game = game;
    }
};