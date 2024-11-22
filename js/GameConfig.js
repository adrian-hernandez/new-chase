class GameConfig {
    // Core game constants
    static sphereRadius = 10;

    // Version-specific configurations
    static versions = {
        chase: {
            counts: {
                chasers: 10,
                hoggers: 0,
                trolls: 0
            }
        },
        troll: {
            counts: {
                chasers: 3,
                hoggers: 3,
                trolls: 3
            }
        }
    };

    // Colors (using THREE.js hex colors)
    static colors = {
        player: 0x6C5285,
        gem: 0xF9D71C,
        chaser: 0x72A3C4,
        hogger: 0xB35675,
        troll: 0x76F26F
    };
}