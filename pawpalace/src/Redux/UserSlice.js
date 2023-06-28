import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
	name: "user",
	initialState: {
		encodedToken: null,
		userDetail: null,
		allUsers: [],
	},
	reducers: {
		getToken: (state, action) => {
			state.encodedToken = action.payload;
		},
		getUser: (state, action) => {
			state.userDetail = action.payload;
		},
		getAllUsers: (state, action) => {
			state.allUsers = action.payload;
		},
		handleUserBookmark: (state, action) => {
			state.userDetail.bookmarks = action.payload;
		},
	},
});

export const { getToken, getUser, getAllUsers, handleUserBookmark } =
	UserSlice.actions;

export default UserSlice;
