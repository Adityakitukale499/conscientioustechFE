import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import EditEmployee from "./EditEmployee";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import CreateEmployee from "./CreateEmployee";
import CreateDepartment from "./CreateDepartment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const columns = [
  { id: "firstName", label: "Name" },
  { id: "role", label: "Role" },
  { id: "email", label: "Email" },
  { id: "age", label: "Age" },
  { id: "location", label: "Location" },
  // { id: "department", label: "Department" },
  localStorage.getItem("role") == "manager" && { id: "edit", label: "Edit" },
  localStorage.getItem("role") == "manager" && {
    id: "remove",
    label: "Remove",
  },
];

export default function EmployeeList() {
  const decoded = jwtDecode(localStorage.getItem("jwt"));
  const navigate = useNavigate();
  const [editModal, setEditModal] = useState(false);
  const [createModal, setcreateModal] = useState(false);
  const [createdepaModal, setcreatedepaModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [filterType, setFilterType] = useState("SEQ");
  const [filterBy, setFilterBy] = useState("NAME");
  const [editDepartment, seteditDepartment] = useState({});
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    role: "employee",
    location: "",
    age: "",
  });
  const deleteEmployee = (id) => {
    const flag = confirm("Do you want to delete this Employee");
    if (flag) {
      axios
        .delete(`http://localhost:8000/employee/delete/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          fetchemployee();
        })
        .catch((e) => console.log(e));
    }
  };

  const fetchemployee = () => {
    axios
      .get("http://localhost:8000/employee/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setEmployees(res.data.data);
        setFilterEmployees(res.data.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchemployee();
  }, [createModal, editModal]);

  const editEmployeeFun = (emp) => {
    console.log(decoded.userId);
    seteditDepartment(emp);
    setEditModal(true);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const filterFunction = () => {
    if (filterType == "SEQ") {
      setFilterEmployees(employees);
      return;
    }
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      "Content-Type": "application/json",
    };

    const apiUrl = `http://localhost:8000/employee/sort?type=${filterBy}&sort=${filterType}`;
    axios
      .get(apiUrl, {
        headers,
      })
      .then((res) => {
        console.log(res.data);
        setFilterEmployees(res.data);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "end", m: 4, gap: 2 }}>
        <FormControl sx={{ minWidth: 130 }}>
          <InputLabel id="demo-select-small-label1">Filter Type</InputLabel>
          <Select
            labelId="demo-select-small-label1"
            id="demo-select-small1"
            value={filterType}
            label="Filter Type"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value={"SEQ"}>Sequential</MenuItem>
            <MenuItem value={"ACS"}>Ascending</MenuItem>
            <MenuItem value={"DSC"}>Descending</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 130 }}>
          <InputLabel id="demo-select-small-label">Filter By</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={filterBy}
            label="Filter By"
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <MenuItem value={"NAME"}>Name</MenuItem>
            <MenuItem value={"LOC"}>Location</MenuItem>
          </Select>
        </FormControl>{" "}
        <Button
          variant="contained"
          onClick={filterFunction}
          sx={{ textTransform: "none" }}
        >
          Filter
        </Button>
        {localStorage.getItem("role") == "manager" && (
          <>
            <Button
              variant="contained"
              onClick={() => setcreateModal(true)}
              sx={{ textTransform: "none" }}
            >
              + Create Employee
            </Button>
            <Button
              variant="contained"
              onClick={() => setcreatedepaModal(true)}
              sx={{ textTransform: "none" }}
            >
              + Create Department
            </Button>{" "}
          </>
        )}
        <Button
          onClick={logout}
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          Logout
        </Button>
      </Box>
      <Paper sx={{ width: "95%", overflow: "hidden", mx: "auto", mt: 4 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={Math.random()} align={"center"}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filterEmployees.map((row) => {
                return (
                  <TableRow hover key={Math.random()}>
                    <TableCell align={"center"}>
                      {row?.firstName} {row?.lastName}
                    </TableCell>
                    <TableCell align={"center"}>
                      {row?.isManager == "Manager" ? "Manager" : "Employee"}
                    </TableCell>
                    <TableCell align={"center"}>{row?.email}</TableCell>
                    <TableCell align={"center"}>{row?.age}</TableCell>
                    <TableCell align={"center"}>{row?.location}</TableCell>
                    {/* <TableCell align={"center"}>
                      {row?.department?.name ?? "-"}
                    </TableCell> */}
                    {localStorage.getItem("role") == "manager" ? (
                      <>
                        <TableCell align={"center"}>
                          <Button onClick={() => editEmployeeFun(row)}>
                            edit
                          </Button>
                        </TableCell>
                        <TableCell align={"center"}>
                          <Button
                            sx={{ color: "red" }}
                            onClick={() => deleteEmployee(row?._id)}
                          >
                            remove
                          </Button>
                        </TableCell>
                      </>
                    ) : null}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <EditEmployee
        editModal={editModal}
        setEditModal={setEditModal}
        editDepartment={editDepartment}
      />
      <CreateEmployee
        createModal={createModal}
        setcreateModal={setcreateModal}
        values={values}
        setValues={setValues}
      />

      <CreateDepartment
        createdepaModal={createdepaModal}
        setcreatedepaModal={setcreatedepaModal}
      />
    </Box>
  );
}
