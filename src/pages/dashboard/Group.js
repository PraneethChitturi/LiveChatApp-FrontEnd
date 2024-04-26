import { Box, Stack, Typography, Link, IconButton, Divider} from '@mui/material'
import React, { useState } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Plus } from 'phosphor-react'
import {useTheme} from '@mui/material/styles'
import { SimpleBarStyle } from '../../components/Scrollbar'
import { ChatList } from '../../data'
import ChatElement from '../../components/ChatElement'
import Conversation from '../../components/Conversation'
import { useSelector } from "react-redux";
import Contact from '../../components/Contact'
import StarredMessages from '../../components/StarredMessages'
import SharedMessages from '../../components/SharedMessages'
import CreateGroup from '../../sections/main/CreateGroup'

const Group = () => {
    const theme = useTheme();
    const {sidebar} = useSelector((store)=>store.app);
    const [openDialog,setOpenDialog] = useState(false);

    const handleCloseDialog = ()=>{
        setOpenDialog(false)
    }

  return (
    <>
        <Stack direction={"row"} sx={{width:"100%",height:"100%"}}>
            {/*Left*/}
            <Box
                sx={{
                position: "relative",
                height:"100%",
                width:320,
                backgroundColor:theme.palette.mode==="light"?"#F8FAFF":theme.palette.background.paper,

                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                }}
            >
                <Stack p={3} spacing={2} sx={{maxheight:"100vh"}}>
                    <Stack>
                        <Typography variant="h5">Groups</Typography>
                    </Stack>
                    <Stack sx={{width:'100%'}}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color="#709CE6"/>
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search..." />
                        </Search>
                    </Stack>
                    <Stack direction="row" justifyContent={"space-between"} alignItems="center">
                        <Typography variant="subtitle2" component={Link}>
                            Create New Group
                        </Typography>
                        <IconButton onClick={()=>{
                            setOpenDialog(true)
                        }}>
                            <Plus style={{color:theme.palette.primary.main}} />
                        </IconButton>
                    </Stack>
                    <Divider/>

                    </Stack>
                    <Stack spacing={2} 
                    direction="column"
                    sx={{flexGrow:1,overflowY:"scroll",height:"100%"}}>
                    <SimpleBarStyle timeout={500} clickOnTrack={false}>
                            <Stack spacing={2.5}>
                                <Typography variant="subtitle2" sx={{color:"#676667"}}>Pinned</Typography>
                                {ChatList.filter((el)=>el.pinned).map((el)=>{
                                    return <ChatElement {...el} />;
                                })}
                                <Typography variant="subtitle2" sx={{color:"#676667"}}>All Groups</Typography>
                                {ChatList.filter((el)=>!el.pinned).map((el)=>{
                                    return <ChatElement {...el}/>
                                })}
                            </Stack>

                    </SimpleBarStyle>
                    </Stack>
            </Box>
            {/*Right*/}
            <Box sx={{
                height:"100%",
                width:sidebar.open?"calc(100vw - 740px)":"calc(100vw - 420px)",
                backgroundColor:theme.palette.mode==="light"? "#F0F4FA":theme.palette.background.paper}}>
                <Conversation />
            </Box>
            {sidebar.open && (()=>{
          switch (sidebar.type){
            case "CONTACT":
              return <Contact />;
            case "STARRED":
              return <StarredMessages />;
            case "SHARED":
              return <SharedMessages />;
            default:
              return null;
          }})()}
        </Stack>
        {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog}/>}
        
    </>
  )
}

export default Group