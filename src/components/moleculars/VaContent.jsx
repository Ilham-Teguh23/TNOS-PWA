import React, { useEffect, useState } from "react";
import { showMessage } from "../utils/Message";

function VaContent({ value, title, copy }) {
  const [copyText, setCopyText] = useState("Copy");
  const [disbled, setDisabled] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCopyText("Copy");
      setDisabled(false);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [disbled]);
  const handleCopy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyText("Copied");
      setDisabled(true);
      showMessage(`Copied + ${value}`);
    } catch (err) {
      showMessage("Failed to copy!", "error");
    }
  };
  return (
    <div className="container-va-content-f">
      <div className="title">{title}</div>
      <div className="content-fa-f">
        <div className="code">{value}</div>
        {copy && (
          <div
            className={`copy ${disbled ? "disbled-f" : ""}`}
            onClick={() => handleCopy(value)}
          >
            {copyText}
          </div>
        )}
      </div>
    </div>
  );
}

export default VaContent;
