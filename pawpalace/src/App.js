import MockAPI from "./Mockman";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import HomePage from "./Pages/HomePage";
import ExplorePage from "./Pages/ExplorePage";
import UserPage from "./Pages/UserPage";
import ProfilePage from "./Pages/ProfilePage";
import LayoutPage from "./Pages/Layout/LayoutPage";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import ErrorPage from "./Pages/ErrorPage";

const router = createBrowserRouter(
	createRoutesFromElements([
		<Route path="/" element={<LandingPage />} />,
		<Route path="login" element={<LoginPage />} />,
		<Route path="signup" element={<SignUpPage />} />,
		<Route path="app" element={<LayoutPage />}>
			<Route index={true} element={<ExplorePage />} />
			<Route path="home" element={<HomePage />} />
			<Route path="user" element={<UserPage />} />
			<Route path="profile" element={<ProfilePage />} />
		</Route>,
		<Route path="*" element={<ErrorPage />} />,
	])
);

function App() {
	return (
		<Provider store={Store}>
			<ChakraProvider>
				<RouterProvider router={router}></RouterProvider>
			</ChakraProvider>
		</Provider>
	);
}

export default App;
