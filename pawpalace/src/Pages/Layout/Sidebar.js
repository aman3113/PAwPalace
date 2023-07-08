import React from "react";
import { AiFillCompass, AiFillHome } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { MdPets } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUser } from "../../Redux/UserSlice";
import { handlePostModal } from "../../Redux/PostSlice";

const Sidebar = () => {
	const { userDetail } = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const location = useLocation();
	function handleLogout() {
		dispatch(getUser(null));
		dispatch(getToken(null));
	}
	return (
		<div
			className="fixed flex   bottom-0 left-0 right-0 p-2 lg:py-4 bg-blue-950 text-white border-1 border-black shadow-sm shadow-gray-800 md:rounded-md
		md:h-full md:w-[10%] md:static md:justify-center
		 lg:w-[20%] z-10"
		>
			<div className="flex justify-evenly w-full md:w-auto  items-center lg:items-start  px-2  md:gap-6  md:flex-col  md:justify-start">
				<NavLink
					to="/app/home"
					className={({ isActive }) =>
						`flex items-center gap-2 w-full ${isActive && "text-pink-500"}`
					}
				>
					<AiFillHome size={25} />
					<p className="text-lg hidden lg:block">Home</p>
				</NavLink>
				<NavLink
					to="/app"
					className={`flex items-center gap-2 w-full ${
						location.pathname === "/app" && "text-pink-500"
					}`}
				>
					<AiFillCompass size={25} />
					<p className="text-lg hidden lg:block">Explore</p>
				</NavLink>
				<NavLink
					to="/app/home"
					className="lg:hidden w-full cursor-pointer"
					onClick={() => dispatch(handlePostModal())}
				>
					<IoMdAddCircle size={25} />
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						`flex items-center gap-2 w-full ${isActive && "text-pink-500"}`
					}
					to="/app/gallery"
				>
					<MdPets size={25} />
					<p className="text-lg hidden lg:block">Pets Gallery</p>
				</NavLink>
				<div
					onClick={handleLogout}
					className="flex items-center gap-2 cursor-pointer"
				>
					<FiLogOut size={25} />
					<p className="text-lg hidden lg:block">Log Out</p>
				</div>
				<NavLink
					to={`/app/profile/${userDetail._id}`}
					className={({ isActive }) =>
						` items-center gap-2 w-full hidden lg:flex ${
							isActive && "text-pink-500"
						}`
					}
				>
					<FaUserAlt size={20} />
					<p className="text-lg">Profile</p>
				</NavLink>
			</div>
		</div>
	);
};

export default Sidebar;
