class Level {
    constructor() {
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.container = null;
        this.light = null;
        this.geometry = null;
    }

    getCamera() { return this.camera; }
    getScene() { return this.scene; }
    getRenderer() { return this.renderer; }
    getContainer() { return this.container; }
    getGeometry() { return this.geometry; }

    makeLevel() {
        // Get container
        this.container = document.querySelector('.container');
        
        // Setup renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: false });
        this.renderer.setSize(600, 600);
        this.container.appendChild(this.renderer.domElement);

        // Setup camera
        this.camera = new THREE.PerspectiveCamera(
            70,
            this.container.clientWidth / this.container.clientHeight,
            1,
            1000
        );
        this.camera.position.z = 400;

        // Setup scene
        this.scene = new THREE.Scene();

        // Add light
        this.light = new THREE.PointLight(0xffffff, 3, 1000, 1);
        this.light.position.set(0, 0, 300);
        this.light.intensity = 3;
        this.scene.add(this.light);

        // Setup geometry using GameConfig.sphereRadius
        this.geometry = new THREE.SphereGeometry(GameConfig.sphereRadius);
    }

    getWorldBoundaries() {
        // Since container is now 600x600 fixed size, we can be explicit
        return {
            left: -300,    // -600/2
            right: 300,    // 600/2
            top: 300,      // 600/2
            bottom: -300   // -600/2
        };
    }

    getVisibleBoundaries() {
        // Convert degrees to radians
        const degToRad = degrees => degrees * (Math.PI / 180);
        const vFOV = degToRad(70);  // vertical FOV
        
        // Calculate visible height at camera's position
        const visibleHeight = 2 * Math.tan(vFOV / 2) * Math.abs(this.camera.position.z);
        const visibleWidth = visibleHeight * (600 / 600);  // Using fixed dimensions

        return {
            left: -visibleWidth / 2,
            right: visibleWidth / 2,
            top: visibleHeight / 2,
            bottom: -visibleHeight / 2
        };
    }
} 