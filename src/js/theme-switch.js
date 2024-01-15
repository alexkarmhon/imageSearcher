const switcher = document.querySelector('#theme-switch-toggle');
const body = document.querySelector('body');

const { LIGHT, DARK } = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme'
}

let themeColor = localStorage.getItem('theme-color') || LIGHT;
body.classList.add(themeColor);

switcher.checked = themeColor === DARK;
// switcher.checked = themeColor === DARK;

function themeChange() {

  body.classList.toggle(LIGHT);
  body.classList.toggle(DARK);

  themeColor = themeColor === LIGHT ? DARK : LIGHT;
  localStorage.setItem('theme-color', themeColor);
}
switcher.addEventListener('change', themeChange)
