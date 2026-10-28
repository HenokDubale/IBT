"use client";

import { useEffect, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { signOut } from "@/app/actions";

const AuthLinks = () => {
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const { data, mutate } = useSWR("/api/session", fetcher);

  // The header stays mounted while you navigate, so re-check the session
  // after every navigation (for example right after signing in).
  useEffect(() => {
    mutate();
  }, [pathname, mutate]);

  // Until we know, show an empty space, so the wrong links never flash.
  if (!data) return <span className="inline-block w-44" />;

  const user = data.user;

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/orders">Orders</Link>
        {/* {user.role === "staff" && <Link href="/kitchen">Kitchen</Link>} */}

        {user.role === "staff" && <Link href="/kitchen">Kitchen</Link>}
        {user.role === "staff" && <Link href="/dashboard">Dashboard</Link>}

        <span className="text-sm">
          Hi, <b>{user.username}</b>
        </span>
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await mutate({ user: null }, { revalidate: false });
              await signOut();
            })
          }
          className="px-3 py-1 rounded bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50"
        >
          {pending ? "Signing out..." : "Sign out"}
        </button>
      </div>
    );
  }

  // Come back to the same page after signing in or registering.
  const next = encodeURIComponent(pathname);

  return (
    <div className="flex items-center gap-4">
      <Link href={`/signin?next=${next}`}>Sign in</Link>
      <Link
        href={`/register?next=${next}`}
        className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        Register
      </Link>
    </div>
  );
};

export default AuthLinks;
