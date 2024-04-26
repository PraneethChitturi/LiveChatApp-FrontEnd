import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {Box,IconButton,Stack,Divider,Switch,Avatar,styled} from '@mui/material'
import {Navigate} from 'react-router-dom';

import SideBar from "./SideBar";
import { useSelector } from "react-redux";


const DashboardLayout = () => {

  const {isLoggedIn} = useSelector((state)=> state.auth);

  if(!isLoggedIn){
    return <Navigate to="/auth/login" />
  }
  return (
    <Stack direction="row">
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
