import { Avatar, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BiComment, BiBookmark } from "react-icons/bi";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { TbShare2 } from "react-icons/tb";
import { getAllPosts } from "../Redux/PostSlice";

const PostComponent = ({ postData }) => {
	const [isLiked, setIsLiked] = useState(false);
	const { _id, text, likes, username, createdAt } = postData;
	const { allUsers, encodedToken } = useSelector((store) => store.user);

	const postOwner = allUsers?.find((user) => user.username === username);

	const createdAtDate = new Date(postData.createdAt);
	const minute = createdAtDate.getMinutes();

	const dispatch = useDispatch();
	const toast = useToast();

	async function handlePostLike(path, postId) {
		try {
			const resp = await fetch(`/api/posts/${path}/${postId}`, {
				method: "POST",
				headers: {
					authorization: encodedToken,
				},
				body: {},
			});
			const data = await resp.json();
			if (resp.ok) {
				setIsLiked((prev) => !prev);
				dispatch(getAllPosts(data.posts));
				toast({
					title: `${path}d a post`,
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			} else {
				toast({
					title: `${data.errors}`,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className="flex gap-2 p-3 border-[1px] border-black">
			<div className="w-[10%]">
				<Avatar
					size="md"
					src={postOwner?.picture}
					name={postOwner?.firstName}
				/>
			</div>
			<div className="flex flex-col gap-2 w-[90%]">
				<div className="flex items-center gap-2">
					<p>
						{postOwner?.firstName} {postOwner?.lastName}
					</p>
					<p>@{username}</p>
					<p>.{minute}m</p>
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
				<div className="flex gap-2">
					{postData.tags &&
						postData.tags?.map((tag, idx) => (
							<div className="text-sm" key={idx}>
								{tag}
							</div>
						))}
				</div>
				<hr />
				<div className="flex items center justify-around p-2">
					<BiComment size={22} />
					<span className="flex gap-2 items-center">
						{isLiked ? (
							<AiTwotoneHeart
								size={22}
								onClick={() => handlePostLike("dislike", _id)}
								className="text-red-600"
							/>
						) : (
							<AiOutlineHeart
								onClick={() => handlePostLike("like", _id)}
								size={22}
							/>
						)}

						<span>{likes.likeCount}</span>
					</span>
					<BiBookmark size={22} />
					<TbShare2 size={22} />
				</div>
			</div>
		</div>
	);
};

export default PostComponent;
