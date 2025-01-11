import { expenses } from "../data/expense.js";
import { getActivePlan } from "../data/plan.js";
import { calculateDuration, getCurrentDate, isDateInRangeInclusive, regularDateStringConverter, getYesterdayDate, addOneDayToDate, getCurrentTime, isTimeBeforeOrEqual, timeStringConverter } from "./date.js";

let idealFood = 0;
let currentDailyFood = 0;


let dailyFood = 0;


let shoppingObject = {
  expenseDay: 0,
  topUp: 0,
  dailyShopping: 0,
  pendingAmount: 0,
}

export function foodFeature(expenseDate = getCurrentDate(), expenseTime = timeStringConverter(getCurrentTime())){
  let currentFood = 0;
  let dayFoodExpense = 0;
  let activePlan = getActivePlan();
  let yesterdayDate = activePlan.startDate;
  let topUp = 0;

  while (yesterdayDate !== expenseDate){
    dailyFood = (Number(activePlan.food) * Number(activePlan.amount)) / (100 * Number(activePlan.duration)) + topUp;

    expenses.forEach((expense) => {
    
      if(regularDateStringConverter(expense.date) === yesterdayDate){ 
        
         
      if(expense.category === "Food"){
        
        dayFoodExpense += Number(expense.amount);
      }
    
    }
    });

    topUp = dailyFood - dayFoodExpense;
   
    dayFoodExpense = 0;
    yesterdayDate = addOneDayToDate(yesterdayDate);
  }


  dayFoodExpense = 0;
  
  expenses.forEach((expense) => {
    
    if(regularDateStringConverter(expense.date) === expenseDate){ 
      if(isTimeBeforeOrEqual(expense.time, expenseTime)){ 
    if(expense.category === "Food"){
      dayFoodExpense += Number(expense.amount);
    }
  }
  }
  })

  dailyFood = (Number(activePlan.food) * Number(activePlan.amount)) / (100 * Number(activePlan.duration)) + topUp;

   

  expenses.forEach((expense) => {
    if(isDateInRangeInclusive(expense.date, activePlan.startDate, activePlan.endDate)){ 
    if(expense.category === "Food"){
      currentFood += Number(expense.amount);
    }
  }
  })  
  
  let pendingAmount = dailyFood - dayFoodExpense;

  

  currentDailyFood = (currentFood)/ Number(calculateDuration(activePlan.startDate, getCurrentDate()));

  idealFood = dailyFood * Number(calculateDuration(activePlan.startDate, getCurrentDate()));

    let foodObject = {
      dayFoodExpense: dayFoodExpense,
      topUp: topUp,
      dailyFood: dailyFood,
      pendingAmount: pendingAmount,
    }



   return foodObject;

  

}

export function homeFeature(expenseDate = getCurrentDate(), expenseTime = timeStringConverter(getCurrentTime())){
  
    let currentFood = 0;
    let dayFoodExpense = 0;
    let activePlan = getActivePlan();
    let yesterdayDate = activePlan.startDate;
    let topUp = 0;
  
    while (yesterdayDate !== expenseDate){
      dailyFood = (Number(activePlan.home) * Number(activePlan.amount)) / (100 * Number(activePlan.duration)) + topUp;
  
      expenses.forEach((expense) => {
      
        if(regularDateStringConverter(expense.date) === yesterdayDate){ 
         
        if(expense.category === "Home"){
          
          dayFoodExpense += Number(expense.amount);
        }
      
      }
      });
  
      topUp = dailyFood - dayFoodExpense;
     
      dayFoodExpense = 0;
      yesterdayDate = addOneDayToDate(yesterdayDate);
    }
  
  
    dayFoodExpense = 0;
    
    expenses.forEach((expense) => {
      
      if(regularDateStringConverter(expense.date) === expenseDate){ 
        
        if(isTimeBeforeOrEqual(expense.time, expenseTime)){
      if(expense.category === "Home"){
        dayFoodExpense += Number(expense.amount);
      }
    }
  }
    })
  
    dailyFood = (Number(activePlan.home) * Number(activePlan.amount)) / (100 * Number(activePlan.duration)) + topUp;
  
     
  
    expenses.forEach((expense) => {
      if(isDateInRangeInclusive(expense.date, activePlan.startDate, activePlan.endDate)){ 
      if(expense.category === "Home"){
        currentFood += Number(expense.amount);
      }
    }
    })  
    
    let pendingAmount = dailyFood - dayFoodExpense;
  
    
  
    currentDailyFood = (currentFood)/ Number(calculateDuration(activePlan.startDate, getCurrentDate()));
  
    idealFood = dailyFood * Number(calculateDuration(activePlan.startDate, getCurrentDate()));
    
     return shoppingObject = {
      expenseDay: dayFoodExpense,
      topUp: topUp,
      dailyHome: dailyFood,
      pendingAmount: pendingAmount,
    }
  }

  export function mscFeature(expenseDate = getCurrentDate(), expenseTime = timeStringConverter(getCurrentTime())){
  
    let currentFood = 0;
    let dayFoodExpense = 0;
    let activePlan = getActivePlan();
    let yesterdayDate = activePlan.startDate;
    let topUp = 0;
  
    while (yesterdayDate !== expenseDate){
      dailyFood = (Number(activePlan.msc) * Number(activePlan.amount)) / (100 * Number(activePlan.duration)) + topUp;
  
      expenses.forEach((expense) => {
      
        if(regularDateStringConverter(expense.date) === yesterdayDate){ 
         
        if(expense.category === "Msc"){
          
          dayFoodExpense += Number(expense.amount);
        }
      
      }
      });
  
      topUp = dailyFood - dayFoodExpense;
     
      dayFoodExpense = 0;
      yesterdayDate = addOneDayToDate(yesterdayDate);
    }
  
  
    dayFoodExpense = 0;
    
    expenses.forEach((expense) => {
      
      if(regularDateStringConverter(expense.date) === expenseDate){ 
   
        if(isTimeBeforeOrEqual(expense.time, expenseTime)){
      if(expense.category === "Msc"){
        dayFoodExpense += Number(expense.amount);
      }
    }
  }
    })
  
    dailyFood = (Number(activePlan.msc) * Number(activePlan.amount)) / (100 * Number(activePlan.duration)) + topUp;
  
     
  
    expenses.forEach((expense) => {
      if(isDateInRangeInclusive(expense.date, activePlan.startDate, activePlan.endDate)){ 
      if(expense.category === "Msc"){
        currentFood += Number(expense.amount);
      }
    }
    })  
    
    let pendingAmount = dailyFood - dayFoodExpense;
  
    
  
    currentDailyFood = (currentFood)/ Number(calculateDuration(activePlan.startDate, getCurrentDate()));
  
    idealFood = dailyFood * Number(calculateDuration(activePlan.startDate, getCurrentDate()));
    
     return shoppingObject = {
      expenseDay: dayFoodExpense,
      topUp: topUp,
      dailyMsc: dailyFood,
      pendingAmount: pendingAmount,
    }
  
    
  
  }

  export function savingFeature(expenseDate = getCurrentDate(), expenseTime = timeStringConverter(getCurrentTime())){
  
    let currentFood = 0;
    let dayFoodExpense = 0;
    let activePlan = getActivePlan();
    let yesterdayDate = activePlan.startDate;
    let topUp = 0;
  
    while (yesterdayDate !== expenseDate){
      dailyFood = (Number(activePlan.saving) * Number(activePlan.amount)) / (100 * Number(activePlan.duration)) + topUp;
  
      expenses.forEach((expense) => {
      
        if(regularDateStringConverter(expense.date) === yesterdayDate){ 
         
        if(expense.category === "Saving"){
          
          dayFoodExpense += Number(expense.amount);
        }
      
      }
      });
  
      topUp = dailyFood - dayFoodExpense;
     
      dayFoodExpense = 0;
      yesterdayDate = addOneDayToDate(yesterdayDate);
    }
  
  
    dayFoodExpense = 0;
    
    expenses.forEach((expense) => {
      
      if(regularDateStringConverter(expense.date) === expenseDate){ 

        if(isTimeBeforeOrEqual(expense.time, expenseTime)){
      if(expense.category === "Saving"){
        dayFoodExpense += Number(expense.amount);
      }
    }
  }
    })
  
    dailyFood = (Number(activePlan.saving) * Number(activePlan.amount)) / (100 * Number(activePlan.duration)) + topUp;
  
     
  
    expenses.forEach((expense) => {
      if(isDateInRangeInclusive(expense.date, activePlan.startDate, activePlan.endDate)){ 
      if(expense.category === "Saving"){
        currentFood += Number(expense.amount);
      }
    }
    })  
    
    let pendingAmount = dailyFood - dayFoodExpense;
  
    
  
    currentDailyFood = (currentFood)/ Number(calculateDuration(activePlan.startDate, getCurrentDate()));
  
    idealFood = dailyFood * Number(calculateDuration(activePlan.startDate, getCurrentDate()));
    
     return shoppingObject = {
      expenseDay: dayFoodExpense,
      topUp: topUp,
      dailySaving: dailyFood,
      pendingAmount: pendingAmount,
    }
  
    
  
  }

  export function emergencyFeature(expenseDate = getCurrentDate(), expenseTime = timeStringConverter(getCurrentTime())){
  
    let currentFood = 0;
    let dayFoodExpense = 0;
    let activePlan = getActivePlan();
    let yesterdayDate = activePlan.startDate;
    let topUp = 0;
  
    while (yesterdayDate !== expenseDate){
      dailyFood = (Number(activePlan.emergency) * Number(activePlan.amount)) / (100 * Number(activePlan.duration)) + topUp;
  
      expenses.forEach((expense) => {
      
        if(regularDateStringConverter(expense.date) === yesterdayDate){ 
         
        if(expense.category === "Emergency"){
          
          dayFoodExpense += Number(expense.amount);
        }
      
      }
      });
  
      topUp = dailyFood - dayFoodExpense;
     
      dayFoodExpense = 0;
      yesterdayDate = addOneDayToDate(yesterdayDate);
    }
  
  
    dayFoodExpense = 0;
    
    expenses.forEach((expense) => {
      
      if(regularDateStringConverter(expense.date) === expenseDate){ 

        if(isTimeBeforeOrEqual(expense.time, expenseTime)){
      if(expense.category === "Emergency"){
        dayFoodExpense += Number(expense.amount);
      }
    }
  }
    })
  
    dailyFood = (Number(activePlan.emergency) * Number(activePlan.amount)) / (100 * Number(activePlan.duration)) + topUp;
  
     
  
    expenses.forEach((expense) => {
      if(isDateInRangeInclusive(expense.date, activePlan.startDate, activePlan.endDate)){ 
      if(expense.category === "Emergency"){
        currentFood += Number(expense.amount);
      }
    }
    })  
    
    let pendingAmount = dailyFood - dayFoodExpense;
  
    
  
    currentDailyFood = (currentFood)/ Number(calculateDuration(activePlan.startDate, getCurrentDate()));
  
    idealFood = dailyFood * Number(calculateDuration(activePlan.startDate, getCurrentDate()));
    
     return shoppingObject = {
      expenseDay: dayFoodExpense,
      topUp: topUp,
      dailyEmergency: dailyFood,
      pendingAmount: pendingAmount,
    }
  
    
  
  }



export function shoppingFeature(expenseDate = getCurrentDate(), expenseTime = timeStringConverter(getCurrentTime())){
  
  let currentFood = 0;
  let dayFoodExpense = 0;
  let activePlan = getActivePlan();
  let yesterdayDate = activePlan.startDate;
  let topUp = 0;

  while (yesterdayDate !== expenseDate){
    dailyFood = (Number(activePlan.shopping) * Number(activePlan.amount)) / (100 * Number(activePlan.duration)) + topUp;

    expenses.forEach((expense) => {
    
      if(regularDateStringConverter(expense.date) === yesterdayDate){ 
       
      if(expense.category === "Shopping"){
        
        dayFoodExpense += Number(expense.amount);
      }
    
    }
    });

    topUp = dailyFood - dayFoodExpense;
   
    dayFoodExpense = 0;
    yesterdayDate = addOneDayToDate(yesterdayDate);
  }


  dayFoodExpense = 0;
  
  expenses.forEach((expense) => {
    
    if(regularDateStringConverter(expense.date) === expenseDate){ 

      if(isTimeBeforeOrEqual(expense.time, expenseTime)){
    if(expense.category === "Shopping"){
      dayFoodExpense += Number(expense.amount);
    }
  }
}
  })

  dailyFood = (Number(activePlan.shopping) * Number(activePlan.amount)) / (100 * Number(activePlan.duration)) + topUp;

   

  expenses.forEach((expense) => {
    if(isDateInRangeInclusive(expense.date, activePlan.startDate, activePlan.endDate)){ 
    if(expense.category === "Shopping"){
      currentFood += Number(expense.amount);
    }
  }
  })  
  
  let pendingAmount = dailyFood - dayFoodExpense;

  

  currentDailyFood = (currentFood)/ Number(calculateDuration(activePlan.startDate, getCurrentDate()));

  idealFood = dailyFood * Number(calculateDuration(activePlan.startDate, getCurrentDate()));
  
   return shoppingObject = {
    expenseDay: dayFoodExpense,
    topUp: topUp,
    dailyShopping: dailyFood,
    pendingAmount: pendingAmount,
  }

  

}

// console.log(foodFeature());

// console.log(shoppingFeature());





