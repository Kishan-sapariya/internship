import React, { useState } from "react";
import Recipe from "./component/Recipe";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-emerald-800 mb-6">Recipe App</h1>
      <Recipe />
    </div>
  );
};

export default App;
