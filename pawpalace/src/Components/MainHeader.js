import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, useToast } from "@chakra-ui/react";
import {
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
} from "@chakra-ui/react";

import logo from "../Images/pawpalaceLogo.png";
import { GoSearch } from "react-icons/go";
import { handleFollowBtn } from "../Utils/api";
import { Link } from "react-router-dom";

const MainHeader = () => {
	const { userDetail, allUsers, encodedToken } = useSelector(
		(store) => store.user
	);
	const { allPosts } = useSelector((store) => store.post);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [input, setInput] = useState("");
	const toast = useToast();
	const dispatch = useDispatch();

	const searchText = input.trim();
	const searchedUsers =
		searchText === ""
			? []
			: allUsers.filter(
					(user) =>
						user.username.toLowerCase().includes(searchText.toLowerCase()) &&
						user.username !== userDetail.username
			  );

	const searchedPosts =
		searchText === ""
			? []
			: allPosts.filter(
					(post) =>
						post.username.toLowerCase().includes(searchText.toLowerCase()) &&
						post.username !== userDetail.username
			  );

	return (
		<div className="h-[10%] border border-black shadow-md shadow-blue-400 rounded-lg flex justify-between items-center p-1 px-3">
			<img src={logo} alt="" className="w-[180px] mix-blend-multiply" />
			<div className="flex items-center gap-4">
				<div
					className="sm:border border-black rounded-md gap-2 flex items-center p-1 px-2 cursor-pointer"
					onClick={() => setOpenDrawer(true)}
				>
					<GoSearch size={25} />
					<input
						type="search"
						placeholder="Search users and posts by username..."
						className="focus:outline-none hidden sm:block cursor-pointer w-[40vw] md:w-[30vw]"
						disabled
					/>
				</div>
				<Avatar
					size="sm"
					name={userDetail.firstName}
					src={userDetail.picture}
				/>
			</div>
			<Drawer
				onClose={() => setOpenDrawer(false)}
				isOpen={openDrawer}
				size="md"
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						<div
							className="border border-black rounded-md gap-2 flex items-center p-1 px-2 w-[80%]"
							onClick={() => setOpenDrawer(true)}
						>
							<GoSearch size={25} />
							<input
								type="search"
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Search users and posts by username..."
								className="focus:outline-none font-base w-full "
							/>
						</div>
					</DrawerHeader>
					<DrawerBody>
						<p className="xl font-bold">Users</p>
						{searchedUsers.length === 0 && (
							<p>Search users and follow to see their Posts.</p>
						)}
						<div className="flex flex-col gap-3">
							{searchedUsers?.map((user) => {
								return (
									<div
										className="flex items-center justify-between gap-2"
										key={user.id}
									>
										<div className="flex items-center gap-2">
											<Link
												to={`/app/profile/${user._id}`}
												onClick={() => setOpenDrawer(false)}
											>
												<Avatar
													size="sm"
													name={user.firstName}
													src={user.picture}
													className="cursor-pointer"
												/>
											</Link>

											<div>
												<p className="text-sm font-semibold">
													{user.firstName} {user.lastName}
												</p>
												<p className="text-sm">{user.username}</p>
											</div>
										</div>
										{userDetail.following?.some(
											(item) => item.username === user.username
										) ? (
											<button
												onClick={() =>
													handleFollowBtn(
														user._id,
														"unfollow",
														dispatch,
														toast,
														encodedToken
													)
												}
												className="bg-blue-700 text-white p-1 px-2 rounded-2xl"
											>
												UnFollow
											</button>
										) : (
											<button
												onClick={() =>
													handleFollowBtn(
														user._id,
														"follow",
														dispatch,
														toast,
														encodedToken
													)
												}
												className="bg-blue-700 text-white p-1 px-2 rounded-2xl"
											>
												Follow
											</button>
										)}
									</div>
								);
							})}
						</div>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</div>
	);
};

export default MainHeader;
