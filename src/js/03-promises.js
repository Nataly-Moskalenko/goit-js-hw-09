import '../css/common.css';
import Notiflix from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

const createPromise = (position, delay) => {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
};

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  for (let i = 0; i < Number(amount.value); i += 1) {
    createPromise(i + 1, Number(delay.value) + Number(step.value) * i)
      .then(value => {
        Notiflix.Notify.info(value);        
      })
      .catch(error => {
        Notiflix.Notify.info(error);        
      });
  }
}

form.addEventListener('submit', handleSubmit);
