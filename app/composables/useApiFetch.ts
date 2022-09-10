import { UseFetchOptions } from "#app";

async function useApiFetch<DataT>(urlEndpoint: string, options?: UseFetchOptions<DataT>) {
  const { $apiFetch } = useNuxtApp();
  return await useAsyncData(
    () => $apiFetch(urlEndpoint, options)
  );
}

export default useApiFetch;
