import React, { Component } from "react";
import _cookies from 'universal-cookie';
import '../../styles.css';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LinearProgress from '@material-ui/core/LinearProgress';

export default class Login extends Component {
  constructor(props) {
    super();
    this.state={};
  }

  render() {
    return (
      <div className="bg">
        {/* <img src={this._bgSrc} alt="bg" className="bg" /> */}
        <Grid container justify="center" alignItems="center" className="loginBox">
          <Grid item xs={12} md={4}>
            <Paper elevation={4} className="paperContainer">
              {this.state.showProgress && <LinearProgress color="secondary" />}

              <div className="loginHeaderText">
                <Typography variant="display1" component="h3">
                  Login
								</Typography>
                <Typography variant="body2">
                  to continue to Therify
								</Typography>
              </div>

              <Grid container spacing={8} alignItems="flex-end" justify="center">
                <Grid item>
                  <AccountCircle />
                </Grid>
                <Grid item xs={9}>
                  <TextField label="Username" fullWidth onChange={(ev) => this.state.updateUserOrPass(ev.target.value, null)} />
                </Grid>
              </Grid>

              <Grid container spacing={8} alignItems="flex-end" justify="center">
                <Grid item>
                  <Lock />
                </Grid>
                <Grid item xs={9}>
                  <TextField type="password" label="Password" fullWidth onChange={(ev) => this.state.updateUserOrPass(null, ev.target.value)} />
                </Grid>
              </Grid>

              <Button variant="raised" color="primary" className="loginBtn" onClick={() => this.state.authenticateUser(this.props.history)}>
                Login
								<Send />
              </Button>
            </Paper>
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.openError}
          autoHideDuration={5000}
          onClose={this.state.handleClose}
          message={<span id="message-id">Please enter valid username and password</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => this.state.closeError()}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}