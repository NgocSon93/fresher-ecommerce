const authRoute = [
  'login',
  'register',
  'forgotPassword',
]

export default defineNuxtRouteMiddleware((to) => {
  const token = useCookie('token').value

  if (to?.name) {
    // if token exists and url is /login redirect to homepage
    if (token && authRoute.includes(to?.name as string))
      return navigateTo('/')

    // if token doesn't exist redirect to log in
    if (!token && !authRoute.includes(to?.name as string)) {
      abortNavigation()
      return navigateTo('/login')
    }
  }
})
