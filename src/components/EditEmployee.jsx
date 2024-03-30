import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useEffect, useState } from "react";
import axios from "axios";

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

export default function EditEmployee({
  editModal,
  setEditModal,
  editDepartment,
}) {
  console.log(editDepartment, "gfcaydjadysufagufcsdiyacyvhdv");
  const handleClose = () => setEditModal(false);
  const [department, setDeparment] = useState();
  const [departments, setDeparments] = useState();
  const [values, setValues] = useState({
    name: "",
    description: "",
  });
  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };
  useEffect(() => {
    console.log(editDepartment, "gsfdhzsutd");
    if (!editDepartment?.department) return;
    setValues({
      name: editDepartment?.department?.name ?? "",
      description: editDepartment?.department?.description ?? "",
    });
  }, [editDepartment]);
  useEffect(() => {
    if (!department) return;
    setValues({
      name: department?.name ?? "",
      description: department?.description ?? "",
    });
  }, [department]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/department/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        console.log(res.data.departments);
        setDeparments(res.data.departments);
      })
      .catch((e) => console.log(e));
  }, [editModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (!department.name || !department.description) return;
    axios
      .post(
        `http://localhost:8000/department/assign`,
        { emp_id: editDepartment?._id ?? "", dep_id: department?._id ?? "" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setEditModal(false);
        // axios
        //   .post(
        //     `http://localhost:8000/employee/update/${editDepartment?._id}`,
        //     {
        //       department,
        //     },
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        //       },
        //     }
        //   )
        //   .then((res) => {
        //     console.log(res.data);
        //   })
        //   .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Modal
        open={editModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <FormControl sx={{ minWidth: 400 }} size="small">
            <InputLabel id="demo-select-small-label1">Department</InputLabel>
            <Select
              labelId="demo-select-small-label1"
              id="demo-select-small1"
              value={department}
              label="Department"
              onChange={(e) => setDeparment(e.target.value)}
            >
              {departments?.map((depa) => (
                <MenuItem key={Math.random()} value={depa}>
                  {depa?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              className="form-field"
              type="text"
              placeholder="Name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
            <input
              className="form-field"
              type="text"
              placeholder="Description"
              name="description"
              value={values.description}
              onChange={handleInputChange}
            />
            <button className="form-field submitButton" type="submit">
              Edit Department
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
