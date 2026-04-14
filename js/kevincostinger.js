"use strict";
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     Alexandra - 2026-03-25
 *******************************************************/
let sumExpenses = 0; //Use this variable to keep the sum up to date.


const form = document.querySelector("form");
const tbody = document.querySelector("#expenses tbody");
const expenseSumDisplay = document.querySelector("#expenseSum");

form.addEventListener("submit", submitForm);


tbody.addEventListener("click", function(e) {
    if (e.target.tagName === "BUTTON") {
        let row = e.target.closest("tr");
        let amountToRemove = parseFloat(row.dataset.amount);
        sumExpenses -= amountToRemove;
        updateSumDisplay();

        row.remove();
    }
});

function submitForm(e) {
    e.preventDefault();
    let dateInput = document.querySelector("#date");
    let amountInput = document.querySelector("#amount");
    let expenseInput = document.querySelector("#expense");

    let dateValue = dateInput.value;
    let amountValue = parseFloat(amountInput.value);
    let expenseValue = expenseInput.value;


    if (isEmpty(dateValue)) {
        dateInput.focus();
        return;
    }

    if (isNaN(amountValue) || amountValue < 0.01) {
        amountInput.focus();
        return;
    }

    if (expenseValue.length < 3) {
        expenseInput.focus();
        return;
    }

    addExpense(dateValue, amountValue, expenseValue);
    sumExpenses += amountValue;
    updateSumDisplay();

    e.target.reset();
    dateInput.focus();
}

function addExpense(dateValue, amountValue, expenseValue) {
    let tr = document.createElement("tr");
    tr.dataset.amount = amountValue;

    let tddate = document.createElement("td");
    tddate.textContent = dateValue;

    let tdamount = document.createElement("td");
    tdamount.textContent = formatEuro(amountValue);

    let tdexpense = document.createElement("td");
    tdexpense.textContent = expenseValue;

    let tdaction = document.createElement("td");
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    tdaction.append(deleteButton);

    tr.append(tddate, tdamount, tdexpense, tdaction);
    tbody.append(tr);
}

function updateSumDisplay() {
    expenseSumDisplay.textContent = formatEuro(sumExpenses);
}

//P.S: I took the liberty and added a picture of Kevin in the files:pictures_of_kevin
//I find it easier to code with a face of disappointment in mind and if I look at Kevin...
// yeah I just know Kevin is a judgy b***, he would totally tell me to get my sh*t together and figure out a solution...

/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 ****************************/


/*******************************************************
 *     Checks if variable is empty
 *     @param {any} variable - Variable which you want to check.
 *     @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function(variable) {
    if(Array.isArray(variable))
        return (variable.length === 0);
    else if(typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 *     Converts number into currency string.
 *     @param {Number} number - Any numeric value.
 *     @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}