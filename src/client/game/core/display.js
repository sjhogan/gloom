/**
 * Moves an entity to new position on the map.
 *
 * delta.x:
 *   - Positive value means movement right.
 *   - Negative value means movement left.
 *   - 0 means no movement.
 *
 * delta.y:
 *   - Positive value means movement down.
 *   - Negative value mmeans movement up.
 *   - 0 means no movement.
 *
 * @param map       {{width: number, height: number}}   Map dimensions.
 * @param position  {{x: number, y: number}}            The entity's current position.
 * @param delta     {{x: number, y: number}}            Change to entity position.
 * @returns         {{x: number, y: number}}            The entity's new position.
 */
export function move(map, position, delta) {
    return {
        x: Math.max(0, Math.min(map.width - 1, position.x + delta.x)),
        y: Math.max(0, Math.min(map.height - 1, position.y + delta.y))
    };
}

export function origin(map, display, player, x = 5) {
    const originX = Math.max(0, player.x - (display.width / 2));
    const originY = Math.max(0, player.y - (display.height / 2));

    return {
        x: Math.min(originX, map.width - display.width),
        y: Math.min(originY, map.height - display.height)
    }
}