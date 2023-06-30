import { Avatar, useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleFollowBtn } from "../Utils/api";
import { Link } from "react-router-dom";

const SuggestedPeople = () => {
	const { userDetail, encodedToken, allUsers } = useSelector(
		(store) => store.user
	);

	const dispatch = useDispatch();
	const toast = useToast();

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
								onClick={() =>
									handleFollowBtn(
										user._id,
										"follow",
										dispatch,
										toast,
										encodedToken
									)
								}
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
