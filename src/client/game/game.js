import { Display, isSupported, VK_ESCAPE, VK_RETURN } from 'rot-js';

import { GE_KEYDOWN, GE_STATECHANGE, GS_LOSE, GS_PLAY, GS_TITLE, GS_WIN } from './core/constants';

import { LoseState }    from './states/lose';
import { PlayState }    from './states/play';
import { TitleState }   from './states/title';
import { WinState }     from './states/win';

window.onload = () => {
    if (isSupported()) {
        const display   = new Display({ width: 80, height: 24 });
        const gloom     = Gloom(display);

        gloom.register(GS_LOSE, LoseState);
        gloom.register(GS_PLAY, PlayState);
        gloom.register(GS_TITLE, TitleState);
        gloom.register(GS_WIN, WinState);

        document.body.appendChild(display.getContainer());

        gloom.switchTo(GS_TITLE);
    }
};

function Gloom(display) {
    const states = new Map();

    window.addEventListener(GE_KEYDOWN, event => {
        if (states.has('current')) {
            states.get('current').handle(event.type, event.keyCode);
        }
    });

    return {
        getHeight() {
            return display.getOptions().height;
        },

        getWidth() {
            return display.getOptions().width;
        },

        register(key, factory) {
            states.set(key, factory(this));
        },

        switchTo(key) {
            if (states.has('current')) {
                states.get('current').exit();
            }

            display.clear();

            if (states.has(key)) {
                const state = states.get(key);

                state.enter();
                state.render(display);

                states.set('current', state);
            }
        }
    };
}