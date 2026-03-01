---
name: ""
overview: ""
todos: []
isProject: false
---

# Phase 2 — Login (standalone plan)

## Goal

Full login flow: user can open the sign-in screen, enter email and password, pass validation, tap Login, and either see "Incorrect credentials" or be logged in and navigated to Home. Sign-up and sign-in screens both link to each other ("Go to Signup" / "Already have an account? Sign In"); after successful login or signup, navigate to Home (tabs). Home screen content (user info, Logout) is Phase 3; for Phase 2, Home remains a stub and is only the navigation target.

## Prerequisites (from Phase 1)

- [AuthContext](upperspace/app/contexts/AuthContext.tsx): `user`, `signUp`, `logout`; `login` currently rejects with "Not implemented".
- [validation.ts](upperspace/app/utils/validation.ts): `isValidEmail`, `validateSignUp`.
- [BackHeader](upperspace/app/components/auth/BackHeader.tsx), [FormField](upperspace/app/components/form/FormField.tsx), [PasswordField](upperspace/app/components/form/PasswordField.tsx).
- [sign-up.tsx](<upperspace/app/(root)/(auth)/sign-up.tsx>): full UI; on success currently navigates to sign-in.

---

## Step 1 — Implement `login` in AuthContext

**File**: `app/contexts/AuthContext.tsx` (modify)

- Replace the stub `login` implementation.
- **Logic**: Normalize email (trim, lowercase). Look up `userCredentialsMap.get(normalizedEmail)`. If not found or password does not match stored password, `Promise.reject(new Error("Incorrect credentials."))`. If match, call `setUser(entry.user)` and resolve.
- Keep `logout` as-is (already clears user). No AsyncStorage in Phase 2.

---

## Step 2 — Login validation helper

**File**: `app/utils/validation.ts` (modify)

- Add `validateLogin(email: string, password: string): SignUpValidationResult` (or a new `LoginValidationResult` type if you prefer).
  - Email: required, then `isValidEmail`. Errors: "Email is required.", "Please enter a valid email address."
  - Password: required only (no min length for login). Error: "Password is required."
  - Return `{ ok: true }` or `{ ok: false, errors: string[] }` with all applicable errors.

---

## Step 3 — Sign-in screen (Login UI)

**File**: `app/(root)/(auth)/sign-in.tsx` (rewrite)

- **Layout**: Same pattern as sign-up — SafeAreaView, white bg, horizontal padding (e.g. `px-5`), ScrollView + KeyboardAvoidingView for small screens.
- **Header**: BackHeader (back only).
- **Content order**: Title (e.g. "Sign In" or "Welcome back"), short subtitle → Email (FormField), Password (PasswordField with visibility toggle) → validation/context errors → Login button → "Don't have an account? Go to Signup" (pressable "Go to Signup" → `router.replace("/(root)/(auth)/sign-up")`).
- **Form state**: Local state for email, password; per-field or combined errors; optional `contextError` for "Incorrect credentials"; `loading` during login.
- **Login button**: Same style as sign-up primary CTA — `className="w-full py-4 rounded-full bg-[#e7f160] shadow-none"`, `textClassName="text-neutral-900 font-semibold text-lg"`. Optional icon (e.g. SignIn from phosphor) for consistency. Disable or show loading while `loading`.
- **On submit**: Run `validateLogin(email, password)`. If not ok, set errors and return. If ok, call `await login(email, password)`; on success `router.replace("/(root)/(tabs)/home")`; on reject set `contextError` to "Incorrect credentials." (or the message from the context).
- **Accessibility**: Same as sign-up — labels, roles, error association.

---

## Step 4 — Signup success → Home

**File**: `app/(root)/(auth)/sign-up.tsx` (modify)

- Change post–signUp success navigation from `router.replace("/(root)/(auth)/sign-in")` to `router.replace("/(root)/(tabs)/home")` so that both login and signup lead to Home. User can still reach sign-in via "Already have an account? Sign In" and then "Go to Signup" to return to sign-up.

---

## Files summary

| Action | Path                            | Purpose                                                          |
| ------ | ------------------------------- | ---------------------------------------------------------------- |
| Modify | `app/contexts/AuthContext.tsx`  | Implement `login` (lookup + password check, setUser)             |
| Modify | `app/utils/validation.ts`       | Add `validateLogin(email, password)`                             |
| Modify | `app/(root)/(auth)/sign-in.tsx` | Full Login UI, validation, login(), Go to Signup, success → Home |
| Modify | `app/(root)/(auth)/sign-up.tsx` | On signUp success navigate to `/(root)/(tabs)/home`              |

---

## Phase 2 exit criteria

- User can open sign-in (from link on sign-up or via back from sign-up), fill email/password, see validation errors when invalid, and on valid submit either see "Incorrect credentials" or be logged in and navigated to Home (stub).
- User can switch between sign-up and sign-in via "Go to Signup" and "Already have an account? Sign In".
- After successful signup, user is taken to Home (tabs), not sign-in.
- Home screen still shows placeholder content; Phase 3 will add user name, email, and Logout.

---

## Design and a11y (consistent with Phase 1)

- White background; primary button `#e7f160`; BackHeader with back only.
- Password visibility toggle on sign-in.
- accessibilityLabel, accessibilityRole, and label–input association for form and links.

---

## Todos (implementation order)

1. **AuthContext**: Implement `login(email, password)` — lookup in userCredentialsMap, compare password, setUser or reject "Incorrect credentials."
2. **validation.ts**: Add `validateLogin(email, password)` — email required + valid format, password required.
3. **sign-in.tsx**: Rewrite with BackHeader, Email/Password fields, validation, Login button (#e7f160), "Go to Signup" link; on success → `/(root)/(tabs)/home`.
4. **sign-up.tsx**: Change success navigation from sign-in to `/(root)/(tabs)/home`.
