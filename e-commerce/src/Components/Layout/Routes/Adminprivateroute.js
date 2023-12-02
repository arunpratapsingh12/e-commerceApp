import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import { Outlet } from "react-router";
import Spinner from "../Spiner";

export const Adminprivateroute = () => {
  const [auth] = useAuth();
  const [ok, setok] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "http://localhost:8080/api/v1/auth/admin-auth"
        
      );
     
      if (res.data.ok) {
        setok(true);
      } else {
        setok(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};
