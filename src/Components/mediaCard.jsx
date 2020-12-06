import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditDialog from "./EditDialog";
import "../styles.css";

const useStyles = makeStyles({
  root: {
    minWidth: 580
  },
  media: {
    height: 250,
    width: "auto"
  }
});

export default function MediaCard(props) {
  const classes = useStyles();
  const { id, image, title, description, onDelete, onEdit } = props;
  const [edit, setEdit] = useState(false);

  const handleEditClose = (id, title, des) => {
    onEdit(id, title, des);
    setEdit(false);
  };
  const handleEditOpen = () => {
    setEdit(true);
  };
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <Typography gutterBottom variant="h6" component="h4">
            {title.toUpperCase()}
          </Typography>
          <CardMedia className={classes.media} image={image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="hidden">
          <Button
            size="small"
            variant="contained"
            color="secondary"
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleEditOpen}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
      {edit && (
        <EditDialog
          id={id}
          edit={edit}
          title={title}
          description={description}
          handleEditClose={handleEditClose}
        />
      )}
    </>
  );
}
