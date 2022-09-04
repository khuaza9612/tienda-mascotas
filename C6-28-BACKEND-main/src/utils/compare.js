import bcrypt from 'bcryptjs';

export const validatePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};

export const comparePass = (a, b) => {
  if (a === b) {
    return true;
  }
  return false;
};
