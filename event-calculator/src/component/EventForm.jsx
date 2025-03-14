import React, { useState } from 'react';

const EventForm = ({ eventDetails, onEventDetailsChange, onAddExpense, setShowSummary }) => {
  const [expense, setExpense] = useState({ name: '', category: 'Venue', amount: '' });
  const [errors, setErrors] = useState({});

  const expenseCategories = [
    'Venue', 'Catering', 'Decoration', 'Entertainment', 
    'Marketing', 'Staff', 'Transportation', 'Other'
  ];

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    onEventDetailsChange({
      ...eventDetails,
      [name]: name === 'attendees' || name === 'budget' ? parseFloat(value) || 0 : value
    });
  };

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExpense({
      ...expense,
      [name]: name === 'amount' ? value : value
    });
  };

  const validateEventDetails = () => {
    const newErrors = {};
    if (!eventDetails.name) newErrors.name = 'Event name is required';
    if (!eventDetails.date) newErrors.date = 'Date is required';
    if (!eventDetails.location) newErrors.location = 'Location is required';
    if (!eventDetails.attendees) newErrors.attendees = 'Number of attendees is required';
    if (!eventDetails.budget) newErrors.budget = 'Budget is required';
    return newErrors;
  };

  const validateExpense = () => {
    const newErrors = {};
    if (!expense.name) newErrors.expenseName = 'Expense name is required';
    if (!expense.amount) newErrors.expenseAmount = 'Amount is required';
    return newErrors;
  };

  const handleAddExpenseClick = (e) => {
    e.preventDefault();
    const expenseErrors = validateExpense();
    
    if (Object.keys(expenseErrors).length === 0) {
      onAddExpense({
        ...expense,
        amount: parseFloat(expense.amount)
      });
      setExpense({ name: '', category: 'Venue', amount: '' });
      setErrors({});
    } else {
      setErrors(expenseErrors);
    }
  };

  const handleGenerateSummary = (e) => {
    e.preventDefault();
    const detailErrors = validateEventDetails();
    
    if (Object.keys(detailErrors).length === 0) {
      setShowSummary(true);
      setErrors({});
    } else {
      setErrors(detailErrors);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Event Details</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Event Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={eventDetails.name}
            onChange={handleEventChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="date">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventDetails.date}
            onChange={handleEventChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="location">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventDetails.location}
            onChange={handleEventChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="attendees">
            Number of Attendees
          </label>
          <input
            type="number"
            id="attendees"
            name="attendees"
            value={eventDetails.attendees || ''}
            onChange={handleEventChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.attendees ? 'border-red-500' : 'border-gray-300'}`}
            min="0"
          />
          {errors.attendees && <p className="text-red-500 text-sm mt-1">{errors.attendees}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="budget">
            Total Budget ($)
          </label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={eventDetails.budget || ''}
            onChange={handleEventChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.budget ? 'border-red-500' : 'border-gray-300'}`}
            min="0"
            step="0.01"
          />
          {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
        </div>

        <hr className="my-6" />

        <h2 className="text-2xl font-bold mb-4">Add Expense</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="expenseName">
            Expense Name
          </label>
          <input
            type="text"
            id="expenseName"
            name="name"
            value={expense.name}
            onChange={handleExpenseChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.expenseName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.expenseName && <p className="text-red-500 text-sm mt-1">{errors.expenseName}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={expense.category}
            onChange={handleExpenseChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {expenseCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="amount">
            Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={expense.amount}
            onChange={handleExpenseChange}
            className={`w-full px-3 py-2 border rounded-md ${errors.expenseAmount ? 'border-red-500' : 'border-gray-300'}`}
            min="0"
            step="0.01"
          />
          {errors.expenseAmount && <p className="text-red-500 text-sm mt-1">{errors.expenseAmount}</p>}
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={handleAddExpenseClick}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Add Expense
          </button>
          
          <button
            onClick={handleGenerateSummary}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Generate Summary
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
