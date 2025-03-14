import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const EventSummary = ({ eventDetails, totalExpenses, remainingBudget, costPerAttendee, expenses }) => {
  // Group expenses by category for the chart
  const expensesByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  // Chart data
  const chartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#8AC249', '#EA5545'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Budget status
  const getBudgetStatus = () => {
    if (remainingBudget > 0) {
      return {
        text: 'Under Budget',
        color: 'text-green-600',
        bgColor: 'bg-green-100',
      };
    } else if (remainingBudget === 0) {
      return {
        text: 'On Budget',
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
      };
    } else {
      return {
        text: 'Over Budget',
        color: 'text-red-600',
        bgColor: 'bg-red-100',
      };
    }
  };

  const budgetStatus = getBudgetStatus();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Event Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Event Details</h3>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-600">Event Name:</span>
              <p className="text-gray-800">{eventDetails.name}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Date:</span>
              <p className="text-gray-800">{formatDate(eventDetails.date)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Location:</span>
              <p className="text-gray-800">{eventDetails.location}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Attendees:</span>
              <p className="text-gray-800">{eventDetails.attendees}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Budget Overview</h3>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-600">Total Budget:</span>
              <p className="text-gray-800">${eventDetails.budget.toFixed(2)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Total Expenses:</span>
              <p className="text-gray-800">${totalExpenses.toFixed(2)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Remaining Budget:</span>
              <p className={`font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(remainingBudget).toFixed(2)} {remainingBudget < 0 ? '(Overspent)' : ''}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Cost Per Attendee:</span>
              <p className="text-gray-800">${costPerAttendee.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Expense Breakdown</h3>
          <div className="h-64">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Budget Status</h3>
          <div className={`p-4 rounded-lg ${budgetStatus.bgColor} mb-4`}>
            <p className={`text-xl font-bold ${budgetStatus.color}`}>
              {budgetStatus.text}
            </p>
            <p className="text-gray-700 mt-2">
              {remainingBudget >= 0 
                ? `You have $${remainingBudget.toFixed(2)} left in your budget.` 
                : `You are $${Math.abs(remainingBudget).toFixed(2)} over your budget.`}
            </p>
          </div>
          
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 mb-2">Budget Utilization</h4>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className={`h-4 rounded-full ${
                  totalExpenses / eventDetails.budget > 1 
                    ? 'bg-red-500' 
                    : totalExpenses / eventDetails.budget > 0.8 
                      ? 'bg-yellow-500' 
                      : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(totalExpenses / eventDetails.budget * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {(totalExpenses / eventDetails.budget * 100).toFixed(1)}% of budget used
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-800 mb-3">Recommendations</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {remainingBudget < 0 && (
            <li>Consider increasing your budget or reducing expenses to avoid overspending.</li>
          )}
          {remainingBudget > eventDetails.budget * 0.3 && (
            <li>You have a significant amount of budget remaining. Consider enhancing the event experience with additional services.</li>
          )}
          {Object.keys(expensesByCategory).length < 3 && (
            <li>Your expense categories are limited. Consider diversifying your spending for a more balanced event.</li>
          )}
          {costPerAttendee > 100 && (
            <li>The cost per attendee is relatively high. Look for ways to increase attendance or reduce costs.</li>
          )}
          <li>Remember to account for unexpected expenses by keeping some budget in reserve.</li>
        </ul>
      </div>
    </div>
  );
};

export default EventSummary;
