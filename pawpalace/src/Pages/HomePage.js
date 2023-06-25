import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../Redux/PostSlice";
import PostComponent from "../Components/PostComponent";

const HomePage = () => {
	const dispatch = useDispatch();
	const { allPosts } = useSelector((store) => store.post);

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
			<div className="flex flex-col gap-3">
				{allPosts.map((post) => (
					<PostComponent postData={post} />
				))}
			</div>
		</div>
	);
};

export default HomePage;
