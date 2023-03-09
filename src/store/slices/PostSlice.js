import { createSlice } from "@reduxjs/toolkit";


const postSlice = createSlice({
  name: "post",
  initialState: [{
    postId : " ",
    authorId : " "
  }],
  reducers: {
    addPost(state, action) {
      state.push(action.payload);
      
    },
    removePost(state,action){
      return [];
    }
  },
});

export default postSlice.reducer;
export const { addPost, removePost } = postSlice.actions;
