import { GC_BLACK, GC_WHITE } from '../core/constants';

export function Glyph(char = ' ', foreground = GC_WHITE, background = GC_BLACK) {
    return {
        getBackground() {
            return background;
        },

        getChar() {
            return char;
        },

        getForeground() {
            return foreground;
        }
    }
}