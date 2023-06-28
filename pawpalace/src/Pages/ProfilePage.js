import { Avatar, Button, Image } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostComponent from "../Components/PostComponent";

const ProfilePage = () => {
	const { userId } = useParams();
	const [currUser, setCurrUser] = useState({});
	const [openFollowModal, setOpenFollowModal] = useState(false);
	const [followModalData, setFollowModalData] = useState([]);

	const { userDetail } = useSelector((store) => store.user);
	const { allPosts } = useSelector((store) => store.post);

	const userPosts = allPosts.filter(
		(post) => post.username === currUser?.username
	);

	const savedPosts = allPosts?.filter((post) =>
		userDetail.bookmarks?.some((item) => item._id === post._id)
	);
	const likedPosts = allPosts?.filter((post) =>
		post?.likes?.likedBy?.some((item) => item.username === userDetail.username)
	);

	useEffect(() => {
		getUserById(userId);
	}, [userId, userDetail]);

	async function getUserById(id) {
		const resp = await fetch(`/api/users/${id}`);
		const data = await resp.json();
		setCurrUser(data.user);
	}

	return (
		<div className="p-2">
			<div className="w-full border border-black rounded-md">
				<div className=" relative w-full h-[15vh]">
					<Image
						src={currUser?.bgImg}
						className="h-full w-full"
						// fallbackSrc="https://via.placeholder.com/150"
					/>
					<div className="absolute left-[50%] bottom-0 translate-x-[-50%] translate-y-[50%]">
						<Avatar
							size="2xl"
							name={currUser?.firstName}
							src={currUser?.picture}
							bg="green.500"
						/>
					</div>
				</div>
				<div className="text-center mt-[70px] cursor-pointer z-10">
					{currUser.username === userDetail.username ? (
						<p>Edit Profile</p>
					) : userDetail.following?.some(
							(item) => item.username === currUser.username
					  ) ? (
						<button>UnFollow</button>
					) : (
						<button>Follow</button>
					)}
				</div>
				<div className="flex justify-around z-20">
					<div>{userPosts?.length} posts</div>
					<div
						onClick={() => {
							console.log("clicked");
							setOpenFollowModal(true);
							setFollowModalData(currUser?.followers);
						}}
						className="cursor-pointer"
					>
						{currUser?.followers?.length} followers
					</div>
					<div
						onClick={() => {
							console.log("clicked");
							setOpenFollowModal(true);
							setFollowModalData(currUser?.following);
						}}
						className="cursor-pointer"
					>
						{currUser?.following?.length} following
					</div>
				</div>
				<div className="p-3">
					<p>
						{currUser?.firstName} {currUser?.lastName}
					</p>
					<p>@{currUser?.username}</p>
					<p>{currUser?.bio}</p>
					<a href={currUser?.website}>{currUser?.website}</a>
				</div>
			</div>
			<Modal
				isOpen={openFollowModal}
				onClose={() => setOpenFollowModal(false)}
				scrollBehavior="inside"
				isCentered
			>
				<ModalOverlay />
				<ModalContent>
					<ModalCloseButton />
					<ModalBody>
						{followModalData.length === 0 && <p>No Users to Show</p>}
						<div className="flex flex-col gap-3">
							{followModalData?.map((user) => {
								return (
									<div
										className="flex items-center justify-between gap-2"
										key={user.id}
									>
										<div className="flex items-center gap-2">
											<Avatar
												size="sm"
												name={user.firstName}
												src={user.picture}
												className="cursor-pointer"
											/>

											<div>
												<p className="text-sm font-semibold">
													{user.firstName} {user.lastName}
												</p>
												<p className="text-sm">{user.username}</p>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
			<div>
				{currUser?.username === userDetail.username ? (
					<Tabs variant="soft-rounded" align="center" colorScheme="green">
						<TabList>
							<Tab>All</Tab>
							<Tab>Liked</Tab>
							<Tab>Saved</Tab>
						</TabList>
						<TabPanels align="left">
							<TabPanel>
								<div className="flex flex-col">
									{userPosts?.map((post) => (
										<PostComponent key={post._id} postData={post} />
									))}
								</div>
							</TabPanel>
							<TabPanel>
								<div className="flex flex-col">
									{likedPosts.length === 0 ? (
										<p>No Posts in this Category. Let's Scroll Some.</p>
									) : (
										likedPosts?.map((post) => (
											<PostComponent key={post._id} postData={post} />
										))
									)}
								</div>
							</TabPanel>
							<TabPanel>
								<div className="flex flex-col">
									{savedPosts.length === 0 ? (
										<p>You have not saved any post yet.</p>
									) : (
										savedPosts?.map((post) => (
											<PostComponent key={post._id} postData={post} />
										))
									)}
								</div>
							</TabPanel>
						</TabPanels>
					</Tabs>
				) : (
					<div className="flex flex-col">
						{userPosts.length === 0 && <p>You haven't posted anything yet.</p>}
						{userPosts?.map((post) => (
							<PostComponent key={post._id} postData={post} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
