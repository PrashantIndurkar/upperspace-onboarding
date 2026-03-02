# Assignment tasks – User Authentication App

All requirements from the assignment brief, in Todoist-style checklist form.

**Completion summary:** All **feature requirements (sections 1–6)** are **completed**. Deliverables (section 7): README and this task list are done; GitHub repo and screenshots/video remain for you to add.


| Status    | Meaning                          |
| --------- | -------------------------------- |
| ✅ Done    | Implemented and verified         |
| ⬜ Pending | Not done yet (deliverables only) |


---

## 1. Authentication Context Setup

- ✅ **Done** – Implement AuthContext using React Context API for global authentication state.
- ✅ **Done** – Context exposes **login** – function to log in a user.
- ✅ **Done** – Context exposes **signup** – function to create a new user.
- ✅ **Done** – Context exposes **logout** – function to log out the user.
- ✅ **Done** – Context exposes **user** – state holding the currently logged-in user (name, email).

---

## 2. Screens

### 2.1 Login screen

- ✅ **Done** – Input field: **Email**.
- ✅ **Done** – Input field: **Password**.
- ✅ **Done** – “Login” button that calls the login function from AuthContext.
- ✅ **Done** – Error messages: **Invalid email/password format** (validation before submit).
- ✅ **Done** – Error messages: **Incorrect credentials** (when login rejects).
- ✅ **Done** – “Go to Signup” (or equivalent) button to navigate to the Signup screen.

### 2.2 Signup screen

- ✅ **Done** – Input field: **Name**.
- ✅ **Done** – Input field: **Email**.
- ✅ **Done** – Input field: **Password**.
- ✅ **Done** – “Signup” button that calls the signup function from AuthContext.
- ✅ **Done** – Error messages: **Missing fields**.
- ✅ **Done** – Error messages: **Invalid email format**.
- ✅ **Done** – Error messages: **Password length less than 6 characters**.
- ✅ **Done** – “Go to Login” button to navigate back to the Login screen.

### 2.3 Home screen

- ✅ **Done** – Display the currently logged-in user’s **name**.
- ✅ **Done** – Display the currently logged-in user’s **email**.
- ✅ **Done** – “Logout” button that logs out the user and returns to the Login screen.

---

## 3. Persist authentication (optional)

- ✅ **Done** – Use AsyncStorage to persist authentication state.
- ✅ **Done** – User remains logged in after the app is closed and reopened (hydration on app load).

---

## 4. Navigation

- ✅ **Done** – Use React Navigation (here: Expo Router, built on React Navigation) to manage navigation.
- ✅ **Done** – Login screen present and reachable.
- ✅ **Done** – Signup screen present and reachable.
- ✅ **Done** – Home screen present and reachable; post-login redirect to Home, post-logout redirect to Login.

---

## 5. UI design

- ✅ **Done** – App is visually appealing with clear layouts.
- ✅ **Done** – Intuitive navigation between screens.
- ✅ **Done** – Appropriate styles for input fields, buttons, and error messages.

---

## 6. Bonus (optional)

- ✅ **Done** – **Password visibility toggle** – eye icon to show/hide password on password fields.

---

## 7. Deliverables (assignment submission)

- ✅ **Done** – **GitHub repository** – project code pushed to a GitHub repo and link shared.
- ✅ **Done** – **README.md** – setup instructions and explanation of implemented features (see [README.md](./README.md)).
- ✅ **Done** – **Assignment task list** – this file (ASSIGNMENT_TASKS.md) with all tasks listed and completed where done.
- ⬜ **Pending** – **Screenshots or short video** – demonstrating Login, Signup, Home, logout, and (optional) persistence; add to repo and link in README.

---

**Summary for reviewers:** All assignment feature requirements (sections 1–6) are implemented. Completion is marked with ✅ **Done** and `[x]` on each item. Only GitHub repo setup and screenshots/video are left for final submission.