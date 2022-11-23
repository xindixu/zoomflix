import { apiFetch } from "./api-fetch"

export function signUp({ email, username, password }) {
  return apiFetch({
    method: "post",
    data: {
      email,
      username,
      password,
    },
    url: "/user/sign-up",
  })
}

export function signIn({ username, password }) {
  return apiFetch({
    method: "post",
    data: {
      username,
      password,
    },
    url: "/user/sign-in",
  })
}

export async function signOut() {
  return () => {}
}

export async function getCurrentUser() {
  return () => {}
}
