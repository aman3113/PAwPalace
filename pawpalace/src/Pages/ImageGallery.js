import React, { useEffect, useRef, useState } from "react";

const ImageGallery = () => {
	const [imageArr, setImageArr] = useState([]);
	const [removedImg, setRemovedImg] = useState([]);
	const scrollableRef = useRef(null);

	const collections = 1270951;
	const apiKey = "KUW21yHYj-esIFciP0H2HalOMW0pVuLey85lAguR5yM";
	const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=30&collections=${collections}`;

	async function getDogImages() {
		const resp = await fetch(apiUrl);
		const data = await resp.json();
		setImageArr((prev) => [...prev, ...data]);
	}

	if (imageArr.length > 200) {
		setImageArr((prev) => prev.slice(60));
		setRemovedImg((prev) => [...prev, ...imageArr.slice(0, 25)]);
	}

	function removeDogImages() {
		const element = scrollableRef.current;

		if (element) {
			const { scrollTop, scrollHeight, clientHeight } = element;

			// if (scrollTop === 0) {
			// 	// console.log("removed", removedImg);
			// 	// console.log("imageArr", imageArr);

			// 	setImageArr((prev) => [...removedImg, ...prev].slice(0, 50));
			// 	// setRemovedImg([]);
			// }

			if (scrollTop + clientHeight + 1 >= scrollHeight) {
				getDogImages();
			}
		}
	}

	useEffect(() => {
		getDogImages();
	}, []);

	// console.log("imageArr", imageArr.length);

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
			</div>
		</div>
	);
};

export default ImageGallery;
