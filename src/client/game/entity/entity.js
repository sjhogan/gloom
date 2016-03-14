import { Glyph } from 'glyph';

export function Entity(properties = {}) {
    const position = {
        x: properties.x || 0,
        y: properties.y || 0
    };

    const glyph = Glyph(properties);

    glyph.setPosition = function(nextPosition = {}) {
        position.x = nextPosition.x || 0;
        position.y = nextPosition.y || 0;
    };

    glyph.getPosition   = () => Object.assign({}, position);
    glyph.getName       = () => properties.name;

    return glyph;
}