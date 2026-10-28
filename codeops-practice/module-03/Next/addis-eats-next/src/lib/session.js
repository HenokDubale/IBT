import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { findUserById } from "./users";

const COOKIE_NAME = "session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

// One shared session table, even if Next.js loads this file more than once.
const globalForSessions = globalThis;
if (!globalForSessions.__sessions) {
  globalForSessions.__sessions = new Map();
}
const sessions = globalForSessions.__sessions;

// Call from a Server Action or Route Handler only (it sets a cookie).
export async function createSession(userId) {
  const sessionId = randomUUID();
  sessions.set(sessionId, { userId, expiresAt: Date.now() + MAX_AGE * 1000 });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

// Safe to call anywhere on the server: pages, actions, route handlers.
export async function getSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_NAME)?.value;
  if (!sessionId) return null;

  const session = sessions.get(sessionId);
  if (!session) return null;

  if (session.expiresAt < Date.now()) {
    sessions.delete(sessionId);
    return null;
  }

  const user = findUserById(session.userId);
  if (!user) return null;

  // Never return the password hash.
  return { id: user.id, username: user.username, role: user.role };
}

// Call from a Server Action or Route Handler only (it deletes a cookie).
export async function deleteSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(COOKIE_NAME)?.value;
  if (sessionId) sessions.delete(sessionId);
  cookieStore.delete(COOKIE_NAME);
}
