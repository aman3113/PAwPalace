import { Avatar, useMediaQuery, useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { BiComment, BiBookmark, BiSolidBookmark } from "react-icons/bi";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { TbShare2 } from "react-icons/tb";
import { getAllPosts } from "../Redux/PostSlice";
import { handleUserBookmark } from "../Redux/UserSlice";
import { timePostCreated } from "../Utils/api";
import { Link } from "react-router-dom";

const PostComponent = ({ postData }) => {
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

	async function handlePostBookmark(path, postId) {
		try {
			const resp = await fetch(`/api/users/${path}/${postId}`, {
				method: "POST",
				headers: {
					authorization: encodedToken,
				},
				body: {},
			});
			const data = await resp.json();
			if (resp.ok) {
				dispatch(handleUserBookmark(data.bookmarks));
				toast({
					title: `post ${
						path === "bookmark" ? "added to" : "removed from"
					} bookmarks`,
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

	const [isSmallerScreen] = useMediaQuery("(max-width: 900px)");

	const avatarSize = isSmallerScreen ? "sm" : "md";

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
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						<p className="font-bold">
							{postOwner?.firstName} {postOwner?.lastName}
						</p>
						<p className="text-sm">@{username}</p>
					</div>

					<p className="text-sm">{postTime}</p>
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
								onClick={() => handlePostLike("dislike", _id)}
								className="text-red-600 cursor-pointer"
							/>
						) : (
							<AiOutlineHeart
								onClick={() => handlePostLike("like", _id)}
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
							onClick={() => handlePostBookmark("remove-bookmark", _id)}
						/>
					) : (
						<BiBookmark
							size={22}
							className="cursor-pointer"
							onClick={() => handlePostBookmark("bookmark", _id)}
						/>
					)}

					<TbShare2 size={22} />
				</div>
			</div>
		</div>
	);
};

export default PostComponent;
