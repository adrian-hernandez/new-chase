class Troll extends Enemy {
    constructor(geometry) {
        super(geometry, GameConfig.colors.troll, {});
    }

    seek() {
        const myPos = this.getPosition();
        const boundaries = level.getVisibleBoundaries();
        let newX = myPos.x;
        let newY = myPos.y;

        if (myPos.y <= boundaries.bottom + GameConfig.sphereRadius) {
            newX = (boundaries.right - boundaries.left) * Math.random() + boundaries.left;
            newY = boundaries.top - GameConfig.sphereRadius;
        } else {
            newY -= trollSpeed;
        }

        this.setPosition(newX, newY, 0);
    }

    enemyAura(gem, chasers, hoggers, trolls) {
        const myPos = this.getPosition();
        let newX = myPos.x;
        let newY = myPos.y;

        // Troll to gem aura
        if(this.distanceTo(gem) <= 4 * GameConfig.sphereRadius) {
            const gemPos = gem.getPosition();
            if(myPos.x > gemPos.x) {
                newX += trollSpeed;
            } else {
                newX -= trollSpeed;
            }
            if(myPos.y > gemPos.y) {
                newY += trollSpeed;
            } else {
                newY -= trollSpeed;
            }
        }

        // Troll to troll aura
        trolls.forEach(troll => {
            if(troll !== this && this.distanceTo(troll) <= 10 * GameConfig.sphereRadius) {
                const trollPos = troll.getPosition();
                if(myPos.x > trollPos.x) {
                    newX += trollSpeed;
                    troll.setPosition(trollPos.x - trollSpeed, trollPos.y, 0);
                } else {
                    newX -= trollSpeed;
                    troll.setPosition(trollPos.x + trollSpeed, trollPos.y, 0);
                }
                if(myPos.y > trollPos.y) {
                    newY += trollSpeed;
                    troll.setPosition(trollPos.x, trollPos.y - trollSpeed, 0);
                } else {
                    newY -= trollSpeed;
                    troll.setPosition(trollPos.x, trollPos.y + trollSpeed, 0);
                }
            }
        });

        // Allow trolls to move beyond bottom boundary in aura calculations too
        this.setPosition(newX, newY, 0, { bottom: true });
    }
} 