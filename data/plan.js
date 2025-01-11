import { calculateDuration } from "../utils/date.js";

class Plan{
  name;
  startDate;
  endDate;
  amount;
  saving;
  shopping;
  food;
  home;
  emergency;
  msc;
  duration;
  planId;
  isActive;
  isClicked;

  constructor(plan){
    this.name = plan.name;
    this.startDate = plan.startDate;
    this.endDate = plan.endDate;
    this.amount = plan.amount;
    this.saving = plan.saving;
    this.shopping = plan.shopping;
    this.food = plan.food;
    this.home = plan.home;
    this.emergency = plan.emergency;
    this.msc = plan.msc;
    this.duration = calculateDuration(plan.startDate, plan.endDate);
    this.isActive = false;
    this.planId = Date.now().toString(36) + Math.random().toString(36).substr(2);

    this.isClicked = false;
    
  }

}
export let  plans = JSON.parse(localStorage.getItem('plans')) || [
    {
      name: 'The Ultra Saver',
      startDate: '2025-01-01',
      endDate: '2025-03-01',
      amount: 5000,
      saving: 10,
      shopping: 15,
      food: 35,
      home: 30,
      emergency: 5,
      msc: 5,
      
    },
    {
      name: 'The Ultra Saver',
      startDate: '2025-01-01',
      endDate: '2025-03-01',
      amount: 5000,
      saving: 10,
      shopping: 15,
      food: 35,
      home: 30,
      emergency: 5,
      msc: 5,
      
    }
  ].map((plan) => {
    return new Plan(plan);
  })





 export function addPlan(planObj){
  plans.push(new Plan(planObj));
  console.log(plans);

}

export function saveToStorage(){
  localStorage.setItem('plans', JSON.stringify(plans));
}

export function getPlan(planId){
  let matchingPlan;

  plans.forEach((plan) => {
    if(plan.planId === planId){
      matchingPlan = plan;
    }
  })

  return matchingPlan;
}

export function updatePlan(matchingPlan){

  plans.map((plan) => {
    if(matchingPlan.planId === plan.planId){
      plan.name = matchingPlan.name;
      plan.startDate = matchingPlan.startDate;
      plan.endDate = matchingPlan.endDate;
      plan.amount = matchingPlan.amount;
      plan.saving = matchingPlan.saving;
      plan.shopping = matchingPlan.shopping;
      plan.emergency = matchingPlan.emergency;
      plan.msc = matchingPlan.msc;
      plan.home = matchingPlan.home;
      plan.food = matchingPlan.food;
      plan.duration = matchingPlan.duration;

      return plan;
    }
    return plan;
  })
}

export function removeFromPlan(planId){
   
  plans = plans.filter(plan => plan.planId !==planId);
  console.log(plans);
  saveToStorage();
  
}

export function getActivePlan(){
  let activePlan;
  plans.forEach((plan) => {
    if(plan.isActive){
      activePlan = plan;
    }
  })
  return activePlan;
}

export function planDailyExpense(plan){
  
  return (Number(plan.amount)/Number(plan.duration)).toFixed(1);

}