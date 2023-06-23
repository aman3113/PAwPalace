import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUser } from "../Redux/UserSlice";
import { Link, Navigate } from "react-router-dom";

import loginImage from "../Images/loginpage.svg";
import Header from "../Components/Header";
import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignUpPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		username: "",
		password: "",
	});
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const token = useSelector((store) => store.user.encodedToken);

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	async function handleSignUP(e) {
		e.preventDefault();
		try {
			const resp = await fetch("api/auth/signup", {
				method: "POST",
				body: JSON.stringify(formData),
			});
			const data = await resp.json();
			if (resp.ok) {
				dispatch(getToken(data.encodedToken));
				dispatch(getUser(data.createdUser));
			} else {
				setError(data.errors[0]);
			}
		} catch (err) {
			console.log(err);
		}
	}

	if (token) {
		return <Navigate to="/home" />;
	}

	return (
		<div>
			<Header />
			<section className="flex ">
				<div className="hidden sm:block w-[50%] ">
					<img src={loginImage} alt="login here" />
				</div>
				<div className=" w-full sm:w-[50%] flex flex-col items-center p-2">
					<p className="text-2xl font-bold text-center">
						Let's get you Started
					</p>
					{error && (
						<p className="text-sm text-center text-red-600 my-2">{error}</p>
					)}
					<form
						onSubmit={handleSignUP}
						className="flex w-[80%]  flex-col gap-3 my-4"
					>
						<div className="flex gap-2">
							<input
								className=" border-black rounded-md border-2 p-2 px-3 w-[50%]"
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={handleChange}
								placeholder="Your first name"
							/>
							<input
								className=" border-black rounded-md border-2 p-2 px-3 w-[50%]"
								type="text"
								name="lastName"
								value={formData.lastName}
								onChange={handleChange}
								placeholder="Your last name"
							/>
						</div>
						<div className="flex gap-2 border-black rounded-md items-center border-2 p-2 px-3">
							<BiUser />
							<input
								type="text"
								name="username"
								value={formData.username}
								onChange={handleChange}
								placeholder="Your username"
								className="border-none outline-none"
							/>
						</div>
						<div className="flex gap-2 border-black rounded-md items-center border-2 p-2 px-3">
							<RiLockPasswordLine />
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								value={formData.password}
								onChange={handleChange}
								placeholder="Enter your password"
								className="outline-none"
							/>
							<div
								className="ml-auto"
								onClick={() => setShowPassword((prev) => !prev)}
							>
								{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
							</div>
						</div>
						<button
							onClick={handleSignUP}
							className="border-2  border-black rounded-md bg-blue-950 text-white p-2 px-3 w-full"
						>
							Sign Up
						</button>
					</form>
					<p>
						Don't have an account?
						<Link className="text-blue-800 font-semibold ml-1" to="/login">
							Log In
						</Link>
					</p>
				</div>
			</section>
		</div>
	);
};

export default SignUpPage;
