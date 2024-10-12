import { Link } from 'react-router-dom';
import './index.css';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="flex justify-between items-center h-16">
        <div>
          <Link to="/">
            <img 
              src="https://animemangatoon.com/wp-content/uploads/2024/05/animemanga250-copy-3.png" 
              alt="Left Logo" 
              className="h-30 w-auto"
            />
          </Link>
        </div>
        
        <div className="mr-4">
          <Link to="/profile">
            <img 
              src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" 
              alt="Right Logo" 
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
