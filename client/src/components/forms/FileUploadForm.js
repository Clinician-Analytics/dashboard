import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Papa from "papaparse";
import moment from "moment";
import axios from "axios";

export default function FileUploadForm() {
  const [file, setFile] = useState({});
  const [errors, setErrors] = useState({
    submitError: "",
    serverError: ""
  });
  const [uploadStatus, setUploadStatus] = useState({
    msg: ""
  });
  const [loading, setLoading] = useState(false);

  const handleFileSelect = e => {
    setFile(e.target.files[0])
  };

  const handleSubmit = async e => {
    setLoading(true)
    setUploadStatus({msg: ""})
    Papa.parse(file, {
      header: true,
      complete: async results => {
        try {
          results.data.forEach(item => {
            item.heatmap_date = moment(item.callreceive_time).format("YYYY-MM-DD")
            item.year = moment(item.callreceive_time).format("YYYY")
          })
          const res = await axios.post("/uploads", results)
          if (res.status === 200){
            setUploadStatus({msg: "Files Uploaded successfully"})
            setLoading(false)
          }
          console.log(res)
          setErrors({})
        } catch(err) {
          setLoading(false)
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
      <span>{loading ? "The system is processing your data, this will take about a minute." : null}</span>
      <span>{uploadStatus ? uploadStatus.msg : null}</span>
    </div>
  );
}
