class GameObject {
    constructor(geometry, color, position) {
        this.mesh = new THREE.Mesh(
            geometry,
            new THREE.MeshPhongMaterial({ color: color })
        );
        this.mesh.position.set(
            position.x || (enemyRangeX/2 - enemyRangeX * Math.random()),
            position.y || (enemyRangeY/2 - enemyRangeY * Math.random()),
            0.0
        );
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
            x: Math.max(boundaries.left + sphereRadius, 
               Math.min(boundaries.right - sphereRadius, x)),
            y: Math.max(boundaries.bottom + sphereRadius, 
               Math.min(boundaries.top - sphereRadius, y))
        };
    }
} 