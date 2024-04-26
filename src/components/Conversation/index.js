import { Box, Stack,Avatar,Badge, Typography, IconButton, Divider, TextField, InputAdornment, Fab, Tooltip} from '@mui/material';
import React, { useState } from 'react'
import {faker} from "@faker-js/faker";
import {styled,alpha,useTheme} from '@mui/material/styles';
import { CaretDown, LinkSimple, MagnifyingGlass, PaperPlaneTilt, Phone, Smiley, VideoCamera } from 'phosphor-react';
import Header from './Header';
import Message from './Message';

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

import {
    Camera,
    File,
    Image,
    Sticker,
    User,
  } from "phosphor-react";
import { ToggleSiderbar } from '../../redux/slices/app';
import { useDispatch } from 'react-redux';

const StyledInput = styled(TextField)(({theme})=>({
     "& .MuiInputBase-input":{
        paddingTop: "12px",
        paddingBottom:"12px",
     }
}));

const Actions = [
    {
      color: "#4da5fe",
      icon: <Image size={24} />,
      y: 102,
      title: "Photo/Video",
    },
    {
      color: "#1b8cfe",
      icon: <Sticker size={24} />,
      y: 172,
      title: "Stickers",
    },
    {
      color: "#0172e4",
      icon: <Camera size={24} />,
      y: 242,
      title: "Image",
    },
    {
      color: "#0159b2",
      icon: <File size={24} />,
      y: 312,
      title: "Document",
    },
    {
      color: "#013f7f",
      icon: <User size={24} />,
      y: 382,
      title: "Contact",
    },
  ];
 

const ChatInput = ({setOpenPicker}) => {
    const [openActions,setOpenActions] = useState(false);

    return (<StyledInput fullWidth placeholder='Write a message...' variant="filled" InputProps={{
        disableUnderline:true,
        startAdornment: 
        <Stack>
            <Stack sx={{position:"relative",display:openActions?"inline-block":"none"}}>
            {Actions.map((el)=>{
                return (
                    <Tooltip title={el.title} placement='right'>
                        <Fab sx={{position:"absolute",top:-el.y,backgroundColor:el.color}}>
                            {el.icon}
                        </Fab>
                    </Tooltip>
                )
            })}

            </Stack>
            <InputAdornment>
                <IconButton>
                    <LinkSimple onClick={() =>{
                        setOpenActions((prev)=>!prev);
                    }}/>
                </IconButton>
            </InputAdornment>
        </Stack>,
        endAdornment:<InputAdornment>
            <IconButton onClick={()=>{
                setOpenPicker((prev)=>!prev);
            }}>
                <Smiley />
            </IconButton>
        </InputAdornment>
    }}/>)
}
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));


const Conversation = () => {
    const theme = useTheme();
    const [openPicker, setOpenPicker] = useState(false);
    const dispatch = useDispatch();

  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
        <Box p={2} sx={{
        width:"100%",
        backgroundColor:theme.palette.mode==="light"? "#F8FAFF":theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)"}}>
        <Stack alignItems={"center"} 
        direction="row" 
        justifyContent={"space-between"} sx={{width:"100%",height:"100%"}}>
            <Stack onClick = {()=>{
                return dispatch(ToggleSiderbar())
            }} direction={"row"} spacing={2}>
                <Box>
                    <StyledBadge overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot">
                        <Avatar alt={faker.name.fullName()} src={faker.image.avatar()}/>
                    </StyledBadge>
                
                </Box>
                <Stack spacing={.2}>
                        <Typography variant="subtitle2">{faker.name.fullName()}</Typography>
                        <Typography variant="caption">Online</Typography>
                    </Stack>
            </Stack>
            <Stack direction="row" alignItems={"center"} spacing={3}>
                <IconButton>
                    <VideoCamera />
                </IconButton>
                <IconButton>
                    <Phone />
                </IconButton>
                <IconButton>
                    <MagnifyingGlass />
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <IconButton>
                    <CaretDown />
                </IconButton>
            </Stack>
        </Stack>
        </Box>
        {/*Msg*/}
        <Box sx={{width:"100%",flexGrow:1,height:"100%",overflowY:"scroll"}}>
            <Message menu={true}/>
        </Box>
        {/*Chat Footer*/}
        <Box p={2} sx={{
        width:"100%",
        backgroundColor:theme.palette.mode==="light"? "#F8FAFF":theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)"}}>
            <Stack direction="row" alignItems={"center"} spacing={3}>
                <Stack sx={{width:"100%"}}>
                    <Box sx={{display:openPicker?"inline":"none",zIndex:10,position:"fixed",bottom:81,right:100,}}>
                        <Picker data={data} theme={theme.palette.mode} onEmojiSelect={console.log}/>
                    </Box>
                    <ChatInput setOpenPicker={setOpenPicker}/>
                </Stack>
                
                <Box sx={{height:48,width:48,backgroundColor:theme.palette.primary.main,borderRadius:1.5}}>
                <Stack sx={{height:"100%",width:"100%"}} alignItems={"center"} justifyContent={"center"}>
                    <IconButton>
                        <PaperPlaneTilt color="#fff" />
                    </IconButton>
                    </Stack>
                </Box>
            </Stack>
        </Box>

    </Stack>
  )
}

export default Conversation;