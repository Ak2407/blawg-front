import React, { useState } from "react";
import "../styles/Edit.css";
import Button from "../components/button";
import { BUTTON_TYPES } from "../data/buttons";
import OverLapInput from "../components/OverLapInput";
import ReactDom from "react-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import { useDropzone } from "react-dropzone";

const Edit = () => {
  const [img, setImg] = useState([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImg(
        acceptedFiles.map((upFile) =>
          Object.assign(upFile, {
            preview: URL.createObjectURL(upFile),
          })
        )
      );
    },
  });

  return (
    <>
      <Navbar />
      <div className="edit-page">
        <div className="edit-page-heading">
          <Header txt="Edit your profile" />
        </div>
        <div className="edit-profile">
          <div className="browse-container">
            <div className="edit-img-container">
              <div className="edit-image-chooser">
                <h1>DRAG AN IMAGE HERE</h1>
                <h1>OR</h1>
                <div className="browse-btn">
                  <Button btnText="BROWSE" />
                </div>
              </div>
            </div>
          </div>
          <div className="edit-info-container">
            <OverLapInput txt="NAME" />
            <OverLapInput txt="EMAIL" />
            <OverLapInput txt="JOB" />
            <OverLapInput txt="CITY" />
            <OverLapInput txt="PASSWORD" type="password" />
          </div>
          <div className="edit-buttons">
            <Button type={BUTTON_TYPES.CANCEL} btnText="CANCEL" />
            <Button type={BUTTON_TYPES.PUBLISH} btnText="SAVE" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
