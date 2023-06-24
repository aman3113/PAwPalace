import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfileSection from "./ProfileSection";

const LayoutPage = () => {
	const token = useSelector((store) => store.user.encodedToken);

	if (!token) {
		return <Navigate to="/" />;
	}
	return (
		<div className="border-2 border-blue-500 h-screen	">
			<div className="h-[10%]">Header Paw Palace</div>
			<div className="h-[90%] border-2 border-red-500 sm:flex justify-between">
				<Sidebar />
				<div className="overflow-y-auto h-full border-2 border-green-500 w-full sm:w-[60%] lg:w-[50%]">
					<Outlet />
				</div>

				<ProfileSection />
			</div>
		</div>
	);
};

export default LayoutPage;
