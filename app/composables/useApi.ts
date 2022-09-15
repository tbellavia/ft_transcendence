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
