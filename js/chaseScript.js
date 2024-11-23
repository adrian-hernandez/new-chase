var mouse = new THREE.Vector2();
var chasers = [];
var hoggers = [];
var trolls = [];
var isAlive = true;
var scoreDiv = document.querySelector('.score');
var bestScoreDiv = document.querySelector('.best-score');
var anim;
var allowStart;
var hit = new Audio('./audio/explode.mp3');
var audio = new Audio('./audio/reme.mp3');
var isChaseVersion = false;
var isTrollVerison = false;
var level = new Level();
var speedManager = new SpeedManager('chase');

audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

function gotHit(){
  hit.play();
}

function collectedGem(){
  var collect = new Audio('./audio/bell.mp3');
  collect.play();
}

// Initialize level
level.makeLevel();

function init() {
    isAlive = true;
    audio.play();

    // Create player using Player class
    player = new Player(level.getGeometry());
    if (!player) {
        console.error('Failed to create player');
        return;
    }
    level.getScene().add(player.mesh);

    // Create gem using Gem class
    gem = new Gem(level.getGeometry(), level.getContainer());
    level.getScene().add(gem.mesh);

    // Create enemies using counts from GameConfig
    const gameMode = speedManager.gameVersion; // 'chase' or 'troll'
    
    for (let i = 0; i < GameConfig.versions[gameMode].counts.chasers; i++) {
        const chaserEnemy = new Chaser(level.getGeometry(), level.getContainer());
        level.getScene().add(chaserEnemy.mesh);
        chasers.push(chaserEnemy);
    }

    for (let i = 0; i < GameConfig.versions[gameMode].counts.hoggers; i++) {
        const hoggerEnemy = new Hogger(level.getGeometry(), level.getContainer());
        level.getScene().add(hoggerEnemy.mesh);
        hoggers.push(hoggerEnemy);
    }

    for (let i = 0; i < GameConfig.versions[gameMode].counts.trolls; i++) {
        const trollEnemy = new Troll(level.getGeometry(), level.getContainer());
        level.getScene().add(trollEnemy.mesh);
        trolls.push(trollEnemy);
    }

    level.getContainer().addEventListener('mousemove', onMouseMove, false);
}

function onMouseMove(event) {
    const container = level.getContainer();
    const rect = container.getBoundingClientRect();
    
    // Calculate mouse position relative to container
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert to normalized coordinates (-1 to 1)
    mouse.x = (x / container.clientWidth) * 2 - 1;
    mouse.y = (y / container.clientHeight) * 2 - 1;

    // Map to world coordinates, invert Y here
    const playerX = (mouse.x * container.clientWidth/2);
    const playerY = -(mouse.y * container.clientHeight/2);
    
    player.updatePosition(playerX, playerY);
}

function chase() {
    const chaseSpeed = speedManager.getSpeed('chase');
    const speeds = {
        chase: chaseSpeed,
        hog: speedManager.getSpeed('hog'),
        troll: speedManager.getSpeed('troll')
    };

    chasers.forEach(chaser => {
        chaser.seek(player, chaseSpeed);
        chaser.enemyAura(gem, chasers, hoggers, trolls, speeds);
    });

    hoggers.forEach(hogger => {
        hogger.seek(gem, speedManager.getSpeed('hog'));
        hogger.enemyAura(gem, chasers, hoggers, trolls, speedManager.getSpeed('hog'));
    });

    trolls.forEach(troll => {
        troll.seek(speedManager.getSpeed('troll'));
        troll.enemyAura(gem, chasers, hoggers, trolls, speedManager.getSpeed('troll'));
    });
}

function hog() {
    for (let i = 0; i < hoggers.length; i++) {
        const hogSpeed = speedManager.getSpeed('hog');
        hoggers[i].seek(gem, hogSpeed);
        if (hoggers[i].distanceTo(player) < 2 * GameConfig.sphereRadius) {
            scoreDiv.innerHTML = "0";
            speedManager.updateSpeeds(0);
            isAlive = false;
        }
    }
    if(!isAlive) {
        gotHit();
        isAlive = true;
    }
}

function trollOn() {
    for (let i = 0; i < trolls.length; i++) {
        const trollSpeed = speedManager.getSpeed('troll');
        trolls[i].seek(trollSpeed);
        if (trolls[i].distanceTo(player) < 2 * GameConfig.sphereRadius) {
            scoreDiv.innerHTML = "0";
            speedManager.updateSpeeds(0);
            isAlive = false;
        }
    }
    if(!isAlive) {
        gotHit();
        isAlive = true;
    }
}

function enemyAura() {
    const speeds = {
        chase: speedManager.getSpeed('chase'),
        hog: speedManager.getSpeed('hog'),
        troll: speedManager.getSpeed('troll')
    };

    chasers.forEach(chaser => {
        chaser.enemyAura(gem, chasers, hoggers, trolls, speeds);
    });

    hoggers.forEach(hogger => {
        hogger.enemyAura(gem, chasers, hoggers, trolls, speeds.hog);
    });

    trolls.forEach(troll => {
        troll.enemyAura(gem, chasers, hoggers, trolls, speeds.troll);
    });
}

function empty(elem) {
    while (elem.lastChild) elem.removeChild(elem.lastChild);
}

function animate() {
    anim = requestAnimationFrame(animate);
    
    chase();
    hog();
    trollOn();
    enemyAura();

    if (player.distanceTo(gem) < 2 * GameConfig.sphereRadius) {
        gem.resetPosition();
        var score = Number(scoreDiv.innerHTML) + 1;
        collectedGem();

        speedManager.updateSpeeds(score);
        
        scoreDiv.innerHTML = score.toString();
        var best = bestScoreDiv.innerHTML.split(' ');
        if (score > Number(best[1])) {
            bestScoreDiv.innerHTML = best[0] + " " + score.toString();
        }
    }

    level.getRenderer().render(level.getScene(), level.getCamera());
}

function initGameVersion(version) {
    if(!allowStart) {
        speedManager.setGameVersion(version);
        init();
        animate();
    }
    allowStart = true;
}

document.addEventListener('DOMContentLoaded', function() {
    const trollEl = document.querySelector('.troll-style');
    const chaseEl = document.querySelector('.chase-style');
    
    trollEl.onclick = () => initGameVersion('troll');
    chaseEl.onclick = () => initGameVersion('chase');
});
