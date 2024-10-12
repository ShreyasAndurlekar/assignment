import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import   { jwtDecode } from 'jwt-decode'; // Fixed import statement for jwt-decode

const Favourites = () => {
  const [favouritesData, setFavouritesData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return; 
    }

    let username = '';
    try {
      const decoded = jwtDecode(token);
      username = decoded.username;
      console.log(username);
    } catch (err) {
      console.error('Failed to decode token:', err);
      return;
    }

    const fetchFavourites = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}get-favourites?username=${username}`);
        setFavouritesData(response.data.favourites);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/login'; 
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-full max-w-[1200px] p-10 bg-white mt-20">
          <p className="text-4xl font-bold text-left mb-8">Favourites</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favouritesData.map((favourite) => (
              <div key={favourite.titleId} className="bg-gray-200 p-4 rounded-lg">
                <img
                  src={favourite.imageUrl} 
                  alt={favourite.title}
                  className="w-full h-80 object-cover rounded-t-lg mb-2"
                />
                <p className="text-center font-semibold">{favourite.title}</p>
              </div>
            ))}
          </div>

          
          <div className="flex justify-end mt-6">
            <button 
              onClick={handleLogout} 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
