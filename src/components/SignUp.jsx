import { useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import axios from "axios";
function SignUp() {
  const navigate = useNavigate();
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
      .post("http://localhost:8000/auth/signup", body)
      .then((res) => {
        console.log(res);
        navigate("/login");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container">
      <div className="form-container">
        <p className="heading">Sign Up</p>
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
            Register
          </button>
          <p className="redirect">
            If you already have an account with{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
