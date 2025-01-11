import { plans, addPlan, saveToStorage, getPlan, updatePlan, removeFromPlan } from "../data/plan.js";


function SetUpPage(){ 
function loadPlans(){
  
  let innerHTML = '';
  let innerHtmlActive = '';

  plans.forEach((plan) => {

    if (!plan.isActive){ 

    innerHTML+=
    `
     <div class="list-container js-list-container js-list-container-${plan.planId}" data-plan-id = ${plan.planId}>
          <div class = "list-info">
            <div class = "list-header">
              <div class="plan-name">
                ${plan.name}
              </div>
              <div>
                -
              </div>
              <div class="plan-amount-duration">
                <div class="plan-amount">
                  $ ${plan.amount}
                </div>
                <div>
                  for
                </div> 
                <div class="plan-duration">
                  ${plan.duration} Days
                </div>    
              </div>
            </div>
          <div class = "plan-graph">
            <div class="axis-bars">
              <div class="plan-y-axis"></div>
              <div class = "amount-bar food-plan">
                <div class="specific-amount">
                  $ ${plan.amount * plan.food/100}
                </div>
                <div class = "specific-bar" style ="height: ${plan.food * 150 /100}px"></div>
              </div>
              <div class = "amount-bar shopping-plan">
                <div class="specific-amount">
                  $ ${plan.amount * plan.shopping/100}
                </div>
                <div class = "specific-bar" style ="height: ${plan.shopping * 150 /100}px"></div>
              </div>
              <div class = "amount-bar saving-plan">
                <div class="specific-amount">
                  $ ${plan.amount * plan.saving/100}
                </div>
                <div class = "specific-bar" style ="height: ${plan.saving * 150 /100}px"></div>
              </div>
              <div class = "amount-bar msc-plan">
                <div class="specific-amount">
                  $ ${plan.amount * plan.msc/100}
                </div>
                <div class = "specific-bar" style ="height: ${plan.msc * 150 /100}px"></div>
              </div>
              <div class = "amount-bar home-plan">
                <div class="specific-amount">
                  $ ${plan.home * plan.amount /100}
                </div>
                <div class = "specific-bar" style ="height: ${plan.home * 150 /100}px"></div>
              </div>
              <div class = "amount-bar emergency-plan">
                <div class="specific-amount ">
                  $ ${plan.emergency * plan.amount /100}
                </div>
                <div class = "specific-bar" style ="height: ${plan.emergency * 150 /100}px"></div>
              </div>
            </div>
            <div class="plan-x-axis"></div>
            <div class="specific-names">
              <div class = "food-name">
                Food
              </div>
              <div class = "shopping-name">
                Shopping
              </div>
              <div class="saving-name">
                Saving
              </div>
              <div class="msc-name">
                Msc.
              </div>
              <div class="home-name">
                Home & Living
              </div>
              <div class="emergency-name">
                Emergency
              </div>
            </div>
          </div>
          </div>
          <div class="active-plan js-active-plan">
            ${plan.isActive ? "Deactivate Plan":"Set as Active Plan"}
          </div>
        </div>
      </div>
      
    `

    }
    else{
      innerHtmlActive = `
       <div class="list-container js-list-container js-list-container-${plan.planId}" data-plan-id = ${plan.planId}>
          <div class = "list-info">
            <div class = "list-header">
              <div class="plan-name">
                ${plan.name}
              </div>
              <div>
                -
              </div>
              <div class="plan-amount-duration">
                <div class="plan-amount">
                  $ ${plan.amount}
                </div>
                <div>
                  for
                </div> 
                <div class="plan-duration">
                  ${plan.duration} Days
                </div>  
                <div class = "active-plan-indicator">
                Active
                </div>  
              </div>
            </div>
          <div class = "plan-graph">
            <div class="axis-bars">
              <div class="plan-y-axis"></div>
              <div class = "amount-bar food-plan">
                <div class="specific-amount">
                  $ ${plan.amount * plan.food/100}
                </div>
                <div class = "specific-bar" style ="height: ${plan.food * 150 /100}px"></div>
              </div>
              <div class = "amount-bar shopping-plan">
                <div class="specific-amount">
                  $ ${plan.amount * plan.shopping/100}
                </div>
                <div class = "specific-bar" style ="height: ${plan.shopping * 150 /100}px"></div>
              </div>
              <div class = "amount-bar saving-plan">
                <div class="specific-amount">
                  $ ${plan.amount * plan.saving/100}
                </div>
                <div class = "specific-bar" style ="height: ${plan.saving * 150 /100}px"></div>
              </div>
              <div class = "amount-bar msc-plan">
                <div class="specific-amount">
                  $ ${plan.amount * plan.msc/100}
                </div>
                <div class = "specific-bar" style ="height: ${plan.msc * 150 /100}px"></div>
              </div>
              <div class = "amount-bar home-plan">
                <div class="specific-amount">
                  $ ${plan.home * plan.amount /100}
                </div>
                <div class = "specific-bar" style ="height: ${plan.home * 150 /100}px"></div>
              </div>
              <div class = "amount-bar emergency-plan">
                <div class="specific-amount ">
                  $ ${plan.emergency * plan.amount /100}
                </div>
                <div class = "specific-bar" style ="height: ${plan.emergency * 150 /100}px"></div>
              </div>
            </div>
            <div class="plan-x-axis"></div>
            <div class="specific-names">
              <div class = "food-name">
                Food
              </div>
              <div class = "shopping-name">
                Shopping
              </div>
              <div class="saving-name">
                Saving
              </div>
              <div class="msc-name">
                Msc.
              </div>
              <div class="home-name">
                Home & Living
              </div>
              <div class="emergency-name">
                Emergency
              </div>
            </div>
          </div>
          </div>
          <div class="active-plan js-active-plan">
            ${plan.isActive? "Deactivate Plan" : "Set as Active Plan"}
          </div>
        </div>
      </div>
      
      `
    }
  });
  

  document.querySelector('.js-plan-list').innerHTML = innerHTML;
  document.querySelector('.js-active-plan-list').innerHTML = innerHtmlActive;


}

function planModifier(planId){
  document.querySelector('.js-modifier-header').innerHTML = "Editing Plan";

  let matchingPlan = getPlan(planId);

  
  document.querySelector('.plan-modifier').innerHTML = `
   <div class="modifier-header js-modifier-header">
          Editing plan
        </div>
        <div class="modifier-form">
          <div class="name-modifier">
            <input type="text" class="name-input input-field js-plan-name" placeholder="Name" value = "${matchingPlan.name}">
          </div>
          <div class="date-modifier">
            <div>
              <input type="date" class="input-field date-field js-start-date"  type="date"placeholder="Star - Date" value = "${matchingPlan.startDate}" style="color: white">
            </div>
            <div>
              -
            </div>
            <div>
              <input type="date" class="input-field date-field js-end-date" placeholder="End - Date" value = "${matchingPlan.endDate}" type = "date" style="color: white">
            </div>
          </div>
          <div>
            <input type="number" class="amount-field input-field js-plan-amount" placeholder="Amount" value = "${matchingPlan.amount}">
          </div>
        </div>
        <div class="specfic-percentage">
          <div class = left-specific>
            <div class = list-specific>
              <div class="name-specific">
                Saving
              </div>
              <div>
                <input type="number" class="specific-input js-plan-saving" value = "${matchingPlan.saving}">
              </div>
            </div>
            <div class = list-specific>
              <div class="name-specific">
                Shopping
              </div>
              <div>
                <input type="number" class="specific-input js-plan-shopping" value="${matchingPlan.shopping}">
              </div>
            </div>
            <div class = list-specific>
              <div class="name-specific">
                Msc.
              </div>
              <div>
                <input type="number" class="specific-input js-plan-msc" value = "${matchingPlan.msc}">
              </div>
            </div>
          </div>
          <div class="right-specific">
            <div class = list-specific>
              <div class="name-specific">
                Food
              </div>
              <div>
                <input type="number" class="specific-input js-plan-food" value = "${matchingPlan.food}">
              </div>
            </div>
            <div class = list-specific>
              <div class="name-specific">
                Home & L
              </div>
              <div>
                <input type="number" class="specific-input js-plan-home" value = ${matchingPlan.home}>
              </div>
            </div>
            <div class = list-specific>
              <div class="name-specific">
                Emergency
              </div>
              <div>
                <input type="number" class="specific-input js-plan-emergency" value = "${matchingPlan.emergency}">
              </div>
            </div>
          </div>
          </div>
          <div class="modifier-button">
            <div>
              <button class="submit-button js-cacel-plan-button js-common-cancel">
                Delete
              </button>
            </div>
            <div>
              <button class="submit-button js-add-plan-button js-common-submit">
                Update
              </button>
            </div>
          </div>
  `;
  
  let deleteButton = document.querySelector('.js-common-cancel');
  let updateButton = document.querySelector('.js-common-submit');

  // deleteButton.classList.remove('js-cancel-plan-button');
  // updateButtom.classList.remove('js-add-plan-button');

  deleteButton.innerHTML = "Delete";
  updateButton.innerHTML = "Update";

  updateButton.addEventListener('click', () => {
    matchingPlan.name = document.querySelector('.js-plan-name').value;
  matchingPlan.startDate = document.querySelector('.js-start-date').value;
  matchingPlan.endDate = document.querySelector('.js-end-date').value;
  matchingPlan.amount = document.querySelector('.js-plan-amount').value;
  matchingPlan.saving = document.querySelector('.js-plan-saving').value;
  matchingPlan.shopping = document.querySelector('.js-plan-shopping').value;
  matchingPlan.msc = document.querySelector('.js-plan-msc').value;
  matchingPlan.food = document.querySelector('.js-plan-food').value;
  matchingPlan.home = document.querySelector('.js-plan-home').value;
  matchingPlan.emergency = document.querySelector('.js-plan-emergency').value;

  updatePlan(matchingPlan);
  saveToStorage();
  loadPlans();
  planListClicker();
  AddingToCart();
  })

  deleteButton.addEventListener('click', () => {
    
        removeFromPlan(matchingPlan.planId);
        
        loadPlans();
        planListClicker();
        AddingToCart();
      })
}

loadPlans();

function hoverPlanAdd(plan){
  plan.classList.add('hover-container');
}

function hoverPlanRemove(plan){
  plan.classList.remove('hover-container');
}

function clickHoverPlanRemove(plan){
  plan.classList.remove('active-container');
}

function clickHoverPlanAdd(plan){
  plan.classList.add('active-container');
}



function getFormValue(){

  let planName = document.querySelector('.js-plan-name').value;
  let planStart = document.querySelector('.js-start-date').value;
  let planEnd = document.querySelector('.js-end-date').value;
  let planAmount = document.querySelector('.js-plan-amount').value;
  let planSaving = document.querySelector('.js-plan-saving').value;
  let planShopping = document.querySelector('.js-plan-shopping').value
  let planMsc = document.querySelector('.js-plan-msc').value;
  let planFood = document.querySelector('.js-plan-food').value;
  let planHome = document.querySelector('.js-plan-home').value;
  let planEmergency = document.querySelector('.js-plan-emergency').value
  
  let planObj = {
    name: planName, 
    startDate: planStart, 
    endDate: planEnd, 
    amount: planAmount, 
    food: planFood, 
    shopping: planShopping, 
    msc: planMsc, 
    saving: planSaving, 
    emergency: planEmergency, 
    home: planHome,
    duration: 60,
  }

  addPlan(planObj);
  loadPlans();
  
  planListClicker();
  saveToStorage();
  
}


    // document.querySelector('.js-add-plan-button').addEventListener('click', () => {
    //   getFormValue();
    // })

function AddingToCart(){
  document.querySelector('.plan-modifier').innerHTML = `
   <div class="modifier-header js-modifier-header">
          Adding a plan
        </div>
        <div class="modifier-form">
          <div class="name-modifier">
            <input type="text" class="name-input input-field js-plan-name" placeholder="Name">
          </div>
          <div class="date-modifier">
            <div>
              <input type="date" class="input-field date-field js-start-date" placeholder="Star - Date" style="color: white">
            </div>
            <div>
              -
            </div>
            <div>
              <input type="date" class="input-field date-field js-end-date" placeholder="End - Date" style="color: white">
            </div>
          </div>
          <div>
            <input type="number" class="amount-field input-field js-plan-amount" placeholder="Amount">
          </div>
        </div>
        <div class="specfic-percentage">
          <div class = left-specific>
            <div class = list-specific>
              <div class="name-specific">
                Saving
              </div>
              <div>
                <input type="number" class="specific-input js-plan-saving">
              </div>
            </div>
            <div class = list-specific>
              <div class="name-specific">
                Shopping
              </div>
              <div>
                <input type="number" class="specific-input js-plan-shopping">
              </div>
            </div>
            <div class = list-specific>
              <div class="name-specific">
                Msc.
              </div>
              <div>
                <input type="number" class="specific-input js-plan-msc">
              </div>
            </div>
          </div>
          <div class="right-specific">
            <div class = list-specific>
              <div class="name-specific">
                Food
              </div>
              <div>
                <input type="number" class="specific-input js-plan-food">
              </div>
            </div>
            <div class = list-specific>
              <div class="name-specific">
                Home & L
              </div>
              <div>
                <input type="number" class="specific-input js-plan-home">
              </div>
            </div>
            <div class = list-specific>
              <div class="name-specific">
                Emergency
              </div>
              <div>
                <input type="number" class="specific-input js-plan-emergency">
              </div>
            </div>
          </div>
          </div>
          <div class="modifier-button">
            <div>
              <button class="submit-button js-cacel-plan-button js-common-cancel">
                Cancel
              </button>
            </div>
            <div>
              <button class="submit-button js-add-plan-button js-common-submit">
                Add
              </button>
            </div>
          </div>
  `

  document.querySelector('.js-common-submit').addEventListener('click', () => {
    getFormValue();
    AddingToCart();
  })

}


function planListClicker(){
  document.querySelectorAll('.js-list-container').forEach((plan) => {

    //before click hover 
    plan.addEventListener('mouseover', () => {
      hoverPlanAdd(plan);
    });
    
    plan.addEventListener('mouseout', () => {
      hoverPlanRemove(plan);
    })

    //Click 
    plan.addEventListener('click', () => {
      let planId = plan.dataset.planId;
      if(!plan.isClicked){
        document.querySelectorAll('.js-list-container').forEach((sub) => {
          sub.isClicked = false;
          sub.classList.remove('active-container')

        })
        document.querySelectorAll('.js-active-plan').forEach((link) => {link.addEventListener('click', () => {
          console.log(planId);
          plans.forEach((planed) => {
            if(planed.planId !== planId){
              planed.isActive = false;
              saveToStorage();
              console.log(planed);
              SetUpPage();
            }
            else{
              if(planed.isActive){
                planed.isActive = false;
                SetUpPage();
              }
              else{ 
              planed.isActive = true;
              SetUpPage();
              }
              console.log(planed);
              saveToStorage();
            }
          })
        })
      })
        plan.classList.add('active-container');
        plan.isClicked = true;
        planId = plan.dataset.planId;
        planModifier(planId);
        
      }
      else{
        plan.classList.remove('active-container');
        

        plan.isClicked = false;

        AddingToCart();
        
      }
      
    });
  });
}

planListClicker();
AddingToCart();

}

SetUpPage();






