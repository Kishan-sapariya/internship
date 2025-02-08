import React, { useState } from "react";
import RecipeCard from "./RecipeCard";
import Loader from "./Loader";

const Recipe = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
      const API_KEY = import.meta.env.VITE_EDAMAM_API_KEY;
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`
      );

      const data = await response.json();
      setRecipes(data.hits || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="flex justify-center gap-4 mb-8">
        <input
          type="text"
          className="w-[500px] px-4 py-3 rounded-full border-2 border-gray-300  focus:outline-none focus:border-emerald-400"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          className="px-14 py-3 bg-emerald-500 text-white font-semibold rounded-full shadow-md hover:bg-emerald-600 transition-colors disabled:opacity-50 flex items-center gap-2"
          onClick={fetchRecipes}
        >
          {loading ? <Loader /> : "Discover"}
        </button>
      </div>

      <div className="flex flex-col gap-6 mt-4">
        {recipes.map((item, index) => (
          <RecipeCard key={index} recipe={item.recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipe;
