import chai         from 'chai';
import sinonChai    from 'sinon-chai';
import sinon        from 'sinon';

import { VK_RETURN }            from 'rot-js';
import { winState }             from '../../../src/client/game/state/win';
import { GE_KEYDOWN, GS_TITLE } from '../../../src/client/game/core/constants';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

describe('WinState', () => {
    describe('State transitions', () => {
        it('Transition to title state on return keydown', () => {
            const game = {
                switchTo(key) {}
            };

            sinon.spy(game, 'switchTo');

            const state = winState(game);

            state.handle(GE_KEYDOWN, VK_RETURN);

            game.switchTo.should.have.been.calledOnce;
            game.switchTo.should.have.been.calledWith(GS_TITLE);
        });
    });

    describe('Screen rendering', () => {
        it('Render return to title prompt', () => {
            const state = winState({
                switchTo(key) {}
            });

            const display = {
                drawText() {}
            };

            sinon.spy(display, 'drawText');

            state.render(display);

            display.drawText.should.have.been.calledWith(24, 21, 'Press [Enter] to return to title');
        });
    });
});