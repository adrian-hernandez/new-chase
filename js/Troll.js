class Troll extends Enemy {
    constructor(geometry) {
        super(geometry, GameConfig.colors.troll, {});
    }

    seek(speed) {
        const myPos = this.getPosition();
        const boundaries = level.getVisibleBoundaries();
        let newX = myPos.x;
        let newY = myPos.y;

        if (myPos.y <= boundaries.bottom + GameConfig.sphereRadius) {
            newX = (boundaries.right - boundaries.left) * Math.random() + boundaries.left;
            newY = boundaries.top - GameConfig.sphereRadius;
        } else {
            newY -= speed;
        }

        this.setPosition(newX, newY, 0);
    }

    enemyAura(gem, chasers, hoggers, trolls, speed) {
        const myPos = this.getPosition();
        let newX = myPos.x;
        let newY = myPos.y;

        // Troll to gem aura
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

        // Troll to troll aura
        trolls.forEach(troll => {
            if(troll !== this && this.distanceTo(troll) <= 10 * GameConfig.sphereRadius) {
                const trollPos = troll.getPosition();
                if(myPos.x > trollPos.x) {
                    newX += speed;
                    troll.setPosition(trollPos.x - speed, trollPos.y, 0);
                } else {
                    newX -= speed;
                    troll.setPosition(trollPos.x + speed, trollPos.y, 0);
                }
                if(myPos.y > trollPos.y) {
                    newY += speed;
                    troll.setPosition(trollPos.x, trollPos.y - speed, 0);
                } else {
                    newY -= speed;
                    troll.setPosition(trollPos.x, trollPos.y + speed, 0);
                }
            }
        });

        // Allow trolls to move beyond bottom boundary in aura calculations too
        this.setPosition(newX, newY, 0, { bottom: true });
    }
} 