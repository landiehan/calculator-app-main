const themeToggles = document.querySelectorAll('input[name="theme"]');
themeToggles.forEach((themeToggle, index) => {
  themeToggle.addEventListener('change', () => {
    document.documentElement.dataset.theme = index + 1;
  });
});

const numberKeys = document.querySelectorAll('button');
const screenValue = document.querySelector('.screen-value');
numberKeys.forEach(numberKey => {
  numberKey.addEventListener('mousedown', () => {
    numberKey.classList.add('is-pressing');
  });

  numberKey.addEventListener('mouseup', () => {
    numberKey.classList.remove('is-pressing');
  });

  numberKey.addEventListener('click', () => {
    screenValue.textContent += numberKey.textContent;
  });
});