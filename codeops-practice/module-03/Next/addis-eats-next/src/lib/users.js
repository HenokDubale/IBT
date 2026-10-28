import { scryptSync, randomBytes, timingSafeEqual } from "crypto";

export function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(":");
  const attempt = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return (
    attempt.length === expected.length && timingSafeEqual(attempt, expected)
  );
}

// One shared list, seeded once, even if Next.js loads this file twice.
const globalForUsers = globalThis;

if (!globalForUsers.__users) {
  globalForUsers.__users = [
    {
      id: 1,
      username: "abebe",
      role: "customer",
      password: hashPassword("abebe123"),
    },
    {
      id: 2,
      username: "kebede",
      role: "customer",
      password: hashPassword("kebede123"),
    },
    {
      id: 3,
      username: "chef",
      role: "staff",
      password: hashPassword("chef12345"),
    },
  ];
}

const users = globalForUsers.__users;

export function findUserByUsername(username) {
  return users.find((u) => u.username === username);
}

export function findUserById(id) {
  return users.find((u) => u.id === id);
}

export function createUser({ username, password }) {
  const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  // The role is fixed here. It is never read from a form,
  // so nobody can register themselves as staff.
  const user = {
    id,
    username,
    role: "customer",
    password: hashPassword(password),
  };

  users.push(user);
  return user;
}
