export default defineNuxtPlugin(() => {
  return {
    provide: {
      apiFetch: $fetch.create({
        baseURL: 'http://localhost:3000/',
        credentials: 'include'
      })
    }
  }
});