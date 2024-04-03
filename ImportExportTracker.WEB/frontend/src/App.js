// import { useState } from "react";
import Home from "./components/Home";
import Form1 from "./components/Form1";
import Navbar from "./components/Navbar";
import ItemImport from "./components/ItemImport";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar title="Import Export Tracker" />

      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/form" element={<Form1 />}></Route>
          <Route exact path="/aboutItemImport" element={<ItemImport />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
