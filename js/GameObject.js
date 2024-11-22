class GameObject {
    constructor(geometry, color, position) {
        this.mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshPhongMaterial({ color: color })
        );
        
        // Use boundaries for random positioning instead of fixed ranges
        const boundaries = level.getVisibleBoundaries();
        const randomX = position.x || (boundaries.right - boundaries.left) * Math.random() + boundaries.left;
        const randomY = position.y || (boundaries.top - boundaries.bottom) * Math.random() + boundaries.bottom;
        
        this.mesh.position.set(randomX, randomY, 0.0);
    }

    // Position accessors
    getPosition() {
        return this.mesh.position;
    }

    setPosition(x, y, z = 0) {
        const boundedPosition = this.enforceWorldBoundaries(x, y);
        this.mesh.position.set(boundedPosition.x, boundedPosition.y, z);
    }

    // Distance calculation
    distanceTo(otherObject) {
        return this.mesh.position.distanceTo(otherObject.getPosition());
    }

    // Add boundary checking method
    enforceWorldBoundaries(x, y) {
        const boundaries = level.getVisibleBoundaries();
        
        return {
            x: Math.max(boundaries.left + GameConfig.sphereRadius, 
               Math.min(boundaries.right - GameConfig.sphereRadius, x)),
            y: Math.max(boundaries.bottom + GameConfig.sphereRadius, 
               Math.min(boundaries.top - GameConfig.sphereRadius, y))
        };
    }
} 