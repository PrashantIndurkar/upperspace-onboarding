# UpperSpace – User Authentication App

A React Native (Expo) app with **Login**, **Signup**, and **Home** screens, using React Context API for authentication state and optional persistence with AsyncStorage.

---

## Screenshots / video

- Inspiration and final Screens: [Notion Docs](https://www.notion.so/prashantindurkar/Kloudius-com-Take-home-Task-317990060d7580f89668f975df7f0406)
- Full walkthrow video demo: [Google Drive](https://drive.google.com/file/d/1TPfRkYyo9-Tu6BfrDMolya7WZUY7AB3I/view?usp=sharing)

- ScreenShots

<img width="1069" height="560" alt="image" src="https://github.com/user-attachments/assets/ac15497e-781f-48c7-afe1-7eebb66cc2e2" />
<img width="1048" height="1115" alt="image" src="https://github.com/user-attachments/assets/84648ab5-f00d-47aa-ad3a-222f800ee752" />
<img width="1131" height="1132" alt="image" src="https://github.com/user-attachments/assets/a2f2ac48-8fcf-427d-bd5a-73f90c369461" />
<img width="1097" height="1065" alt="image" src="https://github.com/user-attachments/assets/074ce1af-a1b4-4f4b-a251-e295f9bcafef" />
<img width="1074" height="1147" alt="image" src="https://github.com/user-attachments/assets/a49aa719-0e40-4a87-8e43-2e5232cad705" />
<img width="1055" height="552" alt="image" src="https://github.com/user-attachments/assets/b34400e0-7f48-47b9-a8dd-7a1fa87f5d40" />




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


## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Native](https://reactnative.dev/)

