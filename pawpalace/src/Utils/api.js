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

export const imageGallery = [
	"https://images.unsplash.com/photo-1568572933382-74d440642117?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
	"https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fERvZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
	"https://images.unsplash.com/photo-1568274604780-30c1bcacb31a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fERvZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
	"https://images.unsplash.com/photo-1548658166-136d9f6a7e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fERvZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
	"https://images.unsplash.com/photo-1540411003967-af56b79be677?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fERvZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
	"https://plus.unsplash.com/premium_photo-1668114375111-e90b5e975df6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fERvZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
	"https://images.unsplash.com/photo-1591768575198-88dac53fbd0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fERvZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
	"https://images.unsplash.com/photo-1583336663277-620dc1996580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fERvZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
	"https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fERvZ3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60",
];
