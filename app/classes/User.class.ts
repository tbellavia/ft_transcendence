import { $Fetch } from "ohmyfetch";

export interface UserStats {
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
	public matchs: Object;
	public isInGame: boolean;

	protected readonly fetchingMethod: $Fetch;
	private avatar: Blob;

	constructor(username: string, fetchingMethod: $Fetch) {
		this.username = username;
		this.isInGame = false;
		this.fetchingMethod = fetchingMethod.create({
			baseURL: 'http://localhost:3000/api/v1/users'
		});
	}


	/**
	 * Fetch all user's datas
	 * call all fetch methods that is not fetchAll
	 */
	public async fetchAll() {
		await this.fetchingMethod(`/${this.username}`)
		.then( async () => {
			Object.getOwnPropertyNames(User.prototype).forEach(async key => {
				if (key.startsWith('fetch') && key != 'fetchAll' && key != 'fetchingMethod') {
					await this[key]();
				}
				return this;
			});
		})
		.catch( async (error) => {
			console.log(error);
			return undefined;
		})
	}

	public async fetchInfos() {
		const infos: UserInfos = await this.fetchingMethod(this.username);
		this.double_auth_enabled = infos.double_auth_enabled;
		return this.double_auth_enabled;
	}

	public async fetchStats() {

		const stats: UserStats = await this.fetchingMethod(`${this.username}/stats`).catch(() => {});
		if (stats)
			this.stats = stats;
		else {

			this.stats = {
				game_abandonned: 0,
				game_total: 0,
				game_won: 0,
				rank: 'WOOD',
			}
		}
		return this.stats;
	}

	public async fetchAvatar() {
		const avatar: Blob = await this.fetchingMethod(`${this.username}/avatar`);
		this.avatar = avatar;
		this.avatar_url = URL.createObjectURL(this.avatar);
		return this.avatar_url;
	}

	public async fetchMatch() {
		// const matchs = await this.fetchingMethod(`/api/v1/users/${this.username}/matches`);
		this.matchs = await this.fetchingMethod(`/${this.username}/matches`);
		return this.matchs;
	}
	

	  /* UTILS */
  /* -------------------------------------------------------------- */
  // Extract username if User
  	protected extractUsername(target: User | string) {
    return typeof(target) == 'string' ? target : target.username;
  }


}
