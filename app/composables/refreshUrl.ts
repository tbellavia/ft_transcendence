export async function refreshUrl() {
	try {
		const user = await getRefreshedUserAuthenticate();
		const route = useRoute();
		// if (route.params.username !== user.value.username) {
			const test = await redirectIfConnected(route.fullPath, '/');
			console.log(test)
			// }
		// const goToUser = await this.findOneByName(route.params.username)
		// await navigateTo(`/${route.params.username}/profile`)
	} catch {
		const user = await getRefreshedUserAuthenticate();
		await navigateTo(`/${user.value.username}/profile`)
		// TODO need to redirect self profile page eithan
	}
}