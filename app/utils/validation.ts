/**
 * Simple email validation (local part @ domain with TLD).
 */
function isValidEmail(email: string): boolean {
  return /.+@.+\.[a-zA-Z]{2,}$/.test(email.trim());
}

export type SignUpValidationResult =
  | { ok: true }
  | { ok: false; errors: string[] };

/**
 * Validates sign-up form. Returns all applicable errors.
 */
export function validateSignUp(
  name: string,
  email: string,
  password: string
): SignUpValidationResult {
  const errors: string[] = [];

  if (!name?.trim()) {
    errors.push("Full name is required.");
  }
  if (!email?.trim()) {
    errors.push("Email is required.");
  } else if (!isValidEmail(email)) {
    errors.push("Please enter a valid email address.");
  }
  if (!password) {
    errors.push("Password is required.");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters.");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return { ok: true };
}

/**
 * Validates login form. Email required + valid format; password required only (no min length).
 */
export function validateLogin(
  email: string,
  password: string
): SignUpValidationResult {
  const errors: string[] = [];

  if (!email?.trim()) {
    errors.push("Email is required.");
  } else if (!isValidEmail(email)) {
    errors.push("Please enter a valid email address.");
  }
  if (!password) {
    errors.push("Password is required.");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return { ok: true };
}

/**
 * Validates forgot-password form. Email required + valid format only.
 */
export function validateForgotPassword(email: string): SignUpValidationResult {
  const errors: string[] = [];

  if (!email?.trim()) {
    errors.push("Email is required.");
  } else if (!isValidEmail(email)) {
    errors.push("Please enter a valid email address.");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }
  return { ok: true };
}
