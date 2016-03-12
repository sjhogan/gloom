import { Color, VK_ESCAPE, VK_RETURN }  from 'rot-js';
import { GE_KEYDOWN, GS_LOSE, GS_WIN }  from '../core/constants';

export function PlayState(game) {
    return {
        enter() {
            console.log('Entered play state.');
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
            display.drawText(35, 5, '%c{yellow}Play state');
            display.drawText(21, 21, 'Press [Enter] to win, or [Esc] to lose');
        }
    }
}