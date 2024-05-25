import { Avatar, Badge, Box, Stack, Typography, styled, useTheme } from "@mui/material";

import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
import { SelectConversaton } from "../redux/slices/app";
import { alpha } from "@mui/material/styles";
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
const ChatElement =({id,name,img,msg,time,unread,online})=> {
    const {room_id} = useSelector((state) => state.app);
    const selectedChatId = room_id?.toString();

    let isSelected = +selectedChatId === id;

    if (!selectedChatId) {
      isSelected = false;
    }
    const theme = useTheme();
    const dispatch = useDispatch();
    return (
        <Box onClick={()=>{
          dispatch(SelectConversaton({room_id:id}))
          }}sx={{width:"100%",
        borderRadius:1,
        backgroundColor: isSelected
          ? theme.palette.mode === "light"
            ? alpha(theme.palette.primary.main, 0.5)
            : theme.palette.primary.main
          : theme.palette.mode === "light"
          ? "#fff"
          : theme.palette.background.paper,
        }}
        p={1}>
        <Stack direction="row" alignItem={"center"} justifyContent="space-between">
            <Stack direction="row" spacing={2}>
            {online?<StyledBadge overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot">
                    <Avatar src={faker.image.avatar()} />
                </StyledBadge>:<Avatar src={faker.image.avatar()} />}
                
                <Stack spacing={.3}>
                    <Typography variant="subtitle2">
                        {name}
                    </Typography>
                    <Typography variant="caption">
                        {msg}
                    </Typography>
                </Stack>
            </Stack>
            <Stack spacing={2} alignItems="center">
                <Typography sx={{fontWeight:600}} variant="caption">
                    {time}
                </Typography>
                <Badge color="primary" badgeContent={unread}>

                </Badge>
            </Stack>
        </Stack>

        
        </Box>
    )
}

export default ChatElement