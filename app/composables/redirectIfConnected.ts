/**
 * Check if user is connected using api endpoints
 * if connected redirect to page
 * @param page the page to redirect user
 */
export async function redirectIfConnected(page: string, otherPage: string) {
	const { $apiFetch } = useNuxtApp();
	await $apiFetch("/auth/isConnected")
	  .then(async () => {
		await useUserAuthentified(); // TODO dont' work if already connected and refresh
		await navigateTo(page);
	  })
	  .catch(async () => await navigateTo(otherPage));
  }