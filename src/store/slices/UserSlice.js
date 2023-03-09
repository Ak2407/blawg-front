import { createSlice } from "@reduxjs/toolkit";
import { Link, useNavigate } from "react-router-dom";


const userSlice = createSlice({
  name: "user",
  initialState: [{
    name : "",
    bio : "",
    email : "",
    password : "",
    job : "",
    user : ""
  }],
  reducers: {
    addUser(state, action) {
      state.push(action.payload);
      
    },
    removeUser(state,action){
      localStorage.removeItem("TOKEN");
      return [];
    }
  },
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
