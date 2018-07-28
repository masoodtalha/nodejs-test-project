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
import {serverUrl} from '../../constants/client';


const Cookies = new _cookies();
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state={
      loginActive: true,
      openError: false,
      showProgress: false
    };
    this.signup = {};
    this.login = {};

    this.checkAuthenticate(Cookies.get('token'), this.props.history);
  }

  checkAuthenticate(data, history) {
    if (data) {
      history.push('/dashboard');
    }
  }

  updateSignupForm(val, action) {
    switch(action) {
      case "FirstName":
        this.signup.firstName = val;
        break;

      case "LastName":
        this.signup.lastName = val;
        break;

      case "Email":
        this.signup.email = val;
        break;

      case "Password":
        this.signup.password = val;
        break;
    }
  }

  submitSignup() {
    const self = this;
    this.setState({showProgress: true});

    fetch(`${serverUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.signup)
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      self.setState({loginActive: true, showProgress: false});
    }).catch(err=> {
      self.setState({openError: true})
    });
  }

  updateLoginForm(val, action) {
    switch (action) {
      case "Email":
        this.login.email = val;
        break;

      case "Password":
        this.login.password = val;
        break;
    }
  }

  authenticateUser(history) {
    const self = this;
    this.setState({ showProgress: true });

    fetch(`${serverUrl}/authUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.login)
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      if(response.status === 200){
        self.setState({showProgress: false });
        Cookies.set('token', response.data.token);
        history.push('/dashboard');
      }else{
        self.setState({ showProgress: false , openError: true});
      }
    }).catch(err => {
      self.setState({ openError: true })
    });
  }

  render() {
    return (
      <div className="bg">
        {/* <img src={this._bgSrc} alt="bg" className="bg" /> */}
        <Grid container justify="center" alignItems="center" className="loginBox">
          <Grid item xs={12} md={4}>
            <Paper elevation={4} className="paperContainer">
              {this.state.showProgress && <LinearProgress color="secondary" />}

              {this.state.loginActive && <div>
                <div className="loginHeaderText">
                  <Typography variant="display1" component="h3">
                    Login
								</Typography>
                  <Typography variant="body2">
                    to continue on todo APP
								</Typography>
                </div>

                <Grid container spacing={8} alignItems="flex-end" justify="center">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField label="Username" fullWidth onChange={(ev) => this.updateLoginForm(ev.target.value, "Email")} />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end" justify="center">
                  <Grid item>
                    <Lock />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField type="password" label="Password" fullWidth onChange={(ev) => this.updateLoginForm(ev.target.value, "Password")} />
                  </Grid>
                </Grid>

                <Button variant="raised" color="primary" className="loginBtn" onClick={() => this.authenticateUser(this.props.history)}>
                  Login
								  <Send />
                </Button>

                <Button color="primary" className="signupBtn" onClick={() => {this.setState({loginActive: false})}}>
                  Sign up?
                </Button>
              </div>}

              {/* Signup Form */}
              {!this.state.loginActive && <div>
                <div className="loginHeaderText">
                  <Typography variant="display1" component="h3">
                    Sign Up
								  </Typography>
                </div>

                <Grid container spacing={8} alignItems="flex-end" justify="center">
                  <Grid item xs={5}>
                    <TextField label="First Name" fullWidth onChange={(ev) => this.updateSignupForm(ev.target.value, "FirstName")} />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField label="Last Name" fullWidth onChange={(ev) => this.updateSignupForm(ev.target.value, "LastName")} />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end" justify="center">
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField label="Email" fullWidth onChange={(ev) => this.updateSignupForm(ev.target.value, "Email")} />
                  </Grid>
                </Grid>

                <Grid container spacing={8} alignItems="flex-end" justify="center">
                  <Grid item>
                    <Lock />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField type="password" label="Password" fullWidth onChange={(ev) => this.updateSignupForm(ev.target.value, "Password")} />
                  </Grid>
                </Grid>

                <Button variant="raised" color="primary" className="loginBtn" onClick={() => this.submitSignup()}>
                  Sign Up
                </Button>

                <Button color="secondary" className="signupBtn" onClick={() => {this.setState({loginActive: true})}}>
                  Back to Login?
                </Button>
              </div>}
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
              onClick={() => {this.setState({openError: false})}}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}
