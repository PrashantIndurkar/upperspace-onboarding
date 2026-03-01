import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type User = { name: string; email: string };

type AuthContextValue = {
  user: User | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  sendPasswordResetCode: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// In-memory store for Phase 2 login: email -> { user, password }
const userCredentialsMap = new Map<string, { user: User; password: string }>();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      const normalizedEmail = email.trim().toLowerCase();
      if (userCredentialsMap.has(normalizedEmail)) {
        return Promise.reject(new Error("This email is already registered."));
      }
      const newUser: User = { name: name.trim(), email: normalizedEmail };
      userCredentialsMap.set(normalizedEmail, { user: newUser, password });
    },
    [],
  );

  const login = useCallback(async (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const entry = userCredentialsMap.get(normalizedEmail);
    if (!entry || entry.password !== password) {
      return Promise.reject(new Error("Incorrect credentials."));
    }
    setUser(entry.user);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  // Stub for forgot-password flow; no email sent. Replace with real API when ready.
  const sendPasswordResetCode = useCallback(async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    void email;
  }, []);

  const value: AuthContextValue = {
    user,
    signUp,
    login,
    logout,
    sendPasswordResetCode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx == null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
