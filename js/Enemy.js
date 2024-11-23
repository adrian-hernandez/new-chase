class Enemy extends GameObject {
    constructor(geometry, color, position) {
        super(geometry, color, position);
    }

    seek(target, speed) {
        // Base seeking behavior - to be overridden
        // speed is a single number
    }

    enemyAura(gem, chasers, hoggers, trolls, speed) {
        // Base aura behavior - to be overridden
        // speed is a single number for Hogger/Troll
        // speeds = { chase, hog, troll } for Chaser
    }
} 