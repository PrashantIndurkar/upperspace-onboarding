# UpperSpace – User Authentication App

A React Native (Expo) app with **Login**, **Signup**, and **Home** screens, using React Context API for authentication state and optional persistence with AsyncStorage.

---

## Setup

1. **Clone and install**

```bash
 git clone https://github.com/PrashantIndurkar/upperspace-onboarding.git
 cd upperspace
 pnpm install
```

1. **Start the app**

```bash
 npx expo start
```

1. **Run on device or simulator**

- **iOS simulator:** Press `i` in the terminal, or run `npx expo run:ios` (requires Xcode).
- **Android emulator:** Press `a` in the terminal, or run `npx expo run:android` (requires Android Studio).
- **Expo Go:** Scan the QR code with the Expo Go app on your phone.

---

## Implemented Features

- **AuthContext** – Global auth state with `login`, `signup`, `logout`, and `user` (React Context API).
- **Login screen** – Email & password inputs, validation (format + credentials), “Login” button, “Go to Signup” navigation.
- **Signup screen** – Name, email & password inputs, validation (missing fields, email format, password ≥ 6 chars), “Signup” button, “Go to Login” navigation.
- **Home screen** – Displays logged-in user’s **name** and **email**, and a “Logout” button that returns to Login.
- **Persist authentication** – AsyncStorage keeps the user logged in after closing and reopening the app.
- **Navigation** – Expo Router (React Navigation) between Login, Signup, and Home.
- **UI** – Clear layouts, styled inputs/buttons, inline and context error messages.
- **Bonus: Password visibility toggle** – Eye icon on password fields to show/hide password.

For a full checklist of assignment requirements, see **[ASSIGNMENT_TASKS.md](./docs/ASSIGNMENT_TASKS.md)**.  
For flow diagrams, tech stack, and technical details, see **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)**.

---

## Project structure

- `app/` – Screens and layouts (file-based routing).
- `app/contexts/AuthContext.tsx` – Authentication state and actions.
- `app/utils/validation.ts` – Email and form validation.
- `app/components/` – Reusable UI (form fields, buttons, modals, auth headers).

---

## Tech stack

- **Expo** ~54,
- **React Native** 0.81,
- **React** 19
- **Expo Router** (file-based routing, built on React Navigation)
- **NativeWind** (Tailwind-style styling)
- **TypeScript**
- **@react-native-async-storage/async-storage** – Auth persistence

---

## Screenshots / video

Add screenshots or a short demo video in a folder (e.g. `docs/screenshots/`) and link them here to demonstrate Login, Signup, Home, and logout flows.

---

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev/)

