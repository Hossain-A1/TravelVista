import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes:["/","villa-details/:id","/api/uploading"]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};