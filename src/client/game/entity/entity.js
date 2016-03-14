import { Glyph } from 'glyph';

export function Entity(properties = {}) {

    return Object.assign(Glyph(properties), {
        getPosition() {

        }


    });
}