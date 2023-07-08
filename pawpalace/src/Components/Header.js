import React from "react";
import logo from "../Images/pawpalaceLogo.png";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header>
			<div className="h-[15%]  shadow-md shadow-blue-400 rounded-lg flex justify-between items-center p-3">
				<Link to="/">
					<img
						className="w-[180px] mix-blend-multiply"
						src={logo}
						alt="Paw Palace"
					/>
				</Link>
				<div className="flex items-center gap-3">
					<Link className="font-bold text-blue-800" to="/login">
						Log In
					</Link>
					<FaUserCircle size={25} />
				</div>
			</div>
		</header>
	);
};

export default Header;
