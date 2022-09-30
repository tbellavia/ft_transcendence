import { User } from '~~/classes/User.class';


export async function useUser(username: string) {
	const { $apiFetch } = useNuxtApp();
	const user = useState(username, () => new User(username, $apiFetch));
	await user.value.fetchAll();
	return user
}
