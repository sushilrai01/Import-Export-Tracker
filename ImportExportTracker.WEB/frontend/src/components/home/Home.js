import React, { useEffect, useState } from "react";
import TopImportsTable from "./TopImportsTable";
import { LineGraph } from "./LineGraph";
import apiUrl from "../../common/app-url";
import axios from "axios";

export default function Home() {
  //variables to hold TOP 5 commodities import
  const [topCommodityImport, setTopCommodityImport] = useState();
  const [topCategoryImport, setTopCategoryImport] = useState();

  //Calling API to fetch data of TOP Commodities
  useEffect(() => {
    axios
      .get(apiUrl.apiHomeUrl.getTopCategoryImport)
      .then((response) => {
        setTopCategoryImport(response.data.data.categoryReportList);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
    console.log(topCommodityImport);
  }, []);

  useEffect(() => {
    axios
      .get(apiUrl.apiHomeUrl.getTopCommodityImport)
      .then((response) => {
        setTopCommodityImport(response.data.data.commodityReportList);
      })
      .catch((error) => {
        console.error("error: ", error);
      });
  }, []);

  return (
    <>
      <div className="container">
        <div className="text-justify">
          <p className="col-md-12 ">
            Lorem Lorem Lorem Lorem Lorem Lorem Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Dolorum veritatis illum quae
            temporibus, asperiores minus, voluptas maiores, earum blanditiis
            deserunt dignissimos mollitia iusto! Quasi corrupti perferendis,
            modi voluptas voluptatem dicta?
          </p>
        </div>

        <LineGraph />

        <TopImportsTable
          categories={topCategoryImport}
          commodities={topCommodityImport}
        />
      </div>
    </>
  );
}
