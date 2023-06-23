import MockAPI from "./Mockman";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import HomePage from "./Pages/HomePage";
import ExplorePage from "./Pages/ExplorePage";
import UserPage from "./Pages/UserPage";
import ProfilePage from "./Pages/ProfilePage";
import LayoutPage from "./Pages/Layout/LayoutPage";
import Footer from "./Components/Footer";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import ErrorPage from "./Pages/ErrorPage";

const router = createBrowserRouter(
	createRoutesFromElements([
		<Route path="/" element={<LandingPage />} />,
		<Route path="login" element={<LoginPage />} />,
		<Route path="signup" element={<SignUpPage />} />,
		<Route path="home" element={<LayoutPage />}>
			<Route index={true} element={<HomePage />} />
			<Route path="explore" element={<ExplorePage />} />
			<Route path="user" element={<UserPage />} />
			<Route path="profile" element={<ProfilePage />} />
		</Route>,
		<Route path="*" element={<ErrorPage />} />,
	])
);

function App() {
	return (
		<Provider store={Store}>
			<div>
				<RouterProvider router={router}></RouterProvider>
				<Footer />
			</div>
		</Provider>
	);
}

export default App;
