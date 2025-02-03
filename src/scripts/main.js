'use strict';

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

const promise2 = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    resolve('Second promise was resolved');
  });
});

const promise3 = new Promise((resolve) => {
  const bothClicks = { left: false, right: false };

  document.addEventListener('click', () => {
    bothClicks.left = true;

    if (bothClicks.left && bothClicks.right) {
      resolve('Third promise was resolved');
    }
  });

  document.addEventListener('contextmenu', () => {
    bothClicks.right = true;

    if (bothClicks.left && bothClicks.right) {
      resolve('Third promise was resolved');
    }
  });
});

function errorHandler(message) {
  const newDiv = document.createElement('div');

  newDiv.classList.add('error');
  newDiv.setAttribute('data-qa', 'notification');
  newDiv.textContent = message.message;

  document.body.append(newDiv);
}

function successHandler(message) {
  const newDiv = document.createElement('div');

  newDiv.classList.add('success');
  newDiv.setAttribute('data-qa', 'notification');
  newDiv.textContent = message;

  document.body.append(newDiv);
}

promise1.then(successHandler).catch(errorHandler);
promise2.then(successHandler);
promise3.then(successHandler);
