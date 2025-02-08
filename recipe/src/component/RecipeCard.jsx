import React, { useState } from "react";

const RecipeCard = ({ recipe }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-emerald-700">{recipe.label}</h2>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="border-2 border-emerald-500 text-emerald-500 px-4 py-2 rounded-full font-semibold hover:bg-emerald-500 hover:text-white transition-all"
          >
            {isExpanded ? "Hide Recipe" : "Show Recipe"}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 bg-emerald-50 p-4 rounded-lg mt-4">
        <p className="font-semibold text-gray-800">
          <span className="text-emerald-700">Calories:</span>{" "}
          {Math.round(recipe.calories)}
        </p>
        <p className="font-semibold text-gray-800">
          <span className="text-emerald-700">Servings:</span> {recipe.yield}
        </p>
        <p className="font-semibold text-gray-800">
          <span className="text-emerald-700">Cuisine:</span>{" "}
          {recipe.cuisineType?.join(", ") || "Unknown"}
        </p>
        <p className="font-semibold text-gray-800">
          <span className="text-emerald-700">Meal Type:</span>{" "}
          {recipe.mealType?.join(", ") || "General"}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {recipe.healthLabels.slice(0, 10).map((label, index) => (
          <span
            key={index}
            className="bg-emerald-100 text-emerald-700 text-sm px-3 py-1 rounded-full"
          >
            {label}
          </span>
        ))}
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-6 p-4 border-t border-emerald-300">
          <div className="flex justify-center">
            <img
              src={recipe.image}
              alt={recipe.label}
              className="w-96 h-96 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h3 className="text-xl font-semibold text-emerald-700 mt-6">
            Ingredients
          </h3>
          <ul className="list-disc pl-5 mt-2 text-gray-800">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
