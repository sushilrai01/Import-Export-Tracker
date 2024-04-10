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

  const [commodities, setCommodities] = useState();
  const [ddlFiscalYearId, setDdlFiscalYearId] = useState();
  const [ddlFilterId, setDdlFilterId] = useState();

  //______API CALLING______
  const apiUrl = "https://localhost:7135/";

  const [ddlFiscalYear, setddlFiscalYear] = useState([]);

  const filterParam = {
    fiscalYearId: "",
    reportTypeId: "",
  };

  const [filterReportModel, setFilterReportModel] = useState({});

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
    setDdlFiscalYearId(e.target.value);
  };

  const getFilteredReport = (e) => {
    setDdlFilterId(e.target.value);
    setFilterReportModel({
      fiscalYearId: ddlFiscalYearId,
      reportTypeId: e.target.value,
    });
  };

  function searchReport() {
    console.log(filterReportModel.fiscalYearId, filterReportModel.reportTypeId);
    axios
      .post(apiUrl + "api/commodity/reportCommodityImport", filterReportModel)
      .then((response) => {
        console.log("response__data_report");
        console.log(response.data);
        debugger;
        setCommodities(response.data.data.list);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <>
      <div className="container">
        <div className="accordion accordion-flush" id="accordionFlushExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="flush-headingOne">
              <button
                className="accordion-button collapsed"
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
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body" style={accordionContentStyle}>
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
                      onChange={(e) => getFilteredReport(e)}
                      style={dropDownStyle}
                    >
                      <option value="">--Select--</option>
                      <option value="1">Commodity Wise</option>
                      <option value="2">Category Wise</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-success" onClick={searchReport}>
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr></hr>

        <div>
          {filterReportModel.reportTypeId == 2 && (
            <table className="table table-responsive table-bordered">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Category</th>
                  <th>Fiscal Year</th>
                  <th>Total Quantity</th>
                  <th>Total Import Value</th>
                  <th>Total Import Revenue</th>
                </tr>
              </thead>
              <tbody>
                {commodities != null &&
                  commodities.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.categoryTitle}</td>
                      <td>{item.fiscalYearTitle}</td>
                      <td>{item.totalQuantity}</td>
                      <td>{item.totalImportValue}</td>
                      <td>{item.totalImportRevenue}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {filterReportModel.reportTypeId == 1 && (
            <table className="table table-responsive table-bordered">
              <thead>
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
              </thead>
              <tbody>
                {commodities != null &&
                  commodities.map((item, i) => (
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
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default CommodityReport;
