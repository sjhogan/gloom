import { VK_DOWN, VK_ESCAPE, VK_LEFT, VK_RETURN, VK_RIGHT, VK_UP } from 'rot-js';

import { GE_KEYDOWN, GS_LOSE, GS_WIN }  from '../core/constants';
import { cellularMap }                  from '../map/cellular';
import { move, origin }                 from '../core/display';
import { Entity }                       from '../entity/entity';

export function playState(game) {
    let map;

    const player = new Entity({
        background: 'black',
        character:  '@',
        foreground: 'white'
    });

    return {
        enter() {
            map = cellularMap(500, 500);

            player.setPosition(map.getRandomWalkablePosition());
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
                    return player.setPosition(move(map.getDimensions(), player.getPosition(), { x: -1, y: 0 }));
                }

                if (key === VK_RIGHT) {
                    return player.setPosition(move(map.getDimensions(), player.getPosition(), { x: 1, y: 0 }));
                }

                if (key === VK_UP) {
                    return player.setPosition(move(map.getDimensions(), player.getPosition(), { x: 0, y: -1 }));
                }

                if (key === VK_DOWN) {
                    return player.setPosition(move(map.getDimensions(), player.getPosition(), { x: 0, y: 1 }));
                }
            }
        },

        render(display) {
            const pos       = player.getPosition();
            const screen    = game.getDimensions();
            const topLeft   = origin(map.getDimensions(), screen, pos);

            for (let x = topLeft.x; x < topLeft.x + screen.width; x++) {
                for (let y = topLeft.y; y < topLeft.y + screen.height; y++) {
                    const tile = map.getTile(x, y);

                    display.draw(x - topLeft.x, y - topLeft.y, tile.getCharacter(), tile.getForeground(), tile.getBackground());
                }
            }

            display.draw(pos.x - topLeft.x, pos.y - topLeft.y, player.getCharacter(), player.getForeground(), player.getBackground());
        }
    }
}