const menuToggle = document.querySelector('.menu-toggle'); // Menu Toggle
const navBar = document.querySelector('nav'); // Menu Toggle
const loanAmount = document.getElementById('loan-amount');
const loanTerm = document.getElementById('loan-term');
const amountDisplay = document.querySelectorAll('.amount-display');
const termDisplay = document.querySelectorAll('.term-display');
const interestDisplay = document.querySelector('.total-interest');
const monthlyPaymentDisplay = document.getElementById('monthly_payment');
const formToggle = document.querySelectorAll('.message a');
const forms = document.querySelectorAll('form');
const back = document.querySelector('#back');
const naira = '\u20A6';
const click = document.getElementById('click');
const login = document.querySelector('#login-form');
const sideBar = document.querySelector('#sidebar');

/**
 * Calculates the total interest(principal included) on a loan and monthly repayment
 * @param {number} amount - Amount user wants to loan
 * @param {number} months - Number of months user wants to loan money for
 */
function loanPayment(amount, months) {
  const i = (0.1 / 12); // interest rate is 10%
  const monthlyPayment = amount * i * Math.pow((1 + i), months) / (Math.pow((1 + i), months) - 1);
  const totalInterest = (monthlyPayment * months) - amount;
  monthlyPaymentDisplay.innerText = naira + monthlyPayment.toFixed(2);
  interestDisplay.innerText = naira + totalInterest.toFixed(2);
}

/** Toggles the menu display in a smaller view port */
if (menuToggle && navBar) {
  menuToggle.addEventListener('click', () => {
    navBar.classList.toggle('menu');
  });
}

/** Toggles the sidebar display */
if (menuToggle && sideBar) {
  menuToggle.addEventListener('click', () => {
    sideBar.classList.toggle('active');
  });
}

/**
 * Displays a quick estimate form where user can change values,
 * and see how much interest they will accrue on a particular amount
 */
if (loanAmount && loanTerm && amountDisplay && termDisplay) {
  loanAmount.addEventListener('change', () => {
    amountDisplay.forEach((elem) => {
      elem.innerText = naira + loanAmount.value;
    });
    loanPayment(parseInt(loanAmount.value, 10), parseInt(loanTerm.value, 10));
  });

  loanTerm.addEventListener('change', () => {
    const num = loanTerm.value;
    let month;
    if (num == 1) {
      month = 'month';
    } else {
      month = 'months';
    }
    termDisplay.forEach((elem) => {
      elem.innerText = `${num} ${month}`;
    });
    loanPayment(parseInt(loanAmount.value, 10), parseInt(loanTerm.value, 10));
  });
}

/** Toggle between Sign up form and Login form */
function switchForm() {
  forms.forEach((form) => {
    form.classList.toggle('closed');
  });
}
if (formToggle) {
  formToggle.forEach((toggle) => {
    toggle.addEventListener('click', switchForm);
  });
}

if (back) {
  back.addEventListener('click', () => {
    window.history.back();
  });
}

/**
 * Returns all the values entered into a form when submitted
 * @param {object} evt - event
 * @param {object} form - HTML form Element
 */
function getValues(evt, form) {
  evt.preventDefault();
  const { elements } = form;
  const values = {};
  for (let i = 0; i < elements.length - 1; i += 1) {
    const item = elements.item(i);
    values[item.name] = item.value;
  }
  return values;
}

if (login) {
  login.addEventListener('submit', (evt) => {
    const values = getValues(evt, login);
    console.log(values);
    if (click) {
      click.checked = false;
    }
  });
}

/** Toggle Modal */
if (click) {
  document.querySelector('.message').addEventListener('click', () => {
    click.checked = false;
  });
}
