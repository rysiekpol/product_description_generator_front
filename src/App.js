import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authorization from "./pages/Authorization";
import Products from "./pages/Products";
import Search from "./pages/Search";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Share from "./pages/Share";
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Root />}>
          <Route index element={<main><Home /></main>} />
          <Route path="signin" element={<main><Authorization /></main>} />
          <Route path="products" element={<main><Products /></main>} />
          <Route path="search" element={<main><Search /></main>} />
          <Route path="shares" element={<main><Share /></main>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
