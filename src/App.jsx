import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Details from './Details';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Home/>} /> 
        <Route path="/details/:title" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
