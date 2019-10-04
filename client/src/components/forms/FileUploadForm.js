import React, { useState } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";
import Papa from "papaparse";

export default function FileUploadForm() {
  const [file, setFile] = useState({});

  //TODO handle setErrors if user enters an invalid email
  // const [errors, setErrors] = useState({});

  const handleFileSelect = e => {
    setFile(e.target.files[0])
    // Papa.parse(e.target.files[0], {
    //   complete: function(results) {
    //     setFile(results);
    //     console.log(results);
    //   }
    // });
  };

  const handleTest = async e => {
    try {
      const res = await axios.get('/')
      console.log("worked", [res])
    } catch (err) {
      if(err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.msg);
      }
    }
  }

  const handleUpload = async e => {
    const formData = new FormData();
    formData.append('file', file)
    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      const { fileName, filePath, guid } = res.data;
      console.log({ fileName, filePath, guid})
    } catch(err) {
      if(err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.msg);
      }
    }
  }

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
      <Button onClick={handleUpload}>Upload</Button>
      <Button onClick={handleTest}>Test Server</Button>
    </div>
  );
}
