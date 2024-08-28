# Project: Movie App

## Description

Project aims to create a Movie App.

## Problem Statement

- We are adding a new project to our portfolios. So you and your colleagues have started to work on the project.

## Project Skeleton

```
└── 📁movie-app
    └── 📁public
        └── vite.svg
    └── 📁src
        └── 📁assets
            └── 📁icons
                └── avatar.png
                └── GoogleIcon.jsx
        └── 📁auth
            └── firebase.js
        └── 📁components
            └── MovieCard.jsx
            └── NavbarComp.jsx
            └── Switch.jsx
            └── VideoSection.jsx
        └── 📁context
            └── AuthContextProvider.jsx
        └── 📁pages
            └── Login.jsx
            └── Main.jsx
            └── MovieDetail.jsx
            └── Register.jsx
        └── 📁router
            └── AppRouter.jsx
            └── PrivateRouter.jsx
        └── App.jsx
        └── index.css
        └── main.jsx
    └── .eslintrc.cjs
    └── .gitignore
    └── index.html
    └── movie-app.gif
    └── package-lock.json
    └── package.json
    └── postcss.config.js
    └── README.md
    └── tailwind.config.js
    └── vite.config.js
    └── yarn.lock
```

## Expected Outcome

![Project 006 Snapshot](movie-app.gif)

## Links

<p align="left">
<b>Check The Live Website ➡️</b> <a href="https://ilovemoviess.netlify.app/">Live Website</a>
</p>
<hr>

## Objective

Build a Movie App using ReactJS.

### At the end of the project, following topics are to be covered;

- HTML

- CSS

- JS

- ReactJS

- Context API

- firebase authentication

### At the end of the project, students will be able to;

- improve coding skills within HTML & CSS & JS & ReactJS.

- use git commands (push, pull, commit, add etc.) and Github as Version Control System.

## Steps to Solution

- Before start you can watch these tutorials:
  - https://www.youtube.com/watch?v=9bXhf_TELP4
  - https://www.youtube.com/watch?v=vDT7EnUpEoo
- Step 1 : Create React App using `npx create-react-app movie-app` and install firebase `npm i firebase` / `yarn add firebase`

- Step 2 : Signup `https://firebase.google.com/` and create new app in firebase.
  Firebase is a backed application development software that enables developers to develop iOS, Android and Web apps. It provides developers with a variety of tools and services to help them develop quality apps, grow their user base, and earn profit. It is built on Google’s infrastructure. Firebase offers a number of services, including: analytics,authentication, cloud messaging, realtime database, performance and test lab. Firebase is categorized as a NoSQL database program, which stores data in JSON-like documents.

- Step 3 : Use `https://firebase.google.com/docs/auth/web/start` and create `Authentication` operations.
  - Add the Firebase Authentication JS codes in your `firebase.js` file and initialize Firebase Authentication:

```jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration at project settings part
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
```

- Use this method to `Sign up new users` :

```jsx
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
  })
  .catch((error) => {
    console.log(error);
  });
```

- Go to https://console.firebase.google.com => Authentication => sign-in-method => `enable Email/password`
- Use this method to `Sign in existing users` :

```jsx
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
  })
  .catch((error) => {
    console.log(error);
  });
```

- Use this method to `Set an authentication state observer and get user data` :

```jsx
import { getAuth, onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
  } else {
    // User is signed out
  }
});
```

- Go to https://console.firebase.google.com => Authentication => sign-in-method => `enable Google`
- Use this method to `Authenticate Using Google with Popup` :

```jsx
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
  })
  .catch((error) => {
    // Handle Errors here.
    console.log(error);
  });
```

- Use this method to `Sign Out` :

```jsx
import { getAuth, signOut } from "firebase/auth";

signOut(auth)
  .then(() => {
    // Sign-out successful.
  })
  .catch((error) => {
    // An error happened.
  });
```

- Use this method to `Send a password reset email` :

```jsx
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
  })
  .catch((error) => {
    const errorMessage = error.message;
    // ..
  });
```

- Step 4 : Signup `https://www.themoviedb.org/documentation/api` and get API key. In order to get data use `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`, to search movies use `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`, to get movie details use `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}` and to get video key use `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`. Use `https://image.tmdb.org/t/p/w1280${poster_path}` for image `src`.

- Step 5: You can use css frameworks like Bootstrap, Semantic UI, Material UI.

- Step 6: Add project gif to your project and README.md file.

## Notes

- You can add additional functionalities to your app.

**<p align="center">&#9786; Happy Coding &#9997;</p>**

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
