class Hogger extends Enemy {
    constructor(geometry) {
        super(geometry, GameConfig.colors.hogger, {});
    }

    seek(gem, speed) {
        const myPos = this.getPosition();
        const gemPos = gem.getPosition();
        let newX = myPos.x;
        let newY = myPos.y;

        // Only move if far enough from gem
        if(this.distanceTo(gem) > 5 * GameConfig.sphereRadius) {
            if(gemPos.x > myPos.x) {
                newX += speed;
            } else {
                newX -= speed;
            }
            if(gemPos.y > myPos.y) {
                newY += speed;
            } else {
                newY -= speed;
            }
        }

        this.setPosition(newX, newY, 0);
    }

    enemyAura(gem, chasers, hoggers, trolls, speed) {
        const myPos = this.getPosition();
        let newX = myPos.x;
        let newY = myPos.y;

        // Hogger to gem aura
        if(this.distanceTo(gem) <= 4 * GameConfig.sphereRadius) {
            const gemPos = gem.getPosition();
            if(myPos.x > gemPos.x) {
                newX += speed;
            } else {
                newX -= speed;
            }
            if(myPos.y > gemPos.y) {
                newY += speed;
            } else {
                newY -= speed;
            }
        }

        // Hogger to hogger aura
        hoggers.forEach(hogger => {
            if(hogger !== this && this.distanceTo(hogger) <= 3 * GameConfig.sphereRadius) {
                const hoggerPos = hogger.getPosition();
                if(myPos.x > hoggerPos.x) {
                    newX += speed;
                    hogger.setPosition(hoggerPos.x - speed, hoggerPos.y, 0);
                } else {
                    newX -= speed;
                    hogger.setPosition(hoggerPos.x + speed, hoggerPos.y, 0);
                }
                if(myPos.y > hoggerPos.y) {
                    newY += speed;
                    hogger.setPosition(hoggerPos.x, hoggerPos.y - speed, 0);
                } else {
                    newY -= speed;
                    hogger.setPosition(hoggerPos.x, hoggerPos.y + speed, 0);
                }
            }
        });

        this.setPosition(newX, newY, 0);
    }
} 