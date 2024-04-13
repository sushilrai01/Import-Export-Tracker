import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import apiUrl from "../common/app-url";
import AppPagination from "./pagination";

const CommodityReport = () => {
  //CSS styling
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
  //CSS Styling </end>___

  const [pagination, setPagination] = useState({
    currentPageNumber: 1,
    totalPageNumber: 1,
    totalRecords: 1,
    pageSize: 10,
    startSerialNo: 1,
  });

  const [ddlFiscalYear, setddlFiscalYear] = useState([]);

  const [ddlFiscalYearId, setDdlFiscalYearId] = useState();
  const [ddlReportTypeId, setReportTypeId] = useState(2);

  //FilterModel for report
  const [filterReportModel, setFilterReportModel] = useState({
    fiscalYearId: 3,
    reportTypeId: 2,
    page: pagination,
  });

  //variable to hold API response
  const [commodities, setCommodities] = useState();

  // Call API to get fiscal years on Component Mount
  useEffect(() => {
    const tempSelectObj = [{ text: "--Select--", value: "" }];

    axios
      .get(apiUrl.apiSelectUrl.getFiscalYear)
      .then((response) => {
        console.log("-Fiscal_Years-");
        console.log(response.data);

        const fiscalYears = response.data;
        setddlFiscalYear([...tempSelectObj, ...fiscalYears]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  //____SET FiscalYearId/ ReportTypeId ON CHANGE_____
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "fiscalYearId") {
      setDdlFiscalYearId(e.target.value);
      setFilterReportModel({
        fiscalYearId: e.target.value,
        reportTypeId: ddlReportTypeId,
        page: { ...pagination, currentPageNumber: 1 },
      });
    } else if (name == "reportTypeId") {
      setReportTypeId(e.target.value);
      setFilterReportModel({
        fiscalYearId: ddlFiscalYearId,
        reportTypeId: e.target.value,
        page: { ...pagination, currentPageNumber: 1 },
      });
    }
  };

  //On page change call API depending on latest change to page number/size
  const handlePageChange = (event, page) => {
    setPagination((prevPagination) => {
      const updatedPage = { ...prevPagination, currentPageNumber: page };
      console.log("test:\n", updatedPage);
      return updatedPage;
    });

    setFilterReportModel((prevFilterModel) => {
      const updatedReport = {
        ...prevFilterModel,
        fiscalYearId: ddlFiscalYearId,
        reportTypeId: ddlReportTypeId,
        page: { ...prevFilterModel.page, currentPageNumber: page },
      };
      return updatedReport;
    });
  };

  useEffect(() => {
    searchReport();
  }, [
    filterReportModel.page,
    // filterReportModel.page.currentPageNumber,
    // filterReportModel.page.pageSize,
  ]);

  //Search Report Function to call API
  const searchReport = useCallback(() => {
    console.log("Request PageModel:\n", filterReportModel);

    axios
      .post(apiUrl.apiCommodityUrl.commodityImportReport, filterReportModel)
      .then((response) => {
        console.log("Response PageModel:\n", response.data.data);

        setCommodities(response.data.data.list);
        setPagination(response.data.data.page);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [filterReportModel]);

  return (
    <>
      <div className="container mt-2">
        <div
          className="accordion accordion-flush card"
          id="accordionFlushExample"
        >
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
                      name="reportTypeId"
                      onChange={(e) => handleInputChange(e)}
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

        <div className="card card-large border-0 mb-5">
          <div className="responsive-holder fill-card-width">
            {
              // Category-Wise
              ddlReportTypeId == 2 && (
                <table className="table table-responsive table-striped">
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
                          <td>{pagination.startSerialNo + i}</td>
                          <td>{item.categoryTitle}</td>
                          <td>{item.fiscalYearTitle}</td>
                          <td>{item.totalQuantity}</td>
                          <td>{item.totalImportValue}</td>
                          <td>{item.totalImportRevenue}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )
            }
            {
              // Commodity-Wise
              ddlReportTypeId == 1 && (
                <table className="table table-responsive table-striped">
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
                          <td>{pagination.startSerialNo + i}</td>
                          <td>{item.categoryTitle}</td>
                          <td>{item.commodityName}</td>
                          <td>{item.hsCode}</td>
                          <td>{item.fiscalYearTitle}</td>
                          <td>{item.totalQuantity}</td>
                          <td>{item.totalImportValue}</td>
                          <td>{item.totalImportRevenue}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )
            }
          </div>

          <AppPagination
            totalPage={pagination.totalPageNumber}
            page={pagination.currentPageNumber}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default CommodityReport;
