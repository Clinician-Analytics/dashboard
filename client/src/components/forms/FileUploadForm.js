import React, { useState } from "react";
import { Button } from '@material-ui/core'
import Papa from "papaparse";

export default function FileUploadForm() {
  const [file, setFile] = useState({});

  //TODO handle setErrors if user enters an invalid email
  // const [errors, setErrors] = useState({});

  const handleFileSelect = e => {
    Papa.parse(e.target.files[0], {
      complete: function(results) {
        setFile(results);
        console.log(results);
      }
    });
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
        <Button component="span">
          Upload
        </Button>
      </label>
      <u>
      {file.data ? file.data.map(item => <li key={item[0]}>{item[0] + " " + item[1]}</li>) : null}
      </u>
    </div>
  );
}
