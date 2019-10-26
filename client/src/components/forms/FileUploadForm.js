import React, { useState, useContext } from "react";
import { AnnualDataContext } from "../../contexts/AnnualDataContext";
import { Button } from "@material-ui/core";
import Papa from "papaparse";
import moment from "moment"
import axios from "axios";

export default function FileUploadForm() {
  const [annualData, setAnnualData] = useContext(AnnualDataContext)
  const [file, setFile] = useState({});
  const [errors, setErrors] = useState({});

  const handleFileSelect = e => {
    setFile(e.target.files[0])
  };

  const handleSubmit = async e => {
    Papa.parse(file, {
      header: true,
      complete: async results => {
        try {
          results.data.forEach(item => {
            item.heatmap_date = moment(item.callreceive_time).format("YYYY-MM-DD")
          })
          setAnnualData(results)
          console.log(annualData)
          const res = await axios.post("/uploads", results)
          console.log(res)
          setErrors({})
        } catch(err) {
          if(err.response.status === 500) {
            console.log('There was a problem with the server')
            setErrors( errors.serverError = 'There was a problem with the server')
          } else {
            console.log(err.response.data.msg);
            setErrors( errors.submitError = err.response.data.msg)
          }
        }
      }
    });
  }

  return (
    <div>
      <span>{errors ? errors.submitError : null}</span>
      <span>{errors ? errors.serverError : null}</span>
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
      <Button onClick={handleSubmit}>Sumbit</Button>
    </div>
  );
}
