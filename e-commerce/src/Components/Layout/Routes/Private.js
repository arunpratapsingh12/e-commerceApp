import React from 'react'
import { useEffect,useState } from 'react'
import { useAuth } from '../../../context/auth'
import axios from 'axios'
import { Outlet } from 'react-router';
import Spinner from '../Spiner';






export const Private = () => {
  const [auth] = useAuth();
  const [ok, setok] = useState(false);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/v1/auth/user-auth");
      // console.log(res.data);

      if (res.data.ok) {
        setok(true);
      } else {
        setok(false);
      }
    };

    if (auth?.token) authCheck();
   
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};