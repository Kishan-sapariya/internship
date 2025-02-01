import React, { useState, useEffect } from 'react';

const Gallery = () => {
  const categories = [
    { id: 1, title: 'Nature' },
    { id: 2, title: 'City' },
    { id: 3, title: 'Architecture' },
    { id: 4, title: 'Travel' },
    { id: 5, title: 'Food' },
    { id: 6, title: 'Art' },
  ];

  const [initialImages, setInitialImages] = useState([]);
  const [categoryImages, setCategoryImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  useEffect(() => {
    fetchInitialImages();
  }, []);

  const fetchInitialImages = async () => {
    try {
      const imagePromises = categories.map(async (category) => {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${category.title}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
        );
        const data = await response.json();
        return {
          id: category.id,
          title: category.title,
          url: data.results[0].urls.regular
        };
      });
      
      const images = await Promise.all(imagePromises);
      setInitialImages(images);
    } catch (error) {
      console.error('Error fetching initial images:', error);
    }
  };

  const handleImageClick = async (title) => {
    setSelectedCategory(title);
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${title}&per_page=9&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const data = await response.json();
      setCategoryImages(data.results);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Photo Gallery</h1>
      
      {!selectedCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialImages.map((image,id) => (
            <div 
              key={id} 
              className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleImageClick(image.title)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="p-4 bg-white">
                <h3 className="text-xl font-semibold text-gray-800">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button 
            onClick={() => setSelectedCategory(null)}
            className="mb-6 px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black pointer-cursor transition-colors"
          >
            Back to Categories
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryImages.map((image) => (
              <div key={image.id} className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={image.urls.regular}
                  alt={image.alt_description}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                />
                
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
