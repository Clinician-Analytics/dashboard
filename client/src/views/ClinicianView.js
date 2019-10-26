import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography } from "@material-ui/core";
import CalendarHeatmap from "../components/visualizations/clinician/CalendarHeatmap";
// import MonthlyHeatmap from "../components/visualizations/clinician/MonthlyHeatmap";
import CallTypeRadar from "../components/visualizations/clinician/CallTypeRadar";
// import axios from 'axios';

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
  const classes = useStyles();

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
