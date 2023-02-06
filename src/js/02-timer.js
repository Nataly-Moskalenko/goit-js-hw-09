import '../css/common.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const buttonStart = document.querySelector('button[data-start]');
const datetimeValue = document.querySelector('#datetime-picker');
// const fp = flatpickr("#datetime-picker", {});
buttonStart.disabled = true;
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// let startTimerDate = new Date();
const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chooseDate = new Date(selectedDates[0]);
    const currentDate = options.defaultDate;

    if (chooseDate <= currentDate) {
      buttonStart.disabled = true;
      alert('Please choose a date in the future');
    } else {
      buttonStart.disabled = false;
      const timerMs = chooseDate.getTime() - currentDate.getTime();
      convertMs(timerMs);
    }
  },
};

flatpickr('#datetime-picker', options);
// console.log(datetimeValue.value);
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  // return { days, hours, minutes, seconds };
  daysValue.textContent = days.toString().padStart(2, '0');
  hoursValue.textContent = hours.toString().padStart(2, '0');
  minutesValue.textContent = minutes.toString().padStart(2, '0');
  secondsValue.textContent = seconds.toString().padStart(2, '0');
}

// datetimeValue.addEventListener('change', onChangeInputDate);
// function onChangeInputDate() {
//   console.log(datetimeValue.value);
// }

buttonStart.addEventListener('click', startTimer);

function startTimer() {
  const startTimerDate = new Date(datetimeValue.value).getTime();
  timerId = setInterval(function () {
    let now = new Date().getTime();
    let distance = startTimerDate - now;

    convertMs(distance);
    if (startTimerDate === now) {
      clearInterval(timerId);
      // daysValue.textContent = '00';
      // hoursValue.textContent = '00';
      // minutesValue.textContent = '00';
      // secondsValue.textContent = '00';
      // document.getElementById('demo').innerHTML = 'EXPIRED';
    }
  }, 1000);
}
