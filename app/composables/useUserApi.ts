import { Ref } from 'vue';
import { User } from '../interfaces/user.interface';

class UserApi {
	public user: string;

	constructor(user: string) {
		this.user = user;
	}
}

/* -------------------------------------------------------------- */

export async function getAvatar(username: string) {
	const avatar = await useApi(`users/${username}/avatar`);
	return URL.createObjectURL(avatar);
}

export async function getAllUsers() {
	return await useApi(`/users/`);
}
