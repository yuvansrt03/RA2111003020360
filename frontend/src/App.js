import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AllPage from "./AllPage";
import IndividualProduct from "./IndividualProduct";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllPage />}></Route>
        <Route path="/:id" element={<IndividualProduct />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
