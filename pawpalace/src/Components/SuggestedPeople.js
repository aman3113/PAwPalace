import { Avatar, useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFollowUser } from "../Utils/api";
import { getUser } from "../Redux/UserSlice";
import { Link } from "react-router-dom";

const SuggestedPeople = () => {
	const { userDetail, encodedToken, allUsers } = useSelector(
		(store) => store.user
	);

	const dispatch = useDispatch();
	const toast = useToast();

	// follow function
	async function handleFollowBtn(userId) {
		const resp = await handleFollowUser(userId, encodedToken);
		const data = await resp.json();
		if (resp.ok) {
			dispatch(getUser(data.user));
			toast({
				title: `Following ${data.followUser.username} `,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				description: `${data.errors} `,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	}

	const usersToFollow = allUsers?.filter(
		(user) =>
			!userDetail.following?.some((elem) => elem.username === user.username) &&
			user.username !== userDetail.username
	);

	return (
		<div className="overflow-y-auto border-1 border-black shadow-sm shadow-gray-800 mt-2 w-[90%] lg:w-[80%] rounded-xl h-[70%] Scroll p-2 lg:p-3">
			<p className="text-xl font-bold mb-2">Who to Follow?</p>
			<div className="flex flex-col gap-3">
				{usersToFollow?.map((user) => {
					return (
						<div
							className="flex items-center justify-between gap-2"
							key={user.id}
						>
							<div className="flex items-center gap-2">
								<Link to={`/app/profile/${user._id}`}>
									<Avatar
										size="sm"
										name={user.firstName}
										src={user.picture}
										className="cursor-pointer"
									/>
								</Link>

								<div>
									<p className="text-sm font-semibold">
										{user.firstName} {user.lastName}
									</p>
									<p className="text-sm">{user.username}</p>
								</div>
							</div>

							<button
								onClick={() => handleFollowBtn(user._id)}
								className="bg-blue-700 text-white p-1 px-2 rounded-2xl"
							>
								Follow
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SuggestedPeople;
