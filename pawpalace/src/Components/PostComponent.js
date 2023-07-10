import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BiComment, BiBookmark, BiSolidBookmark } from "react-icons/bi";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { TbShare2 } from "react-icons/tb";
import { FiMoreHorizontal } from "react-icons/fi";

import { Avatar, IconButton, useMediaQuery, useToast } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import {
	handleEditPost,
	handlePostBookmark,
	handlePostDelete,
	handlePostLike,
	timePostCreated,
} from "../Utils/api";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
} from "@chakra-ui/react";
import { FaRegImage } from "react-icons/fa";

const PostComponent = ({ postData }) => {
	const dispatch = useDispatch();
	const toast = useToast();
	const { _id, text, likes, username, createdAt } = postData;
	const { allUsers, encodedToken, userDetail } = useSelector(
		(store) => store.user
	);
	const postOwner = allUsers?.find((user) => user.username === username);
	const isBookmarked = userDetail.bookmarks?.some((item) => item._id === _id);
	const isLiked = likes?.likedBy?.some(
		(item) => item.username === userDetail.username
	);
	const postTime = timePostCreated(createdAt);

	const [isSmallerScreen] = useMediaQuery("(max-width: 900px)");
	const avatarSize = isSmallerScreen ? "sm" : "md";

	const [editPostModal, setEditPostModal] = useState(false);
	const [formData, setFormData] = useState({
		text: "",
		tags: "",
		image: "",
	});
	const [tagsArr, setTagsArr] = useState(postData?.tags);

	function handleFormChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}
	function handleTagsList(e) {
		if (e.key === "Enter") {
			setTagsArr((prev) => [...prev, e.target.value]);
			setFormData((prev) => ({
				...prev,
				tags: "",
			}));
		}
	}
	function deleteTag(idx) {
		setTagsArr((prev) => prev.filter((tag, index) => index !== idx));
	}

	function handlePostEdit() {
		const postDetails = {
			text: formData.text,
			tags: tagsArr,
			image: formData.image,
		};
		handleEditPost(_id, postDetails, encodedToken, dispatch, toast);
		setFormData({
			text: "",
			image: "",
			tags: "",
		});
		setEditPostModal(false);
	}

	return (
		<div className="flex gap-2 p-3 border-[1px] border-black">
			<div className="w-[10%]  justify-center pt-3 inline-block">
				<Link to={`/app/profile/${postOwner?._id}`} className="cursor-pointer">
					<Avatar
						size={avatarSize}
						src={postOwner?.picture}
						name={postOwner?.firstName}
					/>
				</Link>
			</div>
			<div className="flex flex-col gap-2 w-[90%]">
				<div className="flex items-start justify-between">
					<div className="flex flex-col">
						<div className="flex items-center gap-2">
							<p className="font-bold">
								{postOwner?.firstName} {postOwner?.lastName}
							</p>
							<p className="text-sm">@{username}</p>
						</div>

						<p className="text-sm">{postTime}</p>
					</div>
					{postOwner?.username === userDetail.username && (
						<div>
							<Menu>
								<MenuButton
									as={IconButton}
									icon={<FiMoreHorizontal />}
									background="white"
								/>
								<MenuList>
									<MenuItem
										onClick={() => {
											setEditPostModal(true);
											setFormData((prev) => ({
												...prev,
												text: postData.text,
												image: postData.image,
											}));
										}}
									>
										Edit
									</MenuItem>
									<MenuItem
										onClick={() =>
											handlePostDelete(_id, encodedToken, dispatch)
										}
									>
										Delete
									</MenuItem>
								</MenuList>
							</Menu>
						</div>
					)}
				</div>

				<p>{text}</p>
				<div className="">
					{postData.image && (
						<img
							className="w-full max-h-[50vh] h-full object-cover object-center"
							src={postData.image}
							alt=""
						/>
					)}
				</div>
				<div className="flex w-full flex-wrap gap-2">
					{postData.tags &&
						postData.tags?.map((tag, idx) => (
							<div
								className="text-sm border bg-gray-300 px-2 rounded-md pb-[2px]"
								key={idx}
							>
								{tag}
							</div>
						))}
				</div>
				<hr />
				<div className="flex items center justify-around p-2 text-gray-600">
					<BiComment size={22} />
					<span className="flex gap-2 items-center">
						{isLiked ? (
							<AiTwotoneHeart
								size={22}
								onClick={() =>
									handlePostLike("dislike", _id, encodedToken, dispatch, toast)
								}
								className="text-red-600 cursor-pointer"
							/>
						) : (
							<AiOutlineHeart
								onClick={() =>
									handlePostLike("like", _id, encodedToken, dispatch, toast)
								}
								size={22}
								className="cursor-pointer"
							/>
						)}

						<span>{likes?.likeCount}</span>
					</span>
					{isBookmarked ? (
						<BiSolidBookmark
							size={22}
							className="text-gray-600 cursor-pointer"
							onClick={() =>
								handlePostBookmark(
									"remove-bookmark",
									_id,
									encodedToken,
									dispatch,
									toast
								)
							}
						/>
					) : (
						<BiBookmark
							size={22}
							className="cursor-pointer"
							onClick={() =>
								handlePostBookmark(
									"bookmark",
									_id,
									encodedToken,
									dispatch,
									toast
								)
							}
						/>
					)}

					<TbShare2 size={22} />
				</div>
			</div>
			<Modal
				isOpen={editPostModal}
				onClose={() => setEditPostModal(false)}
				isCentered
			>
				<ModalOverlay />
				<ModalContent margin={2}>
					<ModalHeader>Post Something</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form action="" className="flex flex-col gap-1">
							<input
								type="text"
								name="text"
								value={formData.text}
								onChange={handleFormChange}
								placeholder="Write down your thoughts."
								className="border p-1  rounded-md"
							/>
							<label className="font-semibold">
								Tags:
								<input
									type="text"
									name="tags"
									value={formData.tags}
									onChange={handleFormChange}
									onKeyDown={handleTagsList}
									placeholder="#your_tag"
									className="border p-1 ml-2 rounded-md"
								/>
							</label>
							<div className="flex w-full flex-wrap text-sm gap-1">
								{tagsArr?.map((tag, idx) => (
									<div
										className="bg-gray-400 px-1 pb-1 rounded-md mr-1"
										key={idx}
									>
										{tag}
										<span
											className="cursor-pointer"
											onClick={() => deleteTag(idx)}
										>
											×
										</span>
									</div>
								))}
							</div>
						</form>
					</ModalBody>

					<ModalFooter>
						<label className="mr-auto cursor-pointer">
							<p className="flex gap-1">
								<FaRegImage size={25} />
								{formData?.image && (
									<img
										src={formData.image}
										className="w-[50px] h-[50px]"
										alt=""
									/>
								)}
							</p>
							<input
								type="file"
								className="hidden"
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										image: URL.createObjectURL(e.target.files[0]),
									}))
								}
							/>
						</label>

						<Button
							colorScheme="blue"
							mr={3}
							onClick={() => setEditPostModal(false)}
						>
							Close
						</Button>
						<Button colorScheme="blue" mr={3} onClick={handlePostEdit}>
							Edit Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default PostComponent;
