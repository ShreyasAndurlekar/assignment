import { useState } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {

        console.log("This happening first bruh, ",email,password)
      
      const response = await axios.post('http://localhost:5000/signup', {
        email,
        password,
        username
      });

      console.log(response.data); 
      alert("Registration successful!");
      navigate('/login');

    } catch (error) {
      console.error(error); 
      alert("Registration failed.");
    }
  };

  return (
    <div>
      <Navbar />
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
            <img className="w-8 h-8 mr-2" src="https://animemangatoon.com/wp-content/uploads/2024/05/animemanga250-copy-3.png" alt="logo" />
            AnimeMangaToon
          </a>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                  <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    placeholder="name@company.com" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Set a username</label>
                  <input 
                    type="username" 
                    name="username" 
                    id="username" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    placeholder="Johny_dave" 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="••••••••" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm password</label>
                  <input 
                    type="password" 
                    name="confirm-password" 
                    id="confirm-password" 
                    placeholder="••••••••" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
                </div>
               
                <button 
                  type="submit" 
                  className="w-full text-black bg-gray-200 hover:bg-gray-300  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline">Login here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
