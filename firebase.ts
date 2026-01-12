import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAM_LUVKG4fAO1u013Kbg99FrfocAGVo3M",
  authDomain: "gestion-cosmetishop.firebaseapp.com",
  projectId: "gestion-cosmetishop",
  storageBucket: "gestion-cosmetishop.firebasestorage.app",
  messagingSenderId: "298441607838",
  appId: "1:298441607838:web:ae2e9426d6de17a402098f",
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

export { app };

