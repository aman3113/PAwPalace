import { Avatar, Image } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BasicInfo = () => {
	const user = useSelector((store) => store.user.userDetail);
	return (
		<div className="border-1 border-black shadow-sm shadow-gray-800   w-[90%] lg:w-[80%] rounded-xl h-[30%] overflow-hidden">
			<div className=" relative w-full h-[10vh]">
				<Image
					src={user.bgImg}
					className="h-full w-full"
					fallbackSrc="https://images.unsplash.com/photo-1528460033278-a6ba57020470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
				/>
				<Link to={`/app/profile/${user._id}`}>
					<Avatar
						size="lg"
						name={user.firstName}
						src={user.picture}
						className="absolute left-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] m-0 p-0"
					/>
				</Link>
			</div>

			<div className="flex flex-col items-center justify-center p-3 pt-7 bottom-[50px] ">
				<p>
					{user.firstName} {user.lastName}
				</p>
				<p>@{user.username}</p>
			</div>
		</div>
	);
};

export default BasicInfo;
