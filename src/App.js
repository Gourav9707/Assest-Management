import React, { useEffect, useState } from "react";
import AlertDialog from "./Components/AlertDialog";
import MediaCard from "./Components/mediaCard";
import Box from '@material-ui/core/Box'
import EditDialog from "./Components/EditDialog";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState([]);
  const [id, setId] = useState("");

  const handleEdit = (id, title, des) => {
    id = id - 1;
    console.log(id, title, des, "amit");
    const copydata = [...match];
    copydata[id].title = title;
    copydata[id].description = des;
    setMatch(copydata);
  };
  const handleClose = (message) => {
    setOpen(false);
    message === "Agree" && filter();
  };
  //handledelete
  function handleDelete(id) {
    setOpen(true);
    setId(id);
  }
  function filter() {
    const filtermatch = match.filter((el) => el.id !== id);
    setMatch(filtermatch);
    setId("");
  }
  const apiurl = `https://5fbcebcf3f8f90001638c720.mockapi.io/api/v1/assets`;
  useEffect(() => {
    loacalData();
  }, []);
  function loacalData() {
    fetch(apiurl)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setMatch(data);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
       <Box
            display="flex"
            m={2}
            p={2}
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            >
      {loading ? (
        match.map((el) => {
          return (
            <Box m={2}>
            <MediaCard
              key={el.id}
              id={el.id}
              image={el.imageURL}
              title={el.title}
              description={el.description}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
            </Box>
          );
        })
      ) : (
        <h1>Loading.......</h1>
      )}
      </Box>
      {open && <AlertDialog open={open} handleClose={handleClose} />}
    </div>
  );
}
