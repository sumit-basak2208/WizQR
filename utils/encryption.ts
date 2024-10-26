import bcrypt from "bcryptjs";

export function generateHash(password: string): string {
  const salt = bcrypt.genSaltSync(13);
  return bcrypt.hashSync(password, salt);
}

export function checkPassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
