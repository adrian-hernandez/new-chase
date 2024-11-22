class Troll extends Enemy {
    constructor(geometry) {
        super(geometry, 0x76F26F, {});
    }

    seek() {
        if (this.mesh.position.y < -enemyRangeY/2) {
            this.mesh.position.x = enemyRangeX/2 - enemyRangeX * Math.random();
            this.mesh.position.y = enemyRangeY/2;
        } else {
            this.mesh.position.y -= trollSpeed;
        }
    }

    enemyAura(gem, chasers, hoggers, trolls) {
        // Troll to gem aura
        if(this.mesh.position.distanceTo(gem.position) <= 4 * sphereRadius) {
            if(this.mesh.position.x > gem.position.x) {
                this.mesh.position.x += trollSpeed;
            } else {
                this.mesh.position.x -= trollSpeed;
            }
            if(this.mesh.position.y > gem.position.y) {
                this.mesh.position.y += trollSpeed;
            } else {
                this.mesh.position.y -= trollSpeed;
            }
        }

        // Troll to troll aura
        trolls.forEach(troll => {
            if(troll !== this && this.mesh.position.distanceTo(troll.mesh.position) <= 10 * sphereRadius) {
                if(this.mesh.position.x > troll.mesh.position.x) {
                    this.mesh.position.x += trollSpeed;
                    troll.mesh.position.x -= trollSpeed;
                } else {
                    this.mesh.position.x -= trollSpeed;
                    troll.mesh.position.x += trollSpeed;
                }
                if(this.mesh.position.y > troll.mesh.position.y) {
                    this.mesh.position.y += trollSpeed;
                    troll.mesh.position.y -= trollSpeed;
                } else {
                    this.mesh.position.y -= trollSpeed;
                    troll.mesh.position.y += trollSpeed;
                }
            }
        });
    }
} 