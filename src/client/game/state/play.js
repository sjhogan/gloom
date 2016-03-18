import { VK_DOWN, VK_ESCAPE, VK_LEFT, VK_RETURN, VK_RIGHT, VK_UP } from 'rot-js';

import { GE_KEYDOWN, GS_LOSE, GS_WIN }  from '../core/constants';

import { cellularMap }  from '../map/cellular';
import { origin }       from '../core/display';
import { Entity }       from '../entity/entity';
import { moveable }     from '../entity/mixin/moveable'
import { playable }     from '../entity/mixin/playable';
import { fungus }       from '../entity/mixin/fungus';

export function playState(game) {
    let map;
    let player;
    let mold;

    return {
        enter() {
            map     = cellularMap(500, 500);
            player  = new Entity({ background: 'black', character: '@', foreground: 'white' }, moveable, playable);
            mold  = new Entity({ background: 'black', character: 'F', foreground: 'green' }, fungus);

            player.setGame(game);

            map.addEntityAtRandomPosition(player);
            map.addEntityAtRandomPosition(mold);

            map.getEngine().start();
        },

        exit() {
            map     = null;
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
                    player.tryMove(-1, 0, map);
                }

                if (key === VK_RIGHT) {
                    player.tryMove(1, 0, map);
                }

                if (key === VK_UP) {
                    player.tryMove(0, -1, map);
                }

                if (key === VK_DOWN) {
                    player.tryMove(0, 1, map);
                }

                map.getEngine().unlock();
            }
        },

        render(display) {
            const screen    = game.getDimensions();
            const topLeft   = origin(map.getDimensions(), screen, player.getPosition());

            for (let x = topLeft.x; x < topLeft.x + screen.width; x++) {
                for (let y = topLeft.y; y < topLeft.y + screen.height; y++) {
                    const tile = map.getTile(x, y);

                    display.draw(x - topLeft.x, y - topLeft.y, tile.getCharacter(), tile.getForeground(), tile.getBackground());
                }
            }

            map.getEntities().forEach(entity => {
                const pos = entity.getPosition();

                display.draw(pos.x - topLeft.x, pos.y - topLeft.y, entity.getCharacter(), entity.getForeground(), entity.getBackground());
            });
        }
    }
}