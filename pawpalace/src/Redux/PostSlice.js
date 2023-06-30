import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
	name: "post",
	initialState: {
		allPosts: [],
		openPostModal: false,
	},
	reducers: {
		getAllPosts: (state, action) => {
			state.allPosts = action.payload;
		},
		handlePostModal: (state) => {
			state.openPostModal = !state.openPostModal;
		},
	},
});

export const { getAllPosts, handlePostModal } = PostSlice.actions;
export default PostSlice;
