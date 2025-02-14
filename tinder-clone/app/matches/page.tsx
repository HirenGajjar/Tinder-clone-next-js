import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { alreadySwipped, getMatches, getUserById } from "../neo4j.action";
import { redirect } from "next/navigation";
export default async function MatchPage() {
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
  const matches = await getMatches(user.id);
  return (
    <>
      <main>
        {matches.map((user) => (
          <p key={user.applicationId}>{user.firstname}</p>
        ))}
      </main>
    </>
  );
}
