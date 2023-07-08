import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Avatar,
} from "@chakra-ui/react";
import { IoMdAddCircle } from "react-icons/io";
import { FaRegImage } from "react-icons/fa";

import PostComponent from "../Components/PostComponent";
import { handlePostModal } from "../Redux/PostSlice";
import { handleCreatePost } from "../Utils/api";
import { Link } from "react-router-dom";

const HomePage = () => {
	const { allPosts, openPostModal } = useSelector((store) => store.post);
	const { userDetail, encodedToken } = useSelector((store) => store.user);
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		text: "",
		image: "",
		tags: "",
	});
	const [tagsArr, setTagsArr] = useState([]);

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

	function handleSubmitPost() {
		const postDetails = {
			text: formData.text,
			tags: tagsArr,
			image: formData.image,
		};
		handleCreatePost(postDetails, encodedToken, dispatch);
		setFormData({
			text: "",
			image: "",
			tags: "",
		});
		dispatch(handlePostModal());
	}

	const postToShow = [...allPosts]
		?.reverse()
		.filter(
			(post) =>
				userDetail.following?.some((user) => user.username === post.username) ||
				post.username === userDetail.username
		);

	return (
		<div className="px-4">
			<div className="flex gap-3 items-center justify-between w-full border border-black p-3 cursor-pointer mb-3">
				<Link to={`/app/profile/${userDetail._id}`} className="w-[10%]">
					<Avatar
						size="md"
						name={userDetail.firstName}
						src={userDetail.picture}
					/>
				</Link>
				<div
					onClick={() => dispatch(handlePostModal())}
					className="flex gap-3 w-[90%] items-center justify-between"
				>
					<input
						type="text"
						placeholder="What's on your mind?"
						className=" w-[90%] border-2 border-black p-2 px-3 rounded-full"
						disabled
					/>
					<IoMdAddCircle size={25} />
				</div>
			</div>
			<div className="flex flex-col">
				{postToShow?.map((post) => (
					<PostComponent key={post._id} postData={post} />
				))}
			</div>
			<p className="text-gray-600 text-center p-4">
				Follow Others to see their posts.
			</p>
			<Modal isOpen={openPostModal} onClose={() => dispatch(handlePostModal())}>
				<ModalOverlay />
				<ModalContent>
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
							<label>
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
							<div className="flex text-sm gap-1">
								{tagsArr?.map((tag, idx) => (
									<div key={idx}>
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
							<FaRegImage size={25} />
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
							onClick={() => dispatch(handlePostModal())}
						>
							Close
						</Button>
						<Button colorScheme="blue" mr={3} onClick={handleSubmitPost}>
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default HomePage;
