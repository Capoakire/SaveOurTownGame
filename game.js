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
    this.load.image('solar', 'assets/solar.jpg');
    this.load.image('factory', 'assets/factory.jpg');
    this.load.image('shops', 'assets/shops.jpg');
    this.load.image('highway', 'assets/highway.jpg');
    this.load.image('train', 'assets/train.jpg');
}

function create() {
    let currentSDG = 7;
    let sceneText = this.add.text(50, 50, '', { fontSize: '20px', color: '#fff' });
    let choiceText = this.add.text(50, 500, '', { fontSize: '16px', color: '#fff' });

    function showSDG7() {
        sceneText.setText('SDG 7: Your town needs energy. Greed says: Pick one!');
        const coalButton = this.add.image(200, 300, 'coal').setInteractive().setScale(0.5);
        const solarButton = this.add.image(600, 300, 'solar').setInteractive().setScale(0.5);
        this.add.text(200, 400, 'Coal: Cheap, Dirty', { fontSize: '16px', color: '#fff' });
        this.add.text(600, 400, 'Solar: Clean, Expensive', { fontSize: '16px', color: '#fff' });

        coalButton.on('pointerdown', () => {
            choiceText.setText('Coal makes air dirty! Pick a fix:');
            showFixes(['Clean air filters', 'Plant trees'], () => showSDG8());
        });
        solarButton.on('pointerdown', () => {
            choiceText.setText('Solar is too expensive! Pick a fix:');
            showFixes(['Save energy', 'Get a loan'], () => showSDG8());
        });
    }

    function showSDG8() {
        sceneText.setText('SDG 8: Your town needs jobs. Greed says: Pick one!');
        const factoryButton = this.add.image(200, 300, 'factory').setInteractive().setScale(0.5);
        const shopsButton = this.add.image(600, 300, 'shops').setInteractive().setScale(0.5);
        this.add.text(200, 400, 'Factory: Many jobs, low pay', { fontSize: '16px', color: '#fff' });
        this.add.text(600, 400, 'Shops: Few jobs, good pay', { fontSize: '16px', color: '#fff' });

        factoryButton.on('pointerdown', () => {
            choiceText.setText('Factory workers are tired! Pick a fix:');
            showFixes(['Shorter hours', 'More pay'], () => showSDG9());
        });
        shopsButton.on('pointerdown', () => {
            choiceText.setText('Shops have too few jobs! Pick a fix:');
            showFixes(['Open more shops', 'Train workers'], () => showSDG9());
        });
    }

    function showSDG9() {
        sceneText.setText('SDG 9: Your town needs transport. Greed says: Pick one!');
        const highwayButton = this.add.image(200, 300, 'highway').setInteractive().setScale(0.5);
        const trainButton = this.add.image(600, 300, 'train').setInteractive().setScale(0.5);
        this.add.text(200, 400, 'Highway: Fast, hurts forest', { fontSize: '16px', color: '#fff' });
        this.add.text(600, 400, 'Train: Green, slow to build', { fontSize: '16px', color: '#fff' });

        highwayButton.on('pointerdown', () => {
            choiceText.setText('Highway hurts animals! Pick a fix:');
            showFixes(['Build animal bridges', 'More buses'], endGame);
        });
        trainButton.on('pointerdown', () => {
            choiceText.setText('Trains are late! Pick a fix:');
            showFixes(['Faster trains', 'Add buses'], endGame);
        });
    }

    function showFixes(options, nextScene) {
        choiceText.setText(choiceText.text + '\nClick a fix:');
        const fix1 = this.add.text(200, 520, options[0], { fontSize: '16px', color: '#fff' }).setInteractive();
        const fix2 = this.add.text(400, 520, options[1], { fontSize: '16px', color: '#fff' }).setInteractive();
        fix1.on('pointerdown', () => {
            choiceText.setText('Good idea! You helped the town!');
            setTimeout(nextScene.bind(this), 2000);
        });
        fix2.on('pointerdown', () => {
            choiceText.setText('Nice try! You helped the town!');
            setTimeout(nextScene.bind(this), 2000);
        });
    }

    function endGame() {
        sceneText.setText('You saved the town from Greed! Great job!');
        choiceText.setText('Draw your own idea to help SDGs!');
    }

    showSDG7.call(this);
}
