import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostComponent from "../Components/PostComponent";
import { getAllPosts } from "../Redux/PostSlice";

const ExplorePage = () => {
	const { allPosts } = useSelector((store) => store.post);
	const dispatch = useDispatch();

	useEffect(() => {
		getPosts();
	}, []);

	async function getPosts() {
		try {
			const resp = await fetch("/api/posts");
			const data = await resp.json();
			dispatch(getAllPosts(data.posts));
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className="p-4">
			<div className="flex flex-col">
				{allPosts.map((post) => (
					<PostComponent key={post._id} postData={post} />
				))}
			</div>
		</div>
	);
};

export default ExplorePage;
