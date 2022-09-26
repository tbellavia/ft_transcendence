import { UseFetchOptions } from "#app";

export async function useApi(urlEndpoint: string, options?: UseFetchOptions<DataT>) {
  const { $apiFetch } = useNuxtApp();

    return await $apiFetch(urlEndpoint, options)
	  	.then( async (datas) => {
			console.log('request: ', urlEndpoint);
			return datas;
		})
		.catch( (error) => {
			console.warn(error);
			return (undefined);
		})
}

//  -------------------------------------------------------------- -->

export async function postApi(URLendpoint: string, data?: any) {
	const { $apiFetch } = useNuxtApp();

	await $apiFetch(URLendpoint, {
		method: 'POST',
		body: data,
	})
	.catch ( async (error) => console.warn(error))
}

//  -------------------------------------------------------------- -->

export async function putApi(URLendpoint: string, data: any) {
	const { $apiFetch } = useNuxtApp();

	await $apiFetch(URLendpoint, {
		method: 'PUT',
		body: data,
	})
	.catch ( async (error) => console.warn(error))
}

//  -------------------------------------------------------------- -->

export async function deleteApi(URLendpoint: string) {
	const { $apiFetch } = useNuxtApp();

	await $apiFetch(URLendpoint, {
		method: 'DELETE',
	})
	.catch ( async (error) => console.warn(error))
}