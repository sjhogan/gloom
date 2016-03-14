import { GC_BLACK, GC_WHITE } from '../core/constants';

const background    = GC_BLACK;
const character     = ' ';
const foreground    = GC_WHITE;

export function Glyph(properties = { background, character, foreground }) {
    return {
        getBackground: () => properties.background || background,
        getCharacter: () => properties.character || character,
        getForeground: () => properties.foreground || foreground
    };
}