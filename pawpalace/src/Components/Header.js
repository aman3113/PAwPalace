import React from "react";
import logo from "../Images/pawpalaceLogo.png";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header>
			<div className="flex justify-between items-center">
				<Link to="/">
					<img
						className="w-[180px] mix-blend-multiply"
						src={logo}
						alt="Paw Palace"
					/>
				</Link>

				<div className="flex gap-2">
					<Link to="/login">Log In</Link>
					<Link to="/signup">Sign Up</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
