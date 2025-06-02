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
    // Apply fixQuillLists to initialValue as well
    const cleanedInitialValue = fixQuillLists(initialValue);
    setText(cleanedInitialValue);
    setCharCount(stripHtml(cleanedInitialValue).length);
  }, [initialValue]);

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // --- REVISED fixQuillLists Function ---
  function fixQuillLists(html) {
    if (!html) return ''; // Handle empty HTML

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const body = doc.body;

    // Get all direct children of the body
    const nodes = Array.from(body.children);

    // This array will store the new, correctly structured nodes
    const newNodes = [];
    let currentList = null; // To track the current list being built (ul or ol)
    let currentListType = null; // 'bullet' or 'ordered'

    nodes.forEach(node => {
      if (node.tagName === 'P' || node.tagName === 'DIV' || node.tagName.startsWith('H')) {
        // If it's a non-list block, close any active list and add the node
        if (currentList) {
          newNodes.push(currentList);
          currentList = null;
          currentListType = null;
        }
        newNodes.push(node.cloneNode(true)); // Clone to avoid modifying live DOM parts if this was directly from editor
      } else if (node.tagName === 'OL' || node.tagName === 'UL' || node.tagName === 'LI') {
        // Handle list items. If an LI is directly under body, it's problematic,
        // but we'll try to process it.
        const lis = node.tagName === 'LI' ? [node] : Array.from(node.querySelectorAll('li'));

        lis.forEach(li => {
          const dataListAttr = li.getAttribute('data-list');
          let liType = null;

          if (dataListAttr === 'bullet') {
            liType = 'bullet';
          } else if (dataListAttr === 'ordered' || (node.tagName === 'OL' && !dataListAttr)) {
            // If it's an OL or LI inside an OL without data-list, assume ordered
            liType = 'ordered';
          } else {
             // Default to ordered if no specific data-list or it's just a raw LI
             // You might adjust this default based on preference.
             liType = 'ordered';
          }


          if (currentList && currentListType === liType) {
            // Continue current list
            const clonedLi = li.cloneNode(true);
            clonedLi.removeAttribute('data-list'); // Remove data-list from LI as it's redundant inside UL/OL
            currentList.appendChild(clonedLi);
          } else {
            // Start a new list
            if (currentList) {
              newNodes.push(currentList);
            }
            if (liType === 'bullet') {
              currentList = doc.createElement('ul');
            } else {
              currentList = doc.createElement('ol');
            }
            currentListType = liType;
            const clonedLi = li.cloneNode(true);
            clonedLi.removeAttribute('data-list'); // Remove data-list from LI
            currentList.appendChild(clonedLi);
          }
        });
      }
      // Add other element types if necessary (e.g., img, table etc.)
    });

    // Add any remaining list
    if (currentList) {
      newNodes.push(currentList);
    }

    // Clear body and append new nodes
    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
    newNodes.forEach(node => body.appendChild(node));

    return body.innerHTML;
  }


  const handleTextChange = (e) => {
    const rawHtml = e.htmlValue;
    const plainText = stripHtml(rawHtml);

    if (plainText.length <= maxLength) {
      // Apply the fix immediately to the incoming HTML
      const cleanedHtml = fixQuillLists(rawHtml);

      // Set the state with the cleaned HTML so the Editor re-renders with it
      setText(cleanedHtml);
      setCharCount(plainText.length);

      // Pass the cleaned HTML to the parent component
      onChange?.(cleanedHtml);
    }
  };

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
        style={{ height }}
        headerTemplate={header}
        onKeyDown={handleKeyDown}
      />
      <div style={{ textAlign: "right", fontSize: "12px", marginTop: "4px", color: charCount >= maxLength ? "red" : "#666" }}>
        {charCount}/{maxLength}
      </div>
    </div>
  );
};

export default RichTextEditor;