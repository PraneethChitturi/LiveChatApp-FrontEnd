import { useTheme } from '@emotion/react'
import { Box, Button, Divider, Grid, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import { dispatch } from '../redux/store';
import { ToggleSiderbar, UpdateSiderbarType } from '../redux/slices/app';
import { CaretLeft, X } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { faker } from '@faker-js/faker';
import { DocMsg, LinkMsg } from './Conversation/MsgTypes';
import { SHARED_DOCS, SHARED_LINKS } from '../data';
import Message from './Conversation/Message';

const StarredMessages = () => {
    const theme=useTheme();
    const dispatch = useDispatch();

  return (
    <Box sx={{width:320, height:"100vh"}}>
        <Stack sx={{height:'100%'}} spacing={.5}>
            <Box sx={{
                boxShadow:"0px 0px 2px rgba(0,0,0,0.25)",
                width:"100%",
                backgroundColor:theme.palette.mode==='light'?"#F8FAFF":theme.palette.background,
            }}>
            <Stack sx={{height:"100%",p:2}} direction="row" alignItems={"center"} spacing={3}>
                <IconButton onClick={()=>{
                    dispatch(UpdateSiderbarType('CONTACT'))
                }}>
                <CaretLeft />
                </IconButton>
                <Typography variant="subtitle2">Starred Messages</Typography>
                
            </Stack> 
            </Box>

            <Stack sx={{height:"100%",position:"relative",flexGrow:1,overflowY:"scroll"}} p={3} spacing={3}>
                    <Message />
                 </Stack>
        </Stack>
    </Box>
  )
}

export default StarredMessages