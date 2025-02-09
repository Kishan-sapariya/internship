import React, { useState, useEffect } from "react";

const categories = [
  "smileys-and-people",
  "animals-and-nature",
  "food-and-drink",
  "travel-and-places",
  "activities",
  "objects",
  "symbols",
  "flags"
];

const EmojiSearch = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [emojis, setEmojis] = useState([]);
  const [filteredEmojis, setFilteredEmojis] = useState([]);

  useEffect(() => {
    const fetchEmojis = async () => {
      try {
        const res = await fetch(`https://emojihub.yurace.pro/api/all/category/${selectedCategory}`);
        const data = await res.json();
        setEmojis(data);
      } catch (error) {
        console.error("Error fetching emojis:", error);
      }
    };

    fetchEmojis();
  }, [selectedCategory]);

  useEffect(() => {
    if (!search) {
      setFilteredEmojis(emojis);
      return;
    }

    const results = emojis.filter((emoji) =>
      emoji.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredEmojis(results);
  }, [search, emojis]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-100 via-blue-100 to-green-100 p-8">
      <div className="max-w-6xl mx-auto backdrop-blur-lg">
        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-teal-500 text-center">
          🌟 Emoji Explorer 🌟
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto mb-8">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-6 py-3 rounded-xl border-2 border-teal-400 bg-white/40 backdrop-blur-lg
            focus:border-teal-500 focus:outline-none shadow-md hover:shadow-lg transition-all duration-300
            text-teal-900 cursor-pointer flex-1"
          >
            {categories.map((category, index) => (
              <option key={index} value={category} className="text-teal-900 bg-white">
                {category.replace(/-/g, " ").toUpperCase()}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search Emoji here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-6 py-3 rounded-xl border-2 border-teal-400 focus:border-teal-500 
            focus:outline-none w-full sm:w-96 shadow-md focus:ring-4 ring-teal-300/30 
            transition-all duration-300 backdrop-blur-lg bg-white/40 text-teal-900 placeholder-teal-500"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-4">
          {filteredEmojis.map((emoji, index) => (
            <div
              key={index}
              className="group bg-white/40 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-2xl 
              transform hover:-translate-y-1 transition-all duration-300 cursor-pointer
              hover:bg-gradient-to-b hover:from-teal-300/40 hover:to-orange-300/40 border border-teal-400/30 
              hover:border-teal-500 flex items-center justify-center aspect-square"
            >
              <span 
                className="text-5xl transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg"
                dangerouslySetInnerHTML={{ __html: emoji.htmlCode[0] }}
              ></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiSearch;
