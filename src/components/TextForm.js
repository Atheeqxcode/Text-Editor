import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("Enter Text Here");
  const [readTime, setReadTime] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#add8e6"); // Default light blue

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    calculateReadTime(newText);
    updateBackgroundColor(newText);
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    calculateReadTime(newText);
    updateBackgroundColor(newText);
  };

  // const something = () => {
  //   setText(text.trim());
  //   const wordCount = text.split(/\s+/).filter((word) => word !== "").length;
  //   console.log(wordCount);
  //   calculateReadTime(text);
  //   updateBackgroundColor(text);
  // };

  const handleOnChange = (event) => {
    setText(event.target.value);
    // Calculate read time on each text change
    calculateReadTime(event.target.value);
    updateBackgroundColor(event.target.value);
  };

  const calculateReadTime = (text) => {
    // Average reading speed in words per minute
    const averageReadingSpeed = 10;
    const wordCount = text.trim().split(/\s+/).filter((word) => word !== "").length;

    // Calculate estimated reading time in minutes
    const estimatedTime = Math.ceil(wordCount / averageReadingSpeed);

    setReadTime(estimatedTime);
  };

  const updateBackgroundColor = (text) => {
    // Calculate a color value based on text length, for example
    const color = text.length > 20 ? "#ffcccb" : "#add8e6"; // If text length is greater than 20, use light coral, else use light blue
    setBackgroundColor(color);
  };

  const handleClear = () => {
    setText("Enter Text Here");
    setReadTime(0);
    setBackgroundColor("#add8e6"); // Reset background color to default
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    // You can also provide some feedback to the user that the text has been copied
  };

  return (
    <div style={{ backgroundColor, padding: "20px" }}>
      <h1>{props.heading}</h1>
      <div className="mb-3">
        <label htmlFor="myBox" className="form-label">
          
        </label>
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="myBox"
          rows="8"
        ></textarea>
      </div>
      <button className="btn btn-primary mx-2" onClick={handleUpClick}>
        Convert to Upper-case
      </button>
      <button className="btn btn-primary mx-2"onClick={handleLoClick}>
        Convert to Lower-case
      </button>
      <button className="btn btn-danger mx-2" onClick={handleClear}>
        Clear
      </button>
      
      <button className="btn btn-success my-2 mx-2" onClick={handleCopy}>
        Copy
      </button>

      <p>
        {text.trim().split(/\s+/).filter((word) => word !== "").length} words
        and {text.trim().length} characters
      </p>
      {readTime > 0 && (
        <p>
          Estimated reading time: {readTime} minute{readTime !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
