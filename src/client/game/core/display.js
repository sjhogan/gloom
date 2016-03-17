export function origin(map, display, player, x = 5) {
    const originX = Math.max(0, player.x - (display.width / 2));
    const originY = Math.max(0, player.y - (display.height / 2));

    return {
        x: Math.min(originX, map.width - display.width),
        y: Math.min(originY, map.height - display.height)
    }
}