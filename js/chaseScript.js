var mouse = new THREE.Vector2();
var chasers = [];
var hoggers = [];
var trolls = [];
var chaseSpeed = 2;
var originalSpeed = chaseSpeed;
var hogSpeed = 1;
var trollSpeed = 1;
var isAlive = true;
var scoreDiv = document.querySelector('.score');
var bestScoreDiv = document.querySelector('.best-score');
var sphereRadius = 10;
var enemyRangeX = 750;
var enemyRangeY = 700;
var gemRange = 500;
var anim;
var allowStart;
var hit = new Audio('./audio/explode.mp3');
var audio = new Audio('./audio/reme.mp3');
var isChaseVersion = false;
var isTrollVerison = false;
var level = new Level();

audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

function trollVersion(){
  nChasers = 3;
  nHoggers = 3;
  nTrolls = 3;
  chaseSpeed = 2;
  hogSpeed = 2;
  trollSpeed = 4;
}

function chaseVersion(){
  nChasers = 10;
  nHoggers = 0;
  nTrolls = 0;
  chaseSpeed = 2;
}

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
    if(isChaseVersion) {
        chaseVersion();
    } else if(isTrollVerison) {
        trollVersion();
    }
    isAlive = true;
    audio.play();

    // Create player using Player class
    player = new Player(level.getGeometry());
    if (!player) {
        console.error('Failed to create player');
        return;
    }
    level.getScene().add(player.mesh);
    console.log('Player initialized:', player); // Debug log

    // Create gem using Gem class
    gem = new Gem(level.getGeometry(), level.getContainer());
    level.getScene().add(gem.mesh);

    // Create enemies
    for (let i = 0; i < nChasers; i++) {
        const chaserEnemy = new Chaser(level.getGeometry(), level.getContainer());
        level.getScene().add(chaserEnemy.mesh);
        chasers.push(chaserEnemy);
    }

    for (let i = 0; i < nHoggers; i++) {
        const hoggerEnemy = new Hogger(level.getGeometry(), level.getContainer());
        level.getScene().add(hoggerEnemy.mesh);
        hoggers.push(hoggerEnemy);
    }

    for (let i = 0; i < nTrolls; i++) {
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
    for (let i = 0; i < chasers.length; i++) {
        if (!player) {
            console.error('Player is undefined in chase()');
            return;
        }
        
        chasers[i].seek(player);
        if (chasers[i].distanceTo(player) < 2 * sphereRadius) {
            scoreDiv.innerHTML = "0";
            isAlive = false;
        }
    }
    if(!isAlive) {
        gotHit();
        isAlive = true;
    }
}

function hog() {
    for (let i = 0; i < hoggers.length; i++) {
        hoggers[i].seek(gem);
        if (hoggers[i].distanceTo(player) < 2 * sphereRadius) {
            scoreDiv.innerHTML = "0";
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
        trolls[i].seek();
        if (trolls[i].distanceTo(player) < 2 * sphereRadius) {
            scoreDiv.innerHTML = "0";
            isAlive = false;
        }
    }
    if(!isAlive) {
        gotHit();
        isAlive = true;
    }
}

function enemyAura() {
    // Update all enemies
    chasers.forEach(chaser => {
        chaser.enemyAura(gem, chasers, hoggers, trolls);
    });

    hoggers.forEach(hogger => {
        hogger.enemyAura(gem, chasers, hoggers, trolls);
    });

    trolls.forEach(troll => {
        troll.enemyAura(gem, chasers, hoggers, trolls);
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

    if (player.distanceTo(gem) < 2 * sphereRadius) {
        gem.resetPosition();
        var score = Number(scoreDiv.innerHTML) + 1;
        collectedGem();

        if(Number(scoreDiv.innerHTML) == 3) {
            chaseSpeed++;
        }
        if(Number(scoreDiv.innerHTML) == 5) {
            chaseSpeed++;
        } else if (scoreDiv.innerHTML == "0") {
            chaseSpeed = originalSpeed;
        }
        scoreDiv.innerHTML = score.toString();
        var best = bestScoreDiv.innerHTML.split(' ');
        if (score > Number(best[1])) {
            bestScoreDiv.innerHTML = best[0] + " " + score.toString();
        }
    }

    level.getRenderer().render(level.getScene(), level.getCamera());
}

function trollBundle(){
  if(!allowStart){
    isTrollVerison = true;
    init();
    animate();
  }
  allowStart = true;
}

function chaseBundle(){
  if(!allowStart){
    isChaseVersion = true;
    init();
    animate();
  }
  allowStart = true;
}

document.addEventListener('DOMContentLoaded', function() {
    const trollEl = document.querySelector('.troll-style');
    const chaseEl = document.querySelector('.chase-style');
    
    trollEl.onclick = trollBundle;
    chaseEl.onclick = chaseBundle;
});
