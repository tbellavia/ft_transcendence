export default async function useApiFetch(url: string, options?: any) {
	return await useFetch(url, {
		baseURL: 'http://localhost:3000/api/v1',
		credentials: 'include',
		...options
	});
}
