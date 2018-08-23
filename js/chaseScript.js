var camera, scene, renderer, container, light1, geometry, player, gem;
var mouse = new THREE.Vector2();
var chaser, hogger, troll;
var nChasers;
var nHoggers;
var nTrolls;
var chasers = [];
var hoggers = [];
var trolls = [];
var chaseSpeed = 2;
var originalSpeed = chaseSpeed;
var hogSpeed = 1;
var trollSpeed = 1;
var isAlive = true;
var scoreDiv = document.getElementById( "score" );
var bestScoreDiv = document.getElementById( "bestScore" );
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

audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

var trollEl = document.getElementById("trollStyle");
trollEl.onclick = trollBundle;

var chaseEl = document.getElementById("chaseStyle");
chaseEl.onclick = chaseBundle;

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

function drawBox(){
  // renderer
  container = document.getElementById( "container" );
  renderer = new THREE.WebGLRenderer( {alpha: false});
  //render.setClearColor(0xffffff, 0);
  renderer.setSize( container.clientWidth, container.clientHeight );
  document.body.appendChild( container );
  container.appendChild( renderer.domElement );

  // camera
  camera = new THREE.PerspectiveCamera( 70, container.clientWidth / container.clientHeight, 1, 1000 );
  camera.position.z = 400;

  // scene
  scene = new THREE.Scene();

  //Add a point of light
  light1 = new THREE.PointLight( 0xffffff, 3, 1000, 1 );
  light1.position.set( 0, 0, 300 );
  light1.intensity = 3;
  scene.add( light1 );


  //light.shadowMapVisible = true;

  // mesh properties
  geometry = new THREE.SphereGeometry( sphereRadius );
}

drawBox();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function init() {

  if( isChaseVersion ){
    chaseVersion();
  }
  else if( isTrollVerison ){
    trollVersion();
  }
  isAlive = true;
  audio.play();
  //took code from here and placed it in the function drawBox

  for ( let i = 0; i < nChasers; i++ ) {
      chaser = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: 0x72A3C4} ) );
      chaser.position.set( enemyRangeX/2 - enemyRangeX * Math.random(),
                 enemyRangeY/2 - enemyRangeY * Math.random(),
                 0.0);
      scene.add( chaser );
      chasers.push( chaser );
  }
  //create and store hoggers
  for ( let i = 0; i < nHoggers; i++ ) {
    hogger = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: 0xB35675} ) );
    hogger.position.set( enemyRangeX/2 - enemyRangeX * Math.random(),
               enemyRangeY/2 - enemyRangeY * Math.random(),
               0.0);
    scene.add( hogger );
    hoggers.push( hogger );
  }
  //create and store terrorizers
  for ( let i = 0; i < nTrolls; i++ ) {
    troll = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: 0x76F26F} ) );
    troll.position.set( enemyRangeX/2 - enemyRangeX * Math.random(),
               enemyRangeY/2 - enemyRangeY * Math.random(),
               0.0);
    scene.add( troll );
    trolls.push( troll );
  }
    // Create the gem
  gem = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( {color: 0xDFE66A} ) );
  gem.position.set( gemRange/2 - gemRange * Math.random(),
            gemRange/2 - gemRange * Math.random(),
            0.0);
  scene.add( gem );

  // Add and store player
  player = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: 0x6C5285 } ) );
  scene.add( player );
  container.addEventListener( 'mousemove', onMouseMove, false );
}

function onMouseMove( event ) {
  mouse.x = ( ( event.clientX - container.offsetLeft ) / container.clientWidth ) * 2 - 1;
  mouse.y = - ( ( event.clientY - container.offsetTop ) / container.clientHeight ) * 2 + 1;
  player.position.set( 420 * mouse.x, 275 * mouse.y, 0.0 );
}

function chase(){
  //deal with chasers
  for ( let i = 0; i < chasers.length; i++ ){
    if(player.position.x > chasers[i].position.x){
      chasers[i].position.x+= chaseSpeed;
    }else{
      chasers[i].position.x-= chaseSpeed;
    }
    if(player.position.y > chasers[i].position.y){
      chasers[i].position.y+= chaseSpeed;
    }else{
      chasers[i].position.y-= chaseSpeed;
    }
    if ( chasers[i].position.distanceTo( player.position ) < 2 * sphereRadius) { // if there's a player-enemy collision
        scoreDiv.innerHTML = "0"; //reset score
        isAlive = false;
        //
    }
  }
  if(!isAlive){
    gotHit();
    isAlive = true;
  }
}

//This function needs to be modified
function hog(){
  for ( let i = 0; i < hoggers.length; i++ ){
    if( hoggers[i].position.distanceTo( gem.position ) > 5 * sphereRadius){
      if(gem.position.x > hoggers[i].position.x){
        hoggers[i].position.x+= hogSpeed;
      }else{
        hoggers[i].position.x-= hogSpeed;
      }
      if(gem.position.y > hoggers[i].position.y){
        hoggers[i].position.y+= hogSpeed;
      }else{
        hoggers[i].position.y-= hogSpeed;
      }
    }else if(hoggers[i].position.distanceTo( gem.position ) <= 5 * sphereRadius){

    }
    if ( hoggers[i].position.distanceTo( player.position ) < 2 * sphereRadius) { // if there's a player-enemy collision
        scoreDiv.innerHTML = "0"; //reset score
        isAlive = false;
        //
    }
  }
  if(!isAlive){
    gotHit();
    isAlive = true;
  }
}

//This function need to be modified
function trollOn(){
  for ( let i = 0; i < trolls.length; i++ ){
    if ( trolls[i].position.y < -enemyRangeY/2 ) { // if the enemy has moved below the container
      trolls[i].position.x = enemyRangeX/2 - enemyRangeX * Math.random(); //set new x-coord for variety
      trolls[i].position.y = enemyRangeY/2; // set y-coord at top of container
    } else {
      if ( trolls[i].position.distanceTo( player.position ) < 2 * sphereRadius) { // if there's a player-enemy collision
        scoreDiv.innerHTML = "0"; //reset score
      isAlive = false;
      //
      }
      trolls[i].position.y -= trollSpeed; // translate enemy downwards
    }
  }
  if(!isAlive){
    gotHit();
    isAlive = true;
  }
}

function enemyAura(){
  for ( let i = 0; i < chasers.length; i++ ){

    //chaser to gem aura
    for ( let a = 0; a < hoggers.length; a++ ){
      //chaser to chaser aura
      if(chasers[i].position.distanceTo(gem.position) <= 4 * sphereRadius){
        if(chasers[i].position.x > gem.position.x){
          chasers[i].position.x+= chaseSpeed;
        }else{
          chasers[i].position.x-= chaseSpeed;
        }
        if(chasers[i].position.y > gem.position.y){
          chasers[i].position.y+= chaseSpeed;
        }else{
          chasers[i].position.y-= chaseSpeed;
        }
      }
    }

    for ( let j = 0; j < chasers.length; j++ ){

      //chaser to chaser aura
      if(chasers[i].position.distanceTo(chasers[j].position) <= 4 * sphereRadius){
        if(chasers[i].position.x > chasers[j].position.x){
          chasers[i].position.x+= chaseSpeed;
          chasers[j].position.x-= chaseSpeed;
        }else{
          chasers[i].position.x-= chaseSpeed;
          chasers[j].position.x+= chaseSpeed;
        }
        if(chasers[i].position.y > chasers[j].position.y){
          chasers[i].position.y+= chaseSpeed;
          chasers[j].position.y-= chaseSpeed;
        }else{
          chasers[i].position.y-= chaseSpeed;
          chasers[j].position.y+= chaseSpeed;
        }
      }
    }

    //chaser to hogger aura
    for ( let k = 0; k < hoggers.length; k++ ){
      if(chasers[i].position.distanceTo(hoggers[k].position) <= 4 * sphereRadius){
        if(chasers[i].position.x > hoggers[k].position.x){
          chasers[i].position.x+= chaseSpeed;
          hoggers[k].position.x-= hogSpeed;
        }else{
          chasers[i].position.x-= chaseSpeed;
          hoggers[k].position.x+= hogSpeed;
        }
        if(chasers[i].position.y > hoggers[k].position.y){
          chasers[i].position.y+= chaseSpeed;
          hoggers[k].position.y-= hogSpeed;
        }else{
          chasers[i].position.y-= chaseSpeed;
          hoggers[k].position.y+= hogSpeed;
        }
      }
    }

    //chaser to troll aura
    for ( let n = 0; n < trolls.length; n++ ){
      //chaser to chaser aura
      if(chasers[i].position.distanceTo(trolls[n].position) <= 3 * sphereRadius){
        if(chasers[i].position.x > trolls[n].position.x){
          chasers[i].position.x+= chaseSpeed;
          trolls[n].position.x-= trollSpeed;
        }else{
          chasers[i].position.x-= chaseSpeed;
          trolls[n].position.x+= trollSpeed;
        }
        if(chasers[i].position.y > trolls[n].position.y){
          chasers[i].position.y+= chaseSpeed;
          trolls[n].position.y-= trollSpeed;
        }else{
          chasers[i].position.y-= chaseSpeed;
          trolls[n].position.y+= trollSpeed;
        }
      }
    }
  }



  //For loop specifically for hoggers
  for ( let i = 0; i < hoggers.length; i++){

    //hogger to gem aura
    for ( let b = 0; b < hoggers.length; b++ ){
      if(hoggers[i].position.distanceTo(gem.position) <= 4 * sphereRadius){
        if(hoggers[i].position.x > gem.position.x){
          hoggers[i].position.x+= hogSpeed;
        }else{
          hoggers[i].position.x-= hogSpeed;
        }
        if(hoggers[i].position.y > gem.position.y){
          hoggers[i].position.y+= hogSpeed;
        }else{
          hoggers[i].position.y-= hogSpeed;
        }
      }
    }

    //hogger to hogger aura
    for ( let j = 0; j < hoggers.length; j++ ){
      if(hoggers[i].position.distanceTo(hoggers[j].position) <= 3 * sphereRadius){
        if(hoggers[i].position.x > hoggers[j].position.x){
          hoggers[i].position.x+= hogSpeed;
          hoggers[j].position.x-= hogSpeed;
        }else{
          hoggers[i].position.x-= hogSpeed;
          hoggers[j].position.x+= hogSpeed;
        }
        if(hoggers[i].position.y > hoggers[j].position.y){
          hoggers[i].position.y+= hogSpeed;
          hoggers[j].position.y-= hogSpeed;
        }else{
          hoggers[i].position.y-= hogSpeed;
          hoggers[j].position.y+= hogSpeed;
        }
      }
    }

    //hogger to troll aura
    for ( let k = 0; k < trolls.length; k++ ){
      if(hoggers[i].position.distanceTo(trolls[k].position) <= 4 * sphereRadius){
        if(hoggers[i].position.x > trolls[k].position.x){
          hoggers[i].position.x+= hogSpeed;
          trolls[k].position.x-= trollSpeed;
        }else{
          hoggers[i].position.x-= hogSpeed;
          trolls[k].position.x+= trollSpeed;
        }
        if(hoggers[i].position.y > trolls[k].position.y){
          hoggers[i].position.y+= hogSpeed;
          trolls[k].position.y-= trollSpeed;
        }else{
          hoggers[i].position.y-= hogSpeed;
          trolls[k].position.y+= trollSpeed;
        }
      }
    }
  }

//For loop specifically for trolls
  for ( let i = 0; i < trolls.length; i++){


    for ( let c = 0; c < trolls.length; c++ ){
      if(trolls[i].position.distanceTo(gem.position) <= 4 * sphereRadius){
        if(trolls[i].position.x > gem.position.x){
          trolls[i].position.x+= trollSpeed;
        }else{
          trolls[i].position.x-= trollSpeed;
        }
        if(trolls[i].position.y > gem.position.y){
          trolls[i].position.y+= trollSpeed;
        }else{
          trolls[i].position.y-= trollSpeed;
        }
      }
    }

    //troll to troll aura
    for ( let j = 0; j < trolls.length; j++ ){
      if(trolls[i].position.distanceTo(trolls[j].position) <= 10 * sphereRadius){
        if(trolls[i].position.x > trolls[j].position.x){
          trolls[i].position.x+= trollSpeed;
          trolls[j].position.x-= trollSpeed;
        }else{
          trolls[i].position.x-= trollSpeed;
          trolls[j].position.x+= trollSpeed;
        }
        if(trolls[i].position.y > trolls[j].position.y){
          trolls[i].position.y+= trollSpeed;
          trolls[j].position.y-= trollSpeed;
        }else{
          trolls[i].position.y-= trollSpeed;
          trolls[j].position.y+= trollSpeed;
        }
      }
    }
  }
}

function empty(elem) {
    while (elem.lastChild) elem.removeChild(elem.lastChild);
}

function animate() {
anim = requestAnimationFrame( animate );
  // update enemies
  chase();
  hog();
  trollOn();
  enemyAura();
  //For game over animation
  /*if(!isAlive){
    cancelAnimationFrame(this.anim);// Stop the animation
    this.renderer.domElement.addEventListener('dblclick', null, false);
    this.scene = null;
    this.projector = null;
    this.camera = null;
    this.controls = null;
    empty(this.modelContainer);
  }*/
  //Make hoggers circle the gem


  // check for player-gem collision
  if ( player.position.distanceTo( gem.position ) < 2 * sphereRadius ) {
    gem.position.x = gemRange/2 - gemRange * Math.random();// give the gem a random xy coord
    gem.position.y = gemRange/2 - gemRange * Math.random();
    var score = Number(scoreDiv.innerHTML) + 1; // increase score
    //play sounnd
    collectedGem();
    //increase difficulty

    if(Number(scoreDiv.innerHTML) == 3){
      chaseSpeed++;
    }
    if(Number(scoreDiv.innerHTML) == 5){
      chaseSpeed++;
    }else if (scoreDiv.innerHTML == "0"){
      chaseSpeed = originalSpeed;
    }
    scoreDiv.innerHTML = score.toString();
    var best = bestScoreDiv.innerHTML.split(' ');
    if ( score > Number( best[1] ) ) {
      bestScoreDiv.innerHTML = best[0] + " " + score.toString();
    }
  }

  renderer.render( scene, camera );
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
