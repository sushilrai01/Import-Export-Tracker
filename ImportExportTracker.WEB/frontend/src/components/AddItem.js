import { useState } from "react";
import axios from "axios";

function AddItem() {
  const [items, setItems] = useState([
    {
      id: 1,
      chapterCode: "",
      hsCode: "",
      categoryId: "",
      commodityName: "",
      quantity: "",
      importValue: "",
    },
  ]);

  const handleAddRow = () => {
    const newItem = {
      id: items.length + 1,
      chapterCode: "",
      hsCode: "",
      categoryId: "",
      commodityName: "",
      quantity: "",
      importValue: "",
    };
    setItems([...items, newItem]);
  };

  const handleInputChange = (ids, e) => {
    const { id, value } = e.target;
    const updatedItems = items.map((item) => {
      if (item.id === ids) {
        return { ...item, [id]: value };
      }
      return item;
    });
    setItems(updatedItems);
  };

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

  return (
    <>
      <div className="container">
        {items.map((item) => (
          <div key={item.id}>
            <input
              placeholder="Chapter Code"
              id="chapterCode"
              value={item.chapterCode}
              onChange={(e) => handleInputChange(item.id, e)}
              className="m-2"
            />

            <input
              placeholder="HsCode"
              id="hsCode"
              value={item.hsCode}
              onChange={(e) => handleInputChange(item.id, e)}
              className="m-2"
            />

            <input
              placeholder="Category Name"
              id="categoryId"
              value={item.categoryId}
              onChange={(e) => handleInputChange(item.id, e)}
              className="m-2"
            />

            <input
              placeholder="Commodity Name"
              id="commodityName"
              value={item.commodityName}
              onChange={(e) => handleInputChange(item.id, e)}
              className="m-2"
            />

            <input
              placeholder="Quantity"
              id="quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(item.id, e)}
              className="m-2"
            />

            <input
              placeholder="Import Amount"
              id="importValue"
              value={item.importValue}
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
