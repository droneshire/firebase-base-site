import { useEffect, useState } from "react";
import {
  getAuth,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import myApp from "firebaseApp";

export const useAuthStateWatcher = () => {
  const auth = getAuth(myApp);
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserState(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, isLoading };
};

interface EmailLoginProps {
  email: string;
  password: string;
}

export const signInWithGoogle = async () => {
  try {
    await signInWithPopup(getAuth(myApp), new GoogleAuthProvider());
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    }
  }
};

export const logInWithEmailAndPassword = async (props: EmailLoginProps) => {
  const { email, password } = props;
  try {
    await signInWithEmailAndPassword(getAuth(myApp), email, password);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    }
  }
};

export const registerWithEmailAndPassword = async (props: EmailLoginProps) => {
  const { email, password } = props;
  try {
    await createUserWithEmailAndPassword(getAuth(myApp), email, password);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    }
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(getAuth(myApp), email);
    alert("Password reset link sent!");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      alert(err.message);
    }
  }
};

export const logout = () => {
  signOut(getAuth(myApp));
};
