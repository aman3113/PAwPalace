import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const LayoutPage = () => {
	const token = useSelector((store) => store.user.encodedToken);

	if (!token) {
		return <Navigate to="/" />;
	}
	return (
		<div>
			LayoutPage
			<Outlet />
		</div>
	);
};

export default LayoutPage;
