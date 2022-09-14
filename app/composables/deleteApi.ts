export async function deleteApi(URLendpoint: string) {
	const { $apiFetch } = useNuxtApp();

	await $apiFetch(URLendpoint, {
		method: 'DELETE',
	})
	.then ( async () => console.log("DELETE OK"))
	.then ( async (error) => console.warn(error))
}