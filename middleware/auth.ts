export default defineNuxtRouteMiddleware((to) => {

  const { loggedIn } = useUserSession();
  if (!loggedIn.value) return navigateTo("/login");




  /*
  // Check if the user is authenticated by verifying the token
  if(to.path === '/login') {
    console.log("Skipping authentication check for login page");
    return;
  };
  console.log("Checking authentication middleware ===>", to.path);
  const token = useCookie("token").value;
  if (!token) return navigateTo("/login");
  // || isTokenExpired(token)  && to.path !== "/login"
  */
});

const isTokenExpired = (token: string) => {
  if (!token) return true;
  const jwtPayload = JSON.parse(window.atob(token.split(".")[1]));
  const expiresAt = jwtPayload.exp;
  const now = Date.now();
  return expiresAt >= now;
};