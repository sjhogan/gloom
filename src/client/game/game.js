const ROT   = require('rot-js');
const _     = require('lodash');

function drawDoor(display, x, y) {
    display.draw(x, y, '', '', 'red');
}

function generateMap(ROT, display) {
    ROT.RNG.setSeed(Date.now());

    const map = new ROT.Map.Uniform(80, 30);

    map.create(display.DEBUG);

    const draw = _.partial(drawDoor, display);

    map.getRooms().forEach((room,  index) => {
        room.getDoors(draw);
    });
}

if (ROT.isSupported()) {
    const display = new ROT.Display({width: 80, height: 30});

    document.body.appendChild(display.getContainer());

    generateMap(ROT, display);
}