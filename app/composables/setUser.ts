// export async function setFriends(username: string, friend: string) {
// 	if (username && friend) {
// 		return await postApi(`/users/friends/${friend}`)
// 	}
// 	return undefined;
// }

// export async function setAcceptFriends(username: string, friend: string) {
// 	if (username && friend) {
// 		return await putApi(`/users/${username}/friends/${friend}`,  { "pending": false })
// 	}
// 	return undefined;
// }

// export async function setBlock(username: string, toBlock: string) {
// 	if (username && toBlock) {
// 		return await postApi(`/users/${username}/blocked/${toBlock}`)
// 	}
// 	return undefined;
// }


// export async function setUnblock(username: string, toUnblock: string) {
// 	if (username && toUnblock) {
// 		return await deleteApi(`/users/${username}/blocked/${toUnblock}`)
// 	}
// 	return undefined;
// }