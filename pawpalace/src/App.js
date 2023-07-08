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
import ProfilePage from "./Pages/Profile/ProfilePage";
import LayoutPage from "./Pages/Layout/LayoutPage";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import ErrorPage from "./Pages/ErrorPage";
import ImageGallery from "./Pages/ImageGallery";

const router = createBrowserRouter(
	createRoutesFromElements([
		<Route path="/" element={<LandingPage />} />,
		<Route path="login" element={<LoginPage />} />,
		<Route path="signup" element={<SignUpPage />} />,
		<Route path="app" element={<LayoutPage />}>
			<Route index={true} element={<ExplorePage />} />
			<Route path="home" element={<HomePage />} />
			<Route path="profile/:userId" element={<ProfilePage />} />
			<Route path="gallery" element={<ImageGallery />} />
		</Route>,
		<Route path="*" element={<ErrorPage />} />,
		<Route path="mockapi" element={<MockAPI />} />,
	])
);

function App() {
	return (
		<div className=" min-h-screen">
			<Provider store={Store}>
				<ChakraProvider>
					<RouterProvider router={router}></RouterProvider>
				</ChakraProvider>
			</Provider>
		</div>
	);
}

export default App;
