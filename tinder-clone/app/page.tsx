import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { alreadySwipped, getUserById } from "./neo4j.action";
import HomePageClient from "@/components/Home";
export default async function Home() {
  // Check if user is logged in or not
  const { isAuthenticated, getUser } = getKindeServerSession();
  // If not then redirect to this page, basically a login or sign up page
  if (!(await isAuthenticated())) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }
  // Check is there is no user
  const user = await getUser();
  // If not then redirect to this page, basically a login or sign up page
  if (!user) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }
  const otheruser = await alreadySwipped(user.id);
  const currentUser = await getUserById(user.id);
  // calling the controller that gives all the users that have no connection to current user
  const usersWithNoConnections = await alreadySwipped(user.id);
  return (
    <main>
      {currentUser && (
        <HomePageClient currentUser={currentUser} users={otheruser} />
      )}
    </main>
  );
}
