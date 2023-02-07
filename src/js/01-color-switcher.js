import '../css/common.css';

const body = document.querySelector('body');
const buttonStart = document.querySelector('button[data-start]');
const buttonStop = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function changeColor() {
  body.style.backgroundColor = getRandomHexColor();
  timerID = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStart.disabled = true;
  buttonStop.disabled = false;
}

function stopChangeColor() {
  clearInterval(timerID);
  buttonStart.disabled = false;
  buttonStop.disabled = true;
}

buttonStop.disabled = true;
buttonStart.addEventListener('click', changeColor);
buttonStop.addEventListener('click', stopChangeColor);
