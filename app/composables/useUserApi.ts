import { Ref } from 'vue';
import { User } from '../interfaces/user.interface';

class UserApi {
	public user: string;

	constructor(user: string) {
		this.user = user;
	}

	async isBlocked(target: string) {
		const { data: blockedUsers } = await useApiFetch(`/users/${this.user}/blocked/${target}`);
		return blockedUsers;
	}

	async getFriends() {
		const { data: friendUsers } = await useApiFetch(`/users/${this.user}/friends`);
		console.log("friends:", friendUsers);
		return friendUsers;
	}

	async getPendingFriends() {
		const { data: pendingFriends } = await useApiFetch(`/users/${this.user}?pending=true`);
		console.log(pendingFriends.value);
		return pendingFriends;
	}
	
	async getInfo() {
		const userAuth = await useGetUser();
		if (userAuth.value.username === this.user)
			return userAuth;
	}

	async getStat() {
		const { data: userStats } = await useApiFetch(`/users/${this.user}/stats`);
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