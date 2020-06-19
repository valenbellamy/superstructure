export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("superstructureUser")
    ? JSON.parse(window.localStorage.getItem("superstructureUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("superstructureUser", JSON.stringify(user))

export const handleLogin = ({ username, password }) => {
  if (username === `Superstructure` && password === `123456`) {
    return setUser({
      username: `Superstructure`,
    })
  }
  return false
}

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}
