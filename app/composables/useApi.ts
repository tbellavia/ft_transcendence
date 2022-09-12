import { UseFetchOptions } from "#app";

async function  useApi(urlEndpoint: string) {
  const { $apiFetch } = useNuxtApp();
	return await $apiFetch(urlEndpoint)
    .then( async (data) =>{	return data })
    .catch((error) => {
      console.warn(error);
      return null
    });
}

export default useApi;