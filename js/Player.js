class Player extends GameObject {
    constructor(geometry) {
        super(geometry, 0x6C5285, { x: 0, y: 0 });
    }

    updatePosition(x, y) {
        this.setPosition(x, y, 0);
    }
} 