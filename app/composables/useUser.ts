import { User } from '~~/classes/User.class';

const { $apiFetch } = useNuxtApp();

export async function useUser(username: string) {
	return useState(username, () => new User(username, $apiFetch));
}
