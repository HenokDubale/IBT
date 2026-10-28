"use client";

import { useActionState } from "react";
import { signIn } from "@/app/actions";
import Link from "next/link";

const SignInForm = ({ next }) => {
  const [state, formAction, pending] = useActionState(signIn, {
    error: "",
    username: "",
  });

  return (
    <form
      action={formAction}
      className="w-full max-w-md bg-gray-800 p-6 rounded-lg space-y-4"
    >
      <input type="hidden" name="next" value={next} />

      <div>
        <label htmlFor="username" className="block mb-1 text-sm text-gray-300">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          defaultValue={state.username}
          className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-gray-600 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="password" className="block mb-1 text-sm text-gray-300">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full px-3 py-2 rounded bg-gray-900 text-white border border-gray-600 outline-none focus:border-blue-500"
        />
      </div>

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
      <p className="text-sm text-gray-400 text-center">
        No account yet?{" "}
        <Link
          href={`/register?next=${encodeURIComponent(next)}`}
          className="underline"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
