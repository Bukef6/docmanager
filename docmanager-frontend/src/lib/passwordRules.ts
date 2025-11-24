export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

export const validatePassword = (password: string) => {
  if (password.length < 5) return null; // skip validation for short passwords
  if (password.length < 8 && password.length > 4)
    return "Password must be at least 8 characters long.";

  if (!/[A-Z]/.test(password))
    return "Password must contain at least one uppercase letter.";

  if (!/[a-z]/.test(password))
    return "Password must contain at least one lowercase letter.";

  if (!/\d/.test(password)) return "Password must contain at least one number.";

  return null; // OK
};
