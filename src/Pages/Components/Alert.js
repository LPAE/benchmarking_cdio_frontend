import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

const Alert = props => (
  <Dialog open={props.open} onClose={props.handleClose}>
    <DialogTitle>{props.title || "Alerta"}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {props.text}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={props.handleClose} color="primary" autoFocus>
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

export default Alert;
