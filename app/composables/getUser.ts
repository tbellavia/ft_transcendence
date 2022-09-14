
export async function isBlocked(username2 : string) {
	let result = useApiFetch(`/users/me/blocked/${username2}`)
	console.log(result);
	return (result);
}

export async function  getUserFriends(username: string) {
		return (username ? await useApi(`/users/friends/me`) : null);
}

export async function  getAllUsers() {
	return (await useApi(`/users`));
}

export async function  getUserInfos(username: string) {
	return (username ? await useApi(`users/${username}`) : null);
}

// TODO dont work
export async function  getUserStats(username: string) {
	return (username ? await useApi(`/users/${username}/stats`) : null);
}

export async function  getUserAvatar(username: string) {
	return (username ? await useApi(`/users/${username}/avatar`) : null);
}

export async function getPendingFriends(username: string) {
	return (username ? await useApi(`/users/me/friends?pending=true`) : null);
}
