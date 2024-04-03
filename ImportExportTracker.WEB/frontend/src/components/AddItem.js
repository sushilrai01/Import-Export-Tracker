import { useState } from "react";
import axios from "axios";

function AddItem() {
  const [values, setValues] = useState({
    chapterCode: "",
    hsCode: "",
    categoryName: "",
    commodityName: "",
    quantity: 0,
    importAmount: 0,
  });

  const getHandler = (name) => {
    return (event) => {
      setValues({ ...values, [name]: event.target.value });
    };
  };

  const apiUrl = "https://localhost:7135/";
  const addItem = async () => {
    try {
      const response = await axios.post(
        apiUrl + "api/commodity/addItem",
        values
      );
      console.log("Post created:", response.data);
      // Handle successful POST request here
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error here
    }
  };

  return (
    <>
      <div className="container">
        <div>
          <label>Chapter Code:</label>
          <input
            value={values.chapterCode}
            onChange={getHandler("chapterCode")}
          />

          <label>HsCode:</label>
          <input value={values.hsCode} onChange={getHandler("hsCode")} />

          <label>Category Name:</label>
          <input
            value={values.categoryName}
            onChange={getHandler("categoryName")}
          />

          <label>Commodity Name:</label>
          <input
            value={values.commodityName}
            onChange={getHandler("commodityName")}
          />

          <label>Quantity:</label>
          <input value={values.quantity} onChange={getHandler("quantity")} />

          <label>Import Amount:</label>
          <input
            value={values.importAmount}
            onChange={getHandler("importAmount")}
          />
        </div>
        <button onClick={addItem}>Add Item</button>
      </div>
    </>
  );
}

export default AddItem;
