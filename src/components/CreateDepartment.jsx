import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState } from "react";

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

export default function CreateDepartment({
  createdepaModal,
  setcreatedepaModal,
}) {
  const handleClose = () => setcreatedepaModal(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("jwt"));
    const body = {
      name: values.name,
      description: values.description,
    };
    axios
      .post("http://localhost:8000/department/create", body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        console.log(res);
        setcreatedepaModal(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Modal
        open={createdepaModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
              Create Department
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
