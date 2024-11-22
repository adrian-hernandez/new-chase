class Hogger extends Enemy {
    constructor(geometry) {
        super(geometry, 0xB35675, {});
    }

    seek(gem) {
        if(this.mesh.position.distanceTo(gem.position) > 5 * sphereRadius) {
            if(gem.position.x > this.mesh.position.x) {
                this.mesh.position.x += hogSpeed;
            } else {
                this.mesh.position.x -= hogSpeed;
            }
            if(gem.position.y > this.mesh.position.y) {
                this.mesh.position.y += hogSpeed;
            } else {
                this.mesh.position.y -= hogSpeed;
            }
        }
    }

    enemyAura(gem, chasers, hoggers, trolls) {
        // Hogger to gem aura
        if(this.mesh.position.distanceTo(gem.position) <= 4 * sphereRadius) {
            if(this.mesh.position.x > gem.position.x) {
                this.mesh.position.x += hogSpeed;
            } else {
                this.mesh.position.x -= hogSpeed;
            }
            if(this.mesh.position.y > gem.position.y) {
                this.mesh.position.y += hogSpeed;
            } else {
                this.mesh.position.y -= hogSpeed;
            }
        }

        // Hogger to hogger aura
        hoggers.forEach(hogger => {
            if(hogger !== this && this.mesh.position.distanceTo(hogger.mesh.position) <= 3 * sphereRadius) {
                if(this.mesh.position.x > hogger.mesh.position.x) {
                    this.mesh.position.x += hogSpeed;
                    hogger.mesh.position.x -= hogSpeed;
                } else {
                    this.mesh.position.x -= hogSpeed;
                    hogger.mesh.position.x += hogSpeed;
                }
                if(this.mesh.position.y > hogger.mesh.position.y) {
                    this.mesh.position.y += hogSpeed;
                    hogger.mesh.position.y -= hogSpeed;
                } else {
                    this.mesh.position.y -= hogSpeed;
                    hogger.mesh.position.y += hogSpeed;
                }
            }
        });

        // Hogger to troll aura
        trolls.forEach(troll => {
            if(this.mesh.position.distanceTo(troll.mesh.position) <= 4 * sphereRadius) {
                if(this.mesh.position.x > troll.mesh.position.x) {
                    this.mesh.position.x += hogSpeed;
                    troll.mesh.position.x -= trollSpeed;
                } else {
                    this.mesh.position.x -= hogSpeed;
                    troll.mesh.position.x += trollSpeed;
                }
                if(this.mesh.position.y > troll.mesh.position.y) {
                    this.mesh.position.y += hogSpeed;
                    troll.mesh.position.y -= trollSpeed;
                } else {
                    this.mesh.position.y -= hogSpeed;
                    troll.mesh.position.y += trollSpeed;
                }
            }
        });
    }
} 