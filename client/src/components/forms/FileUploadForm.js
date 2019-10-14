import React, { useState } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

export default function FileUploadForm() {
  const [file, setFile] = useState({});
  const [errors, setErrors] = useState({});

  //TODO handle setErrors if user enters an invalid email
  // const [errors, setErrors] = useState({});

  const handleFileSelect = e => {
    setFile(e.target.files[0])
  };

  const handleTest = async e => {
    try {
      const res = await axios.get('/reports/test')
      console.log(res.data.msg)
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.msg);
      }
    }
  }

  const handleSubmit = async e => {
    console.log(file)
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("/reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      const { fileName, filePath } = res.data;
      console.log(errors, fileName, filePath)
      setErrors({});
    } catch (err) {
      if (err.response.status === 500) {
        setErrors({ msg: "There was a problem with the server" });
      } else {
        setErrors({ msg: err.response.data.msg });
      }
    }
  };

  return (
    <div>
      {" "}
      <input
        id="raised-button-file"
        type="file"
        hidden
        onChange={handleFileSelect}
      />
      <label htmlFor="raised-button-file">
        <Button component="span">Select File</Button>
      </label>
      {/* {file.data ? (
        <ul>
          {file.data.map(item => (
            <li key={item[0]}>{item[0] + " " + item[1]}</li>
          ))}
        </ul>
      ) : null} */}
      <Button onClick={handleSubmit}>Sumbit</Button>
      <Button onClick={handleTest}>Test Server</Button>
    </div>
  );
}
