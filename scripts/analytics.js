import { mscFeature, emergencyFeature, foodFeature, shoppingFeature, savingFeature, homeFeature } from "../utils/features.js";
import { dailyExpense } from "../data/expense.js";
import { getActivePlan, planDailyExpense } from "../data/plan.js";

function loadAnayltics(){
  let innerHTML = '';

  let plan = getActivePlan();

  innerHTML = `
  <div class="main-header">
        <div class="header-title">
          Today Limit 
        </div>
        <div class="header-amount">
          ${dailyExpense()}
        </div>
        <div class="header-total-amount"> 
          / ${planDailyExpense(getActivePlan())}
        </div>
      </div>
      <div class="horizontal-line"> </div>
      <div class="category-box-conatiner">
        <div class="category-box-conatiner-1">
          <div class="category-box">
            <div class="category-box-header">
              <div class="category-name">
                Food
              </div>
              <div class="category-expense">
                $ ${foodFeature().dayFoodExpense}
              </div>
            </div>
            <div class="category-box-body">
              <div class="category-daily-spent">
                <div class="category-daily-title">
                  Daily Limit:
                </div>
                <div class="category-daily-amount">
                  $ ${((Number(plan.food) * Number(plan.amount))/ (Number(plan.duration) * 100)).toFixed(1)}
                </div>
              </div>
            </div>
            <div class="category-box-body">
              <div class="category-daily-spent">
                <div class="category-daily-title">
                  Total Limit:
                </div>
                <div class="category-daily-amount">
                  $ ${(foodFeature().pendingAmount).toFixed(1)}
                </div>
              </div>
            </div>
          </div>
          <div class="category-box">
            <div class="category-box-header">
              <div class="category-name">
                Shopping
              </div>
              <div class="category-expense shopping-adjustment" >
                $ ${shoppingFeature().expenseDay}
              </div>
            </div>
            <div class="category-box-body">
              <div class="category-daily-spent">
                <div class="category-daily-title">
                  Daily Limit:
                </div>
                <div class="category-daily-amount">
                  $ ${((Number(plan.shopping) * Number(plan.amount))/ (Number(plan.duration) * 100)).toFixed(1)}
                </div>
              </div>
            </div>
            <div class="category-box-body">
              <div class="category-daily-spent">
                <div class="category-daily-title">
                  Total Limit:
                </div>
                <div class="category-daily-amount">
                  $ ${(shoppingFeature().pendingAmount).toFixed(1)}
                </div>
              </div>
            </div>
          </div>
          <div class="category-box">
            <div class="category-box-header">
              <div class="category-name">
                Home & L
              </div>
              <div class="category-expense">
                $ ${homeFeature().expenseDay}
              </div>
            </div>
            <div class="category-box-body">
              <div class="category-daily-spent">
                <div class="category-daily-title">
                  Daily Limit:
                </div>
                <div class="category-daily-amount">
                  $ ${((Number(plan.home) * Number(plan.amount))/ (Number(plan.duration) * 100)).toFixed(1)}
                </div>
              </div>
            </div>
            <div class="category-box-body">
              <div class="category-daily-spent">
                <div class="category-daily-title">
                  Total Limit:
                </div>
                <div class="category-daily-amount">
                  $ ${(homeFeature().pendingAmount).toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="category-box-conatiner-1">
          <div class="category-box">
            <div class="category-box-header">
              <div class="category-name">
                MSC
              </div>
              <div class="category-expense">
                $ ${mscFeature().expenseDay}
              </div>
            </div>
            <div class="category-box-body">
              <div class="category-daily-spent">
                <div class="category-daily-title">
                  Daily Limit:
                </div>
                <div class="category-daily-amount">
                  $ ${((Number(plan.msc) * Number(plan.amount))/ (Number(plan.duration) * 100)).toFixed(1)}
                </div>
              </div>
            </div>
            <div class="category-box-body">
              <div class="category-daily-spent">
                <div class="category-daily-title">
                  Total Limit:
                </div>
                <div class="category-daily-amount">
                  $ ${(mscFeature().pendingAmount).toFixed(1)}
                </div>
              </div>
            </div>
          </div>
          <div class="category-box">
            <div class="category-box-header">
              <div class="category-name">
                Emergency
              </div>
              <div class="category-expense">
                $ ${emergencyFeature().expenseDay}
              </div>
            </div>
            <div class="category-box-body">
              <div class="category-daily-spent">
                <div class="category-daily-title">
                  Daily Limit:
                </div>
                <div class="category-daily-amount">
                  $ ${((Number(plan.emergency) * Number(plan.amount))/ (Number(plan.duration) * 100)).toFixed(1)}
                </div>
              </div>
            </div>
            <div class="category-box-body">
              <div class="category-daily-spent">
                <div class="category-daily-title">
                  Total Limit:
                </div>
                <div class="category-daily-amount">
                  $ ${(emergencyFeature().pendingAmount).toFixed(1)}
                </div>
              </div>
            </div>
          </div>
          <div class="category-box">
            <div class="category-box-header">
              <div class="category-name">
                Savings
              </div>
              <div class="category-expense">
                $ ${savingFeature().expenseDay}
              </div>
            </div>
            <div class="category-box-body">
              <div class="category-daily-spent">
                <div class="category-daily-title">
                  Daily Limit:
                </div>
                <div class="category-daily-amount">
                  $ ${((Number(plan.saving) * Number(plan.amount))/ (Number(plan.duration) * 100)).toFixed(1)}
                </div>
              </div>
            </div>
            <div class="category-box-body">
              <div class="category-daily-spent">
                <div class="category-daily-title">
                  Total Limit:
                </div>
                <div class="category-daily-amount">
                  $ ${(savingFeature().pendingAmount).toFixed(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  `

  document.querySelector('.main-body').innerHTML = innerHTML;
}

loadAnayltics();