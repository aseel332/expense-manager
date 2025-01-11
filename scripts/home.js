import "../data/expense.js";
import "../firebase/firebase.js"
import { foodFeature, shoppingFeature, mscFeature, homeFeature, savingFeature, emergencyFeature } from "../utils/features.js";
import { expenses, Expense, saveExpenseToStorage, calculateTotalExpense,  expenseScore, calculateGood, calculateAvg, calculateBad, deleteExpense } from "../data/expense.js";
import { dateStringCoverter, timeStringConverter, getCurrentDate, getCurrentTime, isDateInRange, calculateDuration, regularDateStringConverter } from "../utils/date.js";
import { plans, getPlan } from "../data/plan.js";

if(!(localStorage.getItem("EXPENSE TRACKER USER"))) {
  window.open("/", "_self");
} else {
  document.querySelector(".profile-button").innerHTML= `<img src = "images/profile-icon.png">
          ${JSON.parse(localStorage.getItem("EXPENSE TRACKER USER")).email}`;
          document.querySelector(".profile-button").addEventListener('click', () => {
            localStorage.removeItem("EXPENSE TRACKER USER");
            window.location.reload();
          })
}

function loadExpenses(){
  let innerHtml = '';
  let innerHtmlPast = '';
  

  expenses.forEach((expense) => {

  let pendingAmount = 0;
  if(expense.category === "Food") { 
    
  pendingAmount = Number(foodFeature(regularDateStringConverter(expense.date), expense.time).pendingAmount);
  
  }
  else if (expense.category === "Shopping"){
    
    pendingAmount = Number(shoppingFeature(regularDateStringConverter(expense.date), expense.time).pendingAmount);
  }

  else if(expense.category === "Home"){
    pendingAmount = Number(homeFeature(regularDateStringConverter(expense.date), expense.time).pendingAmount);
  }

  else if(expense.category === "Msc"){
    pendingAmount = Number(mscFeature(regularDateStringConverter(expense.date), expense.time).pendingAmount);
  }

  else if(expense.category === "Saving"){
    pendingAmount = Number(savingFeature(regularDateStringConverter(expense.date), expense.time).pendingAmount);
  }

  else if(expense.category === "Msc"){
    pendingAmount = Number(mscFeature(regularDateStringConverter(expense.date), expense.time).pendingAmount);
  }

  else if(expense.category === "Emergency"){
    pendingAmount = Number(emergencyFeature(regularDateStringConverter(expense.date), expense.time).pendingAmount);
  }
  
  
 
  if(pendingAmount < 0){
    expenses.map((expenseOBJ) => {
      if(expenseOBJ.expenseId === expense.expenseId){
        expenseOBJ.class = "bad-amount";
       
        loadScoreboard();
        return expenseOBJ;
      }
      else{
        return expenseOBJ;
      }
    });
  }
  else if(pendingAmount >= 0 && pendingAmount<= 5){
    expenses.map((expenseOBJ) => {
      if(expenseOBJ.expenseId === expense.expenseId){
        expenseOBJ.class = "avg-amount";
        
        loadScoreboard();
        return expenseOBJ;
      }
      else{
        return expenseOBJ;
      }
    });
  }
  else{
    expenses.map((expenseOBJ) => {
      if(expense.expenseId === expenseOBJ.expenseId){
        expenseOBJ.class = "good-amount";
        
        loadScoreboard();
        return expenseOBJ;
      }
      else{
        return expenseOBJ;
      }
    })
  }

    
    if(expense.timeline === "Today"){
      innerHtml += `
      <div class = "item-container ">
      <div class = "permanent-container " >
                  <div class="name-category-amount">
                    <div class = "name-expense">
                      ${expense.name}
                    </div>
                    <div>
                      -
                    </div>
                    <div class="category-expense">
                      ${expense.category}
                    </div>
                    <div class = "amount-expense ${expense.class} js-permanent-container" data-expense-id = ${expense.expenseId}>
                      $${expense.amount}
                    </div>
                  </div>
                  <div class="date-time">
                    <div class="expense-date">
                      ${expense.date}
                    </div>
                    <div class="expense-time">
                      ${expense.time}
                    </div>
                  </div>
                 </div>
                 
                 <div data-expense-id= ${expense.expenseId} class="hover-container js-hover-container js-hover-container-${expense.expenseId}">
                 Delete
                 </div> 
                </div>
      ` ;
    }
    
    if(expense.timeline === "Past" ){
      if(isDateInRange(expense.date)){ 
      innerHtmlPast += `
      <div class = "item-container ">
      <div class = "permanent-container" >
                  <div class="name-category-amount">
                    <div class = "name-expense">
                      ${expense.name}
                    </div>
                    <div>
                      -
                    </div>
                    <div class="category-expense">
                      ${expense.category}
                    </div>
                    <div class = "amount-expense  ${expense.class} js-permanent-container"  data-expense-id = ${expense.expenseId}>
                      $${expense.amount}
                    </div>
                  </div>
                  <div class="date-time">
                    <div class="expense-date">
                      ${expense.date}
                    </div>
                    <div class="expense-time">
                      ${expense.time}
                    </div>
                  </div>
                  </div>
                   <div data-expense-id = ${expense.expenseId} class="hover-container js-hover-container js-hover-container-${expense.expenseId}">
                 Delete
                 </div> 
                </div>
      `
      }
    }
  });
  document.querySelector('.js-today-list').innerHTML = innerHtml;
  document.querySelector('.js-past-list').innerHTML = innerHtmlPast;
  //foodFeature();
}

function addingExpense(){
  let expenseObj = { 
     name: document.querySelector(".js-expense-name").value,
     category: document.querySelector('.js-expense-category').value,
     date: dateStringCoverter(document.querySelector('.js-expense-date').value),
     time: timeStringConverter(document.querySelector('.js-expense-time').value),
     amount: Number(document.querySelector('.js-expense-amount').value),
     timeline: dateStringCoverter(document.querySelector('.js-expense-date').value) === dateStringCoverter(getCurrentDate())? "Today" : "Past",
     expenseId: Date.now().toString(36) + Math.random().toString(36).substr(2),
  }

  

  

  expenses.push(new Expense(expenseObj));
  saveExpenseToStorage();
  loadExpenses();
  loadScoreboard();
  let pendingAmount;
  if(expenseObj.category === "Food") { 
  pendingAmount = Number(foodFeature(regularDateStringConverter(expenseObj.date)).pendingAmount);
  }
  else if (expenseObj.category === "Shopping"){
    pendingAmount = Number(shoppingFeature(regularDateStringConverter(expenseObj.date)).pendingAmount);
  }
  
  
 
  if(pendingAmount < 0){
    expenses.map((expense) => {
      if(expense.expenseId === expenseObj.expenseId){
        
        
        loadScoreboard();
        return expense;
      }
      else{
        return expense;
      }
    });
  }
  else if(pendingAmount >= 0 && pendingAmount<= 5){
    expenses.map((expense) => {
      if(expense.expenseId === expenseObj.expenseId){
        
        
        loadScoreboard();
        return expense;
      }
      else{
        return expense;
      }
    });
  }
  else{
    expenses.map((expense) => {
      if(expense.expenseId === expenseObj.expenseId){
        
        
        loadScoreboard();
        return expense;
      }
      else{
        return expense;
      }
    })
  }



  saveExpenseToStorage();
  loadExpenses();
  foodFeature();

  document.querySelector(".js-expense-name").value = "",
  document.querySelector('.js-expense-category').value= "",
  document.querySelector('.js-expense-date').value = "",
  document.querySelector('.js-expense-time').value ="",
  document.querySelector('.js-expense-amount').value ="",
  document.querySelector('.js-expense-date').value = "";
     
  addDeleteButton();
  console.log(expenses);

}

function currentDateTimeDisplayer(){
  document.querySelector('.js-expense-date').value = getCurrentDate();
  document.querySelector('.js-expense-time').value = getCurrentTime();
}

function currentDateTimeRemover(){
  document.querySelector('.js-expense-date').value = '';
  document.querySelector('.js-expense-time').value = '';
}

function loadScoreboard(){
  let planId;

  plans.forEach((plan) => {
    if(plan.isActive === true){
      planId = plan.planId;
      
    }
  })
  
  let matchingPlan = getPlan(planId);



  let innerHTML = `
  <div class = "top-score-board">
            <div class = "used-amount">
              $ ${calculateTotalExpense()} /
            </div>
            <div class = "total-amount">
              ${matchingPlan.amount}
            </div>
            <div class = days-left>
              ${calculateDuration(getCurrentDate(), matchingPlan.endDate)} days Left
            </div>
          </div>
          <div class = "spending-score">
            <div>
              Spending Score
            </div>
            <div>
              ${expenseScore()}
            </div>
          </div>
          <div class = "empty-bar">
            <div class = "filled-bar" style="width: ${500/100 * expenseScore()}"></div>
          </div>
          <div class = "total-expenses">
            <div class="expense-count">
              ${expenses.length}
            </div>
            <div class = "supporting-statement">
              Total Registered Expenses
            </div>
          </div>
          <div class = "expense-class">
            <div class="good-expense">
              <div class = "good-count">
                ${(Number(calculateGood()) / Number(expenses.length) * 100).toFixed(1)}%
              </div>
              <div>
              Good Expenses
              </div>
            </div>
            <div class = "avg-expense">
              <div class="avg-count">
                ${(Number(calculateAvg()) / Number(expenses.length) * 100).toFixed(1)}%
              </div>
              <div>
                Average Expenses

              </div>
            </div>
            <div class = "bad-expense">
              <div class="bad-count">
                ${(Number(calculateBad()) / Number(expenses.length) * 100).toFixed(1)}%
              </div>
              <div>
                Bad Expenses
              </div>
            </div>
          </div>
  `

  document.querySelector('.js-score-board').innerHTML = innerHTML;
  foodFeature();
}

loadScoreboard();

loadExpenses()

document.querySelector('.js-add-expense-button').addEventListener('click',() => {
  addingExpense();
})

document.querySelector('.js-date-time-checkbox').addEventListener('change', (event) => {
  if(event.target.checked){
    currentDateTimeDisplayer();
  }
  else{
    currentDateTimeRemover();
  }
})

let viewAllClicked = false
document.querySelector('.js-view-all-link').addEventListener('click', () => {
  if(!viewAllClicked){ 
  let innerHtmlPast2 ='';
  expenses.forEach((expense) => {
    if(expense.timeline === "Past" ){
   
      innerHtmlPast2 += `
       <div class = "item-container ">
      <div class = "permanent-container" >
                  <div class="name-category-amount">
                    <div class = "name-expense">
                      ${expense.name}
                    </div>
                    <div>
                      -
                    </div>
                    <div class="category-expense">
                      ${expense.category}
                    </div>
                    <div class = "amount-expense  ${expense.class} js-permanent-container"  data-expense-id = ${expense.expenseId}>
                      $${expense.amount}
                    </div>
                  </div>
                  <div class="date-time">
                    <div class="expense-date">
                      ${expense.date}
                    </div>
                    <div class="expense-time">
                      ${expense.time}
                    </div>
                  </div>
                  </div>
                   <div data-expense-id = ${expense.expenseId} class="hover-container js-hover-container js-hover-container-${expense.expenseId}">
                 Delete
                 </div> 
                </div>
       `

  }})
  document.querySelector('.js-past-list').innerHTML = innerHtmlPast2;
  addDeleteButton();
  viewAllClicked = true;
    }
    else{
      loadExpenses();
      viewAllClicked = false;
      addDeleteButton();
    }
}

)



function addDeleteButton(){ 

document.querySelectorAll('.js-permanent-container').forEach((container) => {
  container.addEventListener('mouseover', (event) => {
    let expenseId = container.dataset.expenseId;
    document.querySelector(`.js-hover-container-${expenseId}`).classList.add("hover-container-active");
  });
});

document.querySelectorAll('.js-permanent-container').forEach((container) => {
  container.addEventListener('mouseout', (event) => {
    let expenseId = container.dataset.expenseId;
    document.querySelector(`.js-hover-container-${expenseId}`).classList.remove("hover-container-active");
  });
});

document.querySelectorAll('.js-hover-container').forEach((container) => {
  container.addEventListener('mouseover', (event) => {
    let expenseId = container.dataset.expenseId;
    document.querySelector(`.js-hover-container-${expenseId}`).classList.add("hover-container-active");
  });
})


document.querySelectorAll('.js-hover-container').forEach((container) => {
  container.addEventListener('mouseout', (event) => {
    let expenseId = container.dataset.expenseId;
    document.querySelector(`.js-hover-container-${expenseId}`).classList.remove("hover-container-active");
  });
})

document.querySelectorAll('.js-hover-container').forEach((container) => {
  container.addEventListener('mouseover', (event) => {
    let expenseId = container.dataset.expenseId;
    document.querySelector(`.js-hover-container-${expenseId}`).addEventListener('click', () => {
      deleteExpense(expenseId);
      saveExpenseToStorage();
      loadExpenses();
      loadScoreboard();
      addDeleteButton();
    })
  });
})

}

addDeleteButton();