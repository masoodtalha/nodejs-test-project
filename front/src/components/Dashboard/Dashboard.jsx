import React, { Component } from "react";
import Tabs from '@material-ui/core/Tabs';
import '../../styles.css';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default class Dashboard extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="bg">
        <Tabs onChange={this.handleChange}>
          <Tab label="Report" />
          <Tab label="Add Report" />
        </Tabs>

        <div>
          <Table>
            <TableHead>
              <TableCell>Date</TableCell>
              <TableCell>Total Time</TableCell>
              <TableCell>Notes</TableCell>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}