import React from "react";
import { useSelector } from "react-redux";
import PostComponent from "../Components/PostComponent";

const HomePage = () => {
	const { allPosts } = useSelector((store) => store.post);
	const { userDetail } = useSelector((store) => store.user);

	const postToShow = allPosts.filter(
		(post) =>
			userDetail.following?.some((user) => user.username === post.username) ||
			post.username === userDetail.username
	);

	return (
		<div className="p-4">
			<div className="flex flex-col">
				{postToShow?.map((post) => (
					<PostComponent key={post._id} postData={post} />
				))}
			</div>
			<p className="text-gray-600 text-center p-4">
				Follow Others to see their posts.
			</p>
		</div>
	);
};

export default HomePage;
