import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const LOCALSTORAGE_KEY = 'feedback-form-state';
const data = {};
isLocalStorage();

form.addEventListener('input', throttle(onInput, 500));

function onInput(evt) {
  data[evt.target.name] = evt.target.value;

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
}

form.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();
  console.log(JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)));
  localStorage.removeItem(LOCALSTORAGE_KEY);
  evt.currentTarget.reset();
}

function isLocalStorage() {
  if (!localStorage.getItem(LOCALSTORAGE_KEY)) {
    return;
  }
  const { email, message } = form.elements;
  email.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).email;
  message.value = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).message;
}
