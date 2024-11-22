class Chaser extends Enemy {
    constructor(geometry) {
        super(geometry, 0x72A3C4, {});
    }

    seek(player) {
        const playerPos = player.getPosition();
        const myPos = this.getPosition();
        let newX = myPos.x;
        let newY = myPos.y;

        if(playerPos.x > myPos.x) {
            newX += chaseSpeed;
        } else {
            newX -= chaseSpeed;
        }
        if(playerPos.y > myPos.y) {
            newY += chaseSpeed;
        } else {
            newY -= chaseSpeed;
        }

        this.setPosition(newX, newY, 0);
    }

    enemyAura(gem, chasers, hoggers, trolls) {
        const myPos = this.getPosition();
        let newX = myPos.x;
        let newY = myPos.y;

        // Update gem aura
        if(this.distanceTo(gem) <= 4 * sphereRadius) {
            const gemPos = gem.getPosition();
            
            if(newX > gemPos.x) {
                newX += chaseSpeed;
            } else {
                newX -= chaseSpeed;
            }
            if(newY > gemPos.y) {
                newY += chaseSpeed;
            } else {
                newY -= chaseSpeed;
            }
        }

        // Chaser to chaser aura
        chasers.forEach(chaser => {
            if(chaser !== this && this.distanceTo(chaser) <= 4 * sphereRadius) {
                const chaserPos = chaser.getPosition();
                
                if(newX > chaserPos.x) {
                    newX += chaseSpeed;
                    chaserPos.x -= chaseSpeed;
                } else {
                    newX -= chaseSpeed;
                    chaserPos.x += chaseSpeed;
                }
                if(newY > chaserPos.y) {
                    newY += chaseSpeed;
                    chaserPos.y -= chaseSpeed;
                } else {
                    newY -= chaseSpeed;
                    chaserPos.y += chaseSpeed;
                }
            }
        });

        // Chaser to hogger aura
        hoggers.forEach(hogger => {
            if(this.distanceTo(hogger) <= 4 * sphereRadius) {
                const hoggerPos = hogger.getPosition();
                
                if(newX > hoggerPos.x) {
                    newX += chaseSpeed;
                    hoggerPos.x -= hogSpeed;
                } else {
                    newX -= chaseSpeed;
                    hoggerPos.x += hogSpeed;
                }
                if(newY > hoggerPos.y) {
                    newY += chaseSpeed;
                    hoggerPos.y -= hogSpeed;
                } else {
                    newY -= chaseSpeed;
                    hoggerPos.y += hogSpeed;
                }
            }
        });

        // Chaser to troll aura
        trolls.forEach(troll => {
            if(this.distanceTo(troll) <= 3 * sphereRadius) {
                const trollPos = troll.getPosition();
                
                if(newX > trollPos.x) {
                    newX += chaseSpeed;
                    trollPos.x -= trollSpeed;
                } else {
                    newX -= chaseSpeed;
                    trollPos.x += trollSpeed;
                }
                if(newY > trollPos.y) {
                    newY += chaseSpeed;
                    trollPos.y -= trollSpeed;
                } else {
                    newY -= chaseSpeed;
                    trollPos.y += trollSpeed;
                }
            }
        });

        this.setPosition(newX, newY, 0);
    }
} 