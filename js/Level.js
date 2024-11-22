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
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        document.body.appendChild(this.container);
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

        // Setup geometry
        this.geometry = new THREE.SphereGeometry(sphereRadius);
    }

    getWorldBoundaries() {
        const container = this.container;
        return {
            left: -container.clientWidth/2,
            right: container.clientWidth/2,
            top: container.clientHeight/2,
            bottom: -container.clientHeight/2
        };
    }

    getVisibleBoundaries() {
        // Convert degrees to radians manually
        const degToRad = degrees => degrees * (Math.PI / 180);
        const vFOV = degToRad(70);
        
        const visibleHeight = 2 * Math.tan(vFOV / 2) * Math.abs(this.camera.position.z);
        const visibleWidth = visibleHeight * (this.container.clientWidth / this.container.clientHeight);

        return {
            left: -visibleWidth / 2,
            right: visibleWidth / 2,
            top: visibleHeight / 2,
            bottom: -visibleHeight / 2
        };
    }
} 