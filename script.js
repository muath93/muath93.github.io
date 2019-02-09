const result = document.querySelector('#result');
const startGame = document.querySelector('#submit')
const tryAgin = document.querySelector('#tryAgin')
// const container = document.querySelector('.container')
const playerScore = document.querySelector('.playerScore')
const computerScore = document.querySelector('.computerScore')
const seq = document.querySelectorAll('.item');
const win = document.querySelector('#win');
const winAudio = document.querySelector('#winAudio');
let computerChoose;
let score = 0;

function valueOfPlay(x) {
    playerValue(x)
}

let clickEventType = ((document.ontouchstart !== null) ? 'click' : 'touchstart');

function removeTransition(e) {
    if (e.propertyName !== "transform") return;
    this.classList.remove("playing");
}
let clickDisabled = false;

seq.forEach(key => key.addEventListener('transitionend', removeTransition));

seq.forEach((num) => {
    num.addEventListener(clickEventType, (e) => {
        if (!clickDisabled || sum === 0) {
            setTimeout(function () {
                clickDisabled = true;
            }, 800);
        } else {
            const number = e.target
            e.preventDefault()
            valueOfPlay(number.id);
            const audio = document.querySelector(`audio[data-key="${e.target.id}"]`);
            audio.currentTime = 0;
            audio.play();
            number.classList.add("playing");
            clickDisabled = true;
        }
    })
})

let sum = 0;
// let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
start = () => {
    result.innerHTML = '';
    sum = 0;
    play()
}
startGame.addEventListener(clickEventType, (e) => {
    play();
    startGame.classList.add('not-visible')
    tryAgin.classList.add('is-visible');
    setTimeout(function () {
        startGame.classList.add('is-close')
        tryAgin.classList.add('is-open');
    }, 20)
})
tryAgin.addEventListener(clickEventType, (e) => {
    if (!clickDisabled) {
        return;
    } else {
        start();
        result.style = "display:block;"
        win.innerHTML = '';
        win.classList.remove('win')
        clickDisabled = false
    }
})
playerValue = (e) => {
    playerChoose = Number(e);
    play(playerChoose);
}

function computerShow(computerChoose) {
    const audio = document.querySelector(`audio[data-key="${computerChoose}"]`);
    const show = document.querySelector(`.item[data-key="${computerChoose}"]`);
    audio.currentTime = 0;
    audio.play();
    show.classList.add("playing");
}

function play(playerChoose) {
    if (playerChoose + sum > 100) {
        console.log("more than 100")
        result.innerHTML = "Start again";
    } else if (sum === 0) {
        setTimeout(() => {
            computerChoose = 1;
            computerShow(computerChoose)
            sum += computerChoose;
            result.innerHTML = sum;
            console.log(sum)

        }, 1000)
    } else if (playerChoose + sum < 90 || sum > 0) {


        sum += playerChoose;
        result.innerHTML = sum;

        setTimeout(() => {
            computerChoose = 11 - playerChoose;
            computerShow(computerChoose)
            sum += computerChoose;
            result.innerHTML = sum;
            // console.log(sum)

            if (sum === 100) {
                winAudio.play();
                setTimeout(() => {
                    score++;
                    computerScore.innerHTML = score;
                    result.style = "display:none;"
                    win.classList.add('win')
                    win.innerHTML = "My brain beat you :)";
                }, 900)
            }

        }, 800)

    } else if (playerChoose + sum < 100 && playerChoose + sum >= 90) {

        sum += playerChoose;
        player.value = '';
        computerChoose = 100 % sum;

        setTimeout(() => {

            computerShow(computerChoose)
            sum += computerChoose;
            result.innerHTML = sum;
        }, 800)
    }
}