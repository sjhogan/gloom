import { Color, VK_ENTER }      from 'rot-js';
import { GK_KEYDOWN, GS_PLAY }  from '../core/events';

export function StartState(game) {

    return {
        enter() {
            console.log('Entered start state.');
        },

        exit() {
            console.log('Exited start state.');
        },

        handle(event) {
            console.log('event');

            if (event.type === GK_KEYDOWN && event.keyCode === VK_ENTER) {
                const stateEvent = new CustomEvent(GS_PLAY, {});

                game.dispatchEvent(stateEvent);
            }
        },

        render(display) {
            display.drawText(32, 9, '%c{white}The Dungeons of');
            display.drawText(37, 11, '%c{yellow}GLOOM');
            display.drawText(28, 21, 'Press [Enter] to start');
        }
    }
}