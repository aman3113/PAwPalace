import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import loginImage from "../Images/loginpage.svg";
import Header from "../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { getToken, getUser } from "../Redux/UserSlice";
import { useToast } from "@chakra-ui/react";

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const token = useSelector((store) => store.user.encodedToken);
	const toast = useToast();

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	async function handleLogin(e) {
		e.preventDefault();
		try {
			const resp = await fetch("api/auth/login", {
				method: "POST",
				body: JSON.stringify(formData),
			});
			const data = await resp.json();
			if (resp.ok) {
				dispatch(getToken(data.encodedToken));
				dispatch(getUser(data.foundUser));
				toast({
					title: "Account created.",
					description: "We've created your account for you.",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			} else {
				setError(data.errors[0]);
				toast({
					title: "Login failed.",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
		} catch (err) {
			console.log(err);
		}
	}

	async function handleGuestLogin(e) {
		e.preventDefault();
		setFormData({
			username: "aman3113",
			password: "aman123",
		});
		try {
			const resp = await fetch("api/auth/login", {
				method: "POST",
				body: JSON.stringify({
					username: "aman3113",
					password: "aman123",
				}),
			});
			const data = await resp.json();
			if (resp.ok) {
				dispatch(getToken(data.encodedToken));
				dispatch(getUser(data.foundUser));
				toast({
					title: "Account created.",
					description: "We've created your account for you.",
					status: "success",
					duration: 3000,
					isClosable: true,
				});
			} else {
				setError(data.errors[0]);
				toast({
					title: "Login failed.",
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}
		} catch (err) {
			console.log(err);
		}
	}

	if (token) {
		return <Navigate to="/app" />;
	}

	return (
		<div className="p-2 ">
			<Header />
			<div className="flex items-center justify-center min-h-[80vh]">
				<section className="flex flex-col sm:flex-row items-center">
					<div className=" w-[50%] ">
						<img src={loginImage} alt="login here" />
					</div>
					<div className=" w-full sm:w-[50%] flex flex-col items-center p-2">
						<p className="text-2xl font-bold text-center">Heyy! Welcome Back</p>
						{error && (
							<p className="text-sm text-center text-red-600 my-2">{error}</p>
						)}
						<form
							onSubmit={handleLogin}
							className="flex  sm:w-[80%]  flex-col gap-3 my-4"
						>
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
									className="ml-auto cursor-pointer"
									onClick={() => setShowPassword((prev) => !prev)}
								>
									{showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
								</div>
							</div>
							<button
								onClick={handleLogin}
								className="border-2  border-black rounded-md bg-blue-950 text-white p-2 px-3 w-full"
							>
								Log In
							</button>
							<button
								onClick={handleGuestLogin}
								className="border-2  border-black rounded-md bg-blue-950 text-white p-2 px-3 w-full"
							>
								Log In as guest
							</button>
						</form>
						<p>
							Don't have an account?
							<Link className="text-blue-800 font-semibold ml-1" to="/signup">
								Sign Up
							</Link>
						</p>
					</div>
				</section>
			</div>
		</div>
	);
};

export default LoginPage;
