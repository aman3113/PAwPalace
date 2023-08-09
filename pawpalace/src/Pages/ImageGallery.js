import React, { useEffect, useRef, useState } from "react";

const ImageGallery = () => {
	const [imageArr, setImageArr] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState({
		status: false,
		message: "",
	});
	const scrollableRef = useRef(null);

	const collections = 1270951;
	const apiKey = "KUW21yHYj-esIFciP0H2HalOMW0pVuLey85lAguR5yM";
	const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=30&collections=${collections}`;

	async function getDogImages() {
		try {
			const resp = await fetch(apiUrl);
			const data = await resp.json();

			if (resp.ok) {
				setImageArr((prev) => [...prev, ...data]);
				setIsLoading(false);
			}
		} catch (err) {
			setError({
				status: true,
				message:
					"API Limit Reached. No more images could be shown. Checkout after an hr.",
			});
			setIsLoading(false);
		}
	}

	if (imageArr.length > 200) {
		setImageArr((prev) => prev.slice(60));
	}

	function removeDogImages() {
		const element = scrollableRef.current;

		if (error.status) return;

		if (element) {
			const { scrollTop, scrollHeight, clientHeight } = element;

			if (scrollTop + clientHeight + 3 >= scrollHeight) {
				getDogImages();
			}
		}
	}

	useEffect(() => {
		getDogImages();
	}, []);

	useEffect(() => {
		const condition = scrollableRef.current;
		if (condition) {
			condition.addEventListener("scroll", removeDogImages);
		}

		return () => {
			if (condition) {
				condition.removeEventListener("scroll", removeDogImages);
			}
		};
	}, []);

	return (
		<div className="h-full px-2">
			<p className="h-[10%] text-center text-2xl font-bold">Image Gallery</p>

			{isLoading && (
				<p className="text-center font-bold text-3xl text-red-600">
					Loading....
				</p>
			)}

			<div ref={scrollableRef} className=" overflow-y-auto h-[90%] ">
				<div className="columns-3 gap-2">
					{imageArr?.map((image, idx) => (
						<img
							src={image.urls?.regular}
							alt=""
							key={idx}
							className="w-full mb-2"
						/>
					))}
				</div>
				{error.status && (
					<p className="text-2xl font-bold text-gray-700 text-center p-2">
						{error.message}
					</p>
				)}
			</div>
		</div>
	);
};

export default ImageGallery;
