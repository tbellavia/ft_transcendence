import { Ref } from 'vue';
import { User } from '../interfaces/user.interface';

class UserApi {
	public user: string;

	constructor(user: string) {
		this.user = user;
	}

	async isBlocked(target: string) { // TODO
		// const { data: blockedUsers } = await useApiFetch(`/users/blocked/me`);
		// console.log("BLOCKED", blockedUsers)
		return false;
	}

	async addFriend(username: string) {
		return await postApi(`/users/friends/me/${username}`)
	}

	async acceptFriend(username: string) {
		return await putApi(`/users/friends/me/${username}`,  { "pending": false })
	}

	async block(username: string) {
		return await postApi(`users/blocked/me/${username}`);
	}

	async unblock(username: string) {
		return await deleteApi(`users/blocked/me/${username}`);
	}

	async getFriends() {
		const { data: friendUsers } = await useApiFetch(`/users/friends/me`);
		console.log("friends:", friendUsers);
		return friendUsers;
	}

	async getPendingFriends() {
		const { data: pendingFriends } = await useApiFetch(`/users/friends/me?pending=true`);
		console.log(pendingFriends.value);
		return pendingFriends;
	}
	
	async getInfo() {
		const userAuth = await useGetUser();
		if (userAuth.value.username === this.user)
			return userAuth;
	}

	async getStat() {
		const { data: userStats } = await useApiFetch(`/users/stats/me`);
		return userStats;
	}
	
	async getAllUsers() {
		const { data: allUsers } = await useApiFetch(`/users/`);
		console.log('All users: ', allUsers.value);
		return allUsers;
	}

	async getAvatar() {
		const { data: avatar } = await useApiFetch(`/users/${this.user}/avatar`);
		return avatar;
	}
}

export async function useUserApi(target?: string) {
	if (!target)
		target = (await useGetUser()).value.username;

	return new UserApi(target);
}