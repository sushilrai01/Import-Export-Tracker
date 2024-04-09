import React, { useState, useEffect } from "react";
import axios from "axios";

const CommodityReport = () => {
  const dropDownStyle = {
    width: "125px",
    height: "30px",
    margin: "5px",
  };

  const accordionStyle = {
    background: "#198754",
  };
  const accordionContentStyle = {
    background: "rgb(187 187 187)",
  };

  const reportCommodities = [
    {
      CommodityId: 11,
      CommodityName: "Ram",
      HsCode: "0123232",
      CategoryId: 123,
      CategoryTitle: "alivedd",
      FiscalYearTitle: "2080/81",
      TotalQuantity: 1200,
      TotalImportValue: 5585,
      TotalImportRevenue: 5858,
    },
    {
      CommodityId: 11,
      CommodityName: "Ram",
      HsCode: "0123232",
      CategoryId: 123,
      CategoryTitle: "alivedd",
      FiscalYearTitle: "2080/81",
      TotalQuantity: 1200,
      TotalImportValue: 5585,
      TotalImportRevenue: 5858,
    },
    {
      CommodityId: 11,
      CommodityName: "Ram",
      HsCode: "0123232",
      CategoryId: 123,
      CategoryTitle: "alivedd",
      FiscalYearTitle: "2080/81",
      TotalQuantity: 1200,
      TotalImportValue: 5585,
      TotalImportRevenue: 5858,
    },
    {
      CommodityId: 11,
      CommodityName: "Ram",
      HsCode: "0123232",
      CategoryId: 123,
      CategoryTitle: "alivedd",
      FiscalYearTitle: "2080/81",
      TotalQuantity: 1200,
      TotalImportValue: 5585,
      TotalImportRevenue: 5858,
    },
  ];
  const [commodities, setCommodities] = useState(reportCommodities);

  const [ddlFilter, setDdlFilter] = useState();

  //______API CALLING______
  const apiUrl = "https://localhost:7135/";

  const [ddlFiscalYear, setddlFiscalYear] = useState([]);

  useEffect(() => {
    const tempSelectObj = [{ text: "--Select--", value: "" }];

    axios
      .get(apiUrl + "api/select/getFiscalYear")
      .then((response) => {
        console.log("response__data");
        console.log(response.data);

        const fiscalYears = response.data;
        setddlFiscalYear([...tempSelectObj, ...fiscalYears]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  //____TO DO_____
  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    //___handle here______-_-_-_-_-_-
  };

  return (
    <>
      <div className="container">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="false"
                aria-controls="flush-collapseOne"
                style={accordionStyle}
              >
                FILTER
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body" style={accordionContentStyle}>
                <div className="row">
                  <div className="col-md-2">
                    <select
                      name="fiscalYearId"
                      onChange={(e) => handleInputChange(e)} //____TO DO_____
                      style={dropDownStyle}
                    >
                      {ddlFiscalYear.map((fy) => (
                        <option key={fy.value} value={fy.value}>
                          {fy.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <select
                      onChange={(e) => setDdlFilter(e.target.value)}
                      style={dropDownStyle}
                    >
                      <option value="">--Select--</option>
                      <option value="1">Category Wise</option>
                      <option value="2">Commodity Wise</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-success">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr></hr>

        <div>
          {ddlFilter == 1 && (
            <table className="table table-responsive table-bordered">
              <tr>
                <th>SN</th>
                <th>Category</th>
                <th>Fiscal Year</th>
                <th>Total Quantity</th>
                <th>Total Import Value</th>
                <th>Total Import Revenue</th>
              </tr>
              {commodities.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.CategoryTitle}</td>
                  <td>{item.FiscalYearTitle}</td>
                  <td>{item.TotalQuantity}</td>
                  <td>{item.TotalImportValue}</td>
                  <td>{item.TotalImportRevenue}</td>
                </tr>
              ))}
            </table>
          )}

          {ddlFilter == 2 && (
            <table className="table table-responsive table-bordered">
              <tr>
                <th>SN</th>
                <th>Category</th>
                <th>Commodity Name</th>
                <th>HSCODE</th>
                <th>Fiscal Year</th>
                <th>Total Quantity</th>
                <th>Total Import Value</th>
                <th>Total Import Revenue</th>
              </tr>
              {commodities.map((item, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.CategoryTitle}</td>
                  <td>{item.CommodityName}</td>
                  <td>{item.HsCode}</td>
                  <td>{item.FiscalYearTitle}</td>
                  <td>{item.TotalQuantity}</td>
                  <td>{item.TotalImportValue}</td>
                  <td>{item.TotalImportRevenue}</td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default CommodityReport;
