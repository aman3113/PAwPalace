import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import PostSlice from "./PostSlice";

const Store = configureStore({
	reducer: {
		user: UserSlice.reducer,
		post: PostSlice.reducer,
	},
});

export default Store;
