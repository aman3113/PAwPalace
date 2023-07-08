import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostComponent from "../Components/PostComponent";
import { getAllPosts } from "../Redux/PostSlice";

const ExplorePage = () => {
	const [isTrending, setIsTrending] = useState(false);

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
		<div className="px-4 w-full relative">
			<div className="flex sticky top-0 backdrop-blur-md drop-shadow-md  mb-2 z-10">
				<p
					className={`cursor-pointer w-[50%] p-3 font-bold text-xl border border-black text-center ${
						!isTrending && "bg-purple-800 text-white"
					}`}
					onClick={() => setIsTrending(false)}
				>
					Latest
				</p>
				<p
					className={`cursor-pointer w-[50%] p-3 font-bold text-xl border border-black text-center ${
						isTrending && "bg-purple-800 text-white"
					}`}
					onClick={() => setIsTrending(true)}
				>
					Trending
				</p>
			</div>
			<div className="flex flex-col">
				{[...allPosts]
					.sort((a, b) =>
						isTrending
							? b.likes.likeCount - a.likes.likeCount
							: new Date(b.createdAt) - new Date(a.createdAt)
					)
					.map((post) => (
						<PostComponent key={post._id} postData={post} />
					))}
			</div>
		</div>
	);
};

export default ExplorePage;
