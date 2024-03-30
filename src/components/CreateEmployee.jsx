import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function CreateEmployee({ createModal, setcreateModal }) {
  const handleClose = () => setcreateModal(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    role: "",
    location: "",
    age: "",
  });
  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      location: values.location,
      age: Number(values.age),
      isManager: values.role == "manager",
    };
    axios
      .post("http://localhost:8000/employee/create", body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setcreateModal(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Modal
        open={createModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              className="form-field"
              type="text"
              placeholder="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleInputChange}
            />
            <input
              className="form-field"
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleInputChange}
            />
            <input
              className="form-field"
              type="email"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
            />
            <input
              className="form-field"
              type="text"
              placeholder="Location"
              name="location"
              value={values.location}
              onChange={handleInputChange}
            />
            <input
              className="form-field"
              type="number"
              placeholder="Age"
              name="age"
              value={values.age}
              onChange={handleInputChange}
            />
            <input
              className="form-field"
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
            />
            <select
              className="form-field selectrole"
              value={values.role}
              onChange={handleInputChange}
              name="role"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
            <button className="form-field submitButton" type="submit">
              Create Employee
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
