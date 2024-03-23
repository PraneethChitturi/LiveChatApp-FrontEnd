import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {Box,IconButton,Stack,Divider,Switch,Avatar,styled} from '@mui/material'

import SideBar from "./SideBar";

const DashboardLayout = () => {
  return (
    <Stack direction="row">
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
