import { Color, VK_RETURN }     from 'rot-js';
import { GE_KEYDOWN, GS_TITLE } from '../core/constants';

export function winState(game) {
    return {
        enter() {
            console.log('Entered win state.');
        },

        exit() {
            console.log('Exited win state.');
        },

        handle(event, key) {
            if (event === GE_KEYDOWN && key === VK_RETURN) {
                game.switchTo(GS_TITLE);
            }
        },

        render(display) {
            display.drawText(36, 5, '%c{yellow}Win state');
            display.drawText(24, 21, 'Press [Enter] to return to title');
        }
    }
}