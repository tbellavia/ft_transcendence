import { UseFetchOptions } from "#app";

export async function useApiFetch<DataT>(urlEndpoint: string, options?: UseFetchOptions<DataT>) {
  const { $apiFetch } = useNuxtApp();
  return await useAsyncData(
    async () => await $apiFetch(urlEndpoint, options)
  );
}
