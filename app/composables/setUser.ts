export async function setFriends(username: string, friend: string) {
	if (username && friend) {
		await postApi(`/users/${username}/friends/${friend}`,  )
	}
	return false;
}

export async function setAcceptFriends(username: string, friend: string) {
	if (username && friend) {
		await putApi(`/users/${username}/friends/${friend}`,  { "pending": false })
	}
	return false;
}