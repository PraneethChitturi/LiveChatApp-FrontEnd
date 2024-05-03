import { Dialog, DialogContent, Stack, Tab, Tabs } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FetchFriendRequests, FetchFriends, FetchUsers } from '../../redux/slices/app';
import { FriendRequestComponent, UserComponent,FriendComponent } from '../../components/Friends';

const UsersList=()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(FetchUsers());
    },[])

    const {users} = useSelector((state)=>state.app)
    return (
        <>
            {users.map((el,idx)=>{
                return <UserComponent key={el._id} {...el} />
            })}
        </>
    )
}
const FriendsList=()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(FetchFriends());
    },[])

    const {friends} = useSelector((state)=>state.app)
    return (
        <>
            {friends.map((el,idx)=>{
                return <FriendComponent key={el._id} {...el}/>
            })}
        </>
    )
}
const RequestsList=()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(FetchFriendRequests());
    },[])

    const {friendRequests} = useSelector((state)=>state.app)
    //el => {_id,sender:{_id,firstName,...},receiver:{_id,fistName,....}}
    return (
        <> 
            {friendRequests.map((el,idx)=>{
                return <FriendRequestComponent key={el._id} {...el.sender} id={el._id}/>
            })}
        </>
    )
}

const Friends = ({open,handleClose}) => {
    const [value,setValue] = useState(0);

    const handleChange = (event,newValue)=>{
        setValue(newValue)

    }
  return (
    <Dialog fullWidth maxWidth="xs" open={open} keepMounted onClose={handleClose}
    sx={{p:4}}>
        <Stack p={2} sx={{width:"100%"}}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Explore"/>
                <Tab label="Friends"/>
                <Tab label="Requests"/>

            </Tabs>

        </Stack>

        {/*Dialog Content*/}
        <DialogContent>
            <Stack sx={{height:"100%"}}>
                <Stack spacing={.5}>
                    {(()=>{
                        switch(value){
                            case 0: //Display All Users
                                return <UsersList />

                            case 1: //Display All Friends
                                return <FriendsList />

                            case 2: //Display All Friend Requests
                                return <RequestsList />

                            default:

                        }
                    })()}
                </Stack>
            </Stack>
        </DialogContent>
    </Dialog>
  )
}

export default Friends