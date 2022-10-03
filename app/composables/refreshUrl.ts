export async function refreshUrl() {
	try {
		const route = useRoute();
		await getRefreshedUserAuthenticate();
		await navigateTo(route.fullPath)
	} catch {
		await navigateTo(`/`)
	}
}