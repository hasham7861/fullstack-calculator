import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const compareHash = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
}