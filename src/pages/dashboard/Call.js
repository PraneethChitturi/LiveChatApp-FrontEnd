import { Box, Stack, Typography, Link, IconButton, Divider} from '@mui/material'
import React, { useState } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Plus } from 'phosphor-react'
import {useTheme} from '@mui/material/styles'
import { SimpleBarStyle } from '../../components/Scrollbar'
import { CallLogs, ChatList } from '../../data'
import ChatElement from '../../components/ChatElement'
import Conversation from '../../components/Conversation'
import { useSelector } from "react-redux";
import Contact from '../../components/Contact'
import StarredMessages from '../../components/StarredMessages'
import SharedMessages from '../../components/SharedMessages'
import CreateGroup from '../../sections/main/CreateGroup'
import { CallLogElement } from '../../components/CallElement'
import StartCall from '../../sections/main/StartCall'

const Call = () => {
  const theme = useTheme();
  const [openDialog,setOpenDialog] = useState(false);

  const handleCloseDialog = ()=>{
      setOpenDialog(false)
  }

  return (
    <>
      <Stack direction={"row"} sx={{width:"100%"}}>
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
                        <Typography variant="h5">Call Logs</Typography>
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
                            Start Call
                        </Typography>
                        <IconButton onClick={()=>{
                            setOpenDialog(true)
                        }}>
                            <Plus style={{color:theme.palette.primary.main}} />
                        </IconButton>
                    </Stack>
                    <Divider/>
                    <Stack spacing={2} 
                    direction="column"
                    sx={{flexGrow:1,overflowY:"scroll",height:"100%"}}>
                    <SimpleBarStyle timeout={500} clickOnTrack={false}>
                            <Stack spacing={2.5} p={2.5}>
                              
                                {/* Call Logs */}
                                {CallLogs.map((el)=>{
                                  return (
                                  <CallLogElement {...el}/>
                                  )
                                })}
                                
                            </Stack>

                    </SimpleBarStyle>
                    </Stack>
                </Stack>    
            </Box>
            {openDialog && <StartCall open={openDialog} handleClose={handleCloseDialog}/>}
            </Stack>
    </>
  )
}

export default Call