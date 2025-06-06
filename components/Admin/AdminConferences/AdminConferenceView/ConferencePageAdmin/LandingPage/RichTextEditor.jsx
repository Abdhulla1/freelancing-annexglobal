"use client";
import React, { useEffect, useState } from "react";
import { Editor } from "primereact/editor";

const RichTextEditor = ({
  labelName,
  height = "207px",
  initialValue = "",
  maxLength = 5000,
  onChange,
}) => {
  const [text, setText] = useState(initialValue);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setText(initialValue);
    setCharCount(stripHtml(initialValue).length);
  }, [initialValue]);

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handleTextChange = (e) => {
    const plainText = stripHtml(e.htmlValue);
    if (plainText.length <= maxLength) {
      setText(e.htmlValue);
      setCharCount(plainText.length);
      onChange?.(e.htmlValue);
    }
  };
  
  // This handler will limit further input once maxLength is reached
  const handleKeyDown = (e) => {
    const plainText = stripHtml(text);
    if (plainText.length >= maxLength && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault(); 
    }
  };

  const header = (
    <>
      <span className="ql-formats">
        <select className="ql-header" defaultValue="">
          <option value="1">Heading</option>
          <option value="2">Subheading</option>
          <option value="">Normal</option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
      </span>
      <span className="ql-formats">
        <button className="ql-link" />
      </span>
        <span className="ql-formats">
      <select className="ql-align" defaultValue="">
        <option value="" />
        <option value="center" />
        <option value="right" />
        <option value="justify" />
      </select>
    </span>
    </>
  );

  return (
    <div>
      <label className="form-label">{labelName}</label>
      <Editor
        value={text}
        onTextChange={handleTextChange}
        style={{ height: 'auto' }}
        // headerTemplate={header}
        onKeyDown={handleKeyDown} // Attach keydown handler to block input
      />
      <div style={{ textAlign: "right", fontSize: "12px", marginTop: "4px", color: charCount >= maxLength ? "red" : "#666" }}>
        {charCount}/{maxLength}
      </div>
    </div>
  );
};

export default RichTextEditor;
