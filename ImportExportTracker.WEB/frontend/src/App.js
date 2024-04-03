// import { useState } from "react";
import Form1 from "./components/Form1";
import Navbar from "./components/Navbar";

function App() {
  // const [arr1] = useState([  ]);

  return (
    <>
      <Navbar></Navbar>
      <div className="text-justify">
        <p className="col-md-6 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
          veritatis illum quae temporibus, asperiores minus, voluptas maiores,
          earum blanditiis deserunt dignissimos mollitia iusto! Quasi corrupti
          perferendis, modi voluptas voluptatem dicta?
        </p>
      </div>

      <Form1></Form1>
    </>
  );
}

export default App;
