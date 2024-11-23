class SpeedManager {
    constructor(gameVersion = 'chase') {
        this.gameVersion = gameVersion;
        
        // Base speeds for each version
        this.baseSpeeds = {
            chase: {
                chase: 2,
                hog: 1,
                troll: 1
            },
            troll: {
                chase: 2,
                hog: 2,
                troll: 4
            }
        };

        this.currentSpeeds = {
            chase: this.baseSpeeds[gameVersion].chase,
            hog: this.baseSpeeds[gameVersion].hog,
            troll: this.baseSpeeds[gameVersion].troll
        };
    }

    updateSpeeds(score) {
        if (score === 0) {
            this.resetSpeeds();
            return;
        }

        // Only chase speed increases with score
        let chaseSpeed = this.baseSpeeds[this.gameVersion].chase;
        if (score >= 30) chaseSpeed++;
        if (score >= 15) chaseSpeed++;
        
        this.currentSpeeds.chase = chaseSpeed;
    }

    resetSpeeds() {
        this.currentSpeeds = { ...this.baseSpeeds[this.gameVersion] };
    }

    setGameVersion(version) {
        this.gameVersion = version;
        this.resetSpeeds();
    }

    getSpeed(type) {
        return this.currentSpeeds[type];
    }
} 