// import { useState } from "react";
import Home from "./components/Home";
import AddItem from "./components/AddItem";
import Navbar from "./components/Navbar";
import ItemImport from "./components/ItemImport";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar title="Import Export Tracker" />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/form" element={<AddItem />}></Route>
        <Route exact path="/aboutItemImport" element={<ItemImport />}></Route>
      </Routes>
    </>
  );
}

export default App;
