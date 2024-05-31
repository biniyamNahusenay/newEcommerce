import {createSlice} from "@reduxjs/toolkit"
import appApi from "../services/appApi"

const initialState = null;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addMatcher(appApi.endpoints.signup.matchFulfilled,(_,{payload})=>payload) //extract the state we dont nedd it
        builder.addMatcher(appApi.endpoints.login.matchFulfilled,(_,{payload})=>payload)
    }
})

export const {} = userSlice.actions
export default userSlice.reducer;