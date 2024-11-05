import { getTokenData } from "./token";

export function getUserId(
  tokenCookie: { name: string; value: string } | undefined
): string | boolean {
  if (!tokenCookie) return false;
  const dt = getTokenData(tokenCookie.value);
  const data = dt as { userId: string } | boolean;
  if (!data || typeof data != "object") return false;
  return data.userId;
}
