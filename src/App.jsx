import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Details from './Details';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Home/>} /> 
        <Route path="/details/:titleid" element={<Details /> /* should be element not component */} />    /
      </Routes>
    </Router>
  );
};

export default App;
