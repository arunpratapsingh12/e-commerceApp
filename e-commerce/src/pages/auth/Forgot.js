import React, { useState } from "react";
import Layout from "../../Components/Layout";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import toast from "react-hot-toast";
import "../../style/authstyle.css";


const Forgot = () => {
  const [email, setEmail] = useState("");
    const [Newpassward, setNewpassward] = useState("");
     const [answer, setanswer] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-passward", {
        email,
        Newpassward,
        answer,
      });

  

        if (res && res.data.success) {
          toast.success(res.data && res.data.message);

          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
    } catch (error) {
      console.log(error);
      toast.error("something is wrong");
    }
  };

  return (
    <Layout title="forgot - Ecommer App">
      <div className="form-container ">
        <form onSubmit={submitHandler}>
          <h4 className="title">RESET FORM</h4>

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
              value={Newpassward}
              onChange={(e) => {
                
                setNewpassward(e.target.value);
              }}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your passward"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => {
           
                setanswer(e.target.value);
              }}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Bestfriend Name"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Forgot;
