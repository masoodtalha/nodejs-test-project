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

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state={
      tabValue: 0,
      openEdit: false,
      editDialog: false,
      deleteDialog: false,
      showProgress: false,
      notesData: [],
      editData: {},
      deleteData: {}
    };
    this.addNote = {};
    this.populateNotes();
  }

  populateNotes() {
    const self = this;
    fetch(`${serverUrl}/notes`, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      return response.json();
    }).then(function (response) {
      self.setState({ notesData: response, showProgress: false });
      console.log("Got Data: ", response);
    }).catch(err => {
      self.setState({ showProgress: false })
    });
  }

  tabClicked(tabVal) {
    console.log("%%%% Tab Value: ", tabVal);
    if(tabVal === 1){
      this.setState({openEdit: true})
    }
  }

  populateAddDialog(val, action){
    switch(action) {
      case "Date":
        this.addNote.date = val;
        break;
      case "Time":
        this.addNote.time = val;
        break;
      case "Note":
        this.addNote.note = val;
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
    if(data === 'submit') {
      console.log("%%% Note: ", this.addNote);
      fetch(`${serverUrl}/note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.addNote)
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        self.setState({ openEdit: false, showProgress: false });
        console.log("Got Data: ", response);
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
    if (data === 'submit') {
      console.log(" Editing Obj", this.state.editData);
      fetch(`${serverUrl}/editNote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({obj: this.state.editData})
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        self.setState({ editDialog: false});
        console.log("Updating: ", response);
      }).catch(err => {
        self.setState({ showProgress: false })
      });
    } else {
      this.setState({ deleteDialog: false });
    }

  }

  handleCloseDeleteDialog(data) {
    const self = this;
    if (data === 'submit') {
      console.log(" Deleting Obj", this.state.deleteData);
      fetch(`${serverUrl}/deleteNote`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ obj: this.state.deleteData })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        self.setState({ deleteDialog: false });
        self.populateNotes();
        console.log("Deleting: ", response);
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
          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Date"
            onChange={(ev)=>this.populateAddDialog(ev.target.value, "Date")}
          />
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
          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Date"
            value={this.state.editData.date}
            onChange={(ev) => this.populateEditObj(ev.target.value, "Date")}
          />
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
      this.state.notesData.data && this.state.notesData.data.map((data,index) => {
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

  render() {
    return (
      <div className="bg">
        <AppBar position="static">
          <Tabs value={this.state.tabValue} onChange={(ev, value)=>this.tabClicked(value)}>
            <Tab label="Report" />
            <Tab label="Add Report" />
          </Tabs>
          {this.state.showProgress && <CircularProgress color="secondary" />}
        </AppBar>
        <div>
          <Table>
            <TableHead>
              <TableCell style={{width: '10%'}}>Date</TableCell>
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
      </div>
    );
  }
}