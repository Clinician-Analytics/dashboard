import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Navigation() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Clinician Analytics Dashboard
          </Typography>
          <Button color="inherit" component={Link} to="/admin-view">
            Admin View
          </Button>
          <Button color="inherit" component={Link} to="/officer-view">
            Officer View
          </Button>
          <Button color="inherit" component={Link} to="/clinician-view">
            Clinician View
          </Button>
          <Button color="inherit" component={Link} to="/system-view">
            System View
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
