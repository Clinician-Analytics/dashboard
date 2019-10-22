import React, { useState, useContext } from "react";
import { AnnualDataContext } from "../../contexts/AnnualDataContext";
import { Button } from "@material-ui/core";
import Papa from "papaparse";
import axios from "axios";

export default function FileUploadForm() {
  const [annualData, setAnnualData] = useContext(AnnualDataContext)
  const [file, setFile] = useState({});
  const [, setErrors] = useState({});

  const handleFileSelect = e => {
    setFile(e.target.files[0])
  };

  const handleTest = async e => {
    try {
      const res = await axios.get('/reports/test')
      console.log(res.data.msg)
      setErrors({})
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server')
        setErrors('There was a problem with the server')
      } else {
        console.log(err.response.data.msg);
        setErrors(err.response.data.msg);
      }
    }
  }

  const handleSubmit = async e => {
    Papa.parse(file, {
      header: true,
      complete: async results => {
        try {
          setAnnualData(results)
          console.log(annualData)
          // const res = await axios.post("/upload", results)
          // console.log(res)
        } catch(err) {
          if(err.response.status === 500) {
            console.log('There was a problem with the server')
          } else {
            console.log(err.response.data.msg);
          }
        }
      }
    });
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
      <Button onClick={handleSubmit}>Sumbit</Button>
      <Button onClick={handleTest}>Test Server</Button>
    </div>
  );
}
