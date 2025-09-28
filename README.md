# Expense Tracker

## Overview

**First self-project worked on individually**  

This project is a personal expense management web application designed to help users efficiently track and manage their spending habits. It allows users to create plans for a specific duration, monitor daily expenses, and categorize spending to gain insights into their financial behavior. The application provides a clean and accessible interface for managing and analyzing expenses over time.

## Purpose and Workflow

- **Purpose**: Help users sustain the amount they are willing to spend for a given duration, while providing insights into spending patterns and overall financial health.  
- **Workflow**:  
  1. Users create, update, or delete spending plans for a specific period.  
  2. Expenses are added, deleted, and categorized according to percentages set by the user.  
  3. Days without spending are accounted for, creating a “rolled over” amount database.  
  4. Expenses are categorized into **Good**, **Average**, and **Bad** spending based on the rolled-over amounts.  
  5. A final score is generated based on the categories to provide a clear view of financial behavior.  
  6. Analytics and insights are provided for daily spending limits across individual categories.

- **Future Plans**:  
  - Implement a feedback algorithm to help users correct bad expense habits.  
  - Integrate direct APIs from payment apps to automatically register expenses.  
  - Account for negative balances by utilizing funds from other categories.

## Tech Stack

- **JavaScript**: Used to put my skills of JavaScript in practise and improving knowledge on the core concepts.  
- **Firebase**: Used for authentication, database storage, and real-time updates.  
- **LocalStorage**: Temporarily stores user data for offline functionality and quick access.  
- **Charting Library**: To visualize analytics and spending insights.

## Disclaimer

- This project was my first self-project, built individually, so some areas need improvement.  
- **Known issues / areas for improvement**:  
  - Exposing security keys in the frontend.  
  - Using LocalStorage for all data storage instead of secure backend storage.  
  - Optimizing data handling and workflow.  
- I am aware of these issues and actively working on improving them in future iterations.
