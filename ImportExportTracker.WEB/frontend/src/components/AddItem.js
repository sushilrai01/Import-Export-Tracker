import { useState } from "react";
import axios from "axios";

function AddItem() {
  const [items, setItems] = useState([
    {
      id: 1,
      chapterCode: "",
      hsCode: "",
      categoryName: "",
      commodityName: "",
      quantity: "",
      importAmount: "",
    },
  ]);

  const handleAddRow = () => {
    const newItem = {
      id: items.length + 1,
      chapterCode: "",
      hsCode: "",
      categoryName: "",
      commodityName: "",
      quantity: "",
      importAmount: "",
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

  const apiUrl = "https://localhost:7135/";

  const addItem = async () => {
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

  return (
    <>
      <div className="container">
        {items.map((item) => (
          <div key={item.id}>
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
              name="categoryName"
              value={item.categoryName}
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

            <input
              placeholder="Import Amount"
              name="importAmount"
              value={item.importAmount}
              onChange={(e) => handleInputChange(item.id, e)}
              className="m-2"
            />
          </div>
        ))}
        <button onClick={handleAddRow} className="m-2">
          Add Row
        </button>
      </div>
    </>
  );
}

export default AddItem;
