import validator from "validator";

/**
 * Validates an email address
 * 1. Checks if email format is valid using validator
 * 2. Checks if email is disposable using debounce.io API
 * 3. Silently accepts email if disposable check API fails
 *
 * @param email - The email address to validate
 * @returns true if email is valid, false if invalid
 * @throws Error with validation message if email is invalid
 */
export async function validateEmail(email: string): Promise<boolean> {
  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email address.");
  }

  try {
    const response = await fetch(
      `https://disposable.debounce.io/?email=${encodeURIComponent(email)}`
    );
    if (response.ok) {
      const data = await response.json();
      if (data.disposable === "true" || data.disposable === true) {
        throw new Error("Disposable email addresses aren't allowed.");
      }
    }
  } catch (e) {
    if (
      e instanceof Error &&
      (e.message.includes("valid email") || e.message.includes("Disposable"))
    ) {
      throw e;
    }
    console.error("Disposable email check failed", e);
  }

  return true; // Email is valid
}
