import { Avatar, Image, useToast } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostComponent from "../../Components/PostComponent";
import { handleFollowBtn } from "../../Utils/api";
import FollowModal from "./FollowModal";
import EditModal from "./EditModal";

const ProfilePage = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	const toast = useToast();
	const [currUser, setCurrUser] = useState({});
	const [openFollowModal, setOpenFollowModal] = useState(false);
	const [followModalData, setFollowModalData] = useState([]);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		picture: "",
		bgImg: "",
		bio: "",
		website: "",
	});
	const { userDetail, encodedToken } = useSelector((store) => store.user);
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

	function handleOpenEditModal() {
		setOpenEditModal(true);
		setFormData({
			firstName: userDetail?.firstName,
			lastName: userDetail?.lastName,
			picture: userDetail?.picture,
			bgImg: userDetail?.bgImg,
			bio: userDetail?.bio,
			website: userDetail?.website,
		});
	}

	useEffect(() => {
		getUserById(userId);
	}, [userId, userDetail]);

	async function getUserById(id) {
		const resp = await fetch(`/api/users/${id}`);
		const data = await resp.json();
		setCurrUser(data.user);
	}

	return (
		<div className="px-2">
			<div className="w-full border border-black rounded-md mb-2">
				<div className=" relative w-full h-[20vh]">
					<Image
						src={currUser?.bgImg}
						className="h-full w-full"
						fallbackSrc="https://images.unsplash.com/photo-1528460033278-a6ba57020470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60"
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
						<p
							className="bg-blue-500 text-white p-1 px-2 rounded-md inline-block"
							onClick={handleOpenEditModal}
						>
							Edit Profile
						</p>
					) : userDetail.following?.some(
							(item) => item.username === currUser.username
					  ) ? (
						<button
							className="bg-blue-900 text-white p-1 px-2 rounded-md inline-block"
							onClick={() =>
								handleFollowBtn(
									currUser?._id,
									"unfollow",
									dispatch,
									toast,
									encodedToken
								)
							}
						>
							UnFollow
						</button>
					) : (
						<button
							className="bg-blue-700 text-white p-1 px-3 rounded-md inline-block"
							onClick={() =>
								handleFollowBtn(
									currUser?._id,
									"follow",
									dispatch,
									toast,
									encodedToken
								)
							}
						>
							Follow
						</button>
					)}
				</div>
				<div className="flex justify-around z-20 font-semibold">
					<div>{userPosts?.length} posts</div>
					<div
						onClick={() => {
							setOpenFollowModal(true);
							setFollowModalData(currUser?.followers);
						}}
						className="cursor-pointer"
					>
						{currUser?.followers?.length} followers
					</div>
					<div
						onClick={() => {
							setOpenFollowModal(true);
							setFollowModalData(currUser?.following);
						}}
						className="cursor-pointer"
					>
						{currUser?.following?.length} following
					</div>
				</div>
				<div className="p-3">
					<p className="font-bold">
						{currUser?.firstName} {currUser?.lastName}
					</p>
					<p className="text-sm">@{currUser?.username}</p>
					<p className="mt-2">{currUser?.bio}</p>
					<a
						href={currUser?.website}
						className="text-blue-500"
						target="_blank"
						rel="noreferrer"
					>
						{currUser?.website}
					</a>
				</div>
			</div>
			{/* Follow Modal */}
			<FollowModal
				openFollowModal={openFollowModal}
				setOpenFollowModal={setOpenFollowModal}
				followModalData={followModalData}
			/>

			{/* Edit Modal */}
			<EditModal
				openEditModal={openEditModal}
				setOpenEditModal={setOpenEditModal}
				formData={formData}
				setFormData={setFormData}
				currUser={currUser}
			/>

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
									{userPosts.length === 0 && (
										<p className="text-center">
											You haven't posted anything yet.
										</p>
									)}
									{userPosts?.map((post) => (
										<PostComponent key={post._id} postData={post} />
									))}
								</div>
							</TabPanel>
							<TabPanel>
								<div className="flex flex-col">
									{likedPosts.length === 0 ? (
										<p className="text-center">
											No Posts in this Category. Let's Scroll Some.
										</p>
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
										<p className="text-center">
											You have not saved any post yet.
										</p>
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
						{userPosts.length === 0 && (
							<p className="text-center">You haven't posted anything yet.</p>
						)}
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
