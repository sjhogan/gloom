import { GC_BLACK, GC_WHITE } from '../core/constants';

export class Glyph {
    constructor(properties = { background: GC_BLACK, character: ' ', foreground: GC_WHITE }) {
        this._background = properties.background;
        this._character = properties.character;
        this._foreground = properties.foreground;
    }

    getBackground() {
        return this._background || GC_BLACK;
    }

    getCharacter() {
        return this._character || ' ';
    }

    getForeground() {
        return this._foreground || GC_WHITE;
    }
}

