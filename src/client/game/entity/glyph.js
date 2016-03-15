import { GC_BLACK, GC_WHITE } from '../core/constants';

export function Glyph(properties = { background: GC_BLACK, character: ' ', foreground: GC_WHITE }) {
    this._background    = properties.background;
    this._character     = properties.character;
    this._foreground    = properties.foreground;
}

Glyph.prototype.getBackground = function() {
    return this._background || GC_BLACK;
};

Glyph.prototype.getCharacter = function() {
    return this._character || ' ';
};

Glyph.prototype.getForeground = function() {
    return this._foreground || GC_WHITE;
};