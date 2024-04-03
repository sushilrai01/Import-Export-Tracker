// import { useState } from "react";
import Home from "./components/Home";
import AddItem from "./components/AddItem";
import Navbar from "./components/Navbar";
import ItemImport from "./components/ItemImport";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar title="Import Export Tracker" />
        <Routes>
          <Route exact path="/form" element={<Home />}></Route>
          <Route exact path="/" element={<AddItem />}></Route>
          <Route exact path="/aboutItemImport" element={<ItemImport />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
