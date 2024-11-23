class Chaser extends Enemy {
    constructor(geometry) {
        super(geometry, GameConfig.colors.chaser, {});
    }

    seek(player, speed) {
        const playerPos = player.getPosition();
        const myPos = this.getPosition();
        let newX = myPos.x;
        let newY = myPos.y;

        if(playerPos.x > myPos.x) {
            newX += speed;
        } else {
            newX -= speed;
        }
        if(playerPos.y > myPos.y) {
            newY += speed;
        } else {
            newY -= speed;
        }

        this.setPosition(newX, newY, 0);
    }

    enemyAura(gem, chasers, hoggers, trolls, speeds) {
        const { chase, hog, troll } = speeds;
        const myPos = this.getPosition();
        let newX = myPos.x;
        let newY = myPos.y;

        if(this.distanceTo(gem) <= 4 * GameConfig.sphereRadius) {
            const gemPos = gem.getPosition();
            if(newX > gemPos.x) newX += chase;
            else newX -= chase;
            if(newY > gemPos.y) newY += chase;
            else newY -= chase;
        }

        chasers.forEach(chaser => {
            if(chaser !== this && this.distanceTo(chaser) <= 4 * GameConfig.sphereRadius) {
                const chaserPos = chaser.getPosition();
                if(newX > chaserPos.x) {
                    newX += chase;
                    chaser.setPosition(chaserPos.x - chase, chaserPos.y, 0);
                }
                if(newY > chaserPos.y) {
                    newY += chase;
                    chaser.setPosition(chaserPos.x, chaserPos.y - chase, 0);
                }
            }
        });

        hoggers.forEach(hogger => {
            if(this.distanceTo(hogger) <= 4 * GameConfig.sphereRadius) {
                const hoggerPos = hogger.getPosition();
                if(newX > hoggerPos.x) {
                    newX += chase;
                    hogger.setPosition(hoggerPos.x - hog, hoggerPos.y, 0);
                }
                if(newY > hoggerPos.y) {
                    newY += chase;
                    hogger.setPosition(hoggerPos.x, hoggerPos.y - chase, 0);
                }
            }
        });

        trolls.forEach(troll => {
            if(this.distanceTo(troll) <= 3 * GameConfig.sphereRadius) {
                const trollPos = troll.getPosition();
                if(newX > trollPos.x) {
                    newX += chase;
                    troll.setPosition(trollPos.x - troll, trollPos.y, 0);
                }
                if(newY > trollPos.y) {
                    newY += chase;
                    troll.setPosition(trollPos.x, trollPos.y - troll, 0);
                }
            }
        });

        this.setPosition(newX, newY, 0);
    }
} 