import React, { useState, useEffect } from 'react';

function PopularDreams() {
  const [mostLikedDream, setMostLikedDream] = useState(null);
  const url = `http://localhost:8080/api/v1/dreams/most-liked`;
  
  useEffect(() => {
  
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const json = await response.json();
          setMostLikedDream(json)
        } catch (error) {
          console.log("error", error);
        }
      };
  
      fetchData();

  }, []);

  return (
    <div>
      {mostLikedDream && (
        <div>
          <h3>Most Liked Dream:</h3>
          <p>{mostLikedDream.dreamTitle}</p>
          <p>{mostLikedDream.dreamDescription}</p>
          <p>Likes: {mostLikedDream.likes}</p>
        </div>
      )}
    </div>
  );
}

export default PopularDreams;