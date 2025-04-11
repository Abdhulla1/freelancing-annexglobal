"use client";
import React, { useEffect, useState } from "react";
import { Editor } from "primereact/editor";

const RichTextEditor = ({ labelName, height = "207px", initialValue = "", onChange }) => {
  const [text, setText] = useState(initialValue);

  useEffect(() => {
    setText(initialValue);
  }, [initialValue]);

  const handleTextChange = (e) => {
    const value = e.htmlValue;
    setText(value);
    if (onChange) {
      onChange(value);
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
    </>
  );

  return (
    <div>
      <label className="form-label">{labelName}</label>
      <Editor
        value={text}
        onTextChange={handleTextChange}
        style={{ height }}
        headerTemplate={header}
      />
    </div>
  );
};

export default RichTextEditor;
