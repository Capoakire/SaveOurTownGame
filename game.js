const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};
const game = new Phaser.Game(config);

function preload() {
    this.load.image('coal', 'assets/coal.jpg');
    this.load.image('solar', 'assets/solar.png');
}

function create() {
    this.add.text(50, 50, 'Your town needs energy. Pick one!', { fontSize: '20px', color: '#fff' });
    const coalButton = this.add.image(200, 300, 'coal').setInteractive();
    const solarButton = this.add.image(600, 300, 'solar').setInteractive();
    this.add.text(200, 400, 'Coal: Cheap, Dirty', { fontSize: '16px', color: '#fff' });
    this.add.text(600, 400, 'Solar: Clean, Expensive', { fontSize: '16px', color: '#fff' });

    coalButton.on('pointerdown', () => {
        this.add.text(50, 500, 'Coal makes air dirty! Fix it?', { fontSize: '16px', color: '#fff' });
        // Add grey area choices here
    });
    solarButton.on('pointerdown', () => {
        this.add.text(50, 500, 'Solar is expensive! Fix it?', { fontSize: '16px', color: '#fff' });
        // Add grey area choices here
    });
}
