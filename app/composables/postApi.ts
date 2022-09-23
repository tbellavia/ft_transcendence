import apiFetch from "~~/plugins/apiFetch";

export async function postApi(URLendpoint: string, data?: any) {
	const { $apiFetch } = useNuxtApp();

	await $apiFetch(URLendpoint, {
		method: 'POST',
		body: data,
	})
	.then ( async () => console.log("POST ok"))
	.catch ( async (error) => console.warn(error))
}

export async function putApi(URLendpoint: string, data: any) {
	const { $apiFetch } = useNuxtApp();

	await $apiFetch(URLendpoint, {
		method: 'PUT',
		body: data,
	})
	.then ( async () => console.log("PUT ok"))
	.catch ( async (error) => console.warn(error))
}