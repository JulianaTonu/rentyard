import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import PropertyForm from './pages/PropertyForm';
import PropertyDetail from './pages/PropertyDetail'; // for dynamic property route

const App = () => {
  return (
    <Router>
      <div className="">
        <Header />
        <Routes>
          <Route path="/" element={<PropertyForm />} />
          <Route path="/add-property/:type" element={<PropertyDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
