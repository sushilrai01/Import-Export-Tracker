import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ItemImport() {
  const [xlImport, setXlImport] = useState({
    fiscalYearId: "",
    monthId: "",
    commodityExcel: null,
  });

  //___Use to navigate to another component after certain events or actions
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "commodityExcel") {
      setXlImport({ ...xlImport, [name]: files[0] });
    } else {
      setXlImport({ ...xlImport, [name]: value });
    }
  };

  const ddlMonth = [
    { text: "-select-", value: "" },
    { text: "Baishakh", value: 1 },
    { text: "Jeth", value: 2 },
    { text: "Asar", value: 3 },
    { text: "Shrawan", value: 4 },
    { text: "Bhadra", value: 5 },
    { text: "Ashoj", value: 6 },
    { text: "Kartik", value: 7 },
    { text: "Mangsir", value: 8 },
    { text: "Poush", value: 9 },
    { text: "Magh", value: 10 },
    { text: "Falgun", value: 11 },
    { text: "Chaitra", value: 12 },
  ];
  const dropDownStyle = {
    width: "125px",
    height: "30px",
    margin: "5px",
  };

  //______API CALLING______
  const apiUrl = "https://localhost:7135/";

  const [ddlFiscalYear, setddlFiscalYear] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl + "api/commodity/fiscalYearList")
      .then((response) => {
        console.log("response__data");
        console.log(response.data);

        setddlFiscalYear(response.data.data.list);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const apiSaveItem = async () => {
    try {
      const formData = new FormData();
      formData.append("fiscalYearId", xlImport.fiscalYearId);
      formData.append("monthId", xlImport.monthId);
      formData.append("file", xlImport.commodityExcel);

      const response = await axios.post(
        apiUrl + "api/commodity/saveExcelData",
        formData
      );

      if (!response.data.data) {
        navigate("/"); //Navigate to HOME
      }
      console.log("Post created:", response.data);
      // Handle successful POST request here
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error here
    }
  };

  return (
    <>
      <div className="container mt-4">
        <select
          name="fiscalYearId"
          onChange={(e) => handleInputChange(e)}
          style={dropDownStyle}
        >
          {ddlFiscalYear.map((fy) => (
            <option key={fy.value} value={fy.value}>
              {fy.text}
            </option>
          ))}
        </select>
        <select
          name="monthId"
          onChange={(e) => handleInputChange(e)}
          style={dropDownStyle}
        >
          {ddlMonth.map((month) => (
            <option key={month.value} value={month.value}>
              {month.text}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="commodityExcel"
          onChange={(e) => handleInputChange(e)}
          accept=".xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ></input>
        <button
          type="Submit"
          className="btn btn-primary m-2"
          onClick={apiSaveItem}
        >
          Submit
        </button>
      </div>
    </>
  );
}
export default ItemImport;
