export default defineNuxtPlugin(() => {
  return {
    provide: {
      apiFetch: $fetch.create({
        baseURL: "http://localhost:3000/api/v1",
        credentials: "include",
      }),
    },
  };
});
