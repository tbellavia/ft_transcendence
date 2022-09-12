
export async function isBlocked(username: string, username2 : string) {
	return useApiFetch(`/users/${username}/blocked/${username2}`)
}

export async function  getUserFriends(username: string) {
		return (username ? await useApi(`/users/${username}/friends`) : null);
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
	return (username ? await useApi(`/users/${username}/friends?pending=true`) : null);
}
