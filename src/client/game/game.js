import { Display, isSupported, VK_ESCAPE, VK_RETURN } from 'rot-js';

import { GE_KEYDOWN, GE_STATECHANGE, GS_LOSE, GS_PLAY, GS_TITLE, GS_WIN } from './core/constants';

import { LoseState }    from './state/lose';
import { PlayState }    from './state/play';
import { TitleState }   from './state/title';
import { WinState }     from './state/win';

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

    let activeState;

    window.addEventListener(GE_KEYDOWN, event => {
        if (activeState) {
            activeState.handle(event.type, event.keyCode);

            display.clear();

            activeState.render(display);
        }
    });

    return {
        getDimensions() {
            return {
                height: display.getOptions().height,
                width:  display.getOptions().width
            }
        },

        getDisplay() {
            return display;
        },

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
            if (activeState) {
                activeState.exit();
            }

            display.clear();

            if (states.has(key)) {
                activeState = states.get(key);

                activeState.enter();
                activeState.render(display);
            }
        }
    };
}