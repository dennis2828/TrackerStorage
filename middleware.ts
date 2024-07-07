import { auth } from "@/auth";
import { PROTECTED_ROUTES } from "./constants";

//@ts-ignore
export default auth((req) => {
  // req.auth

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log("is", isLoggedIn);
  

  const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
console.log(nextUrl.pathname, PROTECTED_ROUTES.includes(nextUrl.pathname));

  const isAuthRoute = PROTECTED_ROUTES.includes(nextUrl.pathname);

  if (isApiAuthRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));

    return Response.redirect(new URL("/", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
