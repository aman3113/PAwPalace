import { Avatar } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

import { BiComment, BiBookmark } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
import { TbShare2 } from "react-icons/tb";

const PostComponent = ({ postData }) => {
	const { _id, text, likes, username, createdAt } = postData;
	const { allUsers } = useSelector((store) => store.user);

	const postOwner = allUsers?.find((user) => user.username === username);

	const createdAtDate = new Date(postData.createdAt);
	const minute = createdAtDate.getMinutes();

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
					<AiOutlineHeart size={22} />
					<BiBookmark size={22} />
					<TbShare2 size={22} />
				</div>
			</div>
		</div>
	);
};

export default PostComponent;
