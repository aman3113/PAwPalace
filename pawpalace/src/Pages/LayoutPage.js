import React from "react";
import { Outlet } from "react-router-dom";

const LayoutPage = () => {
	return (
		<div>
			LayoutPage
			<Outlet />
		</div>
	);
};

export default LayoutPage;
