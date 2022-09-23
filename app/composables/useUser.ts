import { User } from '~~/classes/User.class';

const { $apiFetch } = useNuxtApp();

export async function useUser(username: string) {
	const user = useState(username, () => new User(username, $apiFetch));
	await user.value.fetchAll();
	return user;
}
