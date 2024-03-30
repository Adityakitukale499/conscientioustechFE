import { useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    email: "",
    role: "",
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
    axios
      .post("http://localhost:8000/auth/login", {
        email: values.email,
        password: values.password,
        isManager: values.role == "manager",
      })
      .then((res) => {
        // console.log(res?.data?.token);
        localStorage.setItem("jwt", res?.data?.token);
        localStorage.setItem("role", values.role);
        navigate("/employeelist");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="container">
      <div className="form-container">
        <p className="heading">Login</p>
        <form className="register-form" onSubmit={handleSubmit}>
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
            Login
          </button>
          <p className="redirect">
            Don t have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
}
export default Login;
