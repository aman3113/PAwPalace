import { Avatar } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const PostComponent = ({ postData }) => {
	const { _id, text, likes, username, createdAt } = postData;
	const { allUsers } = useSelector((store) => store.user);

	const postOwner = allUsers?.find((user) => user.username === username);
	console.log(postOwner);

	const createdAtDate = new Date(postData.createdAt);
	const minute = createdAtDate.getMinutes();

	return (
		<div key={_id} className="flex gap-2 p-2">
			<div>
				<Avatar
					size="md"
					src={postOwner?.picture}
					name={postOwner?.firstName}
				/>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex items-center gap-2">
					<p>
						{postOwner?.firstName} {postOwner?.lastName}
					</p>
					<p>@{username}</p>
					<p>.{minute}m</p>
				</div>
				<p>{text}</p>
				<div>
					{postData.image && (
						<img className="max-w-full h-full" src={postData.image} alt="" />
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
			</div>
		</div>
	);
};

export default PostComponent;
