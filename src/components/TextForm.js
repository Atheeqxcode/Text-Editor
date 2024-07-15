import React, { useState } from "react";
import '../index.css'


async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    {
      headers: {
        Authorization: `Bearer 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`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
  }
  const result = await response.json();
  return result;
}

export default function TextForm(props) {
  const [text, setText] = useState("Enter Text Here");
  const [summarizedText, setSummarizedText] = useState("");
  const [readTime, setReadTime] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#add8e6"); // Default light blue
  const [wordCount, setWordCount] = useState(0);
  const [error, setError] = useState("");

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    calculateReadTime(newText);
    updateBackgroundColor(newText);
    updateWordCount(newText);
  };

  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    calculateReadTime(newText);
    updateBackgroundColor(newText);
    updateWordCount(newText);
  };

  const handleOnChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    calculateReadTime(newText);
    updateBackgroundColor(newText);
    updateWordCount(newText);
  };

  const calculateReadTime = (text) => {
    const averageReadingSpeed = 10;
    const wordCount = text.trim().split(/\s+/).filter((word) => word !== "").length;
    const estimatedTime = Math.ceil(wordCount / averageReadingSpeed);
    setReadTime(estimatedTime);
  };

  const updateBackgroundColor = (text) => {
    const color = text.length > 20 ? "#ffcccb" : "#add8e6";
    setBackgroundColor(color);
  };

  const updateWordCount = (text) => {
    const count = text.trim().split(/\s+/).filter((word) => word !== "").length;
    setWordCount(count);
    if (count < 200 || count > 2500) {
      setError("Text must be between 200 and 2500 words.");
    } else {
      setError("");
    }
  };

  const handleClear = () => {
    setText("Enter Text Here");
    setSummarizedText("");
    setReadTime(0);
    setWordCount(0);
    setBackgroundColor("#add8e6");
    setError("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleSummarize = async () => {
    if (wordCount < 200 ) {
      setError("Text must be minimum 200 words");
      return;
    }

   

    try {
      const response = await query({ inputs: text });
      console.log("Response from API:", response); // Log the response from the API
      if (response && response[0] && response[0].summary_text) {
        setSummarizedText(response[0].summary_text);
      } else {
        setSummarizedText("Error summarizing text.");
      }
    } catch (error) {
      console.error("Error summarizing text:", error);
      setSummarizedText("Error summarizing text.");
    }
  };

  return (
    <div style={{ backgroundColor, padding: "20px" }}>
      <h1>{props.heading}</h1>
      <div className="mb-3">
        <label htmlFor="myBox" className="form-label"></label>
        <textarea
          className="form-control"
          value={text}
          onChange={handleOnChange}
          id="myBox"
          rows="8"
        ></textarea>
      </div>
      <p style={{ color: wordCount < 300 ? 'black' : 'red' }}>
        {wordCount} / 250 (minimum 200 words)
      </p>
      <hr />
      <p>
        {text.trim().split(/\s+/).filter((word) => word !== "").length} words and {text.trim().length} characters
      </p>

      <button
  className="btn btn-info my-2 mx-2"
  onClick={handleSummarize}
  style={{ fontSize: '1.2rem', padding: '12px 24px', fontWeight: 'bold', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
>
  Summarize
</button>

      <button className="btn btn-primary mx-2" onClick={handleUpClick}>
        Convert to Upper-case
      </button>
      <button className="btn btn-primary mx-2" onClick={handleLoClick}>
        Convert to Lower-case
      </button>
      <button className="btn btn-danger mx-2" onClick={handleClear}>
        Clear
      </button>
      <button className="btn btn-success my-2 mx-2" onClick={handleCopy}>
        Copy
      </button>
     


      {error && (
        <p style={{ color: 'red' }}>
          {error}
        </p>
      )}

      
      {readTime > 0 && (
        <p>
          Estimated reading time: {readTime} minute{readTime !== 1 ? "s" : ""}
        </p>
      )}
      {summarizedText && (
        <div>
          <h2>Summarized Text</h2>
          <textarea
            className="form-control"
            value={summarizedText}
            readOnly
            rows="8"
          ></textarea>
        </div>
      )}
    </div>
  );
}
