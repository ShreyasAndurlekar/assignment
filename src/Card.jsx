import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import  { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({ image, title, description, creator, genre, titleId }) => {
  const titleSlug = title.toLowerCase().replace(/ /g, '-');
  const [isFavourite, setIsFavourite] = useState(false);

  const getUsernameFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.username;
    }
    return null;
  };

  const username = getUsernameFromToken();

  const addFavourite = async () => {
    if (!username) {
      toast.error('You need to log in first.');
      return;
    }

    try {
      console.log(username, titleId);
      const response = await axios.post('http://localhost:5000/add-favourite', {
        username,
        titleId,
      });
      console.log(response.data.message);
      setIsFavourite(true);
      toast.success('Added to favourites!');
    } catch (error) {
      console.error(error);
      toast.error('Already favourited');
    }
  };

  return (
    <div className="bg-gray-100 w-full sm:w-80 md:w-96 lg:w-[400px] xl:w-[800px] mb-32">
      <div className="flex justify-between items-center p-4">
        <Link to={`/details/${titleSlug}`}>
          <h2 className="text-3xl font-semibold mb-4 text-blue-500 cursor-pointer">
            {title}
          </h2>
        </Link>
        <button onClick={addFavourite} className="p-1 rounded-full hover:bg-red-500 transition duration-300">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3141/3141738.png"
            alt="Add to Favourites"
            className="w-8 h-8"
          />
        </button>
      </div>
      <img src={image} alt={title} className="w-full h-100 object-cover" />
      <div className="p-4">
        <p className="text-gray-700">{description}</p>
      </div>
      <div className="flex justify-between mt-5 mr-4 ml-4">
        <p className="font-bold">Creator: {creator}</p>
        <p className="font-bold">Genre: {genre}</p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Card;
