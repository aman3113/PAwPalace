import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
	name: "user",
	initialState: {
		encodedToken: null,
		user: null,
	},
	reducers: {
		getToken: (state, action) => {
			state.encodedToken = action.payload;
		},
		getUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { getToken, getUser } = UserSlice.actions;

export default UserSlice;
