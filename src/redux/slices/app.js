import { createSlice } from "@reduxjs/toolkit";
import axios from '../../utils/axios';

//dispatch
//import { dispatch } from '../store';

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED, SHARED
      },
    snackbar: {
        open: null,
        message: null,
        severity: null,
    },
    users:[],
    friends:[],
    friendRequests:[],
}

const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.sidebar.open = !state.sidebar.open;
          },
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload.type;
          },
        openSnackbar(state,action){
            state.snackbar.open = true;
            state.snackbar.severity = action.payload.severity;
            state.snackbar.message = action.payload.message;
        },
        closeSnackbar(state,action){
            state.snackbar.open  = false;
            state.snackbar.severity = null;
            state.snackbar.message = null;
        },
        updateUsers(state,action){
            state.users = action.payload.users
        },
        updateFriends(state,action){
            state.friends = action.payload.friends;
        },
        updateFriendRequests(state,action){
            state.friendRequests = action.payload.request;
        },
    }
})

//Reducer
export default slice.reducer;

//Actions
export function ToggleSiderbar () {
    return async (dispatch,getState)=>{
        dispatch(slice.actions.toggleSidebar())
    }
}

export function UpdateSiderbarType (type) {
    return async (dispatch,getState)=>{
        dispatch(slice.actions.updateSidebarType({type} ))
    }
}

export function showSnackbar ({severity,message}) {
    return async (dispatch,getState)=>{
        dispatch(slice.actions.openSnackbar({severity,message}))
        
        setTimeout(()=>{
        dispatch(slice.actions.closeSnackbar());
    },4000)
    }

    
}

export function closeSnackbar () {
    return async (dispatch,getState)=>{
        dispatch(slice.actions.closeSnackbar())
    }
}


export function FetchUsers (){
    return async (dispatch,getState)=>{
        await axios.get("/user/get-users",{
            headers: {
                "Content-Type":"application/json",
                authorization:`Bearer ${getState().auth.token}`
            }
        }).then((response)=>{
            console.log(response)
            dispatch(slice.actions.updateUsers({users:response.data.data}))
        }).catch((error)=>{
            console.log(error)
        })
    }
}


export function FetchFriends (){
    return async (dispatch,getState)=>{
        await axios.get("/user/get-friends",{
            headers: {
                "Content-Type":"application/json",
                authorization:`Bearer ${getState().auth.token}`
            }
        }).then((response)=>{
            console.log(response)
            dispatch(slice.actions.updateUsers({friends:response.data.data}))
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export function FetchFriendRequests (){
    return async (dispatch,getState)=>{
        await axios.get("/user/get-friend-requests",{
            headers: {
                "Content-Type":"application/json",
                authorization:`Bearer ${getState().auth.token}`
            }
        }).then((response)=>{
            console.log(response)
            dispatch(slice.actions.updateFriendRequests({request:response.data.data}))
        }).catch((error)=>{
            console.log(error)
        })
    }
}