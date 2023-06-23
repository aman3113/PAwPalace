import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();
	console.log(error);
	return (
		<div>
			<p>Error</p>
			<Link to="/">Go Back to Home</Link>
		</div>
	);
};

export default ErrorPage;
