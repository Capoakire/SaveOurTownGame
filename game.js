const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
const game = new Phaser.Game(config);

let cityName = '';
let money = 1000;
let problems = [
    { sdg: 7, text: 'Blackout! No power in city.', icon: 'power', solutions: [
        { text: 'Coal Plant ($200, pollutes)', cost: 200, success: false },
        { text: 'Solar Panels ($500, clean)', cost: 500, success: true },
        { text: 'Wind Turbines ($400, slow)', cost: 400, success: false }
    ]},
    { sdg: 8, text: 'No jobs! People are poor.', icon: 'factory', solutions: [
        { text: 'Big Factory ($300, low pay)', cost: 300, success: false },
        { text: 'Small Shops ($400, good pay)', cost: 400, success: true },
        { text: 'Job Training ($350, slow)', cost: 350, success: false }
    ]},
    { sdg: 9, text: 'Broken bridge! No travel.', icon: 'road', solutions: [
        { text: 'Cheap Bridge ($200, weak)', cost: 200, success: false },
        { text: 'Strong Bridge ($500, safe)', cost: 500, success: true },
        { text: 'Buses ($350, slow)', cost: 350, success: false }
    ]}
];
let currentProblem = -1;
let solved = 0;

function preload() {
    this.load.image('city', 'assets/city.png');
    this.load.image('power', 'assets/power.png');
    this.load.image('factory', 'assets/factory.png');
    this.load.image('road', 'assets/road.png');
    this.load.image('blackout', 'assets/blackout.png');
    this.load.image('unemployed', 'assets/unemployed.png');
    this.load.image('broken', 'assets/broken.png');
}

function create() {
    this.add.image(400, 300, 'city').setScale(0.5);
    let powerIcon = this.add.image(200, 100, 'power').setScale(0.5);
    let factoryIcon = this.add.image(400, 100, 'factory').setScale(0.5);
    let roadIcon = this.add.image(600, 100, 'road').setScale(0.5);
    
    let nameText = this.add.text(50, 50, 'Enter city name:', { fontSize: '20px', color: '#fff' });
    let input = document.createElement('input');
    input.type = 'text';
    input.style.position = 'absolute';
    input.style.top = '80px';
    input.style.left = '50px';
    document.body.appendChild(input);
    
    let submit = this.add.text(200, 80, 'Start Game', { fontSize: '16px', color: '#0f0' }).setInteractive();
    submit.on('pointerdown', () => {
        cityName = input.value || 'My City';
        input.remove();
        submit.destroy();
        nameText.setText(`${cityName}: $ ${money}`);
    });
    
    this.statusText = this.add.text(50, 150, '', { fontSize: '20px', color: '#fff' });
    this.solutionButtons = [];
}

function update(time) {
    if (cityName && currentProblem < problems.length - 1 && time > (currentProblem + 1) * 30000) {
        currentProblem++;
        showProblem.call(this);
    }
}

function showProblem() {
    let problem = problems[currentProblem];
    this.statusText.setText(problem.text);
    this.add.image(400, 300, problem.icon === 'power' ? 'blackout' : problem.icon === 'factory' ? 'unemployed' : 'broken').setScale(0.5);
    
    this.solutionButtons.forEach(btn => btn.destroy());
    this.solutionButtons = [];
    problem.solutions.forEach((sol, i) => {
        let btn = this.add.text(50, 200 + i * 50, sol.text, { fontSize: '16px', color: '#ff0' }).setInteractive();
        btn.on('pointerdown', () => handleSolution.call(this, sol));
        this.solutionButtons.push(btn);
    });
}

function handleSolution(solution) {
    money -= solution.cost;
    this.statusText.setText(`${cityName}: $ ${money}\n${solution.success ? 'Problem fixed!' : 'Bad choice! Try again.'}`);
    this.solutionButtons.forEach(btn => btn.destroy());
    this.solutionButtons = [];
    
    if (solution.success) {
        solved++;
        if (solved === problems.length) {
            this.statusText.setText(money > 0 ? `You win! ${cityName} is saved with $ ${money}!` : 'You fixed all, but no money left!');
        } else if (money <= 0) {
            this.statusText.setText('Game over! No money left.');
        } else {
            setTimeout(showProblem.bind(this), 2000);
        }
    } else if (money <= 0) {
        this.statusText.setText('Game over! No money left.');
    } else {
        setTimeout(showProblem.bind(this), 2000);
    }
}
