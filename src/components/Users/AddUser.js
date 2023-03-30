import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const AddUser = ({ data, editing }) => {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({ ...formData, role: role });
  }, [role]);

  const handleChange = (e) => {
    if (e.target.name === "role") {
      setRole(e.target.value);
    } else {
      const modiefiedFromData = formData;
      modiefiedFromData[e.target.name] = e.target.value;
    }
    console.log(formData);
  };

  useEffect(() => {
    if (data) {
      setFormData(data);
      setRole(data?.role);
    }
  }, []);

  console.log(formData);

  return (
    <Box>
      <Typography variant="h5" component="h5">
        {editing ? "Edit " : "Add "} User
      </Typography>
      <br />
      <TextField
        id="fullname"
        label="Full Name"
        variant="outlined"
        onChange={handleChange}
        defaultValue={formData?.fullname}
        value={formData?.fullname}
        name="fullname"
      />
      <br />
      <br />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={formData.role ? formData.role : null}
          value={role}
          name="role"
          label="Role"
          onChange={handleChange}
        >
          <MenuItem value={"MODERATOR"}>Moderator</MenuItem>
          <MenuItem value={"EDITOR"}>Editor</MenuItem>
          <MenuItem value={"ADMIN"}>Admin</MenuItem>
        </Select>
      </FormControl>
      <br />
      <br />
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        defaultValue={formData?.email}
        value={formData.email}
        name="email"
        onChange={handleChange}
      />
      <br />
      <br />
      <Button variant="contained" fullWidth>
        {editing ? "Save Changes" : "Add User"}
      </Button>
    </Box>
  );
};

export default AddUser;
