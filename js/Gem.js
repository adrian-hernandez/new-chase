class Gem extends GameObject {
    constructor(geometry) {
        super(geometry, GameConfig.colors.gem, {});
    }

    resetPosition() {
        const boundaries = level.getVisibleBoundaries();
        const randomX = (boundaries.right - boundaries.left) * Math.random() + boundaries.left;
        const randomY = (boundaries.top - boundaries.bottom) * Math.random() + boundaries.bottom;
        this.mesh.position.set(randomX, randomY, 0.0);
    }
}