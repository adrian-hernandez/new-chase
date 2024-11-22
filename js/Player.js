class Player extends GameObject {
    constructor(geometry) {
        super(geometry, GameConfig.colors.player, { x: 0, y: 0 });
    }

    updatePosition(x, y) {
        this.setPosition(x, y, 0);
    }
} 