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
const incomeTitle = document.getElementById("expense-title-input");
const incomeTitle = document.getElementById("income-title-input");

// CHART
const chartEl = document.querySelector(".chart");

/*------------------ EVENT LISTENERS -----------------*/

/*------------------ FUNCTIONS -----------------*/
