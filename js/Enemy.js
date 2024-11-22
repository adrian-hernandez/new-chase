class Enemy extends GameObject {
    constructor(geometry, color, position) {
        super(geometry, color, position);
    }

    seek(target) {
        // Base seeking behavior - to be overridden
    }

    enemyAura(gem, chasers, hoggers, trolls) {
        // Base aura behavior - to be overridden
    }
} 