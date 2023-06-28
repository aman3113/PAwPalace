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

const ProfilePage = () => {
	const { userId } = useParams();
	const [currUser, setCurrUser] = useState({});
	const [openFollowModal, setOpenFollowModal] = useState(true);
	const [followModalData, setFollowModalData] = useState([]);

	const { userDetail } = useSelector((store) => store.user);
	const { allPosts } = useSelector((store) => store.post);

	const userPosts = allPosts.filter(
		(post) => post.username === currUser?.username
	);

	const savedPosts = currUser?.bookmarks;

	useEffect(() => {
		getUserById(userId);
	}, [userId]);

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
					<Avatar
						size="2xl"
						name={currUser?.firstName}
						src={currUser?.picture}
						className="absolute left-[50%] bottom-0 translate-x-[-50%] translate-y-[-50%] m-0 p-0"
						bg="green.500"
					/>
				</div>
				<div className="text-center mt-[70px]">
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
				<div className="flex justify-around">
					<span>{userPosts?.length} posts</span>
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
					<span>{currUser?.following?.length} following</span>
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
			{/* <Modal isOpen={openFollowModal} onClose={() => setOpenFollowModal(false)}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody></ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => setOpenFollowModal(false)}
						>
							Close
						</Button>
						<Button variant="ghost">Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal> */}
			<div>
				<Tabs variant="soft-rounded" align="center" colorScheme="green">
					<TabList>
						<Tab>All</Tab>
						<Tab>Liked</Tab>
						<Tab>Saved</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<p>one!</p>
						</TabPanel>
						<TabPanel>
							<p>two!</p>
						</TabPanel>
						<TabPanel>
							<p>three!</p>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</div>
		</div>
	);
};

export default ProfilePage;
