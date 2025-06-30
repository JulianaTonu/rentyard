import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import PropertyForm from './pages/PropertyForm';
import PropertyDetail from './pages/PropertyDetail'; // for dynamic property route
import ExpendableProfileInfo from './components/ExpendableProfileInfo';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <div className="">
        <Header />
        <Routes>
          <Route path="/" element={<PropertyForm />} />
          <Route path="/add-property/:type" element={<PropertyDetail />} />
          <Route path="/profile" element={<ExpendableProfileInfo />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </Router>
  );
};

export default App;
