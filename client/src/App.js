import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const ENDPOINT = "http://localhost:5500/api/auth/login";

  const notifySuccess = (data) => {
    toast.success("Success!" + data.message);
  };

  const notifyError = (data) => {
    toast.error("Error!" + data.message);
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(ENDPOINT, user, {
        withCredentials: true,
      })
      .then((res) => {
        notifySuccess(res.data);
      })
      .catch((err) => {
        notifyError(err.response.data);
      });
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Form login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="text" name="email" onChange={handleChange} />
        <label>Password:</label>
        <input type="password" name="password" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};
export default App;
