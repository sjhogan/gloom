import { Color, VK_RETURN }     from 'rot-js';
import { GE_KEYDOWN, GS_PLAY }  from '../core/constants';

export function TitleState(game) {
    return {
        enter() {
            console.log('Entered title state.');
        },

        exit() {
            console.log('Exited title state.');
        },

        handle(event, key) {
            if (event === GE_KEYDOWN && key === VK_RETURN) {
                game.switchTo(GS_PLAY);
            }
        },

        render(display) {
            display.drawText(32, 9, '%c{white}The Dungeons of');
            display.drawText(37, 11, '%c{yellow}GLOOM');
            display.drawText(28, 21, 'Press [Enter] to start');
        }
    }
}