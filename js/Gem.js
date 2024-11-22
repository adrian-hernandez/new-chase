class Gem extends GameObject {
    constructor(geometry) {
        super(geometry, 0xDFE66A, {
            x: gemRange/2 - gemRange * Math.random(),
            y: gemRange/2 - gemRange * Math.random()
        });
    }

    resetPosition() {
        this.mesh.position.set(
            gemRange/2 - gemRange * Math.random(),
            gemRange/2 - gemRange * Math.random(),
            0.0
        );
    }
}