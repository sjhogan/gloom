import { VK_DOWN, VK_ESCAPE, VK_LEFT, VK_RETURN, VK_RIGHT, VK_UP } from 'rot-js';

import { GE_KEYDOWN, GS_LOSE, GS_WIN }  from '../core/constants';
import { cellularMap }                  from '../map/cellular';
import { move, origin }                 from '../core/display';
import { Entity }                       from '../entity/entity';
import { moveable }                     from '../entity/mixin/moveable'

export function playState(game) {
    let level;
    let player;

    return {
        enter() {
            level   = cellularMap(500, 500);
            player  = new Entity({ background: 'black', character: '@', foreground: 'white' }, moveable);

            player.setPosition(level.getRandomWalkablePosition());
        },

        exit() {
            level   = null;
            player  = null;
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
                    return player.tryMove(-1, 0, level);
                }

                if (key === VK_RIGHT) {
                    return player.tryMove(1, 0, level);
                }

                if (key === VK_UP) {
                    return player.tryMove(0, -1, level);
                }

                if (key === VK_DOWN) {
                    return player.tryMove(0, 1, level);
                }
            }
        },

        render(display) {
            const pos       = player.getPosition();
            const screen    = game.getDimensions();
            const topLeft   = origin(level.getDimensions(), screen, pos);

            for (let x = topLeft.x; x < topLeft.x + screen.width; x++) {
                for (let y = topLeft.y; y < topLeft.y + screen.height; y++) {
                    const tile = level.getTile(x, y);

                    display.draw(x - topLeft.x, y - topLeft.y, tile.getCharacter(), tile.getForeground(), tile.getBackground());
                }
            }

            display.draw(pos.x - topLeft.x, pos.y - topLeft.y, player.getCharacter(), player.getForeground(), player.getBackground());
        }
    }
}