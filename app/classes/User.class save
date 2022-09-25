import { $Fetch } from "ohmyfetch";

export interface UserStats {
	stat_id: string;
	game_total: number;
	game_won: number;
	game_abandonned: number;
	rank: 'GOLD' | 'SILVER' | 'BRONZE' | 'WOOD';
};

export interface UserInfos {
	username: string;
	double_auth_enabled: boolean;
	creation_date: Date;
};

export class User {
	public username: string;
	public double_auth_enabled: boolean;
	public avatar_url: string;
	public stats: UserStats;

	protected readonly fetchingMethod: $Fetch;
	private avatar: Blob;

	constructor(username: string, fetchingMethod: $Fetch) {
		this.username = username;
		this.fetchingMethod = fetchingMethod.create({
			baseURL: '/api/v1/users'
		});
	}

	/**
	 * Fetch all user's datas
	 * call all fetch methods that is not fetchAll
	 */
	public async fetchAll() {
		for (let key in Object.keys(this)) {
			if (key.startsWith('fetch') && key != 'fetchAll' && key != 'fetchingMethod')
				await this[key]();
		}
		return this;
	}

	public async fetchInfos() {
		const infos: UserInfos = await this.fetchingMethod(this.username);
		this.double_auth_enabled = infos.double_auth_enabled;
	}

	public async fetchStats() {
		const stats: UserStats = await this.fetchingMethod(`${this.username}/stats`);
		this.stats = stats;
	}

	public async fetchAvatar() {
		const avatar: Blob = await this.fetchingMethod(`${this.username}/avatar`);
		this.avatar = avatar;
		this.avatar_url = URL.createObjectURL(this.avatar);
	}
}

export async function createAndInitUser(username: string, fetchingMethod: $Fetch) {
	const user = new User(username, fetchingMethod);
	await user.fetchAll();
	return user;
}