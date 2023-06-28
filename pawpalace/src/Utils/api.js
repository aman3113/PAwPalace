export async function getPostsByUsername() {
	try {
		const resp = await fetch("/api/posts/user/adarshbalika");
		const data = await resp.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}

export async function handleUserEdit() {
	try {
		const encodedToken = localStorage.getItem("socialEncodedToken");
		const resp = await fetch("/api/users/edit", {
			method: "POST",
			headers: {
				authorization: encodedToken,
			},
			body: JSON.stringify({
				userData: {
					followers: ["Aman", "Vicky"],
					following: [],
					bookmarks: [],
					_id: "5bbe3b5f-e84e-478a-aa80-106c68593a46",
					firstName: "Aman",
					lastName: "kumar",
					username: "adarshbalika",
					password: "adarshBalika123",
					createdAt: "2023-06-20T15:39:10+05:30",
					updatedAt: "2023-06-20T15:39:10+05:30",
					id: "1",
				},
			}),
		});
		const data = await resp.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}

export async function handleCreatePost() {
	try {
		const encodedToken = localStorage.getItem("socialEncodedToken");
		const resp = await fetch("/api/posts", {
			method: "POST",
			headers: {
				authorization: encodedToken,
			},
			body: JSON.stringify({
				postData: {
					content: "This post is written by Aman",
					image:
						"https://images.unsplash.com/photo-1682686580224-cd46ea1a6950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=600&q=60",
				},
			}),
		});
		const data = await resp.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}

export async function handleFollowUser(userId, encodedToken) {
	try {
		const resp = await fetch(`/api/users/follow/${userId}`, {
			method: "POST",
			headers: {
				authorization: encodedToken,
			},
			body: {},
		});
		return resp;
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
