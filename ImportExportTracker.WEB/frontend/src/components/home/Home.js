import React, { useState } from "react";
import TopImportsTable from "./TopImportsTable";

export default function Home() {
  return (
    <>
      <div className="container">
        <div className="text-justify">
          <p className="col-md-6 ">
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolorum veritatis illum quae
            temporibus, asperiores minus, voluptas maiores, earum blanditiis
            deserunt dignissimos mollitia iusto! Quasi corrupti perferendis,
            modi voluptas voluptatem dicta?
          </p>
        </div>
        <TopImportsTable />
      </div>
    </>
  );
}
