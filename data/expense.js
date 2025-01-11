import { dateStringCoverter, getCurrentDate, sortEventsByDateTime } from "../utils/date.js";
import { saveExpense } from "../firebase/firebase.js";

export let expenses =  [];
export class Expense{
  name;
  category;
  date;
  time;
  amount;
  timeline;
  expenseId;
  class;
  category;

  constructor(expenseObj){
    this.name = expenseObj.name;
    this.category = expenseObj.category;
    this.date = expenseObj.date;
    this.time = expenseObj.time;
    this.amount = expenseObj.amount;
    this.timeline = expenseObj.timeline;
    this.expenseId = expenseObj.expenseId;
    
  }
}

expenses = JSON.parse(localStorage.getItem('expenses')) || [

  
].map((expenseObj) => {
  return new Expense(expenseObj);
})

export function saveExpenseToStorage(){
  localStorage.setItem('expenses', JSON.stringify(expenses));
}




function checkTimeLine(){
  let currentDate = dateStringCoverter(getCurrentDate());
  expenses.forEach((expense) => {
    if(expense.date !== currentDate){
      expense.timeline = "Past";
    }
    else{
      expense.timeline = "Today";
    }
  })
}

export function calculateTotalExpense(){
  let total = 0;
  expenses.forEach((expense) => {
    total += expense.amount
  } )

  return total;
}

sortEventsByDateTime(expenses);
checkTimeLine();

export let expenseCategory = JSON.parse(localStorage.getItem('expenseCategory')) || {
  good: 0,
  avg: 0,
  bad:0
};

function SaveExpenseCategory(){
  localStorage.setItem('expenseCategory', JSON.stringify(expenseCategory));
}

export function calculateGood(){
  
  let goodCount = 0;
  expenses.forEach((expense) => {
    
    if(expense.class === "good-amount"){
      goodCount += 1;
      
    }
  })
  return goodCount;
}

export function calculateAvg(){
  let avgCount = 0;
  expenses.forEach((expense) => {
    
    if(expense.class === "avg-amount"){
      avgCount ++;
    }

    
  })
  return avgCount;
}

export function calculateBad(){
  let badCount = 0;
  expenses.forEach((expense) => {
    if(expense.class === "bad-amount"){
      badCount ++;
    }

    
  })
  return badCount;
}


export function expenseScore(){
  let score = 0;
  score = (calculateGood() * 10) + (calculateBad() * 0) + (calculateAvg() * 5);
  
  let scoreDivide = Number(expenses.length) * 10;

  return (score/scoreDivide * 100).toFixed(0);
}

export function dailyExpense(){
  let dailyExpense = 0;
  expenses.forEach((expense) => {
    if(expense.date === dateStringCoverter(getCurrentDate())){
      dailyExpense += expense.amount;
    }
  })
  return dailyExpense;
}

export function deleteExpense(expenseId){
  expenses = expenses.filter((expense) => expense.expenseId !== expenseId);
  saveExpenseToStorage();
}



console.log(dailyExpense());

