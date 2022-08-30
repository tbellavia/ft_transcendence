/**
* Check if user is connected using api endpoints
* if connected redirect to page
* @param page the page to redirect user
*/
export default async redirectIfConnected(page: string) {
 const { $apiFetch } = useNuxtApp();
 await $apiFetch("/auth/isConnected").then(
   async () => await navigateTo(page)
 );