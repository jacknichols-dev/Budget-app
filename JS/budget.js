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
const addIncome = document.querySelector(".income__input--add-btn");
const addExpense = document.querySelector(".expense__input--add-btn");
const expenseAmount = document.getElementById("expense-amount-input");
const incomeAmount = document.getElementById("income-amount-input");
const expenseTitle = document.getElementById("expense-title-input");
const incomeTitle = document.getElementById("income-title-input");

/*------------------ VARIABLES -----------------*/
let ENTRY_LIST;
let balance = 0,
  income = 0,
  outcome = 0;

const DELETE = "delete",
  EDIT = "edit";

// CHECK IF THERE IS SAVED DATA IN LOCALSTORAGE
ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];

updateUI();

/*------------------ EVENT LISTENERS -----------------*/
expenseBtn.addEventListener("click", function () {
  show(expenseEl);
  hide([incomeEl, allEl]);
  active(expenseBtn);
  inactive([incomeBtn, allBtn]);
});

incomeBtn.addEventListener("click", function () {
  show(incomeEl);
  hide([expenseEl, allEl]);
  active(incomeBtn);
  inactive([expenseBtn, allBtn]);
});

allBtn.addEventListener("click", function () {
  show(allEl);
  hide([expenseEl, incomeEl]);
  active(allBtn);
  inactive([incomeBtn, expenseBtn]);
});

addExpense.addEventListener("click", function () {
  if (!expenseTitle.value || !expenseAmount.value) return;
  //SAVE ENTRY TO ENTRY_LIST
  let expense = {
    type: "expense",
    title: expenseTitle.value,
    amount: parseFloat(expenseAmount.value),
  };
  ENTRY_LIST.push(expense);

  updateUI();
  clearInput([expenseTitle, expenseAmount]);
});

addIncome.addEventListener("click", function () {
  if (!incomeTitle.value || !incomeAmount.value) return;
  //SAVE ENTRY TO ENTRY_LIST
  let income = {
    type: "income",
    title: incomeTitle.value,
    amount: parseFloat(incomeAmount.value),
  };
  ENTRY_LIST.push(income);

  updateUI();
  clearInput([incomeTitle, incomeAmount]);
});

incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);
allList.addEventListener("click", deleteOrEdit);

/*------------------ FUNCTIONS / HELPERS -----------------*/

//DELETE OR EDIT
function deleteOrEdit(e) {
  const targetBtn = e.target;

  const entry = targetBtn.parentNode;

  if (targetBtn.id == DELETE) {
    deleteEntry(entry);
  } else if (targetBtn.id == EDIT) {
    editEntry(entry);
  }
}

function deleteEntry(entry) {
  ENTRY_LIST.splice(entry.id, 1);

  updateUI();
}

function editEntry(entry) {
  let ENTRY = ENTRY_LIST[entry.id];

  if (ENTRY.type == "income") {
    incomeAmount.value = ENTRY.amount;
    incomeTitle.value = ENTRY.title;
  } else if (ENTRY.type == "expense") {
    expenseAmount.value = ENTRY.amount;
    expenseTitle.value = ENTRY.title;
  }
  deleteEntry(entry);
}

//TOGGLES
function show(element) {
  element.classList.remove("hide");
}

function hide(elements) {
  elements.forEach((element) => {
    element.classList.add("hide");
  });
}

function active(element) {
  element.classList.add("active");
}

function inactive(elements) {
  elements.forEach((element) => {
    element.classList.remove("active");
  });
}

//CLEAR INPUTS
function clearInput(inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}

//UPDATE UI
function updateUI() {
  income = calculateTotal("income", ENTRY_LIST);
  outcome = calculateTotal("expense", ENTRY_LIST);
  balance = Math.abs(calculateBalance(income, outcome));

  //DETERMINE SIGN OF BALANCE
  let sign = income >= outcome ? "£" : "-£";

  //UPDATE UI
  balanceEl.innerHTML = `<small>${sign}</small><strong> ${balance}</strong>`;
  outcomeTotalEl.innerHTML = `<small>£</small><strong> ${outcome}</strong>`;
  incomeTotalEl.innerHTML = `<small>£</small><strong> ${income}</strong>`;

  clearElement([expenseList, incomeList, allList]);

  ENTRY_LIST.forEach((entry, index) => {
    if (entry.type == "expense") {
      showEntry(expenseList, entry.type, entry.title, entry.amount, index);
    } else if (entry.type == "income") {
      showEntry(incomeList, entry.type, entry.title, entry.amount, index);
    }
    showEntry(allList, entry.type, entry.title, entry.amount, index);
  });

  updateChart(income, outcome);

  localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
}

function showEntry(list, type, title, amount, id) {
  const entry = `
  <li id="${id}" class="${type}">
    <div class="entry">${title}: £${amount}</div>
    <div id="edit"></div>
    <div id="delete"></div>
  </li>
  `;

  const position = "afterbegin";

  list.insertAdjacentHTML(position, entry);
}

function clearElement(elements) {
  elements.forEach((element) => {
    element.innerHTML = "";
  });
}

function calculateTotal(type, list) {
  let sum = 0;

  list.forEach((entry) => {
    if (entry.type == type) {
      sum += entry.amount;
    }
  });
  return sum;
}

function calculateBalance(income, outcome) {
  return income - outcome;
}
