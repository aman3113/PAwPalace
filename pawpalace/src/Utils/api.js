async function handleLogin() {
	try {
		const resp = await fetch("api/auth/login", {
			method: "POST",
			body: JSON.stringify({
				username: "adarshbalika",
				password: "adarshBalika123",
			}),
		});
		const data = await resp.json();
		console.log(data);
		localStorage.setItem("socialEncodedToken", data.encodedToken);
	} catch (err) {
		console.log(err);
	}
}

async function getUsers() {
	try {
		const resp = await fetch("/api/users");
		const data = await resp.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}
async function getPosts() {
	try {
		const resp = await fetch("/api/posts");
		const data = await resp.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}

async function getPostsByUsername() {
	try {
		const resp = await fetch("/api/posts/user/adarshbalika");
		const data = await resp.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}

async function handleUserEdit() {
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

async function handleCreatePost() {
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
async function handleBookmarkPost() {
	try {
		const encodedToken = localStorage.getItem("socialEncodedToken");
		const resp = await fetch(
			"/api/users/bookmark/c1564fff-4367-4a25-b753-18c5952b5ba2",
			{
				method: "POST",
				headers: {
					authorization: encodedToken,
				},
				body: {},
			}
		);
		const data = await resp.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}
async function handleFollowUser() {
	try {
		const encodedToken = localStorage.getItem("socialEncodedToken");
		const resp = await fetch(
			"/api/users/follow/89a7521a-865a-4a3f-ab4a-9729c4e98849",
			{
				method: "POST",
				headers: {
					authorization: encodedToken,
				},
				body: {},
			}
		);
		const data = await resp.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}
