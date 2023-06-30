import { getAllPosts } from "../Redux/PostSlice";
import { getUser } from "../Redux/UserSlice";

export async function getPostsByUsername() {
	try {
		const resp = await fetch("/api/posts/user/adarshbalika");
		const data = await resp.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}
//Follow unFollow Btn
export async function handleFollowBtn(
	userId,
	path,
	dispatch,
	toast,
	encodedToken
) {
	try {
		const resp = await fetch(`/api/users/${path}/${userId}`, {
			method: "POST",
			headers: {
				authorization: encodedToken,
			},
			body: {},
		});
		const data = await resp.json();
		if (resp.ok) {
			dispatch(getUser(data.user));
			toast({
				title: `${path}ing ${data.followUser.username} `,
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
	} catch (err) {
		console.log(err);
	}
}

// User Edit

export async function handleUserEdit(userData, encodedToken, dispatch, toast) {
	try {
		const resp = await fetch("/api/users/edit", {
			method: "POST",
			headers: {
				authorization: encodedToken,
			},
			body: JSON.stringify({
				userData: userData,
			}),
		});
		const data = await resp.json();
		if (resp.ok) {
			dispatch(getUser(data.user));
			toast({
				title: `Profile Edited`,
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
	} catch (err) {
		console.log(err);
	}
}

export async function handleCreatePost(postDetails, encodedToken, dispatch) {
	try {
		const resp = await fetch("/api/posts", {
			method: "POST",
			headers: {
				authorization: encodedToken,
			},
			body: JSON.stringify({
				postData: postDetails,
			}),
		});
		const data = await resp.json();
		dispatch(getAllPosts(data.posts));
	} catch (err) {
		console.log(err);
	}
}

export function timePostCreated(postDate) {
	const currentDate = new Date();

	const diffInMilliseconds = currentDate - new Date(postDate);
	const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
	const diffInMinutes = Math.floor(diffInSeconds / 60);
	const diffInHours = Math.floor(diffInMinutes / 60);
	const diffInDays = Math.floor(diffInHours / 24);

	if (diffInDays > 0) {
		return `${diffInDays} day ago`;
	} else if (diffInHours > 0) {
		return `${diffInHours} hr ago`;
	} else if (diffInMinutes > 0) {
		return `${diffInMinutes} min ago`;
	} else {
		return `just now`;
	}
}
