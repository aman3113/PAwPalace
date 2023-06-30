import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfileSection from "./ProfileSection";
import { getAllUsers } from "../../Redux/UserSlice";
import MainHeader from "../../Components/MainHeader";

const LayoutPage = () => {
	const { encodedToken, userDetail } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	// useEffect
	useEffect(() => {
		getUsers();
	}, [userDetail]);

	async function getUsers() {
		try {
			const resp = await fetch("/api/users");
			const data = await resp.json();
			dispatch(getAllUsers(data.users));
		} catch (err) {
			console.log(err);
		}
	}

	if (!encodedToken) {
		return <Navigate to="/" />;
	}
	return (
		<div className="p-1 h-screen	">
			<MainHeader />
			<div className="h-[90%] sm:flex justify-between p-2">
				<Sidebar />
				<div className="overflow-y-auto h-full w-full sm:w-[60%] lg:w-[50%]">
					<Outlet />
				</div>
				<ProfileSection />
			</div>
		</div>
	);
};

export default LayoutPage;
