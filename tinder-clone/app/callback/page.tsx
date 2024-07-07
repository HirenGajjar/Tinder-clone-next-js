import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function CallBackPage() {
  // In case user directly try to jump on url without logging in or sign up, send to login/sign up page again
  // That is the reason to check here again
  const { isAuthenticated, getUser } = getKindeServerSession();
  if (!(await isAuthenticated())) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }
  const user = await getUser();
  if (!user) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }

  // Now the user is there, check if it is sign up or login
  // If sign up then create to DB
  // If login then check in DB
}
