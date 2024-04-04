import { useEffect, useState } from "react";
import axios from "axios";

function AddItem() {
  const ddlMonth = [
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
    "margin-right": "5px",
  };

  const [items, setItems] = useState([
    {
      id: 1,
      chapterCode: "",
      hsCode: "",
      categoryId: "",
      commodityName: "",
      unit: "",
      quantity: "",
      importValue: "",
      importRevenue: "",
      fiscalYearId: "",
      monthId: "",
    },
  ]);

  const handleAddRow = () => {
    const newItem = {
      id: items.length + 1,
      chapterCode: "",
      hsCode: "",
      categoryId: "",
      commodityName: "",
      unit: "",
      quantity: "",
      importValue: "",
      importRevenue: "",
      fiscalYearId: "",
      monthId: "",
    };
    setItems([...items, newItem]);
  };

  const handleInputChange = (id, e) => {
    const { name, value } = e.target;
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setItems(updatedItems);
  };

  //______________API CALLING_________9____
  const apiUrl = "https://localhost:7135/";

  const saveItem = async () => {
    try {
      const response = await axios.post(
        apiUrl + "api/commodity/addItem",
        items
      );
      console.log("Post created:", response.data);
      // Handle successful POST request here
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error here
    }
  };

  const [ddlFiscalYear, setddlFiscalYear] = useState([]);

  useEffect(() => {
    axios
      .get(apiUrl + "api/commodity/fiscalYearList")
      .then((response) => {
        console.log("response__data");
        console.log(response);
        console.log(response.data.msg);
        console.log(response.data.data.list);

        setddlFiscalYear(response.data.data.list);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <div className="container">
        {items.map((item) => (
          <div key={item.id}>
            <select
              name="fiscalYearId"
              onChange={(e) => handleInputChange(item.id, e)}
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
              onChange={(e) => handleInputChange(item.id, e)}
              style={dropDownStyle}
            >
              {ddlMonth.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.text}
                </option>
              ))}
            </select>

            <input
              placeholder="Chapter Code"
              name="chapterCode"
              value={item.chapterCode}
              onChange={(e) => handleInputChange(item.id, e)}
              className="m-2"
            />

            <input
              placeholder="HsCode"
              name="hsCode"
              value={item.hsCode}
              onChange={(e) => handleInputChange(item.id, e)}
              className="m-2"
            />

            <input
              placeholder="Category Name"
              name="categoryId"
              value={item.categoryId}
              onChange={(e) => handleInputChange(item.id, e)}
              className="m-2"
            />

            <input
              placeholder="Commodity Name"
              name="commodityName"
              value={item.commodityName}
              onChange={(e) => handleInputChange(item.id, e)}
              className="m-2"
            />

            <input
              placeholder="Quantity"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(item.id, e)}
              className="m-2"
            />

            <select
              name="unit"
              onChange={(e) => handleInputChange(item.id, e)}
              style={dropDownStyle}
            >
              <option value="PCS">PCS</option>
              <option value="KG">KG</option>
              <option value="Ltr">Ltr</option>
            </select>

            <input
              placeholder="Import Value"
              name="importValue"
              value={item.importValue}
              onChange={(e) => handleInputChange(item.id, e)}
              className="m-2"
            />

            <input
              placeholder="Import Revenue"
              name="importRevenue"
              value={item.importRevenue}
              onChange={(e) => handleInputChange(item.id, e)}
              className="m-2"
            />
          </div>
        ))}
        <button onClick={handleAddRow} className="m-2">
          Add Row
        </button>
        <button onClick={saveItem} className="m-2">
          Save Item(s)
        </button>
      </div>
    </>
  );
}

export default AddItem;
