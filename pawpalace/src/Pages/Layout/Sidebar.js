import React from "react";
import { AiFillCompass, AiFillHome } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdPets } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getToken, getUser } from "../../Redux/UserSlice";

const Sidebar = () => {
	const dispatch = useDispatch();
	function handleLogout() {
		dispatch(getUser(null));
		dispatch(getToken(null));
	}
	return (
		<div
			className="fixed flex   bottom-0 left-0 right-0 p-2 bg-blue-950 text-white border-1 border-black shadow-sm shadow-gray-800 md:rounded-md
		md:h-full md:w-[10%] md:static md:justify-center
		 lg:w-[20%] z-10"
		>
			<div className="flex  w-full md:w-auto  items-center lg:items-start justify-between px-2  md:gap-6 md:flex-col md:justify-start">
				<Link to="/app/home" className="flex items-center gap-2">
					<AiFillHome size={25} />
					<p className="text-lg hidden lg:block">Home</p>
				</Link>
				<Link to="/app" className="flex items-center gap-2">
					<AiFillCompass size={25} />
					<p className="text-lg hidden lg:block">Explore</p>
				</Link>
				<div className="lg:hidden">
					<IoMdAddCircle size={25} />
				</div>
				<Link className="flex items-center gap-2">
					<MdPets size={25} />
					<p className="text-lg hidden lg:block">Pets Gallery</p>
				</Link>
				<div
					onClick={handleLogout}
					className="flex items-center gap-2 cursor-pointer"
				>
					<FiLogOut size={25} />
					<p className="text-lg hidden lg:block">Log Out</p>
				</div>
				<Link to="/app/profile" className="lg:flex items-center gap-2 hidden">
					<FaUserAlt size={20} />
					<p className="text-lg">Profile</p>
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
