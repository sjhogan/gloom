import { VK_DOWN, VK_ESCAPE, VK_LEFT, VK_RETURN, VK_RIGHT, VK_UP } from 'rot-js';

import { GE_KEYDOWN, GS_LOSE, GS_WIN }  from '../core/constants';
import { cellularMap }                  from '../map/cellular';
import { move, origin }                 from '../core/display';

export function playState(game) {
    let map;
    let pos;

    return {
        enter() {
            map = cellularMap(500, 500);
            pos = map.getRandomWalkablePosition();
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

                if (key === VK_LEFT) {
                    pos = move(map.getDimensions(), pos, { x: -1, y: 0 });
                }

                if (key === VK_RIGHT) {
                    pos = move(map.getDimensions(), pos, { x: 1, y: 0 });
                }

                if (key === VK_UP) {
                    pos = move(map.getDimensions(), pos, { x: 0, y: -1 });
                }

                if (key === VK_DOWN) {
                    pos = move(map.getDimensions(), pos, { x: 0, y: 1 });
                }
            }
        },

        render(display) {
            const screen    = game.getDimensions();
            const topLeft   = origin(map.getDimensions(), screen, pos);

            for (let x = topLeft.x; x < topLeft.x + screen.width; x++) {
                for (let y = topLeft.y; y < topLeft.y + screen.height; y++) {
                    const tile = map.getTile(x, y);

                    display.draw(x - topLeft.x, y - topLeft.y, tile.getCharacter(), tile.getForeground(), tile.getBackground());
                }
            }

            display.draw(pos.x - topLeft.x, pos.y - topLeft.y, '@', 'white', 'black');
        }
    }
}