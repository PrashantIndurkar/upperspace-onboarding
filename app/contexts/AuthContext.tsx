import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// User type for the authenticated user state
export type User = { name: string; email: string };

// Key used for storing user info in AsyncStorage
const AUTH_USER_KEY = "AUTH_USER_KEY";

// Utility function to validate if a value matches the User shape
function isValidUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    typeof (value as Record<string, unknown>).name === "string" &&
    typeof (value as Record<string, unknown>).email === "string"
  );
}

// Defines the values and methods exposed in the Auth Context
type AuthContextValue = {
  user: User | null; // null when logged out
  isHydrating: boolean; // true while checking AsyncStorage on app start
  signUp: (name: string, email: string, password: string) => Promise<void>; // Register user
  login: (email: string, password: string) => Promise<void>; // Log in
  logout: () => void; // Log out
  sendPasswordResetCode: (email: string) => Promise<void>; // Dummy password reset
};

// Create the Auth Context itself; initially null
const AuthContext = createContext<AuthContextValue | null>(null);

// In-memory store for demo: maps normalized email -> { user, password }
// Note: This is reset whenever the app reloads (not persistent)
const userCredentialsMap = new Map<string, { user: User; password: string }>();

export function AuthProvider({ children }: { children: ReactNode }) {
  // Authenticated user state
  const [user, setUser] = useState<User | null>(null);
  // Hydration state: true while loading user from AsyncStorage
  const [isHydrating, setIsHydrating] = useState(true);

  // On mount, check AsyncStorage for any persisted user
  useEffect(() => {
    let cancelled = false; // Prevent setState after component unmounts

    const hydrateUser = async () => {
      try {
        const raw = await AsyncStorage.getItem(AUTH_USER_KEY);

        // Skip if component unmounted during async operation
        if (cancelled) return;

        // No stored user found
        if (raw == null) {
          setIsHydrating(false);
          return;
        }

        // Parse and validate stored user data
        let parsed: unknown;
        try {
          parsed = JSON.parse(raw);
        } catch (parseError) {
          // Invalid JSON - remove corrupted data
          console.warn(
            "Failed to parse stored user data, clearing:",
            parseError,
          );
          await AsyncStorage.removeItem(AUTH_USER_KEY);
          setIsHydrating(false);
          return;
        }

        // Validate user shape and restore if valid
        if (isValidUser(parsed)) {
          setUser(parsed);
        } else {
          // Invalid user structure - remove corrupted data
          console.warn("Invalid user data structure, clearing storage");
          await AsyncStorage.removeItem(AUTH_USER_KEY);
        }
      } catch (error) {
        console.error("Failed to hydrate auth state:", error);
      } finally {
        // Always set hydration complete, unless component unmounted
        if (!cancelled) {
          setIsHydrating(false);
        }
      }
    };

    hydrateUser();

    return () => {
      cancelled = true;
    };
  }, []);

  // Registers a new user if the email does not exist
  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      const normalizedEmail = email.trim().toLowerCase();
      const trimmedName = name.trim();

      // Validate inputs
      if (!trimmedName) {
        throw new Error("Name is required.");
      }
      if (!normalizedEmail) {
        throw new Error("Email is required.");
      }
      if (!password) {
        throw new Error("Password is required.");
      }

      // Prevent duplicate registration
      if (userCredentialsMap.has(normalizedEmail)) {
        throw new Error("This email is already registered.");
      }

      // Create and store new user
      const newUser: User = { name: trimmedName, email: normalizedEmail };
      userCredentialsMap.set(normalizedEmail, { user: newUser, password });
    },
    [],
  );

  // Attempts to authenticate a user by email & password
  const login = useCallback(async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();

    // Validate inputs
    if (!normalizedEmail) {
      throw new Error("Email is required.");
    }
    if (!password) {
      throw new Error("Password is required.");
    }

    // Look up user credentials
    const entry = userCredentialsMap.get(normalizedEmail);
    if (!entry) {
      throw new Error("Incorrect credentials.");
    }

    // Verify password
    if (entry.password !== password) {
      throw new Error("Incorrect credentials.");
    }

    // Authentication successful - set user and persist to storage
    setUser(entry.user);
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(entry.user));
  }, []);

  // Logs the user out and removes persisted user from storage
  const logout = useCallback(() => {
    // Clear user state immediately for responsive UI
    setUser(null);

    // Remove from storage (fire-and-forget is acceptable for logout)
    AsyncStorage.removeItem(AUTH_USER_KEY).catch((error) => {
      console.error("Failed to clear auth storage on logout:", error);
    });
  }, []);

  // Simulated "send password reset" - placeholder for future backend integration
  const sendPasswordResetCode = useCallback(async (email: string) => {
    if (!email.trim()) {
      throw new Error("Email is required.");
    }

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Stub implementation - would call backend API in production
    // In a real app, this would send a reset code to the email
  }, []);

  // Compose the context value for consumers
  const value: AuthContextValue = {
    user,
    isHydrating,
    signUp,
    login,
    logout,
    sendPasswordResetCode,
  };

  // Provide auth context to all children beneath this provider
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook for easily accessing the AuthContext from components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx == null) {
    throw new Error("useAuth must be used within an AuthProvider"); // Enforce usage inside provider
  }
  return ctx;
}
