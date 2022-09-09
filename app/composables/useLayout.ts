export default async function uselayout() {
	const { $apiFetch } = useNuxtApp();

	return await $apiFetch("/auth/isConnected")
	  .then(async () => await 'home')
	  .catch(async () => await 'default');
}
