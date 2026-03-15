/**
 * Simple email validation (local part @ domain with TLD).
 */
function isValidEmail(email: string): boolean {
  return /.+@.+\.[a-zA-Z]{2,}$/.test(email.trim());
}

// Simple error types - just plain objects with optional string fields
export type SignUpErrors = {
  name?: string;
  email?: string;
  password?: string;
};

export type LoginErrors = {
  email?: string;
  password?: string;
};

export type ForgotPasswordErrors = {
  email?: string;
};

/**
 * Helper: Check if errors object has any validation errors.
 * Returns true if there are errors, false if valid.
 */
export function hasErrors(errors: Record<string, string | undefined>): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Validates sign-up form. Returns errors object - empty means valid, has keys means invalid.
 */
export function validateSignUp(
  name: string,
  email: string,
  password: string,
): SignUpErrors {
  const errors: SignUpErrors = {};

  if (!name?.trim()) {
    errors.name = "Full name is required.";
  }
  if (!email?.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
}

/**
 * Validates login form. Email required + valid format; password required only (no min length).
 * Returns errors object - empty means valid, has keys means invalid.
 */
export function validateLogin(email: string, password: string): LoginErrors {
  const errors: LoginErrors = {};

  if (!email?.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!password) {
    errors.password = "Password is required.";
  }

  return errors;
}

/**
 * Validates forgot-password form. Email required + valid format only.
 * Returns errors object - empty means valid, has keys means invalid.
 */
export function validateForgotPassword(email: string): ForgotPasswordErrors {
  const errors: ForgotPasswordErrors = {};

  if (!email?.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(email)) {
    errors.email = "Please enter a valid email address.";
  }

  return errors;
}
