import { Color, VK_ESCAPE, VK_RETURN }  from 'rot-js';
import { GE_KEYDOWN, GS_LOSE, GS_WIN }  from '../core/constants';
import { CellularMap }                  from '../map/map';

export function PlayState(game) {
    let map;

    return {
        enter() {
            map = CellularMap(game.getWidth(), game.getHeight());
        },

        exit() {
            console.log('Exited play state.');
        },

        handle(event, key) {
            if (event === GE_KEYDOWN) {
                if (key === VK_RETURN) {
                    return game.switchTo(GS_WIN);
                }

                if (key === VK_ESCAPE) {
                    return game.switchTo(GS_LOSE);
                }
            }
        },

        render(display) {
            const width     = map.getWidth();
            const height    = map.getHeight();

            for (let x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    const glyph = map.getTile(x, y).getGlyph();

                    display.draw(x, y, glyph.getChar(), glyph.getForeground(), glyph.getBackground());
                }
            }
        }
    }
}