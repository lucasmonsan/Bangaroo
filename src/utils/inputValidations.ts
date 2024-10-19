export const validateFullName = (fullName: string) => {
  const fullNameRegex = /^([A-Za-z0-9_\-.'\s])+$/;
  const hasSurname = fullName.trim().split(" ").length > 1;
  return fullNameRegex.test(fullName) && hasSurname;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  return password.length >= 8;
};
