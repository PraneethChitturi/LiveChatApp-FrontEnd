import { createSlice } from "@reduxjs/toolkit";

//dispatch
//import { dispatch } from '../store';

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT", // can be CONTACT, STARRED, SHARED
      },
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