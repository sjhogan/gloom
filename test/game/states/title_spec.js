import chai         from 'chai';
import sinonChai    from 'sinon-chai';
import sinon        from 'sinon';

import { VK_RETURN }            from 'rot-js';
import { TitleState }           from '../../../src/client/game/states/title';
import { GE_KEYDOWN, GS_PLAY }  from '../../../src/client/game/core/constants';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

describe('TitleState', () => {
    describe('State transitions', () => {
        it('Transition to play state on return keydown', () => {
            const game = {
                switchTo(key) {}
            };

            sinon.spy(game, 'switchTo');

            const state = TitleState(game);

            state.handle(GE_KEYDOWN, VK_RETURN);

            game.switchTo.should.have.been.calledOnce;
            game.switchTo.should.have.been.calledWith(GS_PLAY);
        });
    });

    describe('Screen rendering', () => {
        it('Render game title', () => {
            const state = TitleState({
                switchTo(key) {}
            });

            const display = {
                drawText() {}
            };

            sinon.spy(display, 'drawText');

            state.render(display);

            display.drawText.should.have.been.calledThrice;
            display.drawText.should.have.been.calledWith(32, 9, '%c{white}The Dungeons of');
            display.drawText.should.have.been.calledWith(37, 11, '%c{yellow}GLOOM');
            display.drawText.should.have.been.calledWith(28, 21, 'Press [Enter] to start');
        });
    });
});