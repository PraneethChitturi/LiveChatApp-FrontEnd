import React from 'react'
import { Avatar, Badge, Box, Stack, Typography, styled, useTheme,IconButton } from "@mui/material";
import { faker } from "@faker-js/faker";
import StyledBadge from './StyledBadge';
import { ArrowDownLeft,ArrowUpRight,Phone ,VideoCamera} from 'phosphor-react'

const CallLogElement = ({online,incoming,missed}) => {
  const theme = useTheme();
  return (
    <>
        <Box sx={{width:"100%",
        borderRadius:1,
        backgroundColor:theme.palette.mode==="light"?"#fff":theme.palette.background.default,
        }}
        p={2}>
            <Stack direction="row" alignItem={"center"} justifyContent={"space-between"}>
            <Stack spacing={2} direction="row" alignItem={"center"}>
                {online?<StyledBadge overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot">
                        <Avatar src={faker.image.avatar()} />
                    </StyledBadge>:<Avatar src={faker.image.avatar()} />}

                <Stack spacing={.3}>
                <Typography variant="subtitle2">
                    {faker.name.fullName()}
                </Typography>
                {/*<Typography variant="caption">
                        {msg}
                </Typography>*/}
                <Stack direction="row" alignItems="center" spacing={1}>
                {incoming?<ArrowDownLeft color={missed?"red":"green"}/>: <ArrowUpRight color={missed?"red":"green"}/>}
                    <Typography variant="caption"> Yesterday</Typography>
                </Stack>
                </Stack>
                
                
            </Stack>
            <IconButton>
                <Phone color="green"/>
            </IconButton>
            </Stack>
        </Box>
    </>
  )
}

const CallElement = ({online}) => {
    const theme = useTheme();
    return (
      <>
        <Box sx={{width:"100%",
        borderRadius:1,
        backgroundColor:theme.palette.mode==="light"?"#fff":theme.palette.background.default,
        }}
        p={2}>
            <Stack direction="row" alignItem={"center"} justifyContent={"space-between"}>
            <Stack spacing={2} direction="row" alignItem={"center"}>
                {online?<StyledBadge overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot">
                        <Avatar src={faker.image.avatar()} />
                    </StyledBadge>:<Avatar src={faker.image.avatar()} />}

                <Stack spacing={.3}>
                <Typography variant="subtitle2">
                    {faker.name.fullName()}
                </Typography>
                {/*<Typography variant="caption">
                        {msg}
                </Typography>*/}
                
                </Stack>
                
                
            </Stack>
            <Stack direction="row" alignItems={"center"}>
                <IconButton>
                    <Phone color="green" />
                </IconButton>
                <IconButton>
                    <VideoCamera color="green"/>
                </IconButton>
            </Stack>
            </Stack>
        </Box>
      </>
    )
  }

export {CallElement,CallLogElement}