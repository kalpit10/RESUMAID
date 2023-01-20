import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";

function FileUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    let selected = e.target.files[0];
    let types = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select a .docx file");
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (file) {
      let data = new FormData();
      data.append("File", file);
      data.append("File", file.name);
      alert("File uploaded successfully");
      fetch("http://localhost:5000/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setError("Please select a file to upload");
    }
  };

  return (
    <DefaultLayout>
      <form className="position-absolute top-50 start-50 translate-middle">
        <input className="p-4" type="file" onChange={handleChange} accept=".docx" />
        <div>
          {error && <p>{error}</p>}
          <button onClick={handleUpload}>Upload</button>
          <button onClick={() => navigate("/result")}>Check Score</button>
        </div>
      </form>
    </DefaultLayout>
  );
}

export default FileUpload;
