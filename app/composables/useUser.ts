import { $Fetch } from "ohmyfetch";

// Base fetch
const { $apiFetch } = useNuxtApp();

interface UserStats {
	stat_id: string;
	game_total: number;
	game_won: number;
	game_abandonned: number;
	rank: 'GOLD' | 'SILVER' | 'BRONZE' | 'WOOD';
};

interface UserInfos {
	username: string;
	double_auth_enabled: boolean;
	creation_date: Date;
};

class User {
	public username: string;
	public double_auth_enabled: boolean;
	public avatar_url: string;
	public stats: UserStats;

	private readonly fetchingMethod: Function;
	private avatar: Blob;

	constructor(username: string, fetchingMethod: $Fetch = $apiFetch) {
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
			if (key.startsWith('fetch') && key != 'fetchAll')
				await this[key]();
		}
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

export async function useUser(username: string) {
	return useState(username, () => new User(username));
}
