import React, { useState } from 'react';
import EventForm from './EventForm';
import EventSummary from './EventSummary';
import ExpenseList from './ExpenseList';

const EventCalculator = () => {
  const [eventDetails, setEventDetails] = useState({
    name: '',
    date: '',
    location: '',
    attendees: 0,
    budget: 0,
  });

  const [expenses, setExpenses] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  const handleEventDetailsChange = (details) => {
    setEventDetails(details);
  };

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  const calculateRemainingBudget = () => {
    return eventDetails.budget - calculateTotalExpenses();
  };

  const calculateCostPerAttendee = () => {
    return eventDetails.attendees ? calculateTotalExpenses() / eventDetails.attendees : 0;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
        <EventForm 
          eventDetails={eventDetails} 
          onEventDetailsChange={handleEventDetailsChange}
          onAddExpense={handleAddExpense}
          setShowSummary={setShowSummary}
        />
      </div>
      
      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <ExpenseList 
            expenses={expenses} 
            onDeleteExpense={handleDeleteExpense} 
          />
        </div>
        
        {showSummary && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <EventSummary 
              eventDetails={eventDetails}
              totalExpenses={calculateTotalExpenses()}
              remainingBudget={calculateRemainingBudget()}
              costPerAttendee={calculateCostPerAttendee()}
              expenses={expenses}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCalculator;
