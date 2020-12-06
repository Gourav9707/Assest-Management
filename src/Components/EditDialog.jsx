import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";
import Draggable from "react-draggable";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function EditDialog(props) {
  const { id, edit, handleEditClose, title, description } = props;

  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const handleChange = (event, tag) => {
    if (tag === "title") setEditTitle(event.target.value);
    if (tag === "description") setEditDescription(event.target.value);
  };
  return (
    <div>
      <Dialog
        open={edit}
        onClose={handleEditClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <TextField
            id="Title"
            label="Title"
            multiline
            rowsMax={4}
            value={editTitle}
            onChange={(event) => handleChange(event, "title")}
            variant="filled"
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              id="Description"
              label="Description"
              multiline
              rowsMax={4}
              value={editDescription}
              onChange={(event) => handleChange(event, "description")}
              variant="filled"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleEditClose()} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => handleEditClose(id, editTitle, editDescription)}
            color="primary"
          >
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
