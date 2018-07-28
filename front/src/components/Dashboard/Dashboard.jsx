import React, { Component } from "react";
import Tabs from '@material-ui/core/Tabs';
import '../../styles.css';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import _cookies from 'universal-cookie';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import {serverUrl} from '../../constants/client';
import CircularProgress from '@material-ui/core/CircularProgress';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import { get } from "http";

import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import DatePicker from 'material-ui-pickers/DatePicker';
import TimePicker from 'material-ui-pickers/TimePicker';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Filter from '@material-ui/icons/FilterList';

import moment from 'moment';

const Cookies = new _cookies();
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state={
      tabValue: 0,
      openEdit: false,
      editDialog: false,
      deleteDialog: false,
      showProgress: false,
      notesData: [],
      displayData: [],
      editData: {},
      deleteData: {},
      addNote: {
        date: new moment().format("DD MMM YYYY")
      },
      message: "",
      filterDate: {}
    };
    this.populateNotes();
    this.checkAuthenticate(Cookies.get('token'), this.props.history);
  }

  checkAuthenticate(data, history) {
    if (!data) {
      history.push('/');
    }
  }

  filterData() {
    let obj = this.state.notesData;
    const self = this;
    obj = obj.filter((data)=> {
      return moment(`${data.date}`).isSameOrAfter(`${self.state.filterDate.start}`, "days") && moment(`${data.date}`).isSameOrBefore(`${self.state.filterDate.end}`, "days");
    })
    this.setState({displayData: obj})
  }

  populateNotes() {
    const token = Cookies.get('token');
    const self = this;
    fetch(`${serverUrl}/notes`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      self.setState({ notesData: response.data, displayData: response.data, showProgress: false });
    }).catch(err => {
      self.setState({ showProgress: false })
    });
  }

  tabClicked(tabVal) {
    if(tabVal === 1){
      this.setState({openEdit: true})
    }
  }

  populateAddDialog(val, action){
    const obj = this.state.addNote;
    switch(action) {
      case "Date":
        obj.date = val;
        this.setState({addNote: obj});
        break;
      case "Time":
        obj.time = val;
        this.setState({ addNote: obj });
        break;
      case "Note":
        obj.note = val;
        this.setState({ addNote: obj });
        break;
    }
  }

  populateEditObj(val, action) {
    const obj = this.state.editData;
    switch (action) {
      case "Date":
        obj.date = val;
        this.setState({editData: obj})
        break;
      case "Time":
        obj.time = val;
        this.setState({editData: obj})
        break;
      case "Note":
        obj.note = val;
        this.setState({ editData: obj })
        break;
    }
  }

  handleCloseDialog(data){
    const self = this;
    const token = Cookies.get('token');
    if(data === 'submit') {
      fetch(`${serverUrl}/note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(this.state.addNote)
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        self.setState({ openEdit: false, showProgress: false, message: "Note Added Successfully", showMessage: true });
        self.populateNotes();
      }).catch(err => {
        self.setState({ showProgress: false })
      });
    }else{
      this.setState({openEdit: false});
    }

  }

  handleCloseEditDialog(data) {
    const self = this;
    const token = Cookies.get('token');
    if (data === 'submit') {
      fetch(`${serverUrl}/editNote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({obj: this.state.editData})
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        self.setState({ editDialog: false, message: "Note Updated Successfully", showMessage: true});
      }).catch(err => {
        self.setState({ showProgress: false })
      });
    } else {
      this.setState({ editDialog: false });
    }

  }

  handleCloseDeleteDialog(data) {
    const self = this;
    const token = Cookies.get('token');
    if (data === 'submit') {
      fetch(`${serverUrl}/deleteNote`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ obj: this.state.deleteData })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        self.setState({ deleteDialog: false, message: "Note Deleted Successfully", showMessage: true });
        self.populateNotes();
      }).catch(err => {
        self.setState({ showProgress: false })
      });
    } else {
      this.setState({ deleteDialog: false });
    }

  }

  renderAddDialog() {
    return (
      <Dialog
        open={this.state.openEdit}
        onClose={()=>this.handleCloseDialog("close")}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add Note
        </DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              value={this.state.addNote.date}
              format='DD MMM YYYY'
              onChange={(date) => { this.populateAddDialog(date.format("DD MMM YYYY"),"Date") }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            autoFocus
            margin="dense"
            id="time"
            label="Time"
            style={{marginLeft: '10px'}}
            onChange={(ev) => this.populateAddDialog(ev.target.value, "Time")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="note"
            label="Notes"
            style={{marginLeft: '10px'}}
            onChange={(ev) => this.populateAddDialog(ev.target.value, "Note")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>this.handleCloseDialog("close")} color="secondary  ">
            Cancel
            </Button>
          <Button onClick={()=>this.handleCloseDialog("submit")} color="primary">
            Add
            </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderEditDialog() {
    return (
      <Dialog
        open={this.state.editDialog}
        onClose={() => this.handleCloseEditDialog("close")}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Edit Note
        </DialogTitle>
        <DialogContent>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              value={this.state.editData.date}
              format='DD MMM YYYY'
              onChange={(date) => { this.populateEditObj(date.format("DD MMM YYYY"),"Date") }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            autoFocus
            margin="dense"
            id="time"
            label="Time"
            style={{ marginLeft: '10px' }}
            value={this.state.editData.time}
            onChange={(ev) => this.populateEditObj(ev.target.value, "Time")}
          />
          <TextField
            autoFocus
            margin="dense"
            id="note"
            label="Notes"
            style={{ marginLeft: '10px' }}
            value={this.state.editData.note}
            onChange={(ev) => this.populateEditObj(ev.target.value, "Note")}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleCloseEditDialog("close")} color="secondary  ">
            Cancel
            </Button>
          <Button onClick={() => this.handleCloseEditDialog("submit")} color="primary">
            Edit
            </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderDeleteDialog() {
    return (
      <Dialog
        open={this.state.deleteDialog}
        onClose={() => this.handleCloseDeleteDialog("close")}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Delete Note
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete the note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleCloseDeleteDialog("close")} color="primary  ">
            Cancel
            </Button>
          <Button onClick={() => this.handleCloseDeleteDialog("submit")} color="secondary">
            Delete
            </Button>
        </DialogActions>
      </Dialog>
    )
  }

  fetchNotes(){
    const self = this;
    return(
      this.state.displayData.length > 0 && this.state.displayData.map((data,index) => {
        return(
        <TableRow key={index}>
          <TableCell>{data.date}</TableCell>
          <TableCell>{data.time}</TableCell>
          <TableCell>{data.note}</TableCell>
          <TableCell><Edit className="editIcon" onClick={()=>{self.setState({editDialog: true, editData:data});}}/></TableCell>
          <TableCell><Delete className="deleteIcon" onClick={()=>{self.setState({deleteDialog: true, deleteData:data});}} /></TableCell>
        </TableRow>);
      })
    );
  }
  changeFilterDates(val, action) {
    let obj = this.state.filterDate;
    if (action === "Start") {
      obj.start = val;
      this.setState({ filterDate: obj })
    } else {
      obj.end = val;
      this.setState({ filterDate: obj })
    }
  };

  filterTable() {
    return (
      <div className="filterFields">
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            value={this.state.filterDate.start}
            format='DD MMM YYYY'
            onChange={(date) => { this.changeFilterDates(date.format("DD MMM YYYY"), "Start") }}
          />
        </MuiPickersUtilsProvider>

        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker
            value={this.state.filterDate.end}
            format='DD MMM YYYY'
            style={{marginLeft: '40px'}}
            onChange={(date) => { this.changeFilterDates(date.format("DD MMM YYYY"), "End") }}
          />
        </MuiPickersUtilsProvider>

        <Button color="primary" onClick={()=>{this.filterData()}}>Filter</Button>
      </div>
    );
  }

  render() {
    return (
      <div className="bg">
        <AppBar position="static">
          <Tabs value={this.state.tabValue} onChange={(ev, value)=>this.tabClicked(value)}>
            <Tab label="Report" />
            <Tab label="Add Report" />
          </Tabs>
          {this.state.showProgress && <CircularProgress color="secondary" />}
          <Button color="secondary"
            style={{width: '50px', position: 'absolute',left: '90%', top: '15px'}}
            onClick={() => {
              let cookieExp = new Date((new Date().getTime()) - 365);
              Cookies.set('token', '', {
                path: '/',
                expires: cookieExp
              });
              this.props.history.push('/');
            }}
            >
            Logout
          </Button>
        </AppBar>
        <div>
          {this.filterTable()}
          <Table>
            <TableHead>
              <TableCell className="filter" style={{ width: '15%' }}>Date <Filter style={{ height: '15px' }} /></TableCell>
              <TableCell style={{width: '10%'}}>Total Time</TableCell>
              <TableCell style={{width: '70%'}}>Notes</TableCell>
              <TableCell style={{ width: '2%' }}></TableCell>
              <TableCell style={{ width: '2%' }}></TableCell>
            </TableHead>
            <TableBody>
              {this.fetchNotes()}
            </TableBody>
          </Table>
        </div>
        {this.renderAddDialog()}
        {this.renderEditDialog()}
        {this.renderDeleteDialog()}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.state.showMessage}
          autoHideDuration={5000}
          onClose={() => { this.setState({ showMessage: false }) }}
          message={<span id="message-id">{this.state.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={() => { this.setState({ showMessage: false }) }}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}
