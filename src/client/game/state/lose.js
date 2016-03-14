import { Color, VK_RETURN }     from 'rot-js';
import { GE_KEYDOWN, GS_TITLE } from '../core/constants';

export function LoseState(game) {
    return {
        enter() {
            console.log('Entered lose state.');
        },

        exit() {
            console.log('Exited lose state.');
        },

        handle(event, key) {
            if (event === GE_KEYDOWN && key === VK_RETURN) {
                game.switchTo(GS_TITLE);
            }
        },

        render(display) {
            display.drawText(35, 5, '%c{yellow}Lose state');
            display.drawText(24, 21, 'Press [Enter] to return to title');
        }
    }
}