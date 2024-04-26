import React from 'react'
import { Box, Stack, Typography, Link, IconButton, Divider} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import { CaretLeft, Plus } from 'phosphor-react'
import ProfileForm from '../../sections/setting/ProfileForm'

const Profile = () => {
    const theme = useTheme();
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
            <Stack p={4} spacing={5}>
            {/*Header*/}
                <Stack direction="row" alignItems="center" spacing={3}>
                    <IconButton>
                        <CaretLeft size={24} color={"#4B4B4B"}/>
                    </IconButton>
                    <Typography variant="h5">Profile</Typography>
                </Stack>

            {/*Profile Form*/}
                <ProfileForm/>
            </Stack>
            </Box>
        </Stack>
    </>
  )
}

export default Profile