import { Ref } from 'vue';
import { User } from '../interfaces/user.interface';

class UserApi {
	public user: string;

	constructor(user: string) {
		this.user = user;
	}

	/* Relation Friendship */			
	/* -------------------------------------------------------------- */

	// async addFriend(username: string) {
	// 	return await postApi(`/users/friends/me/${username}`)
	// }

	// async acceptFriend(username: string) {
	// 	return await putApi(`/users/friends/me/${username}`,  { "pending": false })
	// }

	// async deleteFriend(username: string) {
	// 	return await deleteApi(`/users/friends/me/${username}`)
	// }

	// async getFriends() {
	// 	const friendUsers = await useApi(`/users/friends/me?pending=false`);
	// 	return friendUsers;
	// }

	// async getPendingFriends() {
	// 	const pendingFriends = await useApi(`/users/friends/me/request`);
	// 	return pendingFriends;
	// }

	/* blocked users */
	/* -------------------------------------------------------------- */

	// async isBlocked(target: string) { // TODO
	// 	let booleanString = await useApi(`/users/blocked/me/${target}`);
	// 	if (booleanString === "true")
	// 		return true;
	// 	return false;
	// }

	// async block(username: string) {
	// 	return await postApi(`users/blocked/me/${username}`);
	// }

	// async unblock(username: string) {
	// 	return await deleteApi(`users/blocked/me/${username}`);
	// }

} // end of class user

/* -------------------------------------------------------------- */

// export async function useUserApi(target?: string) {
// 	if (!target)
// 		target = (await useGetUser())?.value?.username;

// 	return new UserApi(target);
// }

/* -------------------------------------------------------------- */

export async function getAvatar(username: string) {
	const avatar = await useApi(`users/${username}/avatar`);
	return URL.createObjectURL(avatar);
}

export async function getAllUsers() {
	return await useApi(`/users/`);
}
