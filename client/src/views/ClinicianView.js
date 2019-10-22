import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";
import CalendarHeatmap from "../components/visualizations/clinician/CalendarHeatmap";
// import MonthlyHeatmap from "../components/visualizations/clinician/MonthlyHeatmap";
import CallTypeRadar from "../components/visualizations/clinician/CallTypeRadar";
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function ClinicianView() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const classes = useStyles();

  const handleUploadFile = e => {
    setUploadedFile(e.target.files[0])
    console.log(uploadedFile)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('file', uploadedFile)
    try {
      console.log(uploadedFile)
      const res = await axios.post("/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const { fileName, filePath, guid } = res.data;
      setUploadedFile({ fileName, filePath, guid})
      console.log(uploadedFile)
    } catch(err) {
      if(err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.msg);
      }
    }
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <Typography variant="h6" component="h6">
              Annual Call Volume for Individual Provider
            </Typography>
            <CalendarHeatmap />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant="h6" component="h6">
              Call Type for Individual Provider
            </Typography>
            <CallTypeRadar />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Typography variant="h6" component="h6">
              Monthy Call Volume for Individual Provider
            </Typography>
            {/* <MonthlyHeatmap /> */}
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}><input onChange={handleUploadFile} type="file"/> <button onClick={handleSubmit}>submit</button></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
