class Hogger extends Enemy {
    constructor(geometry) {
        super(geometry, GameConfig.colors.hogger, {});
    }

    seek(gem) {
        const myPos = this.getPosition();
        const gemPos = gem.getPosition();
        let newX = myPos.x;
        let newY = myPos.y;

        // Only move if far enough from gem
        if(this.distanceTo(gem) > 5 * GameConfig.sphereRadius) {
            if(gemPos.x > myPos.x) {
                newX += hogSpeed;
            } else {
                newX -= hogSpeed;
            }
            if(gemPos.y > myPos.y) {
                newY += hogSpeed;
            } else {
                newY -= hogSpeed;
            }
        }

        this.setPosition(newX, newY, 0);
    }

    enemyAura(gem, chasers, hoggers, trolls) {
        const myPos = this.getPosition();
        let newX = myPos.x;
        let newY = myPos.y;

        // Hogger to gem aura
        if(this.distanceTo(gem) <= 4 * GameConfig.sphereRadius) {
            const gemPos = gem.getPosition();
            if(myPos.x > gemPos.x) {
                newX += hogSpeed;
            } else {
                newX -= hogSpeed;
            }
            if(myPos.y > gemPos.y) {
                newY += hogSpeed;
            } else {
                newY -= hogSpeed;
            }
        }

        // Hogger to hogger aura
        hoggers.forEach(hogger => {
            if(hogger !== this && this.distanceTo(hogger) <= 3 * GameConfig.sphereRadius) {
                const hoggerPos = hogger.getPosition();
                if(myPos.x > hoggerPos.x) {
                    newX += hogSpeed;
                    hogger.setPosition(hoggerPos.x - hogSpeed, hoggerPos.y, 0);
                } else {
                    newX -= hogSpeed;
                    hogger.setPosition(hoggerPos.x + hogSpeed, hoggerPos.y, 0);
                }
                if(myPos.y > hoggerPos.y) {
                    newY += hogSpeed;
                    hogger.setPosition(hoggerPos.x, hoggerPos.y - hogSpeed, 0);
                } else {
                    newY -= hogSpeed;
                    hogger.setPosition(hoggerPos.x, hoggerPos.y + hogSpeed, 0);
                }
            }
        });

        // Hogger to troll aura
        trolls.forEach(troll => {
            if(this.distanceTo(troll) <= 4 * GameConfig.sphereRadius) {
                const trollPos = troll.getPosition();
                if(myPos.x > trollPos.x) {
                    newX += hogSpeed;
                    troll.setPosition(trollPos.x - trollSpeed, trollPos.y, 0);
                } else {
                    newX -= hogSpeed;
                    troll.setPosition(trollPos.x + trollSpeed, trollPos.y, 0);
                }
                if(myPos.y > trollPos.y) {
                    newY += hogSpeed;
                    troll.setPosition(trollPos.x, trollPos.y - trollSpeed, 0);
                } else {
                    newY -= hogSpeed;
                    troll.setPosition(trollPos.x, trollPos.y + trollSpeed, 0);
                }
            }
        });

        this.setPosition(newX, newY, 0);
    }
} 