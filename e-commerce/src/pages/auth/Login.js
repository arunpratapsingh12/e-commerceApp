
import React, { useState } from "react";
import Layout from "../../Components/Layout";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import toast from "react-hot-toast";
import "../../style/authstyle.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [passward, setPassward] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        passward,
      });

   

      if (res && res.data.success) {
        toast.success("Login successfully");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
      } else {
        toast.error(res.data.massage);
      }
    } catch (error) {
      console.log(error);
      toast.error("something is wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container ">
        <form onSubmit={submitHandler}>
          <h4 className="title">LOGIN FORM</h4>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => {
          
                setEmail(e.target.value);
              }}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="passward"
              value={passward}
              onChange={(e) => {
                
                setPassward(e.target.value);
              }}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your passward"
              required
            />
          </div>

          <div className="mb-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
