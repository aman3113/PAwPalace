import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
	return (
		<div className="flex flex-col md:flex-row gap-2 items-center justify-center bg-black text-white p-4 mt-4">
			<div> No Copyright © 2023 PawPalace</div>
			<span className="text-2xl hidden md:block"> |</span>

			<div className="flex justify-center gap-4">
				<a href="www.linkedin.com/in/antilaman3113">
					<BsLinkedin size={20} />
				</a>
				<a href="https://github.com/aman3113">
					<BsGithub size={20} />
				</a>
				<a href="https://twitter.com/AntilAman3113">
					<BsTwitter size={20} />
				</a>
			</div>
		</div>
	);
};

export default Footer;
