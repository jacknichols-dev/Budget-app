/*------------------ SELECTORS -----------------*/

// SELECT ELEMENTS
const balanceEl = document.querySelector(
  ".header__balance .header__balance--value"
);
const incomeTotalEl = document.querySelector(".header__account--income-total");
const outcomeTotalEl = document.querySelector(
  ".header__account--outcome-total"
);
const expenseEl = document.querySelector("#expense");
const incomeEl = document.querySelector("#income");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

// SELECT BTNS
const expenseBtn = document.querySelector(".budget-dashboard__toggle--tab1");
const incomeBtn = document.querySelector(".budget-dashboard__toggle--tab2");
const allBtn = document.querySelector(".budget-dashboard__toggle--tab3");

// INPUT BTNS
const addIncome = document.querySelector(".income__input--add-btn-img");
const addExpense = document.querySelector(".expense__input--add-btn-img");
const expenseAmount = document.getElementById("expense-amount-input");
const incomeAmount = document.getElementById("income-amount-input");
const expenseTitle = document.getElementById("expense-title-input");
const incomeTitle = document.getElementById("income-title-input");

// CHART
const chartEl = document.querySelector(".chart");

/*------------------ VARIABLES -----------------*/
let ENTRY_LIST = [];
let balance = 0, income = 0, outcome = 0;

const DELETE = 'delete', EDIT = 'edit';

/*------------------ EVENT LISTENERS -----------------*/
expenseBtn.addEventListener('click', function () {
  show(expenseEl);
  hide([incomeEl, allEl]);
  active(expenseBtn);
  inactive([incomeBtn, allBtn]);

});

incomeBtn.addEventListener('click', function () {
  show(incomeEl)
  hide([expenseEl, allEl]);
  active(incomeBtn);
  inactive([expenseBtn, allBtn]);

});

allBtn.addEventListener('click', function () {
  show(allEl)
  hide([expenseEl, incomeEl]);
  active(allBtn);
  inactive([incomeBtn, expenseBtn]);

});

/*------------------ FUNCTIONS / HELPERS -----------------*/

//TOGGLES
function show(element) {
  element.classList.remove('hide');
}

function hide(elements) {
  elements.forEach(element => {
    element.classList.add('hide');
  })
}

function active(element) {
  element.classList.add('active')
}

function inactive(elements) {
  elements.forEach(element => {
    element.classList.remove('active');
  })
}
