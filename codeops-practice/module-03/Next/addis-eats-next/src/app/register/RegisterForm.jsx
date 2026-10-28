"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/app/actions";

const fields = [
  { name: "username", label: "Username", type: "text" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm password", type: "password" },
];

const RegisterForm = ({ next }) => {
  const [state, formAction, pending] = useActionState(register, {
    fieldErrors: {},
    values: { username: "" },
  });

  return (
    <form
      action={formAction}
      className="w-full max-w-md bg-gray-800 p-6 rounded-lg space-y-4"
    >
      <input type="hidden" name="next" value={next} />

      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="block mb-1 text-sm text-gray-300"
          >
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            defaultValue={
              field.name === "username" ? state.values?.username : ""
            }
            className={`w-full px-3 py-2 rounded bg-gray-900 text-white border outline-none focus:border-blue-500 ${
              state.fieldErrors?.[field.name]
                ? "border-red-500"
                : "border-gray-600"
            }`}
          />
          {state.fieldErrors?.[field.name]?.[0] && (
            <p className="mt-1 text-sm text-red-400">
              {state.fieldErrors[field.name][0]}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={pending}
        className="w-full px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        {pending ? "Creating account..." : "Register"}
      </button>

      <p className="text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          href={`/signin?next=${encodeURIComponent(next)}`}
          className="underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
