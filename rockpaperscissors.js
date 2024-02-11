let times = false;
let choices = ['Rock', 'Paper', 'Scissors'];
let yourStats = JSON.parse(localStorage.getItem('stats')) || {
    win: 0,
    lose: 0,
    tie: 0
};

let writtenStats = document.querySelector('#stats');
writtenStats.innerText = localStorage.getItem('written') || "Wins: 0 Losses: 0 Ties: 0";

let battles = document.querySelector("#battles");
let battleSecond = document.querySelector('#battlesecond');
let autoplayStatus = document.getElementById('autoplay-status');

function referee(user) {
    let computerChoices = choices[Math.floor(Math.random() * choices.length)];

    if (user === computerChoices) {
        yourStats.tie++;
        battles.innerHTML = "Tie.";
    } else if ((user == "Rock" && computerChoices == "Paper") || (user == "Paper" && computerChoices == "Scissors") || (user == "Scissors" && computerChoices == "Rock")) {
        yourStats.lose++;
        battles.innerHTML = "You lose.";
    } else {
        yourStats.win++;
        battles.innerHTML = "You win.";
    }

    battleSecond.innerHTML = `You <img src="images/${user.toLowerCase()}-emoji.png" alt="${user}"> - <img src="images/${computerChoices.toLowerCase()}-emoji.png" alt="${user}"> Computer`;

    localStorage.setItem('stats', JSON.stringify(yourStats));

    stats();
}

function stats() {
    writtenStats.innerText = `Wins: ${yourStats.win} Losses: ${yourStats.lose} Ties: ${yourStats.tie}`;
    localStorage.setItem('written', writtenStats.innerText);
}

function resetScore() {
    yourStats.win = 0;
    yourStats.tie = 0;
    yourStats.lose = 0;
    localStorage.removeItem('stats');
    battleSecond.innerHTML = "";
    battles.innerHTML = "";
    stats();
}

function autoPlay() {
    let yourChoices = choices[Math.floor(Math.random() * choices.length)];
    referee(yourChoices);
}

function toggleAutoplay() {
    if (!times) {
        times = setInterval(autoPlay, 1000);
        autoplayStatus.innerText = 'Autoplay: Running';
        autoPlay();
    } else {
        clearInterval(times);
        times= false;
        autoplayStatus.innerText = 'Autoplay: Stopped';
    }
}

document.querySelector('.rock').addEventListener('click', () => referee('Rock'));
document.querySelector('.paper').addEventListener('click', () => referee('Paper'));
document.querySelector('.scissors').addEventListener('click', () => referee('Scissors'));
document.querySelector('.reset').addEventListener('click', resetScore);
document.querySelector('.autoplay-toggle').addEventListener('click', toggleAutoplay);

document.body.addEventListener('keydown', ()=>{
    if(event.key === "r"){
        referee('Rock');
    } else if(event.key === "p"){
        referee('Paper');
    } else if(event.key === "s"){
        referee('Scissors');
    } else if(event.key === "Escape"){
        resetScore();
    } 
    
});

document.body.addEventListener('keydown', (event)=>
    console.log(event.key))
