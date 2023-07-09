import { getAllPosts } from "../Redux/PostSlice";
import { getUser, handleUserBookmark } from "../Redux/UserSlice";

export async function getPostsByUsername() {
	try {
		const resp = await fetch("/api/posts/user/adarshbalika");
		const data = await resp.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}
//Delete Post
export async function handlePostDelete(postId, encodedToken, dispatch) {
	try {
		const resp = await fetch(`/api/posts/${postId}`, {
			method: "DELETE",
			headers: {
				authorization: encodedToken,
			},
		});
		const data = await resp.json();

		if (resp.ok) {
			dispatch(getAllPosts(data.posts));
			console.log(data);
		}
	} catch (err) {
		console.log(err);
	}
}

//Post Like
export async function handlePostLike(
	path,
	postId,
	encodedToken,
	dispatch,
	toast
) {
	try {
		const resp = await fetch(`/api/posts/${path}/${postId}`, {
			method: "POST",
			headers: {
				authorization: encodedToken,
			},
			body: {},
		});
		const data = await resp.json();
		if (resp.ok) {
			dispatch(getAllPosts(data.posts));
			toast({
				title: `${path}d a post`,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: `${data.errors}`,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
	} catch (err) {
		console.log(err);
	}
}

//Post Bookmark
export async function handlePostBookmark(
	path,
	postId,
	encodedToken,
	dispatch,
	toast
) {
	try {
		const resp = await fetch(`/api/users/${path}/${postId}`, {
			method: "POST",
			headers: {
				authorization: encodedToken,
			},
			body: {},
		});
		const data = await resp.json();
		if (resp.ok) {
			dispatch(handleUserBookmark(data.bookmarks));
			toast({
				title: `post ${
					path === "bookmark" ? "added to" : "removed from"
				} bookmarks`,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: `${data.errors}`,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		}
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

// create Post
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
// Edit Post
export async function handleEditPost(
	id,
	postDetails,
	encodedToken,
	dispatch,
	toast
) {
	try {
		const resp = await fetch(`/api/posts/edit/${id}`, {
			method: "POST",
			headers: {
				authorization: encodedToken,
			},
			body: JSON.stringify({
				postData: postDetails,
			}),
		});
		const data = await resp.json();

		if (resp.ok) {
			dispatch(getAllPosts(data.posts));
			toast({
				title: `Post Edited`,
				status: "success",
				duration: 1000,
				isClosable: true,
			});
		} else {
			toast({
				title: `${data.errors}`,
				status: "error",
				duration: 1000,
				isClosable: true,
			});
		}
	} catch (err) {
		console.log(err);
	}
}

//
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

export const avatarArr = [
	"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?size=626&ext=jpg&ga=GA1.2.1969286105.1688930755&semt=ais",
	"https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.2.1969286105.1688930755&semt=ais",
	"https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg?size=626&ext=jpg&ga=GA1.2.1969286105.1688930755&semt=ais",
	"https://img.freepik.com/premium-vector/people-saving-money_24908-51569.jpg?size=626&ext=jpg&ga=GA1.1.1969286105.1688930755&semt=ais",
	"https://img.freepik.com/premium-vector/3d-man-avatar-happy-smiling-face-icon-young-businessman-student-freelancer_313242-1219.jpg?size=626&ext=jpg&ga=GA1.1.1969286105.1688930755&semt=ais",
	"https://img.freepik.com/premium-vector/young-man-avatar-character_24877-9475.jpg?size=626&ext=jpg&ga=GA1.1.1969286105.1688930755&semt=ais",
];

export const backgroundArr = [
	"https://plus.unsplash.com/premium_photo-1667486075273-5d3bf432550b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNvbG9yJTIwZ3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
	"https://images.unsplash.com/photo-1524312966005-030e396636fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvbG9yJTIwZ3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
	"https://images.unsplash.com/photo-1487266659293-c4762f375955?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNvbG9yJTIwZ3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
	"https://images.unsplash.com/photo-1605106250963-ffda6d2a4b32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGNvbG9yJTIwZ3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
	"https://plus.unsplash.com/premium_photo-1661963744231-0a9b4bd911ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjF8fGNvbG9yJTIwZ3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
	"https://plus.unsplash.com/premium_photo-1681426537291-0b26870960d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fGNvbG9yJTIwZ3JhZGllbnQlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60",
];
