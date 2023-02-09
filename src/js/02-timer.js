import '../css/common.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix/build/notiflix-notify-aio';

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
  defaultDate: Date.now(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const chooseDate = new Date(selectedDates[0].getTime());
    const currentDate = options.defaultDate;

    if (chooseDate <= currentDate) {
      buttonStart.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      buttonStart.disabled = false;
      addLeadingZero(convertMs(chooseDate - currentDate));
    }
  },
};

function convertMs(ms) {
  if (ms > 0) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  } else {
    return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  }
}

function addLeadingZero({ days, hours, minutes, seconds }) {
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
  addLeadingZero(convertMs(startTimerDate - Date.now()));

  const timerId = setInterval(() => {
    let timer = startTimerDate - Date.now();
    addLeadingZero(convertMs(timer));

    if (timer < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

buttonStart.disabled = true;
flatpickr('#datetime-picker', options);
buttonStart.addEventListener('click', startTimer);
