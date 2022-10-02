export async function refreshUrl() {
	try {// TODO mai-fliend eithan
		const route = useRoute();
		await getRefreshedUserAuthenticate();
		await navigateTo(route.fullPath)
		// else
	} catch {
		await navigateTo(`/`)
		// TODO need to see with virginie eithan
	} // TODO mai-fliend eithan
}