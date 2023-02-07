import '../css/common.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('button[data-start]');
const datetimeValue = document.querySelector('#datetime-picker');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const chooseDate = new Date(selectedDates[0]);
    const currentDate = options.defaultDate;
    if (chooseDate.getTime() <= currentDate.getTime()) {
      buttonStart.disabled = true;
      alert('Please choose a date in the future');
    } else {
      buttonStart.disabled = false;
      const timerMs = chooseDate.getTime() - currentDate.getTime();
      convertMs(timerMs);
    }
  },
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  if (days <= 99) {
    daysValue.textContent = days.toString().padStart(2, '0');
  } else {
    daysValue.textContent = days.toString().padStart(1);
  }
  hoursValue.textContent = hours.toString().padStart(2, '0');
  minutesValue.textContent = minutes.toString().padStart(2, '0');
  secondsValue.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
  buttonStart.disabled = true;
  datetimeValue.disabled = true;
  const startTimerDate = new Date(datetimeValue.value).getTime();
  timerId = setInterval(function () {
    let now = new Date().getTime();
    let distance = startTimerDate - now;
    convertMs(distance);

    if (distance < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

buttonStart.disabled = true;
flatpickr('#datetime-picker', options);
buttonStart.addEventListener('click', startTimer);
