import {
  Button,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Users = () => {
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [usersList, setUsersList] = useState([]);

  const API_URL = "https://a2hw4w47de.execute-api.eu-north-1.amazonaws.com/dev";

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(API_URL);
      setUsersList(JSON.parse(response?.data?.body).Items);
    };
    getData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(false);
  };

  return (
    <>
      <Box sx={{ margin: "2rem" }}>
        <Grid container spacing={2}>
          <Grid xs={6} md={8}>
            <Typography variant="h5" component="h5">
              Users
            </Typography>
          </Grid>
          <Grid xs={6} md={4}>
            <Button variant="contained" onClick={handleOpen}>
              Add User
            </Button>
          </Grid>
          <Grid xs={8}>.</Grid>
          <Grid xs={8}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {usersList
                    ? usersList.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.fullname}</TableCell>
                          <TableCell>{item.role}</TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="success"
                              onClick={() => {
                                setEditing(true);
                              }}
                            >
                              Edit
                            </Button>
                            &nbsp;
                            <Button variant="contained" color="error">
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    : "Nothing to show"}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <AddUser />
        </Box>
      </Modal>
      <Modal
        open={editing}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <AddUser
            data={{
              fullname: "Sajeel Aalam",
              email: "abc@xyz.com",
              role: "ADMIN",
            }}
            editing
          />
        </Box>
      </Modal>
    </>
  );
};

export default Users;
