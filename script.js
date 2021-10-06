function initThemeToggle() {
  const themeToggles = document.querySelectorAll('input[name="theme"]');
  themeToggles.forEach((themeToggle, index) => {
    themeToggle.addEventListener('change', () => {
      document.documentElement.dataset.theme = index + 1;
    });
  });  
}

initThemeToggle();

// Add keyboard support
// ** use `keyup` instead of `keypress` for keys like `Escape`, `Backspace`.
window.addEventListener('keyup', (e) => {
  // console.log(e.key);
  const button = document.querySelector(`[data-key="${e.key}"]`);
  if (button) {
    const clickEvent = new Event('click');
    button.dispatchEvent(clickEvent);
  }
});

// Store operand value when button is clicked

let operandLeft = '';
let operandRight = '';
let displayValue = '';
let isFirstOperand = true;
let operator = null;

const buttons = document.querySelectorAll('button');
const screen = document.querySelector('.screen-value');
buttons.forEach(button => {
  // Animate press effect
  button.addEventListener('mousedown', () => {
    button.classList.add('is-pressing');
  });

  button.addEventListener('mouseup', () => {
    button.classList.remove('is-pressing');
  });

  // Input logic
  button.addEventListener('click', () => {
    const keyValue = button.textContent;
    switch (button.dataset.type) {
      case 'digit':
        if (isFirstOperand) {
          operandLeft += keyValue;         
        } else {
          operandRight += keyValue;
        }

        displayValue += keyValue;
        screen.textContent = displayValue; 
        break;
      case 'operator':
        if (!operandLeft && (keyValue === '*' || keyValue === '/')) {
          return;
        }

        // If there is already a full [operand operator operand] expression,
        // calculate result and update display value
        if (operandRight) {
          equalButtonClicked();
        }

        isFirstOperand = operandLeft ? false : true;
        operator = keyValue;
        displayValue += keyValue;
        screen.textContent = displayValue;
        break;
      case 'equal':
        equalButtonClicked();
        break;
      case 'reset':
        operandLeft = '';
        operandRight = '';
        operator = null;
        displayValue = '';
        screen.textContent = '';
        isFirstOperand = true;
        break;
      case 'delete':
        if (!displayValue) {
          return;
        }

        if (!isFinite(displayValue)) {
          operandLeft = '';
          displayValue = '';
          screen.textContent = '';
        }

        if (isFirstOperand) {
          operandLeft = operandLeft.slice(0, operandLeft.length - 1);
        } else if (operandRight) {
          operandRight = operandRight.slice(0, operandRight.length - 1);
        } else {
          operator = null;
          isFirstOperand = true;
        }

        displayValue = displayValue.slice(0, displayValue.length - 1);;
        screen.textContent = displayValue;
        break;
      default:
        break;
    }
  });
});

function calculate(operandLeft, operandRight, operator) {
  let result;
  switch (operator) {
    case '+':
      result = Number(operandLeft) + Number(operandRight);
      break;
    case '-':
      result = Number(operandLeft) - Number(operandRight);
      break;
    case 'x':
      result = Number(operandLeft) * Number(operandRight);
      break;
    case '/':
      result = Number(operandLeft) / Number(operandRight);
      break;
    default:
      break;
  }
  return String(result);
}

function equalButtonClicked() {
  if (!operandLeft || !operandRight || !operator) {
    return;
  }

  const result = calculate(operandLeft, operandRight, operator);
  displayValue = result;
  screen.textContent = displayValue;
  operandLeft = result;
  operandRight = '';
  isFirstOperand = true;
}