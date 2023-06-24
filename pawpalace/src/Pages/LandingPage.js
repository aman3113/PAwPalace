import React from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const LandingPage = () => {
	return (
		<div className="flex flex-col gap-6 p-2 md:p-4 bg-orange-200">
			<Header />
			<section className=" bg-blue-950 text-white p-[5%] py-[20%] md:py-[5%]">
				<div className="flex flex-col items-center border-2  border-orange-600 p-4">
					<p className="text-[15vw] md:text-[10vw] font-bold">WoofHero!</p>
					<p className="text-sm">Unleash the Fun with PawPalace</p>
				</div>
			</section>
			<section>
				<p className="text-2xl md:text-3xl font-bold md:text-center">
					A Community for Canine Admirers
				</p>
				<div className="flex flex-col sm:flex-row gap-4 p-2 md:p-4 md:justify-evenly">
					<p className="md:w-[40%]">
						PawPalace is the ultimate social media app designed specifically for
						dog owners to connect, share stories, and celebrate the love for
						their furry friends.
					</p>
					<p className="md:w-[40%]">
						Join the pack and discover a worldwide network of fellow dog lovers
						who are just as paw-sionately obsessed with their pups as you are!
					</p>
				</div>
			</section>
			<section>
				<p className="text-2xl font-bold md:text-center ">Our Furry Friends</p>
			</section>
			<section className="text-center">
				<p className="text-2xl font-bold">Ready to Join the Pack?</p>
				<p className="p-3">
					Don’t miss out on the barking mad fun at PawPalace, where making
					paw-some connections has never been easier. Sign up now and embark on
					a tail-wagging adventure!
				</p>
				<Link
					to="/signup"
					className="border border-black bg-blue-950 text-white p-1 px-2 rounded-md "
				>
					Sign Up Today
				</Link>
				<p className="p-2">
					Already a member?{" "}
					<Link className="text-blue-900" to="/login">
						Log In
					</Link>
				</p>
			</section>
			<Footer />
		</div>
	);
};

export default LandingPage;
