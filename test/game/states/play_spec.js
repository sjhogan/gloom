import chai         from 'chai';
import sinonChai    from 'sinon-chai';
import sinon        from 'sinon';

import { VK_ESCAPE, VK_RETURN }         from 'rot-js';
import { PlayState }                    from '../../../src/client/game/states/play';
import { GE_KEYDOWN, GS_LOSE, GS_WIN }  from '../../../src/client/game/core/constants';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

describe('PlayState', () => {
    describe('State transitions', () => {
        it('Transition to win state on return keydown', () => {
            const game = {
                switchTo(key) {}
            };

            sinon.spy(game, 'switchTo');

            const state = PlayState(game);

            state.handle(GE_KEYDOWN, VK_RETURN);

            game.switchTo.should.have.been.calledOnce;
            game.switchTo.should.have.been.calledWith(GS_WIN);
        });

        it('Transition to lose state on escape keydown', () => {
            const game = {
                switchTo(key) {}
            };

            sinon.spy(game, 'switchTo');

            const state = PlayState(game);

            state.handle(GE_KEYDOWN, VK_ESCAPE);

            game.switchTo.should.have.been.calledOnce;
            game.switchTo.should.have.been.calledWith(GS_LOSE);
        });
    });
});