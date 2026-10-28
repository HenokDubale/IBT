import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { getSafeNext } from "@/lib/safe-redirect";
import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "Create an account",
  description: "Register to order your favourite Ethiopian dishes.",
};

const RegisterPage = async ({ searchParams }) => {
  const { next } = await searchParams;
  const safeNext = getSafeNext(next, "/menu");

  // Already signed in: nothing to register.
  const session = await getSession();
  if (session) redirect(safeNext);

  return (
    <div className="w-full px-6 mt-15 ml-85">
      <h1 className="text-blue-500 text-5xl mb-4">Create an account</h1>
      <RegisterForm next={safeNext} />
    </div>
  );
};

export default RegisterPage;
