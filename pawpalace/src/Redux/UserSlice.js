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
	},
});

export const { getToken, getUser, getAllUsers } = UserSlice.actions;

export default UserSlice;
