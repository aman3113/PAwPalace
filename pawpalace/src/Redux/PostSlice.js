import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
	name: "post",
	initialState: {
		allPosts: [],
	},
	reducers: {
		getAllPosts: (state, action) => {
			state.allPosts = action.payload;
		},
	},
});

export const { getAllPosts } = PostSlice.actions;
export default PostSlice;
