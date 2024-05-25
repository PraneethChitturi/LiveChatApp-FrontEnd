import React, { useEffect, useState } from 'react'
import {Box, Typography,Stack, IconButton,InputBase, Button, Divider, Avatar,Badge} from '@mui/material';
import typography from '../../theme/typography';
import {ArchiveBox, CircleDashed, MagnifyingGlass, Users} from "phosphor-react";
import {styled,alpha} from '@mui/material/styles';
import { faker } from '@faker-js/faker';
import { ChatList } from '../../data';
import {SimpleBarStyle} from '../../components/Scrollbar';
import { useTheme } from '@emotion/react';
import ChatElement from '../../components/ChatElement';
import Friends from '../../sections/main/Friends';
import { socket } from '../../socket';
import { useDispatch, useSelector } from 'react-redux';
import { FetchDirectConversations } from '../../redux/slices/conversation';


const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.background.default, 1),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
  }));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      width: "100%",
    },
  }));

const user_id = window.localStorage.getItem("user_id")

const Chats = () => {
    const {conversations} = useSelector((state)=>state.conversation.direct_chat)
    const theme = useTheme();
    const [openDialog,setOpenDialog] = useState(false);
    const dispatch = useDispatch();
    const handleCloseDialog = ()=>{
      setOpenDialog(false)
    }

    const handleOpenDialog = ()=>{
      setOpenDialog(true)
    }

    useEffect(() => {
      socket.emit("get_direct_conversations", { user_id }, (data) => {
        console.log(data); // this data is the list of conversations
        // dispatch action
  
        dispatch(FetchDirectConversations({ conversations: data }));
      });
    }, []);

  return (
    <>
    <Box
        sx={{
          position: "relative",
          
          width:320,
          backgroundColor:theme.palette.mode==="light"?"#F8FAFF":theme.palette.background.paper,

          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
      <Stack p={3} spacing={2} sx={{height: "100vh",}}>
      <Stack direction="row" alignItems={"center"} justifyContent="space-between">
        <Typography variant="h5" >Chat</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton onClick={()=>{
            handleOpenDialog();
          }}>
            <Users />
          </IconButton>
          <IconButton><CircleDashed /></IconButton>
        </Stack>

      </Stack>
      <Stack sx={{width:"100%"}}>
        <Search>
            <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6"/>
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search..." />
        </Search>
      </Stack>
      <Stack spacing={1}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
        <ArchiveBox size={24} />
        <Button> Archive </Button>
        </Stack>
        <Divider />
      </Stack>
      <Stack spacing={2} 
      direction="column"
      sx={{flexGrow:1,overflow:"scroll",height:"100%"}}>
      <SimpleBarStyle timeout={500} clickOnTrack={false}>
      {/*
      <Stack spacing={2.4}>
        <Typography variant="subtitle2" sx={{color:"#676767"}}>Pinned</Typography>
        {ChatList.filter((el)=>el.pinned).map((el)=>{
            return <ChatElement {...el}/>
        })}
      </Stack> 
      */}
      <Stack spacing={2.4}>
        <Typography variant="subtitle2" sx={{color:"#676767"}}>All Chats</Typography>
        {conversations.filter((el)=>!el.pinned).map((el)=>{
            return <ChatElement {...el}/>
        })}
      </Stack>
        </SimpleBarStyle>
      </Stack>
      </Stack>
    </Box>

    {openDialog && <Friends open={openDialog} handleClose={handleCloseDialog}/>

    }

    </>
  )
}

export default Chats