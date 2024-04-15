import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home/Home";
import AddItem from "./components/AddItem";
import Navbar from "./components/Navbar";
import ItemImport from "./components/UploadCommodities";
import CommodityReport from "./components/CommodityReport";

function App() {
  return (
    <>
      <Navbar title="Import Export Tracker" />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/form" element={<AddItem />}></Route>
        <Route exact path="/aboutItemImport" element={<ItemImport />}></Route>
        <Route
          exact
          path="/reportCommodityImport"
          element={<CommodityReport />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
