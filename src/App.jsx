import { useState } from "react";
import "./App.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  addUser,
  check,
  delUser,
  editUser,
  setAge,
  setIdx,
  setName,
  setSearch,
  set,
} from "./reducers/counter/todoSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const data = useSelector((state) => state.todo.data);
  const idx = useSelector((state) => state.todo.idx);
  const name = useSelector((state) => state.todo.name);
  const age = useSelector((state) => state.todo.age);
  const search = useSelector((state) => state.todo.search);
  const filStatus = useSelector((state) => state.todo.filStatus);
  const dispatch = useDispatch();
  function postUser(e) {
    e.preventDefault();
    let user = {
      name: e.target.name.value,
      age: e.target.age.value,
      id: Date.now(),
      status: false,
    };
    handleClose();
    dispatch(addUser(user));
  }

  function editFun() {
    let user = {
      name: name,
      age: age,
      id: idx,
    };
    handleClose2();
    dispatch(editUser(user));
  }
  return (
    <>
      <div className="flex justify-center items-center gap-x-[30px]">
        <Button onClick={handleOpen}>Add User</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add User
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form onSubmit={postUser}>
                <input
                  className="block border-[1px] p-[5px_10px] border-[gray]"
                  placeholder="Name"
                  type="text"
                  name="name"
                />
                <input
                  className="block border-[1px] mt-[10px] p-[5px_10px] border-[gray]"
                  placeholder="Ege"
                  type="text"
                  name="age"
                />
                <button
                  className="bg-[green] p-[5px_20px] text-white mt-[10px]"
                  type="submit"
                >
                  Add
                </button>
              </form>
            </Typography>
          </Box>
        </Modal>

        <input
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          type="search"
          placeholder="Search"
          className="border-[1px] ml-[10px] p-[5px_10px] border-[gray] pl-[10px]"
        />

        <div className="">
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filStatus}
                label="Age"
                onChange={(e)=> dispatch(set({
                  name: 'filAge',
                  value: (e.target.value)
                }))}
              >
                <MenuItem value={9}>9+</MenuItem>
                <MenuItem value={12}>12+</MenuItem>
                <MenuItem value={16}>16+</MenuItem>
                <MenuItem value={18}>18+</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <div className="">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell align="right">User Age</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .filter((el) => {
                  return el.name
                    .toLowerCase()
                    .includes(search.toLowerCase().trim());
                })
                .filter((el)=> {
                  if(filStatus == ''){
                    return el
                  } else {
                    return el.age > filStatus;
                  }
                })
                .map((el) => (
                  <TableRow
                    key={el.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {el.name}
                    </TableCell>

                    <TableCell align="right">{el.age}</TableCell>

                    <TableCell align="center" component="th" scope="row">
                      {el.status == false ? (
                        <div
                          onClick={() => dispatch(check(el.id))}
                          className="h-[25px] w-[80px] flex items-center justify-center text-white bg-[gray]"
                        >
                          INACTIVE
                        </div>
                      ) : (
                        <div
                          onClick={() => dispatch(check(el.id))}
                          className="h-[25px] w-[70px] flex items-center justify-center text-white bg-[green]"
                        >
                          ACTIVE
                        </div>
                      )}
                    </TableCell>

                    <TableCell align="right">
                      <Button
                        onClick={() => dispatch(delUser(el.id))}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>

                      <div className="inline ml-[10px]">
                        <Button
                          onClick={() => {
                            handleOpen2(),
                              dispatch(setIdx(el.id)),
                              dispatch(setName(el.name)),
                              dispatch(setAge(el.age));
                          }}
                          variant="contained"
                          endIcon={<ModeEditIcon />}
                        >
                          Edit
                        </Button>
                      </div>

                      <input
                        onClick={() => dispatch(check(el.id))}
                        className="ml-[10px] size-4"
                        type="checkbox"
                        checked={el.status}
                      />

                      <Modal
                        open={open2}
                        onClose={handleClose2}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                          >
                            Edit User
                          </Typography>
                          <Typography
                            id="modal-modal-description"
                            sx={{ mt: 2 }}
                          >
                            <input
                              value={name}
                              onChange={(e) =>
                                dispatch(setName(e.target.value))
                              }
                              className="block border-[1px] p-[5px_10px] border-[gray]"
                              placeholder="Name"
                              type="text"
                              name="name"
                            />
                            <input
                              value={age}
                              onChange={(e) => dispatch(setAge(e.target.value))}
                              className="block border-[1px] mt-[10px] p-[5px_10px] border-[gray]"
                              placeholder="Ege"
                              type="text"
                              name="age"
                            />
                            <button
                              className="bg-[green] p-[5px_20px] text-white mt-[10px]"
                              onClick={editFun}
                            >
                              Edit
                            </button>
                          </Typography>
                        </Box>
                      </Modal>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default App;
