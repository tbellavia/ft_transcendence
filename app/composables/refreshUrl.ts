export async function refreshUrl() {
	try {
		const route = useRoute();
		await redirectIfConnected(route.fullPath, '/');
	} catch {
		const user = await getRefreshedUserAuthenticate();
		await navigateTo(`/${user.value.username}/profile`)
		// TODO need to see with virginie eithan
	}
}