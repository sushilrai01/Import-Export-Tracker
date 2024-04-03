import { useState } from "react";

function Form1() {
  const [name, setName] = useState("sushil rai");
  const itemNo = 3;

  const ul = document.createElement("ul");
  for (let i = 0; i < itemNo; i++) {
    let li = document.createElement("li");
    li.textContent = "item " + i;
    ul.appendChild(li);
  }
  const onNameEnter = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="form">
          <div>
            <label>Enter Your Name:</label>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={onNameEnter}
            ></input>

            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form1;
