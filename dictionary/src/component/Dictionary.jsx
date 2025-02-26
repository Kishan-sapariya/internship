import React, { useState } from "react";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [wordData, setWordData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();
      console.log(data);
      setWordData(data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-teal-50 p-10">
      <div className="flex justify-center items-center mb-14">
        <h1 className="text-teal-600 text-5xl font-bold tracking-wide">
          Dictionary
          <span className="text-black text-5xl font-bold ml-2">App</span>
        </h1>
      </div>

      <div className="flex justify-center items-center max-w-2xl mx-auto">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Search for any word..."
          className="w-full p-4 bg-white rounded-lg shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
        />
        <button
          className="bg-teal-500 text-white px-6 py-4 rounded-lg ml-3 hover:bg-teal-600 transition-colors shadow-md font-semibold cursor-pointer"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {!wordData && !isLoading && (
        <div className="flex justify-center mt-8 text-gray-500">
          <p>Type any word and press search to find its meaning</p>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center mt-20">
          <div className="h-12 w-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {wordData && !isLoading && (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-4xl font-bold">{wordData.word}</h2>
            <span className="text-gray-500">{wordData.phonetics[0]?.text}</span>
          </div>

          {wordData.meanings.map((meaning, index) => (
            <div key={index} className="mt-4">
              <h3 className="text-xl font-semibold text-teal-600">
                {meaning.partOfSpeech}
              </h3>
              <div className="mt-2">
                {meaning.definitions.slice(0, 3).map((def, idx) => (
                  <p key={idx} className="ml-4 mt-2">
                    {idx + 1}. {def.definition}
                  </p>
                ))}
              </div>
              {meaning.synonyms.length > 0 && (
                <div className="mt-2">
                  <span className="font-medium">Synonyms: </span>
                  {meaning.synonyms.slice(0, 3).join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dictionary;
