import React from 'react';
import './App.css';
import Header from "./Header/Header";
import SelectBox from './SelectBox/SelectBox';
import RecipesSection from './RecipesSection/RecipesSection';
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import 'bootstrap/dist/css/bootstrap.min.css';
import CustomHR from './CustomHR/CustomHR';

function App() {
  return (
    <div className="App">
      <Header />
      <CustomHR />


      <RecipesSection />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
