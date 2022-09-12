import apiFetch from "~~/plugins/apiFetch";

export async function postApi(URLendpoint: string, data: any) {
	const { $apiFetch } = useNuxtApp();

	await $apiFetch(URLendpoint, {
		method: 'POST',
	}).then ( async () => console.log("PUT ok"))
	.then ( async (error) => console.warn(error))
}

export async function putApi(URLendpoint: string, data: any) {
	const { $apiFetch } = useNuxtApp();

	await $apiFetch(URLendpoint, {
		method: 'PUT',
	})
	.then ( async () => console.log("PUT ok"))
	.then ( async (error) => console.warn(error))
}