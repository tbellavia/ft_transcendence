async function getUsers(username: string) {
	const truc =  await useApiFetch(`/users/${username}`)
	console.log(truc);
}

async function getFriends(username: string) {
	return useApiFetch(`/users/${username}/friends`)
}

async function isBlocked(username: string, username2 : string) {
	return useApiFetch(`users/${username}/blocked/${username2}`)
}


