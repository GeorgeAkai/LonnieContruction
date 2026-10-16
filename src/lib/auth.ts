import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { connection } from "next/server";

const COOKIE = "mv_admin";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function secret() {
  const s = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!s) throw new Error("Set ADMIN_PASSWORD (and SESSION_SECRET) env vars");
  return s;
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Compare HMACs so the comparison is constant-time regardless of length.
  return safeEqual(sign(`pw:${password}`), sign(`pw:${expected}`));
}

export async function createSession() {
  const expires = Date.now() + MAX_AGE * 1000;
  const payload = `admin.${expires}`;
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  (await cookies()).delete(COOKIE);
}

export async function isAuthenticated() {
  if (!isAdminConfigured()) return false;
  // Session checks compare against the current time, so opt into request time.
  await connection();
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const i = value.lastIndexOf(".");
  const payload = value.slice(0, i);
  const sig = value.slice(i + 1);
  if (!safeEqual(sig, sign(payload))) return false;
  const expires = Number(payload.split(".")[1]);
  return Number.isFinite(expires) && expires > Date.now();
}

/** Throws unless the request carries a valid admin session. */
export async function requireAdmin() {
  if (!(await isAuthenticated())) throw new Error("Unauthorized");
}
