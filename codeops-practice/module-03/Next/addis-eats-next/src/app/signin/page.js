import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getSafeNext } from "@/lib/safe-redirect";
import SignInForm from "./SignInForm";

export const metadata = {
  title: "Sign in",
  description: "Sign in to see your cart and orders.",
};

const SignInPage = async ({ searchParams }) => {
  const { next } = await searchParams;
  const safeNext = getSafeNext(next);

  // Already signed in: go straight to the destination.
  const session = await getSession();
  if (session) redirect(safeNext);

  return (
    <div className="w-full px-6 mt-15 ml-85">
      <h1 className="text-blue-500 text-5xl mb-4">Sign in</h1>
      <SignInForm next={safeNext} />
    </div>
  );
};

export default SignInPage;
