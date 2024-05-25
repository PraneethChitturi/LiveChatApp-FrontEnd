import { Box,Menu,Fade, Stack,Avatar,MenuItem,Badge, Typography, IconButton, Divider, TextField, InputAdornment, Fab, Tooltip} from '@mui/material';
import React, { useState,useRef } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../socket';

const StyledInput = styled(TextField)(({theme})=>({
     "& .MuiInputBase-input":{
        paddingTop: "12px",
        paddingBottom:"12px",
     }
}));

const Conversation_Menu = [
    {
      title: "Contact info",
    },
    {
      title: "Mute notifications",
    },
    {
      title: "Clear messages",
    },
    {
      title: "Delete chat",
    },
  ];

  
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
 
  const ChatInput = ({
    openPicker,
    setOpenPicker,
    setValue,
    value,
    inputRef,
  }) => {
    const [openActions, setOpenActions] = React.useState(false);
  
    return (
      <StyledInput
        inputRef={inputRef}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        fullWidth
        placeholder="Write a message..."
        variant="filled"
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <Stack sx={{ width: "max-content" }}>
              <Stack
                sx={{
                  position: "relative",
                  display: openActions ? "inline-block" : "none",
                }}
              >
                {Actions.map((el) => (
                  <Tooltip placement="right" title={el.title}>
                    <Fab
                      onClick={() => {
                        setOpenActions(!openActions);
                      }}
                      sx={{
                        position: "absolute",
                        top: -el.y,
                        backgroundColor: el.color,
                      }}
                      aria-label="add"
                    >
                      {el.icon}
                    </Fab>
                  </Tooltip>
                ))}
              </Stack>
  
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setOpenActions(!openActions);
                  }}
                >
                  <LinkSimple />
                </IconButton>
              </InputAdornment>
            </Stack>
          ),
          endAdornment: (
            <Stack sx={{ position: "relative" }}>
              <InputAdornment>
                <IconButton
                  onClick={() => {
                    setOpenPicker(!openPicker);
                  }}
                >
                  <Smiley />
                </IconButton>
              </InputAdornment>
            </Stack>
          ),
        }}
      />
    );
  };
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

function linkify(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(
      urlRegex,
      (url) => `<a href="${url}" target="_blank">${url}</a>`
    );
  }
  
  function containsUrl(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return urlRegex.test(text);
  }
  
const Conversation = () => {
    const theme = useTheme();
    const [openPicker, setOpenPicker] = useState(false);
    const dispatch = useDispatch();
    const {current_conversation} = useSelector((state) => state.conversation.direct_chat);

    const [conversationMenuAnchorEl, setConversationMenuAnchorEl] =
    React.useState(null);
    const openConversationMenu = Boolean(conversationMenuAnchorEl);
    const handleClickConversationMenu = (event) => {
        setConversationMenuAnchorEl(event.currentTarget);
    };
    const handleCloseConversationMenu = () => {
        setConversationMenuAnchorEl(null);
    };

    const user_id = window.localStorage.getItem("user_id");


    const { room_id } = useSelector((state) => state.app);

    const [value, setValue] = useState("");
  const inputRef = useRef(null);

  function handleEmojiClick(emoji) {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setValue(
        value.substring(0, selectionStart) +
          emoji +
          value.substring(selectionEnd)
      );

      // Move the cursor to the end of the inserted emoji
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  }

  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
         <Box
        p={2}
        width={"100%"}
        sx={{
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F8FAFF"
              : theme.palette.background,
          boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack
          alignItems={"center"}
          direction={"row"}
          sx={{ width: "100%", height: "100%" }}
          justifyContent="space-between"
        >
          <Stack
            onClick={() => {
              dispatch(ToggleSiderbar());
            }}
            spacing={2}
            direction="row"
          >
            <Box>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar
                  alt={current_conversation?.name}
                  src={current_conversation?.img}
                />
              </StyledBadge>
            </Box>
            <Stack spacing={0.2}>
              <Typography variant="subtitle2">
                {current_conversation?.name}
              </Typography>
              <Typography variant="caption">Online</Typography>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            alignItems="center"
        
          >
            <IconButton onClick={()=>{}}
            >
              <VideoCamera />
            </IconButton>
            <IconButton
             onClick={()=>{}}
            >
              <Phone />
            </IconButton>
            
              <IconButton>
                <MagnifyingGlass />
              </IconButton>

            <Divider orientation="vertical" flexItem />
            <IconButton
              id="conversation-positioned-button"
              aria-controls={
                openConversationMenu
                  ? "conversation-positioned-menu"
                  : undefined
              }
              aria-haspopup="true"
              aria-expanded={openConversationMenu ? "true" : undefined}
              onClick={handleClickConversationMenu}
            >
              <CaretDown />
            </IconButton>
            <Menu
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              TransitionComponent={Fade}
              id="conversation-positioned-menu"
              aria-labelledby="conversation-positioned-button"
              anchorEl={conversationMenuAnchorEl}
              open={openConversationMenu}
              onClose={handleCloseConversationMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box p={1}>
                <Stack spacing={1}>
                  {Conversation_Menu.map((el) => (
                    <MenuItem onClick={handleCloseConversationMenu}>
                      <Stack
                        sx={{ minWidth: 100 }}
                        direction="row"
                        alignItems={"center"}
                        justifyContent="space-between"
                      >
                        <span>{el.title}</span>
                      </Stack>{" "}
                    </MenuItem>
                  ))}
                </Stack>
              </Box>
            </Menu>
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
                    <ChatInput inputRef={inputRef}
              value={value}
              setValue={setValue}
              openPicker={openPicker}
              setOpenPicker={setOpenPicker}/>
                </Stack>
                
                <Box sx={{height:48,width:48,backgroundColor:theme.palette.primary.main,borderRadius:1.5}}>
                <Stack sx={{height:"100%",width:"100%"}} alignItems={"center"} justifyContent={"center"}>
                    <IconButton onClick={() => {
                    console.log(value)
                  socket.emit("text_message", {
                    message: value,
                    conversation_id: room_id,
                    from: user_id,
                    to: current_conversation.user_id,
                    type: "Text",
                  });
                }}>
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