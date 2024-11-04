import jwt from "jsonwebtoken";

export function getToken(data: Object) {
  return jwt.sign(data, process.env.JWT_TOKEN ?? "");
}

export function getTokenData(token: string) {
  try {
    return jwt.verify(token, process.env.JWT_TOKEN ?? "");
  } catch (error: unknown) {
    const err = error as Error;
    console.log(err);
    return false;
  }
}
