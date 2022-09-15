import { UseFetchOptions } from "#app";

export async function useApiFetch<DataT>(urlEndpoint: string, options?: UseFetchOptions<DataT>) {
  const { $apiFetch } = useNuxtApp();
  return await useAsyncData(
    async () => {
      const datas = await $apiFetch(urlEndpoint, options);
      console.log('request useApiFetch: ', urlEndpoint);
      return datas;
    },
    {
      server: false,
      initialCache: false,
      ...options,
    }
  );
}
